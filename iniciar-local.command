#!/bin/bash
# MIRAI NEXUS — iniciar el sitio en tu computadora (macOS / Linux). Doble clic en macOS.
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Falta Node.js. Instálalo desde https://nodejs.org (versión LTS) y vuelve a abrir este archivo."
  open https://nodejs.org 2>/dev/null || xdg-open https://nodejs.org 2>/dev/null
  read -r -p "Presiona Enter para salir"; exit 1
fi
[ -d node_modules ] || { echo "Instalando dependencias por primera vez (1–3 minutos)..."; npm install; }
echo "Abriendo http://localhost:3000 (Ctrl+C para detener)"
( sleep 4; open http://localhost:3000 2>/dev/null || xdg-open http://localhost:3000 2>/dev/null ) &
npm run dev
