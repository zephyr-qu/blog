import container from 'markdown-it-container'
import { defineConfig } from 'vitepress'
import { MermaidMarkdown } from 'vitepress-plugin-mermaid'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { head, themeConfig, vite } from './configs'
export default defineConfig({
  // outDir: '../dist',
  // base: '/',
  // cleanUrls: true,
  /* markdown 配置 */
  lang: 'zh-CN',
  title: '为自由献诗',
  description: '任何限制自由的链条都将束缚我们的灵魂',
  head,
  lastUpdated: true,
  markdown: {
    lineNumbers: false,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: false,
    },
    config: md => {
      md.use(MermaidMarkdown),
        md.use(tabsMarkdownPlugin),
        md.use(container, 'steps', {
          render(tokens, idx) {
            return tokens[idx].nesting === 1
              ? '<div class="vp-steps">\n'
              : '</div>\n'
          },
        })
    },
  },
  // 主题配置
  themeConfig,
  // vite 配置
  vite,
  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
    // en: {
    //   label: 'English',
    //   lang: 'en',
    // },
    // ja: {
    //   label: '日本語',
    //   lang: 'ja',
    // },
  },
})
