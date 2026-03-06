<template>
  <article class="card">
    <div class="link-bar">
      <h3 class="name">
        {{ name }}
        <VPBadge :type="badge.type" :text="badge.text" />
      </h3>
      <a :href="links.url" target="_blank">
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Gitee</title>
          <path
            d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"
          />
        </svg>
      </a>
    </div>
    <p class="desc">{{ desc }}</p>
    <!-- 标签区 -->
    <div class="tags">
      <div class="tag" v-for="tag in tags" :key="tag">
        <VPBadge type="tip" :text="tag" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { VPBadge } from 'vitepress/theme'
interface Link {
  icon: string
  url: string
}
interface Badge {
  type: string
  text: string
}

defineProps<{
  name: string
  desc: string
  links: Link
  badge: Badge
  tags?: string[]
}>()
</script>

<style scoped lang="scss">
/* ========== 卡片 ========== */
.card {
  --border: 1px solid var(--vp-c-divider);
  padding: var(--card-gap);
  border: var(--border);
  border-radius: var(--card-radius);
  background-color: var(--vp-c-bg-soft);

  /* 弹性布局，让内容垂直居中 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;

  &:hover,
  &:focus-within {
    border-color: var(--vp-c-brand-1);
    transform: translateY(-2px);
    box-shadow: var(--vp-shadow-3);
  }
}

/* ========== 描述 ========== */
.desc {
  margin: 0 0 0.5rem;
  font-size: clamp(0.85rem, 1.8vw, 0.95rem);
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
/* ========== 标签 ========== */
.tags {
  margin-top: auto; /* 把标签推到卡片最底部 */
  display: flex;
  flex-wrap: wrap; /* 标签换行 */
  margin-bottom: -0.25rem; /* 与边框微调对齐，可选 */
  .tag {
    margin-right: 0.5rem; /* 标签之间的间距 */
  }
}

/* ========== 链接条 ========== */
.link-bar {
  display: flex;
  margin: 0 0 0.5rem;
  align-items: center;
  justify-content: space-between;
  /* ========== 标题 ========== */
  .name {
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 600;
    color: var(--vp-c-brand-1);
  }
  a {
    display: inline-flex;
    color: var(--vp-c-text-2);
    transition: color 0.2s;
    /* 点击区域更大 */
    padding: 6px;

    &:hover {
      color: var(--vp-c-brand-1);
    }

    svg {
      width: clamp(18px, 2.5vw, 22px);
      height: clamp(18px, 2.5vw, 22px);
    }
  }
}
</style>
