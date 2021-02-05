<template>
  <div class="layout">
    <Header></Header>
    <div class="content">
      <Side></Side>
      <Container><router-view/></Container>
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Side from './Side'
import Container from './Container'
export default {
  name: 'layout',
  components: { Header, Side, Container }
}
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: center;
}
</style>
