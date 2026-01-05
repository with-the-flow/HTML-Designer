# HTML Designer — Vue 3 移植

这是将现有静态 HTML/JS/CSS 迁移到 Vue 3 + Vite 的最小示例工程。

快速开始：

```bash
cd "c:\Users\FLD\Desktop\HTML Designer\vue3-app"
npm install
npm run dev
```

说明：
- 源组件：`src/components/Menu.vue`、`WidgetBox.vue`、`AttributeEditor.vue`
- 样式位于 `src/assets/*.css` （直接从原工程复制）。
- 我把原始的 DOM 操作迁移到组件内的 `onMounted`。为了进一步优化，建议把 DOM 操作逐步替换为 Vue 响应式数据与模板绑定。
