<script setup>
import { convertDDLToEntity } from '@/api/entityForge'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { ref } from 'vue'

const activeEditor = ref(null)

const ddlInput = ref('')
const entityCode = ref('')

const handleForge = async () => {
  console.log('forge!')

  entityCode.value = await convertDDLToEntity(ddlInput.value)
}
</script>
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

      <section class="main-contents">
        <!-- SQL Editor -->
        <div class="editor-section">
          <div class="editor-toolbar">
            <span class="editor-title" :class="{ active: activeEditor === 'sql' }">SQL</span>
            <button class="copy-button cursor-pointer" @click.stop="copyToClipboard">📋</button>
          </div>

          <div class="editor-container sql-editor" @click="activeEditor = 'sql'">
            <MonacoEditor
              v-model="ddlInput"
              language="sql"
              placeholder="Forge your queries here..."
            />
          </div>
        </div>

        <!-- Convert Button -->
        <div class="between-editor">
          <button class="convert-button" @click.stop="handleForge">Forge It!</button>
        </div>

        <!-- Java Code Editor -->
        <div class="editor-section">
          <div class="editor-toolbar">
            <span class="editor-title" :class="{ active: activeEditor === 'java' }">JAVA</span>
            <button class="copy-button cursor-pointer" @click.stop="copyToClipboard">📋</button>
          </div>
          <div class="editor-container java-editor" @click="activeEditor = 'java'">
            <MonacoEditor
              v-model="entityCode"
              language="java"
              :read-only="true"
              placeholder="Generated Entity Code will be Here..."
            />
          </div>
        </div>
      </section>
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
  display: flex;
  height: 100%;
  overflow-y: auto;
  gap: 1rem;
}

.editor-section {
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 6;
}
.between-editor {
  flex: 3;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #fff;
}

.editor-toolbar .editor-title {
  position: relative;
  font-family: 'Jetbrains Mono';
  font-weight: bold;
}

.editor-toolbar .editor-title::after {
  content: '';
  position: absolute;
  bottom: -0.2rem;
  left: 0;
  background-color: #ff8c00;
  border-radius: 0.5rem;
  height: 0.1rem;
  width: 0%;
  transition: width 0.1s ease-in-out;
}

.editor-toolbar .editor-title.active::after {
  width: 100%;
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

.editor-container {
  height: 100%;
}

.convert-button {
  display: flex;
  justify-self: center;
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
