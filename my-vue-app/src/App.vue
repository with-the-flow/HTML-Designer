<template>
  <div class="app-root">
    <Menu />
    <div class="main-wrapper">
      <WidgetBox />
      <main class="center"><span>（拖拽区域 / 实时预览）</span></main>
      <AttributeEditor />
    </div>
  </div>
</template>

<script setup>
import Menu from './components/Menu.vue'
import WidgetBox from './components/WidgetBox.vue'
import AttributeEditor from './components/AttributeEditor.vue'
</script>

<style>
html,body,#app { height: 100%; margin: 0; }
.app-root { height: 100vh; display:flex; flex-direction:column; }
.main-wrapper { flex:1; display:flex; min-height:0 }
.center { flex:1; background:#fafafa; display:flex; align-items:center; justify-content:center; color:#999 }
</style>
