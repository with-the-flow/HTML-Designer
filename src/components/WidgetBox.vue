<!-- <template> -->
<template>
	<div class="widget-box">
		<div class="widget-box-search-box">
			<input type="text" v-model="query" placeholder="搜索组件" />
			<button @click="query = ''">清除</button>
		</div>

		<div v-for="(panel, idx) in panels" :key="panel.name" class="panel">
			<div class="header" @click="togglePanel(idx)">
				<span>{{ panel.name }}</span>
				<span class="arrow" :style="{ transform: panel.open ? 'rotate(90deg)' : 'rotate(0deg)' }">▶</span>
			</div>
			<div class="widget-box-content" :class="{ show: panel.open }">
				<p v-for="item in filtered(panel.items)" :key="item" @click.stop="selectWidget(item)">
					{{ item }}
				</p>
			</div>
		</div>
	</div>
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
