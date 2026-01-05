/* WidgetBox.js —— 折叠 + 拖拽（原生实现） */

/* ========= 1. 折叠/展开 ========= */
function toggleSection(header) {
  const content = header.nextElementSibling;
  const arrow   = header.querySelector('.arrow');
  if (!content) return;

  const isOpen = content.classList.toggle('show');
  arrow.textContent = isOpen ? '▲' : '▼';
}

/* 为所有 header 绑定点击事件 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.widget-box .panel .header')
          .forEach(h => h.addEventListener('click', () => toggleSection(h)));
});

/* ========= 2. 搜索过滤（可选） ========= */
const searchInput = document.querySelector('.widget-box-search-box input[type="text"]');
const searchBtn   = document.querySelector('.widget-box-search-box button');

function filterWidgets(keyword) {
  document.querySelectorAll('.widget-box .panel').forEach(panel => {
    let anyMatch = false;
    panel.querySelectorAll('.widget-box-content p').forEach(p => {
      const match = !keyword || p.textContent.toLowerCase().includes(keyword.toLowerCase());
      p.style.display = match ? '' : 'none';
      if (match) anyMatch = true;
    });
    // 自动展开/收起整块
    const header = panel.querySelector('.header');
    const content = panel.querySelector('.widget-box-content');
    if (keyword) {
      if (anyMatch) {
        content.classList.add('show');
        header.querySelector('.arrow').textContent = '▲';
      } else {
        content.classList.remove('show');
        header.querySelector('.arrow').textContent = '▼';
      }
    }
  });
}

if (searchInput) {
  searchBtn?.addEventListener('click', () => filterWidgets(searchInput.value.trim()));
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') filterWidgets(searchInput.value.trim());
  });
}

/* ========= 3. 拖拽功能（原生 Drag & Drop API） ========= */
document.addEventListener('DOMContentLoaded', () => {
  // 让左侧所有 <p> 元素可拖拽
  document.querySelectorAll('.widget-box-content p').forEach(el => {
    el.draggable = true;
    el.addEventListener('dragstart', e => {
      // 传递元素标签名（如 "div", "button"）
      e.dataTransfer.setData('text/plain', el.textContent.trim());
      e.dataTransfer.effectAllowed = 'copy';
    });
  });

  // 中间设计区接收拖拽
  const designArea = document.querySelector('.center');
  if (designArea) {
    designArea.addEventListener('dragover', e => {
      e.preventDefault(); // 允许放置
      e.dataTransfer.dropEffect = 'copy';
    });
    designArea.addEventListener('drop', e => {
      e.preventDefault();
      const tag = e.dataTransfer.getData('text/plain');
      if (!tag) return;
      // 简单示例：向设计区插入对应标签
      const node = document.createElement(tag);
      node.textContent = `<${tag}> 拖拽生成`;
      node.style.border = '1px dashed #999';
      node.style.padding = '4px';
      node.style.margin = '4px';
      designArea.appendChild(node);
    });
  }
});