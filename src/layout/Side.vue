<template>
  <div class="side">
    <Logo></Logo>
    <LatelyBlog></LatelyBlog>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import LatelyBlog from '@/components/LatelyBlog'
export default {
  name: 'layout-side',
  components: { Logo, LatelyBlog }
}
</script>

<style lang="scss" scoped>
.side{
  padding: 20px 0 20px 20px;
  width: 300px;
  height: auto;
  min-width: 200px;
  box-sizing: border-box;
  .content{
    height: 500px;
    width: 100%;
    background: #FFF;
  }
}
@media (max-width: 768px) {
  .side {
    display: none;
  }
}
</style>
