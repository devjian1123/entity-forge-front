<script setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  language: {
    type: String,
    default: 'sql',
  },
  placeholder: {
    type: String,
    default: 'Forge your queries here...',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel()

const editorContainer = ref(null)
let editorInstance = null

onMounted(() => {
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: modelValue.value || '',
    fontSize: 15,
    fontFamily: 'Jetbrains Mono',
    language: props.language,
    theme: 'vs-dark',
    minimap: { enabled: false },
    automaticLayout: true,
    overviewRulerBorder: false,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    wordWrap: 'on',
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
  <div ref="editorContainer" class="monaco-editor"></div>
</template>

<style scoped>
.monaco-editor div {
  font-family: 'JetBrains Mono', monospace !important;
}

.monaco-editor {
  width: 100%;
  height: 100%;
}
</style>
