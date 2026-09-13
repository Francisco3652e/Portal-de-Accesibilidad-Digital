# -*- coding: utf-8 -*-
"""Función serverless (Vercel) que descarga una página web y devuelve solo su
texto legible, como el "modo lector" de Safari o "Leer en voz alta" de
Samsung Internet. El lector la usa para leer un enlace sin que la persona
tenga que copiar el contenido.

GET /api/leer?url=<https://...>  ->  {"title": "...", "text": "...", "url": "..."}
"""
import ipaddress
import json
import re
import socket
from html.parser import HTMLParser
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from urllib.request import Request, urlopen

MAX_BYTES = 2 * 1024 * 1024
MAX_CHARS = 20000
TIMEOUT = 10
# Etiquetas cuyo contenido no se lee (menús, scripts, publicidad, etc.).
SKIP = {'script', 'style', 'noscript', 'template', 'svg', 'nav', 'header', 'footer', 'aside', 'form', 'iframe', 'button'}
BLOCKS = {'p', 'div', 'section', 'article', 'main', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'tr', 'td', 'th', 'dd', 'dt', 'figcaption', 'br', 'hr'}


class Extractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.in_title = False
        self.skip_depth = 0
        self.in_article = False
        self.chunks = []          # texto de toda la página
        self.article_chunks = []  # texto dentro de <article>/<main>, si existe

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.skip_depth += 1
        elif tag == 'title':
            self.in_title = True
        elif tag in ('article', 'main'):
            self.in_article = True
        if tag in BLOCKS:
            self._add('\n')

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip_depth = max(0, self.skip_depth - 1)
        elif tag == 'title':
            self.in_title = False
        elif tag in ('article', 'main'):
            self.in_article = False
        if tag in BLOCKS:
            self._add('\n')

    def handle_data(self, data):
        if self.in_title:
            self.title += data
            return
        if self.skip_depth:
            return
        self._add(data)

    def _add(self, s):
        self.chunks.append(s)
        if self.in_article:
            self.article_chunks.append(s)


def clean(text):
    text = re.sub(r'[ \t\r\f\v ]+', ' ', text)
    lines = [ln.strip() for ln in text.split('\n')]
    # Párrafos: líneas no vacías; una línea en blanco separa párrafos.
    paras, cur = [], []
    for ln in lines:
        if ln:
            cur.append(ln)
        elif cur:
            paras.append(' '.join(cur)); cur = []
    if cur:
        paras.append(' '.join(cur))
    # Descarta migajas (menús, "Leer más", etc.) demasiado cortas.
    paras = [p for p in paras if len(p) >= 3]
    return '\n\n'.join(paras)


def is_public(host):
    try:
        infos = socket.getaddrinfo(host, None)
    except socket.gaierror:
        return False
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast:
            return False
    return bool(infos)


def fetch_text(url):
    parts = urlparse(url)
    if parts.scheme not in ('http', 'https') or not parts.hostname:
        raise ValueError('Solo se admiten enlaces http o https.')
    if not is_public(parts.hostname):
        raise ValueError('No se pudo resolver ese sitio.')
    req = Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (compatible; MosaicLector/1.0; +https://portal-de-accesibilidad-digital.vercel.app)',
        'Accept': 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5',
        'Accept-Language': 'es-SV,es;q=0.9',
    })
    with urlopen(req, timeout=TIMEOUT) as res:
        ctype = res.headers.get('Content-Type', '')
        raw = res.read(MAX_BYTES)
    m = re.search(r'charset=([\w-]+)', ctype)
    enc = m.group(1) if m else None
    if not enc:
        m = re.search(rb'<meta[^>]+charset=["\']?([\w-]+)', raw[:4096], re.I)
        enc = m.group(1).decode('ascii', 'ignore') if m else 'utf-8'
    try:
        html = raw.decode(enc, errors='replace')
    except LookupError:
        html = raw.decode('utf-8', errors='replace')
    if 'text/plain' in ctype:
        return '', clean(html)
    ex = Extractor()
    ex.feed(html)
    article = clean(''.join(ex.article_chunks))
    body = clean(''.join(ex.chunks))
    # Preferimos el artículo si tiene contenido sustancial.
    text = article if len(article) > 200 else body
    return ' '.join(ex.title.split()), text


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        url = (query.get('url', [''])[0] or '').strip()
        if url and not re.match(r'^https?://', url, re.I):
            url = 'https://' + url
        if not url:
            return self._json(400, {'error': 'Falta el enlace (url).'})
        try:
            title, text = fetch_text(url)
        except ValueError as e:
            return self._json(400, {'error': str(e)})
        except Exception:
            return self._json(502, {'error': 'No se pudo abrir ese enlace.'})
        if not text:
            return self._json(422, {'error': 'La página no tiene texto legible.'})
        self._json(200, {'title': title, 'text': text[:MAX_CHARS], 'url': url})

    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)
