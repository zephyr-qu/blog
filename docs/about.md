# 关于自己

### 嗨！👋🏻，我是子十

一位 ~~在读大学生~~，~~毕业生~~，后端开发，`<Developer/>`。<span id="me">困于山林，难攀高峰。</span>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    // 动态导入库，只会在客户端执行
    const module = await import('typewriter-effect/dist/core')
    const Typewriter = module.default

    const heroEl = document.querySelector<HTMLElement>('#me')
    if (!heroEl) return
    
    const originalText = heroEl.textContent || ''
    heroEl.textContent = ''
    
    new Typewriter(heroEl, {
      delay: 60,
      cursor: '◀',
      loop: true,
    })
      .typeString(originalText)
      .pauseFor(2000)
      .deleteAll(30)
      .pauseFor(1000)
      .start()
  } catch (error) {
    console.warn('打字机效果加载失败:', error)
    // 失败时回退显示原文本（可选）
    const heroEl = document.querySelector<HTMLElement>('#me')
    if (heroEl) {
      heroEl.textContent = heroEl.dataset.originalText || ''
    }
  }
})
</script>

> 虽然不喜欢贴标签，但这里还是贴上吧，为了方便他人快速了解我。**或者你不必了解我**🤔。

<Badge type="tip" text="INTJ" />
<Badge type="danger" text="PESSIMIST" />
<Badge type="warning" text="NARUTO" />
<Badge type="tip" text="VIBE CODING" />
<Badge type="danger" text="余华&史铁生" />
<Badge type="warning" text="思考&好奇&探索" />
<Badge type="tip" text="阅读&写作&听歌&编程&骑行&番剧" />

## 关于博客

:::tip 版权声明

本站所有文章除特别声明外，均采用 《[CC BY-NC-SA 4.0 ](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)许可协议》，转载请注明作者。

:::

这里是子十的博客，主要记录我的学习和感悟。

在此开设博客的目的是：“**在平凡的 ~~大学~~ 生活中，记录下来我不起眼的故事与经历。**”

## 社交网络

> 有共同兴趣，乐于学习、思考或探索的小伙伴可加企鹅，**一起学习，共同进步**🤪。
>
> 交换友链的，对博客有建议，文章有错误或不了解的，请发送下方邮箱。**感谢🙏**

企鹅🐧:<Badge type="tip" text="2084035767" />&nbsp;
邮箱📫:<Badge type="tip" text="jiangtzs@foxmail.com" />

## 探索技能

> 仅代表**学习过**😋

<svg class="skill-cat-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.75" y="4.25" width="18.5" height="15.5" rx="2.5"/><path d="M2.75 8.25h18.5"/><path d="M5.6 6.25h.01M7.85 6.25h.01"/><path d="M9.5 12.9l-1.7 1.7 1.7 1.7"/><path d="M14.5 12.9l1.7 1.7-1.7 1.7"/><path d="M13.1 12.3l-2.2 5"/></svg> **前端**
<Badge type="info" text="html" />
<Badge type="info" text="css" />
<Badge type="info" text="javascript" />
<Badge type="info" text="typescript" />
<Badge type="info" text="nodejs" />
<Badge type="info" text="sass" />
<Badge type="info" text="unocss" />
<Badge type="info" text="tailwindcss" />
<Badge type="info" text="vue" />
<Badge type="info" text="react" />
<Badge type="info" text="vite" />

<svg class="skill-cat-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3.75" width="18" height="7" rx="2"/><rect x="3" y="13.25" width="18" height="7" rx="2"/><path d="M6.6 7.25h.01M6.6 16.75h.01"/><path d="M10.4 7.25H16M10.4 16.75H16"/></svg> **后端**
<Badge type="info" text="c" />
<Badge type="info" text="python" />
<Badge type="info" text="java" />
<Badge type="info" text="golang" />
<Badge type="info" text="springboot" />
<Badge type="info" text="springcloud" />
<Badge type="info" text="flask" />
<Badge type="info" text="mysql" />
<Badge type="info" text="postgresql" />
<Badge type="info" text="redis" />
<Badge type="info" text="rabbitmq" />

<svg class="skill-cat-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="6.75" y="2.5" width="10.5" height="19" rx="3"/><path d="M10.6 5.2h2.8"/><path d="M10.6 18.8h2.8"/></svg> **客户端**

<Badge type="info" text="uniapp" />
<Badge type="info" text="dart" />
<Badge type="info" text="flutter" />

<svg class="skill-cat-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 8Q10 12 14 12Q10 12 10 16Q10 12 6 12Q10 12 10 8Z"/><path d="M17.75 4.5Q17.75 6.75 20 6.75Q17.75 6.75 17.75 9Q17.75 6.75 15.5 6.75Q17.75 6.75 17.75 4.5Z"/></svg> **AI**
<Badge type="info" text="cursor" />
<Badge type="info" text="pi agent" />
<Badge type="info" text="claude" />
<Badge type="info" text="codex" />
<Badge type="info" text="opencode" />
<Badge type="info" text="copilot" />
<Badge type="info" text="deepseek" />
<Badge type="info" text="ollama" />
<Badge type="info" text="dify" />
<Badge type="info" text="langchain" />
<Badge type="info" text="mcp" />

<svg class="skill-cat-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> **其他**
<Badge type="info" text="lua" />
<Badge type="info" text="bash" />
<Badge type="info" text="git" />
<Badge type="info" text="md" />
<Badge type="info" text="linux" />
<Badge type="info" text="jenkins" />
<Badge type="info" text="docker" />
<Badge type="info" text="figma" />
<Badge type="info" text="nginx" />
<Badge type="info" text="vscode" />

## 我的梦想

> 梦想甚远，希望渺茫。

小时候梦想是<span style="filter: blur(4px); user-select: none;">做出一部堪比《火影忍者》的动漫</span><br>
现在的梦想是<span style="filter: blur(4px); user-select: none;">平平淡淡的过完一生，愿世界不再流血。</span>
