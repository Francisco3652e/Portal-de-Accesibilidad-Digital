# -*- coding: utf-8 -*-
"""Genera los medios demostrativos de Mosaic:
   - assets/media/demo-lessa.mp4 + demo-lessa.vtt (video animado con narración y subtítulos descriptivos)
   - assets/media/transcripcion-guia-tramites.txt
"""
import os, subprocess, json, math, pathlib
from gtts import gTTS
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path('/home/neol-desktop/Documentos/Portal-de-Accesibilidad-Digital')
OUT = ROOT / 'assets' / 'media'
TMP = pathlib.Path(__file__).parent / '.tmp'
OUT.mkdir(parents=True, exist_ok=True); TMP.mkdir(exist_ok=True)
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

W, H, FPS = 640, 360, 15
PAPER, CARD, INK = (255, 248, 232), (255, 253, 246), (17, 17, 17)
YELLOW, PINK, MINT, SKY = (255, 210, 63), (255, 143, 177), (155, 240, 200), (142, 211, 255)

# ---------------------------------------------------------------- guion
# (texto hablado, texto del subtítulo, paso activo)
SCRIPT = [
    (None, '[Sonido: campana de notificación suave]', 0),
    ('Bienvenido al trámite digital accesible del Estado.', 'Bienvenido al trámite digital accesible del Estado.', 0),
    ('Paso uno: identifícate con tu DUI.', 'Paso 1: identifícate con tu DUI.', 1),
    ('Paso dos: elige el trámite que necesitas.', 'Paso 2: elige el trámite que necesitas.', 2),
    ('Paso tres: para autenticar tu firma digital, selecciona la verificación biométrica asistida.', 'Paso 3: para autenticar tu firma digital, selecciona la verificación biométrica asistida.', 3),
    ('Listo. Tu solicitud fue enviada. Recibirás la respuesta por el canal que elegiste.', '[Sonido: confirmación] Listo. Tu solicitud fue enviada.', 4),
]
GAP = 0.6  # segundos de silencio entre frases

def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def duration(path):
    out = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(path)])
    return float(json.loads(out)['format']['duration'])

# ---------------------------------------------------------------- audio por segmento
parts = []  # (start, end, caption, step)
files = []
t = 0.0
for i, (speech, caption, step) in enumerate(SCRIPT):
    p = TMP / f'seg{i}.wav'
    if speech is None:
        # campana: dos tonos con decaimiento
        run(['ffmpeg', '-y', '-f', 'lavfi', '-i', 'sine=frequency=880:duration=1.6', '-f', 'lavfi', '-i', 'sine=frequency=1320:duration=1.6',
             '-filter_complex', '[0:a]volume=0.35[a];[1:a]volume=0.2,adelay=120|120[b];[a][b]amix=inputs=2,afade=t=out:st=0.3:d=1.3', '-ar', '44100', '-ac', '1', str(p)])
    else:
        mp3 = TMP / f'seg{i}.mp3'
        gTTS(speech, lang='es', tld='com.mx').save(str(mp3))
        run(['ffmpeg', '-y', '-i', str(mp3), '-ar', '44100', '-ac', '1', str(p)])
    d = duration(p)
    parts.append((t, t + d, caption, step)); files.append(p)
    t += d + GAP
TOTAL = t

# concatenar con silencios
concat = TMP / 'concat.txt'
with open(concat, 'w') as f:
    gap = TMP / 'gap.wav'
    run(['ffmpeg', '-y', '-f', 'lavfi', '-i', f'anullsrc=r=44100:cl=mono', '-t', str(GAP), str(gap)])
    for p in files:
        f.write(f"file '{p}'\nfile '{gap}'\n")
run(['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', str(concat), '-c', 'pcm_s16le', str(TMP / 'narracion.wav')])

# ---------------------------------------------------------------- VTT
def ts(s):
    return f'{int(s // 3600):02d}:{int(s % 3600 // 60):02d}:{s % 60:06.3f}'
with open(OUT / 'demo-lessa.vtt', 'w', encoding='utf-8') as f:
    f.write('WEBVTT\n\n')
    for i, (a, b, cap, _) in enumerate(parts, 1):
        f.write(f'{i}\n{ts(a)} --> {ts(min(b + GAP, TOTAL))}\n{cap}\n\n')

