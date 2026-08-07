import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Whjnr38WFE' }],
  ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#3eaf7c' }],
  // ['link', { rel: 'preload', href: 'https://cdn.jsdelivr.net/npm/lucide-static/font/lucide.woff2', as: "font", type: "font/woff2", crossorigin: "anonymous" }],
  // ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
  // ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/lucide-static/font/lucide.css' }],
  ['link', { rel: 'icon', href: '/favicon.ico' }],
]
