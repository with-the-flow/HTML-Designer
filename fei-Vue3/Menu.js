/* Menu.js —— 零依赖菜单交互、快捷键、最近文件 */

let currentFile   = null;   // 当前打开的文件
let recentFiles   = [];     // 最近文件列表（最多 5 条）

/* ========= 1. 多级菜单 hover/click 兼容 ========= */
document.querySelectorAll('.html-menu li').forEach(li => {
  // 鼠标悬停自动展开
  li.addEventListener('mouseenter', () => {
    const sub = li.querySelector(':scope > .submenu');
    if (sub) sub.style.display = 'block';
  });
  li.addEventListener('mouseleave', () => {
    const sub = li.querySelector(':scope > .submenu');
    if (sub) sub.style.display = 'none';
  });

  // 移动端点击支持（touch 或 click）
  li.addEventListener('click', e => {
    const sub = li.querySelector(':scope > .submenu');
    if (!sub) return;
    const isOpen = sub.style.display === 'block';
    // 关闭同级其它子菜单
    li.parentNode.querySelectorAll(':scope > li > .submenu').forEach(u => u.style.display = 'none');
    sub.style.display = isOpen ? 'none' : 'block';
    e.stopPropagation();            // 防止冒泡到 document
  });
});

/* ========= 2. 快捷键绑定 ========= */
document.addEventListener('keydown', e => {
  if (!e.ctrlKey) return;
  switch (e.key.toLowerCase()) {
    case 'n': e.preventDefault(); document.getElementById('newFileMenu').click(); break;
    case 'o': e.preventDefault(); document.getElementById('openFileMenu').click(); break;
    case 's': e.preventDefault(); document.getElementById('saveFileMenu').click(); break;
    case 'w': e.preventDefault(); document.getElementById('closeFileMenu').click(); break;
    case 'q': e.preventDefault(); document.getElementById('exitFileMenu').click(); break;
  }
});

/* ========= 3. 菜单功能实现 ========= */
// 3-1 新建
document.getElementById('newFileMenu').addEventListener('click', () => {
  alert('新建文件功能待实现');
  // 在新标签页打开你的 GitHub Pages
  window.open("https://with-the-flow.github.io/HTML-Designer/", "_blank");
});

// 3-2 打开
document.getElementById('openFileMenu').addEventListener('click', () => {
  // 创建文件选择框
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.html,.htm';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    currentFile = file.name;
    addRecentFile(currentFile);
    // 读取文件内容并在新标签页打开
    const reader = new FileReader();
    reader.onload = function(evt) {
      const blob = new Blob([evt.target.result], {type: 'text/html'});
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      // 可选：稍后释放 URL
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    };
    reader.readAsText(file);
  };
  input.click();
});

// 3-3 保存
document.getElementById('saveFileMenu').addEventListener('click', () => {
  if (!currentFile) return alert('请先打开或新建文件！');
  // 导出设计区内容为 html 文件
  const center = document.querySelector('.center');
  if (center) {
    const blob = new Blob([center.innerHTML], {type: 'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = currentFile;
    a.click();
    URL.revokeObjectURL(a.href);
    alert(`文件已保存：${currentFile}`);
  }
});

// 3-4 关闭
document.getElementById('closeFileMenu')?.addEventListener('click', () => {
  if (!currentFile) return alert('当前没有打开的文件！');
  if (confirm('确定要关闭当前文件吗？')) {
    currentFile = null;
    const center = document.querySelector('.center');
    if (center) center.innerHTML = '<span style="color:#999;">（拖拽区域 / 实时预览）</span>';
    alert('文件已关闭');
  }
});

// 3-5 退出
document.getElementById('exitFileMenu').addEventListener('click', () => {
  if (confirm('确定要退出程序吗？')) window.close();
});

/* ========= 4. 最近文件管理 ========= */
function addRecentFile(file) {
  recentFiles = [file, ...recentFiles.filter(f => f !== file)].slice(0, 5);
  renderRecentFiles();
}

function renderRecentFiles() {
  const container = document.querySelector('.fileMenu');
  if (!container) return;
  container.querySelectorAll('.recent-file').forEach(n => n.remove());
  recentFiles.forEach(f => {
    const li = document.createElement('li');
    const a  = document.createElement('a');
    a.href = '#';
    a.className = 'recent-file';
    a.textContent = f;
    a.addEventListener('click', () => openRecentFile(f));
    li.appendChild(a);
    container.insertBefore(li, container.children[1]); // 插在“最近的窗体”下方
  });
}

function openRecentFile(file) {
  currentFile = file;
  alert(`打开最近文件：${file}`);
  // TODO: 真正加载文件内容
}

/* ========= 5. 点击空白自动关闭子菜单（移动端友好） ========= */
document.addEventListener('click', () => {
  document.querySelectorAll('.submenu').forEach(u => u.style.display = 'none');
});