# ---------------------------------------------------------------- transcripción
with open(OUT / 'transcripcion-guia-tramites.txt', 'w', encoding='utf-8') as f:
    f.write('Mosaic — Transcripción: Guía de derechos y trámites digitales accesibles (demostración)\n\n')
    for a, b, cap, _ in parts:
        f.write(f'[{ts(a)[3:8]}] {cap}\n')

# ---------------------------------------------------------------- frames
font_xl = ImageFont.truetype(FONT, 44)
font_lg = ImageFont.truetype(FONT, 28)
font_md = ImageFont.truetype(FONT, 20)
font_sm = ImageFont.truetype(FONT, 15)
STEPS = [('1', 'Identifícate', YELLOW), ('2', 'Elige trámite', PINK), ('3', 'Firma digital', MINT)]

def ease(x):
    return 1 - (1 - x) ** 3

def tile(d, x, y, w, h, fill, lift=0.0, r=16):
    off = int(8 * lift)
    d.rounded_rectangle([x + 6, y + 6, x + w + 6, y + h + 6], r, fill=INK)
    d.rounded_rectangle([x - off, y - off, x + w - off, y + h - off], r, fill=fill, outline=INK, width=4)
    return (x - off, y - off)

def frame(time):
    img = Image.new('RGB', (W, H), PAPER)
    d = ImageDraw.Draw(img)
    # cabecera
    d.rounded_rectangle([24, 22, 64, 62], 8, fill=INK)
    d.rounded_rectangle([28, 26, 44, 42], 3, fill=YELLOW); d.rounded_rectangle([46, 26, 62, 42], 3, fill=PINK)
    d.rounded_rectangle([28, 44, 44, 60], 3, fill=MINT); d.rounded_rectangle([46, 44, 62, 60], 3, fill=SKY)
    d.text((76, 24), 'Trámite digital accesible', font=font_lg, fill=INK)
    d.text((76, 56), 'Demostración · subtítulos descriptivos', font=font_sm, fill=(63, 58, 48))
    # paso activo según el tiempo
    step = 0
    for a, b, cap, s in parts:
        if time >= a: step = s
    # entrada de las teselas (0–1 s)
    intro = ease(min(1.0, time / 1.0))
    for i, (num, label, col) in enumerate(STEPS):
        x = 40 + i * 195
        y = 110 + int((1 - intro) * 40)
        active = (step == i + 1)
        lift = 1.0 if active else 0.0
        ox, oy = tile(d, x, y, 170, 150, col if (active or step == 0 or step == 4) else CARD, lift)
        d.text((ox + 16, oy + 12), num, font=font_xl, fill=INK)
        d.text((ox + 16, oy + 104), label, font=font_md, fill=INK)
        if step > i + 1 or step == 4:
            # marca de hecho
            d.line([(ox + 118, oy + 30), (ox + 134, oy + 46), (ox + 158, oy + 16)], fill=INK, width=7, joint='curve')
    if step == 4:
        # confirmación final
        pulse = 0.5 + 0.5 * math.sin(time * 4)
        cx, cy, rr = 560, 300, int(34 + 4 * pulse)
        d.ellipse([cx - rr + 5, cy - rr + 5, cx + rr + 5, cy + rr + 5], fill=INK)
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=SKY, outline=INK, width=4)
        d.line([(cx - 16, cy), (cx - 4, cy + 12), (cx + 18, cy - 12)], fill=INK, width=7, joint='curve')
    # indicador de audio (barras) abajo a la izquierda
    for i in range(8):
        h = 6 + int(14 * abs(math.sin(time * 6 + i)))
        d.rounded_rectangle([40 + i * 14, 320 - h, 48 + i * 14, 320], 2, fill=INK)
    d.text((160, 300), 'Narración en español · Ilustración de demostración', font=font_sm, fill=(63, 58, 48))
    return img

n = int(math.ceil(TOTAL * FPS))
FR = TMP / 'frames'; FR.mkdir(exist_ok=True)
for i in range(n):
    frame(i / FPS).save(FR / f'f{i:05d}.png')

run(['ffmpeg', '-y', '-framerate', str(FPS), '-i', str(FR / 'f%05d.png'), '-i', str(TMP / 'narracion.wav'),
     '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'main', '-crf', '24', '-preset', 'slow', '-movflags', '+faststart',
     '-c:a', 'aac', '-b:a', '80k', '-shortest', str(OUT / 'demo-lessa.mp4')])


print('TOTAL', round(TOTAL, 1), 's; frames', n)
for a, b, cap, s in parts: print(f'{a:5.1f}-{b:5.1f} paso {s}: {cap}')
