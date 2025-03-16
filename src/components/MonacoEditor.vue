<script setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  language: {
    type: String,
    default: 'sql',
  },
})

const modelValue = defineModel()

const editorContainer = ref(null)
let editorInstance = null

onMounted(() => {
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: modelValue.value || '',
    language: props.language,
    theme: 'vs-dark',
    minimap: { enabled: true },
    automaticLayout: false,
  })

  // Monaco Editor에서 입력할 때 v-model 값 업데이트
  editorInstance.onDidChangeModelContent(() => {
    modelValue.value = editorInstance.getValue()
  })
})

watch(modelValue, (newValue) => {
  if (editorInstance && newValue !== editorInstance.getValue()) {
    editorInstance.setValue(newValue)
  }
})

onBeforeUnmount(() => {
  editorInstance?.dispose()
})
</script>

<template>
  <div ref="editorContainer" class="editor-container" style="height: 400px; width: 100%"></div>
</template>

<style scoped>
.editor-container div {
  font-family: 'Fira Code';
}
</style>
