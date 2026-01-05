<template>
  <nav class="menu-container" ref="root">
    <ul class="html-menu">
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
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const root = ref(null)
let recentFiles = []
let currentFile = null

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
  })
})
</script>

<style scoped></style>
