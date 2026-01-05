<template>
  <aside class="widget-box" ref="root">
    <div class="widget-box-search-box">
      <input type="text" id="search-input" placeholder="搜索HTML元素">
      <button id="search-button">搜索</button>
    </div>

    <div class="panel">
      <div class="header">内容分区元素<span class="arrow">▼</span></div>
      <div class="widget-box-content">
        <div class="content-partition-element">
          <p>address</p>
          <p>article</p>
          <p>aside</p>
          <p>footer</p>
          <p>header</p>
          <p>h1~6</p>
          <p>main</p>
          <p>nav</p>
          <p>section</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const root = ref(null)

function toggleSection(header) {
  const content = header.nextElementSibling
  const arrow = header.querySelector('.arrow')
  if (!content) return
  const isOpen = content.classList.toggle('show')
  arrow.textContent = isOpen ? '▲' : '▼'
}

onMounted(() => {
  const el = root.value
  el.querySelectorAll('.panel .header').forEach(h => h.addEventListener('click', () => toggleSection(h)))
  el.querySelectorAll('.widget-box-content p').forEach(p => {
    p.draggable = true
    p.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', p.textContent.trim())
      e.dataTransfer.effectAllowed = 'copy'
    })
  })
  const designArea = document.querySelector('.center')
  if (designArea) {
    designArea.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy' })
    designArea.addEventListener('drop', e => {
      e.preventDefault()
      const tag = e.dataTransfer.getData('text/plain')
      if (!tag) return
      const node = document.createElement(tag)
      node.textContent = `<${tag}> 拖拽生成`
      node.style.border = '1px dashed #999'
      node.style.padding = '4px'
      node.style.margin = '4px'
      designArea.appendChild(node)
    })
  }
})
</script>

<style scoped></style>
