<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    console.error('AdSense error:', e)
  }
})
</script>

<template>
  <!-- main-ad-banner -->
  <ins
    class="adsbygoogle"
    style="display: block"
    data-ad-client="ca-pub-8169269414088189"
    data-ad-slot="4751403842"
    data-ad-format="auto"
    :data-full-width-responsive="true"
    data-adtest="on"
  ></ins>
</template>

<style scoped></style>
