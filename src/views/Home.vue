<!-- 主页组件 -->
<template>
  <div class='tt-box'>
    <!-- 主页头部 -->
    <div class="tt-home-header">
      <h2>头条</h2>
    </div>
    <!-- 主页内容开始 -->
    <div class="tt-home-content">
        <!-- 左边导航条 -->
        <div class='content-left'>
            <Navigator></Navigator>
        </div>
        <!-- 中间内容发布 -->
        <div class='content-middle'>
            <!-- 顶部发布头条和文章的标题 -->
            <div class="content-middle-top">
                <section class='middle-top-tab'>
                   <section v-for='item in tabs' :key='item.id' :class="['top-tab-item',{active:activeTab===item.type}]" @click="changeTab(item.type)"> {{item.text}} </section>
                </section>
            </div>
            <!-- 中间写内容的框 -->
            <div class="content-middle-mid" >
                <section class='tt-box'v-show="activeTab==='tt'">
                    <textarea class='tt-content' name="" id="" cols="30" rows="10"      placeholder="有什么新鲜事想告诉大家" v-model='content'></textarea>
                    <section class='mid-bottom'>
                      <section class='left'> <span>图片</span> </section>
                      <section class='right' @click='publishTT'>发布</section>
                    </section>
                </section>
                <section class='article-box' v-show="activeTab==='article'">
                    <input v-model='art_title' type="text" class='articleTitle' placeholder="文章标题">
                    <vue-editor id="editor" use-custom-image-handler @image-added="handleImageAdded" v-model="art_content"> </vue-editor>
                    <div class='publishBox'> <span @click='publishArticle'>发布</span> </div>
                </section>
            </div>    
        </div>

        <!-- 右边栏 -->
        <div class='content-right'>右边</div>

      </div>
      <!-- 主页内容结束 -->

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

//引入导航navigator组件
import Navigator from "../components/Navigator";
import { VueEditor } from "vue2-editor";

export default {
//import引入的组件需要注入到对象中才能使用
components: {
  Navigator, VueEditor 
},
data() {
//这里存放数据
return {
  tabs:[
    {id:1, text:'发微头条', type:'tt'},
    {id:2, text:'写文章', type:'article'},
    ],
    activeTab:'tt', //tt头条 article文章 当前初始化激活的是tt
    content:'',
    art_title:'',
    art_content: "",
  };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  //切换
  changeTab:function(type){
    this.activeTab = type;
  },

  //头条发布
  publishTT:function(){
    let content = this.content;
    if(!content){
      this.$message({
        message:'内容不能为空',
        type:'warning'
      });
      return false;
    };
    this.$axios.post('/createTT',{
      content:content,
      imgs:'',
      oauth_token:'KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS'
    }).then(res=>{
      console.log(res);
      }).catch(err=>{
        console.log(err);
      })
  },
  //文章发布
  publishArticle:function(){
    let title = this.art_title;
    let content = this.art_content;
    if(!title||!content){
      this.$message({
        message:'文章标题和内容不能为空',
        type:'warning'
      });
      return false;
    };
    this.$axios.post('/createArticle',{
      title: title,
      content: content,
      imgs:'',
      oauth_token:'KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS'
    }).then(res=>{
      console.log(res);
      }).catch(err=>{
        console.log(err);
      })
  },

  //富文本图片上传
  handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();  // 构建form表单数据
      formData.append("file", file); // 往表单数据中 填充 file:file 数据

      //图片上传请求接口
      this.$axios({
        url: "/aliossUpload",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url); // Editor是富文本编辑器的实例
          resetUploader();
          console.log(url);
        })
        .catch(err => {
          console.log(err);
        });
    },
  

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
  // * {margin: 0;padding: 0;}
  //顶部栏
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

  //内容主体
  .tt-home-content {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    // background: pink;

    //左边导航条
    .content-left {
      flex: 1;
      // background: yellow;
    }

    //中间内容
    .content-middle {
      flex: 3;
      // background: orange;
      width: 100%;

        //中间头部的头条和文章标题
        .content-middle-top {
          margin-bottom: 10px;
          .middle-top-tab {
            display: flex;
            .top-tab-item {
              width: 80px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              font-size: 18px;
              font-weight: 100;
              margin-right: 30px;
              cursor: pointer;
            }
            .active{
              color:#46a0fc;
              border-bottom: 2px solid red;
            }
        }}

        //中部写内容的部分
        div.content-middle-mid {
          section.tt-box {
            textarea.tt-content {
              width: 99%;
              border: 1px solid #ddd;
              margin-bottom:5px;
            }

            section.mid-bottom {
              display: flex;
              height:40px;
              align-items: center;
              justify-content: space-between;
              section.left {
                line-height: 40px;
                cursor: pointer;
              }

              section.right {
                height:40px;
                line-height: 40px;
                text-align:center;
                width: 100px;
                background-color: #ea4245;
                color:white;
                border-radius:5px;
                cursor: pointer;
              }
            }
          }

          section.article-box {
            input.articleTitle {
              border: none;
              width: 98.5%;
              height: 30px;
              padding-left:5px;
            }

            div.publishBox {
              display: flex;
              justify-content:flex-end;
              margin-top: 10px;
              span {
                display:inline-block;
                width: 100px;
                height:40px;
                line-height:40px;
                text-align: center;
                border-radius: 5px;
                color: white;
                background-color:#ea4245;
                cursor:pointer;
              }
            }
          }
        }
    }

    //右边
    .content-right {
      flex: 2;
    }

  }
</style>