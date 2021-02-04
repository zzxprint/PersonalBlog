<template>
  <div class="side">
  </div>
</template>

<script>
export default {
  name: 'layout-side'
}
</script>

<style lang="scss" scoped>
.side{
  width: 300px;
  height: 800px;
  min-width: 200px;
}
@media (max-width: 768px) {
  .side {
    display: none;
  }
}
</style>
