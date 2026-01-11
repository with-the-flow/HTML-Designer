<template>
  <div ref="root">
    <!-- 1. 顶部菜单栏 -->
    <nav class="menu-container">
      <ul class="html-menu">
        <!-- 文件菜单 -->
        <li>
          <a href="#" id="fileMenu">文件(F)</a>
          <ul class="submenu fileMenu">
            <li><a href="#" id="newFileMenu">新建(N) <span class="shortcut">Ctrl+N</span></a></li>
            <li><a href="#" id="openFileMenu">打开(O) <span class="shortcut">Ctrl+O</span></a></li>
            <li><a href="#" id="recentFileMenu">最近的窗体(R)</a></li>
            <li class="divider"></li>
            <li><a href="#" id="saveFileMenu">保存(S) <span class="shortcut">Ctrl+S</span></a></li>
            <li><a href="#" id="saveAsFileMenu">另存为(A) <span class="shortcut">Ctrl+Shift+S</span></a></li>
            <li><a href="#" id="saveAllFileMenu">保存全部(L)</a></li>
            <li><a href="#" id="saveAsTemplateFileMenu">另存为模板(T)</a></li>
            <li class="divider"></li>
            <li><a href="#" id="printFileMenu">打印(P) <span class="shortcut">Ctrl+P</span></a></li>
            <li><a href="#" id="saveImageFileMenu">保存图像(I)</a></li>
            <li class="divider"></li>
            <li><a href="#" id="closeFileMenu">关闭(C) <span class="shortcut">Ctrl+W</span></a></li>
            <li><a href="#" id="exitFileMenu">退出(Q) <span class="shortcut">Ctrl+Q</span></a></li>
          </ul>
        </li>
              
        <!-- 编辑菜单 -->
        <li>
          <a href="#" id="editMenu">编辑(E)</a>
          <ul class="submenu editMenu">
            <li><a href="#" id="undoMenu">撤销(Z) <span class="shortcut">Ctrl+Z</span></a></li>
            <li><a href="#" id="redoMenu">恢复(Y) <span class="shortcut">Ctrl+Y</span></a></li>
            <li class="divider"></li>
            <li><a href="#" id="cutMenu">剪切(I) <span class="shortcut">Ctrl+X</span></a></li>
            <li><a href="#" id="copyMenu">复制(C) <span class="shortcut">Ctrl+C</span></a></li>
            <li><a href="#" id="pasteMenu">粘贴(V) <span class="shortcut">Ctrl+V</span></a></li>
            <li><a href="#" id="deleteMenu">删除(D) <span class="shortcut">Del</span></a></li>
            <li><a href="#" id="selectAllMenu">选择全部(A) <span class="shortcut">Ctrl+A</span></a></li>
            <li class="divider"></li>
            <li><a href="#" id="sendBackMenu">放到后面(B) <span class="shortcut">Ctrl+B</span></a></li>
            <li><a href="#" id="bringForwardMenu">放到前面(E) <span class="shortcut">Ctrl+E</span></a></li>
            <li class="divider"></li>
            <li><a href="#" id="editWidgetMenu">编辑窗口部件 <span class="shortcut">F3</span></a></li>
            <li><a href="#" id="editSignalSlotMenu">编辑信号/槽 <span class="shortcut">F4</span></a></li>
            <li><a href="#" id="editPartnerMenu">编辑伙伴</a></li>
            <li class="divider"></li>
            <li><a href="#" id="editTabOrderMenu">编辑 Tab 顺序</a></li>
          </ul>
        </li>
              
        <!-- 视图菜单 -->
        <li>
          <a href="#" id="viewMenu">视图(V)</a>
          <ul class="submenu viewMenu">
            <li><a href="#" id="widgetBoxMenu">Widget Box</a></li>
            <li><a href="#" id="objectViewerMenu">对象查看器</a></li>
            <li><a href="#" id="propertyEditorMenu">属性编辑器 <span class="shortcut">Ctrl+I</span></a></li>
            <li><a href="#" id="resourceBrowserMenu">资源浏览器</a></li>
            <li><a href="#" id="actionEditorMenu">动作编辑器</a></li>
            <li><a href="#" id="signalSlotEditorMenu">信号/传输编辑器</a></li>
            <li class="divider"></li>
            <li><a href="#" id="toolbarMenu">工具栏</a></li>
            <li>
              <a href="#" id="toolsMenu">工具</a>
              <ul class="submenu toolsSubMenu">
                <li><a href="#" id="fileToolsMenu">文件</a></li>
                <li><a href="#" id="formToolsMenu">窗体</a></li>
                <li><a href="#" id="editToolsMenu">编辑</a></li>
              </ul>
            </li>
            <li><a href="#" id="configureToolbarMenu">配置工具栏...</a></li>
          </ul>
        </li>
              
        <!-- 窗体菜单 -->
        <li>
          <a href="#" id="formMenu">窗体(O)</a>
          <ul class="submenu formMenu">
            <li><a href="#" id="horizontalLayoutMenu">水平布局(L) <span class="shortcut">Ctrl+1</span></a></li>
            <li><a href="#" id="verticalLayoutMenu">垂直布局(U) <span class="shortcut">Ctrl+2</span></a></li>
            <li><a href="#" id="splitterHorizontalMenu">使用分裂器水平布局(D) <span class="shortcut">Ctrl+3</span></a></li>
            <li><a href="#" id="splitterVerticalMenu">使用分裂器垂直布局(L) <span class="shortcut">Ctrl+4</span></a></li>
            <li><a href="#" id="gridLayoutMenu">栅格布局(G) <span class="shortcut">Ctrl+5</span></a></li>
            <li><a href="#" id="formLayoutMenu">在窗体布局中布局(E) <span class="shortcut">Ctrl+6</span></a></li>
            <li><a href="#" id="breakLayoutMenu">打破布局(B) <span class="shortcut">Ctrl+0</span></a></li>
            <li><a href="#" id="resizeMenu">调整大小(S) <span class="shortcut">Ctrl+J</span></a></li>
            <li><a href="#" id="simpleGridMenu">简易网格布局(M)</a></li>
            <li class="divider"></li>
            <li><a href="#" id="previewInMenu">预览于</a></li>
            <li><a href="#" id="previewMenu">预览(D)... <span class="shortcut">Ctrl+R</span></a></li>
            <li class="divider"></li>
            <li><a href="#" id="formSettingsMenu">窗体设定(S)...</a></li>
          </ul>
        </li>
              
        <!-- 设置菜单 -->
        <li>
          <a href="#" id="settingsMenu">设置(S)</a>
          <ul class="submenu settingsMenu">
            <li><a href="#" id="propertiesMenu">属性...</a></li>
            <li><a href="#" id="additionalFontsMenu">附加字体...</a></li>
          </ul>
        </li>
              
        <!-- 帮助菜单 -->
        <li>
          <a href="#" id="helpMenu">帮助(H)</a>
          <ul class="submenu helpMenu">
            <li><a href="#" id="designerHelpMenu">HTML Designer 设计师帮助(出) <span class="shortcut">Ctrl+?</span></a></li>
            <li><a href="#" id="customWidgetHelpMenu">自定义窗口部件帮助 <span class="shortcut">F1</span></a></li>
            <li class="divider"></li>
            <li><a href="#" id="aboutPluginsMenu">关于插件</a></li>
            <li><a href="#" id="aboutDesignerMenu">关于 HTML Designer 设计师</a></li>
            <li><a href="#" id="aboutHtmlDesignerMenu">关于 HTML Designer</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>

  <!-- 2. 三栏主体 -->
  <div class="main-wrapper">

    <WidgetBox @select-widget="onSelectWidget" />

    <!-- 2.2 中间设计区 -->
    <main class="center">
      <span>（拖拽区域 / 实时预览）</span>
    </main>

    <!-- 2.3 右侧 AttributeEditor -->
    <aside class="AttributeEditor">
      <!-- 搜索框 -->
      <div class="AttributeEditor-search-box">
        <input type="text" id="search-input" placeholder="搜索HTML元素">
        <button id="search-button">搜索</button>
      </div>

      <!-- 动画属性(Animation) 等属性组来自原始 index.html （已保留在此处） -->
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

      <!-- 其余大量属性组已包含在原始片段，保留为 HTML 模板的一部分 -->
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WidgetBox from './WidgetBox.vue'

