<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <p class="read-the-docs">
      <code>100 razones no son suficientes para expresarte todo lo que siento por ti.</code>
    </p>
  </div>

  
</template>

<style scoped>
.read-the-docs {
  color: #a03434;
  font-size: 2.2em;
  font-weight: 600;
}

</style>
