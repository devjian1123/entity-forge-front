<script setup>
import { convertDDLToEntity } from '@/api/entityForge'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { ref } from 'vue'

const ddlInput = ref('')
const convertedEntity = ref('')
const isLoading = ref(false)

const forgingEntity = async () => {
  if (!ddlInput.value.trim()) {
    alert('DDL 문을 입력해주세요.')
    return
  }

  isLoading.value = true
  convertedEntity.value = ''

  try {
    convertedEntity.value = await convertDDLToEntity(ddlInput.value)
  } catch (error) {
    console.error('Conversion failed: ', error)
    convertedEntity.value = error.response?.data?.message || '변환 실패'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Entity Forge</h1>

    <!-- Monaco Editor (SQL 입력) -->
    <div class="editor-container">
      <MonacoEditor v-model="ddlInput" language="sql" />
    </div>

    <button @click="forgingEntity" :disabled="isLoading">
      {{ isLoading ? 'Converting...' : 'Convert' }}
    </button>

    <!-- Monaco Editor (Java 변환 결과) -->
    <div class="editor-container">
      <MonacoEditor v-model="convertedEntity" language="java" />
    </div>
  </div>
</template>

<style scoped></style>