const root = ref(null)
let recentFiles = []
let currentFile = null
let designArea = null
let designDragOverHandler = null
let designDropHandler = null

function addRecentFile(file) {
  recentFiles = [file, ...recentFiles.filter(f => f !== file)].slice(0,5)
  renderRecentFiles()
}

function renderRecentFiles() {
  const container = root.value?.querySelector('.fileMenu')
  if (!container) return
  container.querySelectorAll('.recent-file').forEach(n => n.remove())
  recentFiles.forEach(f => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = '#'
    a.className = 'recent-file'
    a.textContent = f
    a.addEventListener('click', () => openRecentFile(f))
    li.appendChild(a)
    container.insertBefore(li, container.children[1])
  })
}

function openRecentFile(file) {
  currentFile = file
  alert(`打开最近文件：${file}`)
}

function onSelectWidget(tag) {
  alert(`选中小部件：${tag}`)
}

onMounted(() => {
  const el = root.value
  el.querySelectorAll('.html-menu li').forEach(li => {
    li.addEventListener('mouseenter', () => {
      const sub = li.querySelector(':scope > .submenu')
      if (sub) sub.style.display = 'block'
    })
    li.addEventListener('mouseleave', () => {
      const sub = li.querySelector(':scope > .submenu')
      if (sub) sub.style.display = 'none'
    })
    li.addEventListener('click', e => {
      const sub = li.querySelector(':scope > .submenu')
      if (!sub) return
      const isOpen = sub.style.display === 'block'
      li.parentNode.querySelectorAll(':scope > li > .submenu').forEach(u => u.style.display = 'none')
      sub.style.display = isOpen ? 'none' : 'block'
      e.stopPropagation()
    })
  })

  function onKeydown(e) {
    if (!e.ctrlKey) return
    switch (e.key.toLowerCase()) {
      case 'n': e.preventDefault(); el.querySelector('#newFileMenu')?.click(); break
      case 'o': e.preventDefault(); el.querySelector('#openFileMenu')?.click(); break
      case 's': e.preventDefault(); el.querySelector('#saveFileMenu')?.click(); break
      case 'w': e.preventDefault(); el.querySelector('#closeFileMenu')?.click(); break
      case 'q': e.preventDefault(); el.querySelector('#exitFileMenu')?.click(); break
    }
  }
  document.addEventListener('keydown', onKeydown)

  el.querySelector('#newFileMenu')?.addEventListener('click', () => {
    alert('新建文件功能待实现')
    window.open('https://with-the-flow.github.io/HTML-Designer/', '_blank')
  })

  el.querySelector('#openFileMenu')?.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.html,.htm'
    input.onchange = e => {
      const file = e.target.files[0]
      if (!file) return
      currentFile = file.name
      addRecentFile(currentFile)
      const reader = new FileReader()
      reader.onload = function(evt) {
        const blob = new Blob([evt.target.result], {type:'text/html'})
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 10000)
      }
      reader.readAsText(file)
    }
    input.click()
  })

  // 中间设计区拖放接收
  designArea = document.querySelector('.center')
  if (designArea) {
    designDragOverHandler = e => {
      e.preventDefault()
      try { e.dataTransfer.dropEffect = 'copy' } catch (_) {}
    }
    designDropHandler = e => {
      e.preventDefault()
      const tag = e.dataTransfer.getData('text/plain')
      if (!tag) return
      alert(`放下小部件：${tag}`)
    }
    designArea.addEventListener('dragover', designDragOverHandler)
    designArea.addEventListener('drop', designDropHandler)
  }

  el.querySelector('#saveFileMenu')?.addEventListener('click', () => {
    if (!currentFile) return alert('请先打开或新建文件！')
    const center = document.querySelector('.center')
    if (center) {
      const blob = new Blob([center.innerHTML], {type:'text/html'})
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = currentFile
      a.click()
      URL.revokeObjectURL(a.href)
      alert(`文件已保存：${currentFile}`)
    }
  })

  el.querySelector('#closeFileMenu')?.addEventListener('click', () => {
    if (!currentFile) return alert('当前没有打开的文件！')
    if (confirm('确定要关闭当前文件吗？')) {
      currentFile = null
      const center = document.querySelector('.center')
      if (center) center.innerHTML = '<span style="color:#999;">（拖拽区域 / 实时预览）</span>'
      alert('文件已关闭')
    }
  })

  el.querySelector('#exitFileMenu')?.addEventListener('click', () => {
    if (confirm('确定要退出程序吗？')) window.close()
  })

  function docClick() { el.querySelectorAll('.submenu').forEach(u => u.style.display = 'none') }
  document.addEventListener('click', docClick)

  onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('click', docClick)
    if (designArea) {
      designArea.removeEventListener('dragover', designDragOverHandler)
      designArea.removeEventListener('drop', designDropHandler)
    }
  })
})
</script>

<style scoped></style>
