/* AttributeEditor.js —— 右侧属性面板：折叠 + 搜索 + 属性读写 */

(() => {
  /* ========= 1. 折叠 / 展开 ========= */
  function toggleSection(header) {
    const content = header.nextElementSibling;
    const arrow   = header.querySelector('.arrow');
    if (!content) return;

    const isOpen = content.classList.toggle('show');
    arrow.textContent = isOpen ? '▲' : '▼';
  }

  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelectorAll('.AttributeEditor .panel > .header')
      .forEach(h => h.addEventListener('click', () => toggleSection(h)));
  });

  /* ========= 2. 搜索过滤属性 ========= */
  const searchInput = document.querySelector('.AttributeEditor-search-box input');
  const searchBtn   = document.querySelector('.AttributeEditor-search-box button');

  function filterProps(keyword) {
    const kw = keyword.toLowerCase();
    document.querySelectorAll('.AttributeEditor .panel').forEach(panel => {
      let anyMatch = false;

      // 遍历每个属性项
      panel.querySelectorAll('.AttributeEditor-content div').forEach(div => {
        const attr = div.id || div.textContent.trim(); // 用 id 或文本
        const match = !kw || attr.toLowerCase().includes(kw);

        div.style.display = match ? '' : 'none';
        if (match) anyMatch = true;

        // 高亮关键字（简单版）
        const txt = div.textContent;
        div.innerHTML = !kw
          ? txt
          : txt.replace(new RegExp(`(${kw})`, 'gi'), '<mark>$1</mark>');
      });

      // 自动展开/收起整块
      const header  = panel.querySelector('header');
      const content = panel.querySelector('.AttributeEditor-content');
      if (kw) {
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
    const runFilter = () => filterProps(searchInput.value.trim());
    searchBtn?.addEventListener('click', runFilter);
    searchInput.addEventListener('input', runFilter); // 实时过滤
  }

  /* ========= 3. 属性值读写（全局钩子） ========= */
  // 后续可替换为 Vue / Pinia 的响应式变量
  const globalState = window.designerState || (window.designerState = {});

  // 为每个属性 div 生成输入框 + 绑定事件
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.AttributeEditor-content div[id]').forEach(div => {
      const attrName = div.id;
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = div.textContent || '请输入值';
      input.style.width = '100%';
      input.style.boxSizing = 'border-box';
      input.style.marginTop = '2px';
      input.style.padding = '2px 4px';
      input.style.fontSize = '12px';

      // 初始值
      input.value = globalState[attrName] || '';

      // 双向绑定
      input.addEventListener('input', () => {
        globalState[attrName] = input.value;
        console.log(`[designerState] ${attrName}: ${input.value}`);
      });

      div.replaceChildren(div.textContent); // 先清空高亮
      div.appendChild(input);
    });
  });
})();