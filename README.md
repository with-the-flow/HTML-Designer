@琳珑
这个项目缺了中间的设计部分和Menu（菜单栏）的部分操作，上传图片资源部分和最难搞的JavaScript版本scratch界面。
因为我的U盘物理损坏（现在我都不知道是怎样损坏的），所以无法转换成Vue3格式，一下是我查到的一些资料：



一句话结论  
90 % 以上的交互逻辑、面板折叠、搜索、属性渲染、拖拽组件树 **全部可以移到 Vue 3**，只有最终 `<canvas>`/`<svg>` 等高帧率渲染层保留原生 DOM。下面给出一份“迁移路线表”，你照着改即可。

---

### 1️⃣ 哪些文件/功能 → 直接换成 Vue 3
| 现有文件 | 迁移目标 | 用 Vue 3 做什么 |
|---|---|---|
| `AttributeEditor.html` + `AttributeEditor.css` | `AttributeEditor.vue` | 折叠面板、属性搜索、双向绑定 |
| `WidgetBox.html` + `WidgetBox.css` + `WidgetBox.js` | `WidgetBox.vue` | 折叠分组、关键字过滤、拖拽数据源 |
| `Menu.html` + `Menu.css` + `Menu.js` | `AppMenu.vue` 或 `App.vue` | 菜单栏、快捷键、全局状态 |
| 所有 `.js` 里的 `document.querySelector` 事件 | `setup()` + `ref/reactive` | 响应式数据、计算属性 |
| 搜索跳转 `window.location.href` | `computed()` 过滤 | 实时本地过滤，无跳转 |

---

### 2️⃣ 保留原生 DOM 的部分
| 场景 | 原因 |
|---|---|
| 画布 `<canvas>` / `<svg>` | 需 60 fps 绘制、WebGL、Fabric.js 等库 |
| 导出纯 HTML/CSS 片段 | 最终产物要脱离框架，Vue 只负责生成 |

---

### 3️⃣ 目录结构（Vite + Vue 3）
```
src/
├─ components/
│  ├─ AppMenu.vue           ← 原 Menu.*
│  ├─ WidgetBox.vue         ← 原 WidgetBox.*
│  ├─ AttributeEditor.vue   ← 原 AttributeEditor.*
│  ├─ CanvasRenderer.vue    ← 纯 DOM/Canvas，无模板
│  └─ PropertyInput.vue     ← 可复用的单个属性输入框
├─ stores/
│  └─ designer.ts           ← Pinia：当前选中控件、撤销栈
├─ App.vue
└─ main.ts
```

---

### 4️⃣ 改动示例（WidgetBox.vue 片段）
```vue
<template>
  <aside class="widget-box">
    <SearchBox v-model="keyword" />
    <Panel
      v-for="group in filteredGroups"
      :key="group.name"
      :title="group.name"
      :items="group.items"
      @dragstart="onDragStart"
    />
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDesignerStore } from '@/stores/designer'

const store = useDesignerStore()
const keyword = ref('')

const filteredGroups = computed(() =>
  store.widgetGroups.filter(g =>
    g.name.includes(keyword.value) ||
    g.items.some(i => i.tag.includes(keyword.value))
  )
)

function onDragStart(item) {
  store.setDraggingTemplate(item)
}
</script>

<style scoped>
/* 把原 WidgetBox.css 贴进来即可 */
</style>
```

---

### 5️⃣ 迁移步骤（当天可完成）
1. `npm create vue@latest html-designer` → 选 TS + Pinia + Tailwind  
2. 把现有 CSS 贴进 `<style scoped>`  
3. 用 `v-for` 渲染折叠面板、`v-model` 绑定属性值  
4. 把纯画布代码放进 `CanvasRenderer.vue`，用 `defineExpose` 给父组件调用  
5. 建 GitHub Pages 分支 → `npm run build` → `dist` 推上去

---

### 6️⃣ 收益
| 原方案（jQuery/原生） | Vue 3 后 |
|---|---|
| 手动 DOM 操作 200+ 行 | 20 行响应式 |
| 全局变量耦合 | Pinia 单例状态 |
| 新增面板需改 3 个文件 | 新增 1 个组件文件 |
| 无热更新 | Vite 毫秒级 HMR |

---

一句话总结  
**“除了画布，其余全部 Vue 3 化”**，迁移后代码量减半、维护成本骤降。



