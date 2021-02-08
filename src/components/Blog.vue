<template>
  <div class="blog">
    <article class="markdown-body" v-html="markdown"></article>
  </div>
</template>

<script>
import 'github-markdown-css/github-markdown.css'
import markdown from './blog'
export default {
  data () {
    return {
      markdown
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  background: #FFF;
  padding: 20px;
  box-sizing: border-box;
}
</style>
