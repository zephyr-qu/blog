<!-- Projects.vue -->
<template>
  <VPTeamPageTitle>
    <template #title> MY WORKS </template>
    <template #lead>欢迎 Star / PR</template>
  </VPTeamPageTitle>

  <div class="project-grid">
    <WorkCard
      v-for="p in projects"
      :key="p.name"
      :name="p.name"
      :desc="p.desc"
      :links="p.links"
      :tags="p.tags"
      :badge="p.badge"
    />
  </div>
</template>

<script setup lang="ts">
import { VPTeamPageTitle } from 'vitepress/theme'
import WorkCard from './WorkCard.vue'

// 想加项目直接往数组里 push
const projects = [
  {
    name: '在线简历-OnlineR',
    desc: '极简、响应式的「个人介绍 + 简历」页面，100% 纯前端，零后端依赖。',
    badge: {
      type: 'info',
      text: '已存档',
    },
    links: {
      icon: 'gitee',
      url: 'https://gitee.com/zs2084035767/online-resume',
    },
    tags: ['React', 'Vite', 'TypeScript'],
  },
  {
    name: '深选-SiftDeep',
    desc: '高质量视频推荐网站，采用 monorepo、Next.js 和 Nest.js 技术栈。',
    badge: {
      type: 'warning',
      text: '暂停中',
    },
    links: {
      icon: 'gitee',
      url: 'https://gitee.com/zs2084035767/SiftDeep',
    },
    tags: ['Next.js', 'Nest.js', 'TypeScript'],
  },
  {
    name: '骑迹-Miracle',
    desc: '大学毕业设计项目，基于SpringBoot+Vue+UniApp开发的骑行攻略社区小程序。',
    badge: {
      type: 'info',
      text: '已存档',
    },
    links: {
      icon: 'gitee',
      url: 'https://gitee.com/zs2084035767/Miracle',
    },
    tags: ['SpringBoot', 'Vue', 'UniApp'],
  },
  {
    name: '代办事项-TodoApp',
    desc: '一个用于练习的 Flutter 入门项目，实现了一个简单的待办事项应用。',
    badge: {
      type: 'info',
      text: '已存档',
    },
    links: {
      icon: 'gitee',
      url: 'https://gitee.com/zs2084035767/flutter_todo_app',
    },
    tags: ['Dart', 'Flutter'],
  },
  {
    name: '狐狸视频-FoxPlayer',
    desc: '基于 flutter 构建的网络视频播放器，用于练习 flutter 和 signal.dart 的项目。',
    badge: {
      type: 'tip',
      text: 'v1.0.0',
    },
    links: {
      icon: 'gitee',
      url: 'https://gitee.com/zs2084035767/fox_player_app',
    },
    tags: ['Dart', 'Flutter', 'Signal.dart'],
  },
]
</script>

<style scoped lang="scss">
/* ========== 网格 ========== */
.project-grid {
  display: grid;
  gap: var(--card-gap);

  margin: 2rem auto;
  // margin-top: 2rem;
  /* 防止超宽屏被无限拉伸，整体居中 */
  max-width: 1440px;

  /* 默认 1 列 */
  grid-template-columns: 1fr;
  padding-inline: var(--card-phone);

  @media (min-width: 640px) {
    padding-inline: var(--card-pad);
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 960px) {
    padding-inline: var(--card-pc);
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
