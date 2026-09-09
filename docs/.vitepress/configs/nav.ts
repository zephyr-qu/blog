import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '博文', link: '/post/', activeMatch: '^/post/' },
  { text: '周刊', link: '/weekly/', activeMatch: '^/weekly/' },
  {
    text: '设计模式',
    link: '/design-pattern/',
    activeMatch: '^/design-pattern/',
  },
   {
    text: '星星之火',
    link: '/spark/',
    activeMatch: '^/spark/',
  },
  // {
  //   text: '编程',
  //   items: [
  //     {
  //       text: '设计模式',
  //       link: '/design-pattern/',
  //       activeMatch: '^/design-pattern/',
  //     },
  // { text: '诗与周刊', link: '/weekly/', activeMatch: '^/weekly/' },
  // { text: '文档', link: '/base/', activeMatch: '^/base/' },
  // { text: '源码', link: '/code/', activeMatch: '^/code/' },
  // { text: '力扣', link: '/leetcode/', activeMatch: '^/leetcode/' },
  // { text: 'AI', link: '/ai/', activeMatch: '^/ai/' },
  //   ],
  // },
  // { text: '笔记', link: '/note/', activeMatch: '^/note/' },
  { text: '作品', link: '/works', activeMatch: '^/works' },
  { text: '友链', link: '/friends', activeMatch: '^/friends' },
  { text: '关于', link: '/about', activeMatch: '^/about' },
]
