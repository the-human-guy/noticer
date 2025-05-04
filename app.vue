<script setup>
if (typeof window !== 'undefined') {
  window.$log = console.log.bind(console)
  window.$log.warn = console.warn.bind(console)
  window.$log.error = console.error.bind(console)
}
</script>

<template>
  <NuxtPage></NuxtPage>
</template>
