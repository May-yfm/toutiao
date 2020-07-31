<!-- 主页组件 -->
<template>
  <div class='tt-box'>
    <!-- 主页头部 -->
      <div class="tt-home-header">
          <h2>头条</h2>
      </div>
    <!-- 主页内容 -->
    <div class="tt-home-content">
        <div class='content-left'>
            <Navigator></Navigator>
        </div>
        <div class='content-middle'>中间</div>
        <div class='content-right'>右边</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

//引入导航navigator组件
import Navigator from "../components/Navigator";

export default {
//import引入的组件需要注入到对象中才能使用
components: {
  Navigator
},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
// mounted() {
//   this.$axios.get('http://tt.linweiqin.com/api/tt/getArticles',{
//     params:{
//       lastid:0,
//       type: 'TT',
//       page: 1,
//       number: 20,
//     }
//   }).then(res=>{
//     console.log(res);
//   }).catch(err=>{console.log(err);
//   })
// },

async mounted(){ //异步代码改同步
 let res = await this.$axios.get('/getArticles',{
    params:{
      lastid:0,
      type: 'TT',
      page: 1,
      number: 20,
    }
  })
  console.log(res);
},

beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  lang='less' scoped>
  * {margin: 0;padding: 0;}
  .tt-home-header {
    width: 100%;
    background: black;
    height: 30px;
    h2 {
      color: white;
      font-weight:100;
      font-size: 18px;
      line-height: 30px;
      padding-left: 5px;
    }
  }
  .tt-home-content {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    background: pink;
    .content-left {
      flex: 1;
      background: yellow;
    }

    .content-middle {
      flex: 3;
      background: orange;
    }

    .content-right {
      flex: 2;
    }
  }
</style>