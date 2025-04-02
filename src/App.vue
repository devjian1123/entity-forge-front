<script setup>
import { convertDDLToEntity } from '@/api/entityForge'
import IconGithub from '@/assets/icons/github-mark-white.png'
import IconHamburger from '@/assets/icons/hamburger.svg?component'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { ref } from 'vue'

const isSideBarOpen = ref(false)

const activeEditor = ref(null)

const ddlInput = ref('')
const entityCode = ref('')

const isLoading = ref(false)

// Java Entity 변환
const handleForge = async () => {
  console.log('forge!')

  isLoading.value = true

  entityCode.value = await convertDDLToEntity(ddlInput.value)

  isLoading.value = false
}
</script>
<template>
  <!-- 왼쪽 패널 -->
  <aside class="sidebar" :class="{ open: isSideBarOpen }">
    <header class="sidebar-header">
      <button
        v-show="isSideBarOpen"
        class="close-sidebar-button cursor-pointer"
        @click.stop="isSideBarOpen = false"
      >
        <IconHamburger class="icon-hamburger" />
      </button>
      <h1 class="forge-title">Entity Forge</h1>
    </header>
  </aside>

  <!-- 사이드바 Dimmed -->
  <div v-show="isSideBarOpen" class="sidebar-overlay" @click.stop="isSideBarOpen = false"></div>

  <!-- main layout -->
  <div class="main-layout">
    <main class="main-container">
      <!-- Forge Title -->
      <header class="header-container">
        <div class="forge-title-container">
          <button
            v-show="!isSideBarOpen"
            class="open-sidebar-button cursor-pointer"
            @click.stop="isSideBarOpen = true"
          >
            <IconHamburger class="icon-hamburger" />
          </button>
          <h1 class="forge-title">Entity Forge</h1>
        </div>
      </header>

      <section class="main-contents">
        <!-- SQL Editor -->
        <div class="editor-section">
          <div class="editor-toolbar">
            <span class="editor-title" :class="{ active: activeEditor === 'sql' }">SQL</span>
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
          <button
            class="convert-button cursor-pointer"
            @click.stop="handleForge"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">FORGE IT !</span>
            <span v-else class="spinner"></span>
          </button>
        </div>

        <!-- Java Code Editor -->
        <div class="editor-section">
          <div class="editor-toolbar">
            <span class="editor-title" :class="{ active: activeEditor === 'java' }">JAVA</span>
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
      <footer class="footer-container">
        <div class="footer-icon-list">
          <a href="https://github.com/devjian1123" target="_blank" class="footer-icon-btn">
            <img :src="IconGithub" class="icon-github" alt="github" />
          </a>
        </div>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: center;
  height: 3rem;
  background-color: #1a1a1a;
  text-align: center;
  font-size: 0.9rem;
  color: #888;
}

.footer-icon-list {
  display: flex;
  justify-content: center;
  width: 60%;
  height: 100%;
}

.footer-icon-btn {
  height: 100%;
  padding: 0.6rem;
  cursor: pointer;
}

.icon-github {
  width: 100%;
  height: 100%;
}

.icon-hamburger {
  width: 100%;
  height: 100%;
  fill: #fff;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  vertical-align: middle;
}

.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 17rem;
  height: 100%;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.4);
  background-color: #131313;
  color: white;
  overflow-y: auto;
  padding-left: 1rem;
  z-index: 1000;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 900;
}

.sidebar-header {
  display: flex;
  align-items: center;
  height: 4rem;
  gap: 1rem;
}

.sidebar .button-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-contents {
  display: flex;
  height: 100%;
  overflow-y: auto;
  gap: 1rem;
  padding: 1rem;
}

.editor-section {
  flex: 1 1 0;
  display: flex;
  height: 100%;
  flex-direction: column;
  min-width: 0;
}
.between-editor {
  flex: 0 0 20%;
  display: flex;
  justify-content: center;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  color: #fff;
  height: 3rem;
}

.editor-toolbar .editor-title {
  position: relative;
  font-family: 'Jetbrains Mono';
  font-weight: bold;
  height:;
}

.editor-toolbar .editor-title::after {
  content: '';
  position: absolute;
  bottom: -0.2rem;
  left: 0;
  background-color: #ffb310;
  border-radius: 0.5rem;
  height: 0.15rem;
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
  border-bottom: 1px solid #3a3a3a;
  padding-left: 0.5rem;
}

.forge-title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;
  padding-left: 0.5rem;
}

.open-sidebar-button,
.close-sidebar-button {
  width: 24px;
  height: 24px;
}

.forge-title {
  font-family: 'Unica One', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.7rem;
  color: #b4b4b4;
}

.editor-container {
  height: 100%;
}

.convert-button {
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  width: 12rem;
  height: 4rem;
  background-color: #ff8c00;
  padding: 1rem 1rem;
  font-family: 'Unica One', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  font-style: normal;
  color: #fff;
  text-align: center;
  border: 2px solid #ff8c00;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-top: 2rem;
  box-shadow: 0 4px 10px rgba(255, 140, 0, 0.3);
}

.convert-button:hover {
  background-color: #ff6200;
  border-color: #ff6200;
  box-shadow: 0 6px 15px rgba(255, 98, 0, 0.5);
}

.convert-button:active {
  transform: scale(0.98);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
