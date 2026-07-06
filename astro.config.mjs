// @ts-check
import { defineConfig } from 'astro/config';

// Деплой-таргеты живут на разных подпутях, поэтому base переключается
// через DEPLOY_TARGET (выставляется только соответствующим workflow/скриптом):
//   - "gh-pages" → GitHub Pages, проектный сайт отдаётся с /neuro-boss-site/
//   - "sweb"     → shared-хостинг sweb.ru, сайт лежит в подпапке
//                  pinarik.ru/neuro-boss
//   - "ftp-test" → та же sweb.ru, но отдельная тестовая подпапка
//                  pinarik.ru/ftp-neuro-boss — для сравнения классического
//                  FTP-деплоя с SFTP-вариантом (см. deploy-ftp-test.yml)
//   - иначе      → VPS, где сайт висит на корне домена neuro-boss.ru ("/")
// Слэш на конце обязателен в непустых случаях: import.meta.env.BASE_URL
// отдаёт ровно эту строку без нормализации, конкатенация с именами файлов
// идёт "как есть".
const BASE_BY_TARGET = {
  "gh-pages": "/neuro-boss-site/",
  sweb: "/neuro-boss/",
  "ftp-test": "/ftp-neuro-boss/",
};
const base = BASE_BY_TARGET[process.env.DEPLOY_TARGET ?? ""] ?? "/";

// https://astro.build/config
export default defineConfig({
  base,
});
