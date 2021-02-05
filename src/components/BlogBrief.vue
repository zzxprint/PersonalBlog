<template>
  <div class="blog-brief">
    <div class="title">文章标题文章标题</div>
    <div class="brief">文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介</div>
    <div class="date">2021.02.05</div>
    <div class="category-tags">
      <div class="category">
        <span>分类1</span>
        <span>分类2</span>
      </div>
      <div class="tags">
        <span>标签1</span>
        <span>标签2</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.blog-brief{
  padding: 20px;
  width: 100%;
  height: auto;
  background: #FFF;
  box-shadow: 2px 2px 5px #efefef;
  box-sizing: border-box;
  transition: box-shadow 0.2s linear;
  &:hover{
    box-shadow: 2px 5px 10px #CDCDCD;
  }
  .title{
    padding: 15px 0;
    font-size: 22px;
  }
  .brief{
    font-size: 14px;
    line-height: 1.5;
  }
  .date{
    padding: 15px 0;
  }
  .category-tags{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
