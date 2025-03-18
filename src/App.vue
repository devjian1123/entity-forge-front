<script setup>
import { ref } from 'vue'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { convertDDLToEntity } from '@/api/entityForge'

const titleText = ref('ENTITY FORGE'.split(''))
const ddlInput = ref('')
const entityCode = ref('')

const handleForge = async () => {
  console.log('forge!')

  entityCode.value = await convertDDLToEntity(ddlInput.value)
}
</script>

<template>
  <div class="container">
    <!-- Forge Title -->
    <div class="forge-title-container">
      <h1 class="forge-title">
        <span
          v-for="(char, index) in titleText"
          :key="index"
          class="char"
          :class="{ hot: index >= 7 }"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          {{ char }}
          <span class="spark" v-if="Math.random() > 0.8"></span>
        </span>
      </h1>
    </div>

    <!-- SQL Editor -->
    <div class="editor-container">
      <MonacoEditor v-model="ddlInput" language="sql" />
    </div>

    <!-- Convert Button -->
    <button class="convert-button" @click.stop="handleForge">Forge It!</button>

    <!-- Java Code Editor -->
    <div class="editor-container">
      <MonacoEditor v-model="entityCode" language="java" :read-only="true" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.forge-title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  margin-bottom: 2rem;
}

.forge-title {
  display: flex;
  align-items: center;
  font-family: 'Rowdies', sans-serif;
  font-size: 3rem;
  letter-spacing: 0.8rem; /* 타이틀 간격을 좀 더 좁게 */
}

.char {
  display: inline-block;
  animation: forgeGlow 3s infinite alternate ease-in-out;
  position: relative;
}

/* FORGE 부분만 더 부드럽게 변화 */
.char.hot {
  animation:
    forgeGlow 3s infinite alternate ease-in-out,
    melt 2s infinite alternate ease-in-out;
}

.editor-container {
  padding: 5px;
  width: 100%;
  height: calc(100vh - 8rem - 20rem); /* 더 여유롭게 설정 */
  border: 2px solid #4a4a4a; /* 차가운 철 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.editor-container:hover {
  border-color: #ff8c00; /* 마우스를 올렸을 때 주황색으로 변경 */
  box-shadow: 0 6px 12px rgba(255, 140, 0, 0.2); /* 강조된 그림자 효과 */
}

.convert-button {
  padding: 7px 30px;
  font-size: 1.2rem;
  background-color: #ff8c00; /* 주황색 배경 */
  font-family: 'JetBrains Mono', monospace;
  color: #fff;
  border: 2px solid #ff8c00; /* 주황색 테두리 */
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  box-shadow: 0 4px 10px rgba(255, 140, 0, 0.3); /* 부드러운 그림자 */
}

.convert-button:hover {
  background-color: #ff6200; /* 마우스를 올렸을 때 색상 변환 */
  border-color: #ff6200;
  box-shadow: 0 6px 15px rgba(255, 98, 0, 0.5); /* 강조된 그림자 */
}

.convert-button:active {
  transform: scale(0.98); /* 클릭 시 약간 작아지는 효과 */
}

@keyframes forgeGlow {
  0% {
    color: #4a4a4a; /* 차가운 철 */
    text-shadow: 0 0 2px #000;
    transform: scale(1);
  }
  50% {
    color: #ff8c00; /* 조금 더 부드러운 주황색 */
    text-shadow: 0 0 8px #ff8c00;
    transform: scale(1.05) skewX(-1deg);
  }
  100% {
    color: #4a4a4a; /* 다시 차가운 철 */
    text-shadow: 0 0 2px #000;
    transform: scale(1);
  }
}

@keyframes melt {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(1px) scale(1.02);
  }
  100% {
    transform: translateY(2px) scale(1);
  }
}
</style>
