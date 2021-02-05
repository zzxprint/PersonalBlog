<template>
  <div class="logo">
    <img class="logo-img" src="@/assets/logo.png">
    <div class="name">zzxprint</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.logo{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  background: #FFF;
  .logo-img{
    height: 180px;
    width: 180px;
  }
  .name{
    padding: 20px 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}
</style>
