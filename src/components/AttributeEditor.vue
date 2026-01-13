<template>
  <!-- 2.3 右侧 AttributeEditor -->
  <aside class="AttributeEditor" ref="root">
    <!-- 搜索框 -->
    <div class="AttributeEditor-search-box">
      <input type="text" id="search-input" placeholder="搜索HTML元素">
      <button id="search-button">搜索</button>
    </div>

    <!-- 动画属性(Animation) -->
    <div class="panel">
      <div class="header">动画属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="animation">animation</div>
        <div id="animation-delay">animation-delay</div>
        <div id="animation-direction">animation-direction</div>
        <div id="animation-duration">animation-duration</div>
        <div id="animation-fill-mode">animation-fill-mode</div>
        <div id="animation-iteration-count">animation-iteration-count</div>
        <div id="animation-name">animation-name</div>
        <div id="animation-play-state">animation-play-state</div>
        <div id="animation-timing-function">animation-timing-function</div>
      </div>
    </div>

    <!-- 背景属性(Background) -->
    <div class="panel">
      <div class="header">背景属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="background">background</div>
        <div id="background-attachment">background-attachment</div>
        <div id="background-clip">background-clip</div>
        <div id="background-color">background-color</div>
        <div id="background-image">background-image</div>
        <div id="background-origin">background-origin</div>
        <div id="background-position">background-position</div>
        <div id="background-repeat">background-repeat</div>
        <div id="background-size">background-size</div>
      </div>
    </div>

    <!-- 边框属性(Border) -->
    <div class="panel">
      <div class="header">边框属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="border">border</div>
        <div id="border-bottom">border-bottom</div>
        <div id="border-bottom-color">border-bottom-color</div>
        <div id="border-bottom-left-radius">border-bottom-left-radius</div>
        <div id="border-bottom-right-radius">border-bottom-right-radius</div>
        <div id="border-bottom-style">border-bottom-style</div>
        <div id="border-bottom-width">border-bottom-width</div>
        <div id="border-color">border-color</div>
        <div id="border-image">border-image</div>
        <div id="border-image-outset">border-image-outset</div>
        <div id="border-image-repeat">border-image-repeat</div>
        <div id="border-image-slice">border-image-slice</div>
        <div id="border-image-source">border-image-source</div>
        <div id="border-image-width">border-image-width</div>
        <div id="border-left">border-left</div>
        <div id="border-left-color">border-left-color</div>
        <div id="border-left-style">border-left-style</div>
        <div id="border-left-width">border-left-width</div>
        <div id="border-radius">border-radius</div>
        <div id="border-right">border-right</div>
        <div id="border-right-color">border-right-color</div>
        <div id="border-right-style">border-right-style</div>
        <div id="border-right-width">border-right-width</div>
        <div id="border-style">border-style</div>
        <div id="border-top">border-top</div>
        <div id="border-top-color">border-top-color</div>
        <div id="border-top-left-radius">border-top-left-radius</div>
        <div id="border-top-right-radius">border-top-right-radius</div>
        <div id="border-top-style">border-top-style</div>
        <div id="border-top-width">border-top-width</div>
        <div id="border-width">border-width</div>
      </div>
    </div>

    <!-- 颜色属性(Color) -->
    <div class="panel">
      <div class="header">颜色属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="color">color</div>
        <div id="opacity">opacity</div>
      </div>
    </div>

    <!-- 尺寸属性(Size) -->
    <div class="panel">
      <div class="header">尺寸属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="height">height</div>
        <div id="max-height">max-height</div>
        <div id="max-width">max-width</div>
        <div id="min-height">min-height</div>
        <div id="min-width">min-width</div>
        <div id="width">width</div>
      </div>
    </div>

    <!-- 内容属性(Content) -->
    <div class="panel">
      <div class="header">内容属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="content">content</div>
        <div id="quotes">quotes</div>
        <div id="counter-reset">counter-reset</div>
        <div id="counter-increment">counter-increment</div>
      </div>
    </div>

    <!-- 弹性Flex盒子布局(Flex) -->
    <div class="panel">
      <div class="header">弹性盒子布局<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="align-content">align-content</div>
        <div id="align-items">align-items</div>
        <div id="align-self">align-self</div>
        <div id="flex">flex</div>
        <div id="flex-basis">flex-basis</div>
        <div id="flex-direction">flex-direction</div>
        <div id="flex-flow">flex-flow</div>
        <div id="flex-grow">flex-grow</div>
        <div id="flex-shrink">flex-shrink</div>
        <div id="flex-wrap">flex-wrap</div>
        <div id="justify-content">justify-content</div>
        <div id="order">order</div>
      </div>
    </div>

    <!-- 字体属性(Font) -->
    <div class="panel">
      <div class="header">字体属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="font">font</div>
        <div id="font-family">font-family</div>
        <div id="font-size">font-size</div>
        <div id="font-size-adjust">font-size-adjust</div>
        <div id="font-stretch">font-stretch</div>
        <div id="font-style">font-style</div>
        <div id="font-variant">font-variant</div>
        <div id="font-weight">font-weight</div>
      </div>
    </div>

    <!-- 列表项属性(Lists) -->
    <div class="panel">
      <div class="header">列表项属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="list-style">list-style</div>
        <div id="list-style-image">list-style-image</div>
        <div id="list-style-position">list-style-position</div>
        <div id="list-style-type">list-style-type</div>
      </div>
    </div>

    <!-- 边距属性(Margin) -->
    <div class="panel">
      <div class="header">间距属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="margin">margin</div>
        <div id="margin-bottom">margin-bottom</div>
        <div id="margin-left">margin-left</div>
        <div id="margin-right">margin-right</div>
        <div id="margin-top">margin-top</div>
      </div>
    </div>

    <!-- 多列布局属性(Column) -->
    <div class="panel">
      <div class="header">多列布局属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="column-count">column-count</div>
        <div id="column-fill">column-fill</div>
        <div id="column-gap">column-gap</div>
        <div id="column-rule">column-rule</div>
        <div id="column-rule-color">column-rule-color</div>
        <div id="column-rule-style">column-rule-style</div>
        <div id="column-rule-width">column-rule-width</div>
        <div id="column-span">column-span</div>
        <div id="column-width">column-width</div>
        <div id="columns">columns</div>
      </div>
    </div>

    <!-- 轮廓属性(Outline) -->
    <div class="panel">
      <div class="header">轮廓属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="outline">outline</div>
        <div id="outline-color">outline-color</div>
        <div id="outline-offset">outline-offset</div>
        <div id="outline-style">outline-style</div>
        <div id="outline-width">outline-width</div>
      </div>
    </div>

    <!-- 填充属性(Padding) -->
    <div class="panel">
      <div class="header">填充属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="padding">padding</div>
        <div id="padding-bottom">padding-bottom</div>
        <div id="padding-left">padding-left</div>
        <div id="padding-right">padding-right</div>
        <div id="padding-top">padding-top</div>
      </div>
    </div>

    <!-- 打印属性(Print) -->
    <div class="panel">
      <div class="header">打印属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="page-break-after"></div>
        <div id="page-break-before"></div>
        <div id="page-break-inside"></div>
      </div>
    </div>

    <!-- 表属性(Table) -->
    <div class="panel">
      <div class="header">表属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="border-collapse">border-collapse</div>
        <div id="border-spacing">border-spacing</div>
        <div id="caption-side">caption-side</div>
        <div id="empty-cells">empty-cells</div>
        <div id="table-layout">table-layout</div>
      </div>
    </div>

    <!-- 文字属性(Text) -->
    <div class="panel">
      <div class="header">文字属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="direction">direction</div>
        <div id="tab-size">tab-size</div>
        <div id="text-align">text-align</div>
        <div id="text-align-last">text-align-last</div>
        <div id="text-decoration">text-decoration</div>
        <div id="text-decoration-color">text-decoration-color</div>
        <div id="text-decoration-line">text-decoration-line</div>
        <div id="text-decoration-style">text-decoration-style</div>
        <div id="text-indent">text-indent</div>
        <div id="text-justify">text-justify</div>
        <div id="text-overflow">text-overflow</div>
        <div id="text-shadow">text-shadow</div>
        <div id="text-transform">text-transform</div>
        <div id="line-height">line-height</div>
        <div id="vertical-align">vertical-align</div>
        <div id="letter-spacing">letter-spacing</div>
        <div id="word-spacing">word-spacing</div>
        <div id="white-space">white-space</div>
        <div id="word-break">word-break</div>
        <div id="word-wrap">word-wrap</div>
      </div>
    </div>

    <!-- 转换属性(Transform) -->
    <div class="panel">
      <div class="header">转换属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="backface-visibility">backface-visibility</div>
        <div id="perspective">perspective</div>
        <div id="perspective-origin">perspective-origin</div>
        <div id="transform">transform</div>
        <div id="transform-origin">transform-origin</div>
        <div id="transform-style">transform-style</div>
      </div>
    </div>

    <!-- 过渡属性(Transition) -->
    <div class="panel">
      <div class="header">过渡属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="transition">transition</div>
        <div id="transition-delay">transition-delay</div>
        <div id="transition-duration">transition-duration</div>
        <div id="transition-property">transition-property</div>
        <div id="transition-timing-function">transition-timing-function</div>
      </div>
    </div>

    <!-- 视觉格式属性(Visual Formatting) -->
    <div class="panel">
      <div class="header">视觉格式属性<span class="arrow">▼</span></div>
      <div class="AttributeEditor-content">
        <div id="display">display</div>
        <div id="position">position</div>
        <div id="top">top</div>
        <div id="right">right</div>
        <div id="bottom">bottom</div>
        <div id="left">left</div>
        <div id="float">float</div>
        <div id="clear">clear</div>
        <div id="z-index">z-index</div>
        <div id="overflow">overflow</div>
        <div id="overflow-x">overflow-x</div>
        <div id="overflow-y">overflow-y</div>
        <div id="clip">clip</div>
        <div id="visibility">visibility</div>
        <div id="cursor">cursor</div>
        <div id="box-shadow">box-shadow</div>
        <div id="box-sizing">box-sizing</div>
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

  // 默认展开所有面板并将箭头设为“▲”
  el.querySelectorAll('.panel').forEach(panel => {
    const header = panel.querySelector('.header')
    const content = panel.querySelector('.AttributeEditor-content')
    const arrow = header.querySelector('.arrow')
    if (arrow) arrow.textContent = '▲'
    if (content) content.classList.add('show')
  })
})
</script>

<style scoped>
.AttributeEditor {
  max-height: 100vh;
  overflow: auto;
}

.AttributeEditor .AttributeEditor-content.show {
  display: block;
}
</style>
