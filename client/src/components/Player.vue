<template>
  <div class="card">
    <div class="card-body">
      {{player.name}} - {{player.score}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['player']
}
</script>

<style scoped>
  .card-body {
    padding: 5px
  }
</style>
