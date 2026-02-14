import type { DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

export const sidebar: DefaultTheme.Config['sidebar'] = generateSidebar([
  {
    documentRootPath: '/docs',
    scanStartPath: 'post',
    resolvePath: '/post/',
    collapsed: true,
    excludePattern: ['img', 'books', 'poem'],
    sortMenusByFrontmatterOrder: true,
    useTitleFromFrontmatter: true,
  },
  {
    documentRootPath: '/docs',
    scanStartPath: 'design-pattern',
    resolvePath: '/design-pattern/',
    excludePattern: ['img'],
    // sortMenusByFrontmatterOrder: true,
    useTitleFromFrontmatter: true,
  },
  {
    documentRootPath: '/docs',
    scanStartPath: 'weekly',
    resolvePath: '/weekly/',
    excludePattern: ['img'],
    // sortMenusByFrontmatterOrder: true,
    useTitleFromFrontmatter: true,
  },
  // {
  //   documentRootPath: '/docs',
  //   scanStartPath: 'base',
  //   resolvePath: '/base/',
  //   excludePattern: ['img'],
  //   sortMenusByFrontmatterOrder: true,
  //   useTitleFromFrontmatter: true,
  // },
  // {
  //   documentRootPath: '/docs',
  //   scanStartPath: 'code',
  //   resolvePath: '/code/',
  //   excludePattern: ['img'],
  //   // sortMenusByFrontmatterOrder: true,
  //   useTitleFromFileHeading: true,
  // },
  // {
  //   documentRootPath: '/docs',
  //   scanStartPath: 'leetcode',
  //   resolvePath: '/leetcode/',
  //   excludePattern: ['img'],
  //   // sortMenusByFrontmatterOrder: true,
  //   useTitleFromFileHeading: true,
  // },
])
