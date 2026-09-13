# -*- coding: utf-8 -*-
"""Función serverless (Vercel) que convierte texto en audio MP3 en español.

El lector la usa como respaldo cuando el navegador no tiene voces instaladas
para la Web Speech API (por ejemplo, Chromium/Brave en Linux sin acceso a
speech-dispatcher). Genera la voz con gTTS, la misma que produce el audio de
muestra en tools/make_media.py.

GET /api/tts?q=<texto>  ->  audio/mpeg
"""
from http.server import BaseHTTPRequestHandler
from io import BytesIO
from urllib.parse import parse_qs, urlparse

from gtts import gTTS

MAX_CHARS = 4000


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = parse_qs(urlparse(self.path).query)
        text = ' '.join(query.get('q', [''])[0].split()).strip()
        if not text:
            self._send(400, b'Falta el texto (q).', 'text/plain; charset=utf-8')
            return
        text = text[:MAX_CHARS]
        try:
            buf = BytesIO()
            gTTS(text, lang='es', tld='com.mx').write_to_fp(buf)
        except Exception:
            self._send(502, b'No se pudo generar la voz.', 'text/plain; charset=utf-8')
            return
        self._send(200, buf.getvalue(), 'audio/mpeg', cache='public, max-age=86400')

    def _send(self, status, body, ctype, cache='no-store'):
        self.send_response(status)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', cache)
        self.end_headers()
        self.wfile.write(body)
