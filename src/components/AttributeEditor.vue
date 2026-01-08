<template>
  <aside class="AttributeEditor" ref="root">
    <div class="AttributeEditor-search-box">
      <input type="text" id="search-input" placeholder="搜索HTML元素">
      <button id="search-button">搜索</button>
    </div>

    <div class="panel">
      <div class="header">动画属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="animation">animation</div>
        <div id="animation-duration">animation-duration</div>
        <div id="animation-name">animation-name</div>
      </div>
    </div>

    <div class="panel">
      <div class="header">颜色属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="color">color</div>
        <div id="opacity">opacity</div>
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

function filterProps(rootEl, keyword) {
  const kw = keyword.toLowerCase()
  rootEl.querySelectorAll('.panel').forEach(panel => {
    let anyMatch = false
    panel.querySelectorAll('.AttributeEditor-content div').forEach(div => {
      const attr = div.id || div.textContent.trim()
      const match = !kw || attr.toLowerCase().includes(kw)
      div.style.display = match ? '' : 'none'
      if (match) anyMatch = true
      const txt = div.textContent
      div.innerHTML = !kw ? txt : txt.replace(new RegExp(`(${kw})`, 'gi'), '<mark>$1</mark>')
    })
    const header = panel.querySelector('.header')
    const content = panel.querySelector('.AttributeEditor-content')
    if (kw) {
      if (anyMatch) {
        content.classList.add('show')
        header.querySelector('.arrow').textContent = '▲'
      } else {
        content.classList.remove('show')
        header.querySelector('.arrow').textContent = '▼'
      }
    }
  })
}

onMounted(() => {
  const el = root.value
  el.querySelectorAll('.panel > .header').forEach(h => h.addEventListener('click', () => toggleSection(h)))
  const searchInput = el.querySelector('.AttributeEditor-search-box input')
  const searchBtn = el.querySelector('.AttributeEditor-search-box button')
  const runFilter = () => filterProps(el, searchInput.value.trim())
  searchBtn?.addEventListener('click', runFilter)
  searchInput?.addEventListener('input', runFilter)

  const globalState = window.designerState || (window.designerState = {})
  el.querySelectorAll('.AttributeEditor-content div[id]').forEach(div => {
    const attrName = div.id
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = div.textContent || '请输入值'
    input.style.width = '100%'
    input.value = globalState[attrName] || ''
    input.addEventListener('input', () => { globalState[attrName] = input.value })
    div.replaceChildren(div.textContent)
    div.appendChild(input)
  })
})
</script>

<style scoped></style>
