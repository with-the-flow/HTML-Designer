<!-- <template> -->
<template>
	<!-- 2.1 左侧 WidgetBox (moved from Menu.vue) -->
	<aside class="widget-box">
		<!-- 搜索框 -->
		<div class="widget-box-search-box">
			<input type="text" id="search-input" placeholder="搜索HTML元素">
			<button id="search-button">搜索</button>
		</div>

		<!-- 1. 内容分区元素 -->
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

		<!-- 2. 文本内容元素 -->
		<div class="panel">
			<div class="header">文本内容元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="text-content-element">
					<p>blockquote</p>
					<p>dd</p>
					<p>div</p>
					<p>dl</p>
					<p>dt</p>
					<p>figcaption</p>
					<p>figure</p>
					<p>hr</p>
					<p>li</p>
					<p>menu</p>
					<p>ol</p>
					<p>p</p>
					<p>pre</p>
					<p>ul</p>
				</div>
			</div>
		</div>

		<!-- 3. 内联文本语义元素 -->
		<div class="panel">
			<div class="header">内联文本语义元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="inline-text-semantic-element">
					<p>a</p>
					<p>abbr</p>
					<p>b</p>
					<p>bdi</p>
					<p>bdo</p>
					<p>br</p>
					<p>cite</p>
					<p>code</p>
					<p>data</p>
					<p>dfn</p>
					<p>em</p>
					<p>i</p>
					<p>kbd</p>
					<p>mark</p>
					<p>q</p>
					<p>rp</p>
					<p>rt</p>
					<p>ruby</p>
					<p>s</p>
					<p>samp</p>
					<p>small</p>
					<p>span</p>
					<p>strong</p>
					<p>sub</p>
					<p>sup</p>
					<p>time</p>
					<p>u</p>
					<p>var</p>
					<p>wbr</p>
				</div>
			</div>
		</div>

		<!-- 4. 图片和多媒体元素 -->
		<div class="panel">
			<div class="header">图片和多媒体元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="image-and-multimedia-element">
					<p>area</p>
					<p>audio</p>
					<p>img</p>
					<p>map</p>
					<p>track</p>
					<p>video</p>
				</div>
			</div>
		</div>

		<!-- 5. 嵌套内容元素 -->
		<div class="panel">
			<div class="header">嵌套内容元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="nested-content-element">
					<p>embed</p>
					<p>iframe</p>
					<p>object</p>
					<p>picture</p>
					<p>portal</p>
					<p>source</p>
				</div>
			</div>
		</div>

		<!-- 6. SVG 和 MathML元素 -->
		<div class="panel">
			<div class="header">SVG 和 MathML元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="svg-and-mathml-element">
					<p>svg</p>
					<p>math</p>
				</div>
			</div>
		</div>

		<!-- 7. 脚本元素 -->
		<div class="panel">
			<div class="header">脚本元素<span class="arrow">▼</span></div>
				<div class="widget-box-content">
					<div class="script-element"><p>canvas</p>
					<p>noscript</p>
					<p>script</p>
				</div>
			</div>
		</div>

		<!-- 8. 编辑标识元素 -->
		<div class="panel">
			<div class="header">编辑标识元素<span class="arrow">▼</span></div>
				<div class="widget-box-content">
					<div class="edit-identifying-element"><p>del</p>
						<p>ins</p>
					</div>
				</div>
		</div>

		<!-- 9. 表格内容元素 -->
		<div class="panel">
			<div class="header">表格内容元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="table-content-element">
					<p>caption</p>
					<p>col</p>
					<p>colgroup</p>
					<p>table</p>
					<p>tbody</p>
					<p>td</p>
					<p>tfoot</p>
					<p>th</p>
					<p>thead</p>
					<p>tr</p>
				</div>
			</div>
		</div>

		<!-- 10. 表单元素 -->
		<div class="panel">
			<div class="header">表单元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="form-element">
					<p>button</p>
					<p>datalist</p>
					<p>fieldset</p>
					<p>form</p>
					<p>input</p>
					<p>label</p>
					<p>legend</p>
					<p>meter</p>
					<p>optgroup</p>
					<p>option</p>
					<p>output</p>
					<p>progress</p>
					<p>select</p>
					<p>textarea</p>
				</div>
			</div>
		</div>

		<!-- 11. 交互元素 -->
		<div class="panel">
			<div class="header">交互元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="interactive-element"><p>details</p>
				<p>dialog</p>
				<p>summary</p>
			</div>
			</div>
		</div>

		<!-- 12. Web组件元素 -->
		<div class="panel">
			<div class="header">Web组件元素<span class="arrow">▼</span></div>
			<div class="widget-box-content">
				<div class="web-component-element">
					<p>slot</p>
					<p>template</p>
				</div>
			</div>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import '../assets/WidgetBox.css'

const emit = defineEmits(['select-widget'])

const query = ref('')
const panels = ref([
	{ name: '基础', open: true, items: ['Button', 'Text', 'Image'] },
	{ name: '表单', open: false, items: ['Input', 'Checkbox', 'Select'] },
])

function togglePanel(i) {
	panels.value[i].open = !panels.value[i].open
}

function filtered(items) {
	if (!query.value) return items
	const q = query.value.toLowerCase()
	return items.filter(it => it.toLowerCase().includes(q))
}

function selectWidget(item) {
	console.log('Selected widget:', item)
	emit('select-widget', item)
}
</script>
