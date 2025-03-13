<script setup>
import { convertDDLToEntity } from '@/api/entityForge'
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
    convertedEntity.value = error.response.data.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Entity Forge</h1>
    <textarea v-model="ddlInput" placeholder="Enter DDL statement here..."></textarea>
    <button @click="forgingEntity" :disabled="isLoading">
      {{ isLoading ? 'Converting...' : 'Convert' }}
    </button>
    <pre v-if="convertedEntity">{{ convertedEntity }}</pre>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
}

textarea {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 15px;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

pre {
  background: #f4f4f4;
  padding: 10px;
  text-align: left;
  white-space: pre-wrap;
}
</style>
