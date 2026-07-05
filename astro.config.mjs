// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages отдаёт проектные сайты по подпути /<repo>/, а не с корня домена —
// поэтому base переключается через переменную окружения, которую выставляет
// только workflow деплоя на Pages (.github/workflows/deploy-pages.yml).
// Обычная сборка (для VPS/своего домена) всегда собирается с корня ("/"),
// поэтому исходники не привязаны к конкретному хостингу.
const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";

// https://astro.build/config
export default defineConfig({
  // Слэш на конце обязателен: import.meta.env.BASE_URL отдаёт ровно эту
  // строку без нормализации, конкатенация с именами файлов идёт "как есть".
  base: isGithubPages ? "/neuro-boss-site/" : "/",
});
