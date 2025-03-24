<script setup>
import { convertDDLToEntity } from '@/api/entityForge'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { ref } from 'vue'

const titleText = ref('ENTITY FORGE'.split(''))
const ddlInput = ref('')
const entityCode = ref('')

const handleForge = async () => {
  console.log('forge!')

  entityCode.value = await convertDDLToEntity(ddlInput.value)
}
</script>
;.
<template>
  <div class="main-layout">
    <!-- 왼쪽 패널 -->
    <aside class="sidebar">
      <h2 class="sidebar-title">Menu</h2>
      <ul class="sidebar-menu">
        <li>Convert DDL</li>
        <li>Settings</li>
        <li>Docs</li>
      </ul>
    </aside>

    <main class="main-container">
      <!-- Forge Title -->
      <header class="header-container">
        <div class="forge-title-container">
          <h1 class="forge-title">J Dot's Entity Forge</h1>
        </div>
      </header>

      <!-- SQL Editor -->
      <div class="main-contents">
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
    </main>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 16rem;
  height: 100%;
  background-color: #131313;
  color: white;
  padding: 1rem;
  overflow-y: auto;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}

.main-contents {
  height: 100%;
  overflow-y: auto;
}

.header-container {
  display: sticky;
  top: 0;
  align-items: center;
  height: 4rem;
  border-bottom: 1px solid #ccc;
}

.forge-title-container {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.7rem 1rem;
}

.forge-title {
  font-size: 1.2rem;
  color: #fff;
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
  width: 100%;
  height: calc(100vh - 8rem - 20rem);
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
