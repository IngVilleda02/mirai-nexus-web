"""
Genera preview/mirai-nexus-preview.html: una copia estática y autocontenida del landing
a partir del build de Next.js (npm run build), para revisarla sin servidor.
Uso: python3 scripts/build-preview.py
"""
import base64, re, pathlib

root = pathlib.Path(__file__).resolve().parent.parent
nxt = root / ".next"
html = (nxt / "server/app/index.html").read_text()

# CSS del build
css_href = re.search(r'href="/_next/(static/[^"]+\.css)"', html).group(1)
css = (nxt / css_href).read_text()

# Fuentes: conservar solo el subconjunto latino y embeberlo
def font_face(m):
    block = m.group(0)
    url = re.search(r"url\(([^)]+)\)", block)
    if not url or "-latin-wght" not in url.group(1):
        return ""
    ref = url.group(1).strip("'\"")
    path = (nxt / css_href).parent / ref if not ref.startswith("/_next/") else nxt / ref.replace("/_next/", "")
    path = path.resolve()
    data = base64.b64encode(path.read_bytes()).decode()
    return block.replace(url.group(0), f"url(data:font/woff2;base64,{data})")

css = re.sub(r"@font-face\{[^}]*\}", font_face, css)

# Cuerpo de la página sin scripts de React
body = re.search(r"<body[^>]*>(.*)</body>", html, re.S).group(1)
body = re.sub(r"<script\b[^>]*>.*?</script>", "", body, flags=re.S)
body = re.sub(r"<link\b[^>]*>", "", body)

# Imágenes del portafolio e ícono como data URI
def inline_img(m):
    src = m.group(1)
    p = root / "public" / src.lstrip("/")
    mime = {".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp"}.get(p.suffix)
    if p.exists() and mime:
        return f'src="data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}"'
    return m.group(0)

body = re.sub(r'src="(/(?:portfolio|brand)/[^"]+)"', inline_img, body)
body = re.sub(r'\s(srcset|imagesrcset)="[^"]*"', "", body)
# Enlaces internos que no existen en la vista previa
body = body.replace('href="/aviso-de-privacidad"', 'href="#contacto"').replace('href="/"', 'href="#inicio"')

body = body.replace('>Horario de atención</span>', '>Horario de atención</span><span id="pv-open-status"></span>', 1)
js = (root / "scripts/preview-behavior.js").read_text()

out = f"""<title>MIRAI NEXUS</title>
<meta name="description" content="Vista previa del sitio oficial de MIRAI NEXUS.">
<style>
{css}
:root {{ color-scheme: dark; }}
html, body {{ background: #060709; color: #f3f4f6; }}
body {{ overflow-x: clip; }}
</style>
<div class="min-h-screen">{body}</div>
<script>
{js}
</script>
"""
dest = root / "preview/mirai-nexus-preview.html"
dest.parent.mkdir(exist_ok=True)
dest.write_text(out)
print(dest, f"{dest.stat().st_size/1024:.0f} KB")
