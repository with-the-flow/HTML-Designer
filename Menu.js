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
  if (currentFile) return alert('请先关闭当前文件！');
  const win = window.open('about:blank', 'newFile', 'width=800,height=600');
  win?.focus();
  currentFile = 'untitled.html';
});

// 3-2 打开
document.getElementById('openFileMenu').addEventListener('click', () => {
  if (currentFile) return alert('请先关闭当前文件！');
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.html,.htm';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    currentFile = file.name;
    addRecentFile(currentFile);
    alert(`已打开：${currentFile}`);
    // TODO: 真正读取文件内容
  };
  input.click();
});

// 3-3 保存
document.getElementById('saveFileMenu').addEventListener('click', () => {
  if (!currentFile) return alert('请先打开或新建文件！');
  alert(`文件已保存：${currentFile}`);
  // TODO: 实际保存逻辑
});

// 3-4 退出
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