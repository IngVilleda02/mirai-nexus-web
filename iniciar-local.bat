@echo off
chcp 65001 >nul
title MIRAI NEXUS - Servidor local
cd /d "%~dp0"
echo.
echo  MIRAI NEXUS - Iniciando el sitio en tu computadora
echo  ===================================================
where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Falta Node.js. Instalalo desde https://nodejs.org  (version LTS^) y vuelve a abrir este archivo.
  start https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules (
  echo  Instalando dependencias por primera vez ^(1-3 minutos^)...
  call npm install
)
echo.
echo  Abriendo http://localhost:3000  (cierra esta ventana para detener el sitio^)
start "" http://localhost:3000
call npm run dev
pause
