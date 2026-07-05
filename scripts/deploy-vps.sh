#!/usr/bin/env bash
# Деплой статической сборки сайта на VPS (тот же сервер, где живёт бот).
# Сборка ведётся с base "/" (обычный npm run build, без DEPLOY_TARGET) —
# результат в dist/ не привязан к GitHub Pages и подходит для любого хостинга.
#
# TODO перед первым использованием:
#   1. Завести на VPS отдельный server block в Nginx с document root ниже
#      (см. VPS_PATH) — независимо от /home/agent/tg_agent, где живёт бот.
#   2. Прописать VPS_HOST/VPS_PATH под реальный домен/поддомен.
set -euo pipefail

VPS_HOST="agent@138.16.226.115"
VPS_PATH="/var/www/neuroboss"   # TODO: подтвердить путь после настройки Nginx

cd "$(dirname "$0")/.."
npm run build
rsync -avz --delete dist/ "$VPS_HOST:$VPS_PATH/"

echo "Готово. Проверь сайт по адресу, привязанному к $VPS_PATH."
