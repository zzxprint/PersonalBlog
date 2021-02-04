<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <ul class="navigation">
      <router-link
        class="nav"
        v-for="(item, index) in navList"
        :key="index"
        :to="item.url"
        :class="{ active: item.name===$route.name }">
        <li>{{item.label}}</li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'layout-header',
  data () {
    return {
      navList: [
        { label: '首页', url: '/', name: 'home' },
        { label: '归档', url: '/archive', name: 'archive' },
        { label: '分类', url: '/category', name: 'category' },
        { label: '标签', url: '/tags', name: 'tags' },
        { label: '关于', url: '/about', name: 'about' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: 65px;
  background: #FFF;
  border-bottom: 1px solid #EFEFEF;
  .logo{
    height: 50px;
    width: 50px;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .navigation{
    justify-content: center;
    align-items: center;
    height: 65px;
    width: auto;
    a{
      text-decoration: none;
    }
    .nav{
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 40px;
      height: 65px;
      font-size: 14px;
      color: #666;
      letter-spacing: 2px;
      cursor: pointer;
      &::before{
        content: '';
        position: absolute;
        bottom: 0;
        left: 100%;
        width: 0;
        height: 2px;
        background: #007acc;
        transition: all 0.15s ease-in-out;
      }
      &:hover{
        color: #007acc;
        &::before{
          left: -2px;
          width: calc(100% + 4px);
        }
        ~ .nav::before{
          left: 0;
        }
      }
      &.active{
        color: #007acc;
        &::before{
          content: '';
          position: absolute;
          bottom: 0;
          left: -2px;
          width: calc(100% + 4px);
          height: 2px;
          background: #007acc;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .navigation{
    display: none;
  }
}
@media (min-width: 768px) {
  .logo{
    margin-right: 20px;
  }
  .navigation{
    display: flex;
  }
}
</style>
