<!-- <template> -->
<template>
	<!-- WidgetBox: search + collapsible panels + item click -->
	<aside class="widget-box">
		<div class="widget-box-search-box">
			<input type="text" v-model="query" placeholder="搜索HTML元素" @keydown.enter.prevent="filterWidgets" />
			<button @click="filterWidgets">搜索</button>
		</div>

		<div v-for="(panel, idx) in panels" :key="panel.name" class="panel">
			<div class="header" @click="togglePanel(idx)">
				<span>{{ panel.name }}</span>
				<span class="arrow">{{ panel.open ? '▲' : '▼' }}</span>
			</div>
			<div :class="['widget-box-content', { show: panel.open }]">
				<div :class="panel.className">
					<p v-for="item in filtered(panel.items)" :key="item" draggable="true" @dragstart="onDragStart($event, item)" @click.stop="selectWidget(item)">{{ item }}</p>
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
	{ name: '内容分区元素', className: 'content-partition-element', open: true, items: ['address','article','aside','footer','header','h1','h2','h3','h4','h5','h6','main','nav','section'] },
	{ name: '文本内容元素', className: 'text-content-element', open: false, items: ['blockquote','dd','div','dl','dt','figcaption','figure','hr','li','menu','ol','p','pre','ul'] },
	{ name: '内联文本语义元素', className: 'inline-text-semantic-element', open: false, items: ['a','abbr','b','bdi','bdo','br','cite','code','data','dfn','em','i','kbd','mark','q','rp','rt','ruby','s','samp','small','span','strong','sub','sup','time','u','var','wbr'] },
	{ name: '图片和多媒体元素', className: 'image-and-multimedia-element', open: false, items: ['area','audio','img','map','track','video'] },
	{ name: '嵌套内容元素', className: 'nested-content-element', open: false, items: ['embed','iframe','object','picture','portal','source'] },
	{ name: 'SVG 和 MathML元素', className: 'svg-and-mathml-element', open: false, items: ['svg','math'] },
	{ name: '脚本元素', className: 'script-element', open: false, items: ['canvas','noscript','script'] },
	{ name: '编辑标识元素', className: 'edit-identifying-element', open: false, items: ['del','ins'] },
	{ name: '表格内容元素', className: 'table-content-element', open: false, items: ['caption','col','colgroup','table','tbody','td','tfoot','th','thead','tr'] },
	{ name: '表单元素', className: 'form-element', open: false, items: ['button','datalist','fieldset','form','input','label','legend','meter','optgroup','option','output','progress','select','textarea'] },
	{ name: '交互元素', className: 'interactive-element', open: false, items: ['details','dialog','summary'] },
	{ name: 'Web组件元素', className: 'web-component-element', open: false, items: ['slot','template'] },
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
	alert(`选中小部件：${item}`)
	console.log('Selected widget:', item)
	emit('select-widget', item)
}

function filterWidgets() {
	const q = (query.value || '').trim().toLowerCase()
	if (!q) {
		// restore defaults: open first panel, close others
		panels.value.forEach((p, i) => p.open = i === 0)
		return
	}
	panels.value.forEach(p => {
		const any = p.items.some(it => it.toLowerCase().includes(q))
		p.open = any
	})
}

function onDragStart(e, item) {
	try {
		e.dataTransfer.setData('text/plain', item)
		e.dataTransfer.effectAllowed = 'copy'
		alert(`开始拖拽小部件：${item}`)
	} catch (err) {
		console.warn('dragstart failed', err)
	}
}

function resetFilter() {
	query.value = ''
	filterWidgets()
}

</script>
