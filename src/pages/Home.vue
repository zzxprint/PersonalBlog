<template>
  <div class="home">
    <BlogBrief class="pad" v-for="(item, index) in 5" :key="index"></BlogBrief>
  </div>
</template>

<script>

import BlogBrief from '@/components/BlogBrief'
export default {
  name: 'Home',
  components: { BlogBrief }
}
</script>

<style lang="scss" scoped>
.pad{
  margin-bottom: 10px;
}
</style>
