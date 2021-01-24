<template>
    <div>
      <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont iconsousuo" style="color:red;"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id? '/userinfo':'/login'">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            <i class="iconfont icon04" v-else></i>
          </router-link>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index1) in categorysArr" :key="index1">
                <a href="javascript:" class="link_to_food" v-for="(category, index2) in categorys" :key="index2">
                  <div class="food_container">
                    <img :src="imgBaseUrl+category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- 添加分页器 -->
            <div class="swiper-pagination"></div>
<!--            添加导航页器-->
            <div class="swiper-button-prev swiper-button"></div>
            <div class="swiper-button-next swiper-button"></div>
<!--            添加滚动条-->
<!--            <div class="swiper-scrollbar"></div>-->
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <ShopList></ShopList>
      </section>
    </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import  {mapState} from 'vuex'
    export default {
      data:function(){
        return{
          imgBaseUrl: 'https://fuss10.elemecdn.com'
        }
      },
      mounted:()=>{
      },
      components:{
        HeaderTop,
        ShopList,
      },
      computed:{
        ...mapState(['address','categorys','userInfo']),
        // 根据categorys一维数组生成一个2维数组
        // 小数组中的元素个数最大为8
        categorysArr(){
          const {categorys} = this
          const arr = []
          let minArr = []
          // 遍历categorys
          categorys.forEach(data=>{
            if(minArr.length === 8){
              minArr = []
            }
            if(minArr.length === 0){
              arr.push(minArr)
            }
            minArr.push(data)
          })
          return arr
        }
      },
      watch:{
        categorys(value){
          // 界面更新就立即创建Swiper对象
          this.$nextTick(()=>{
            new Swiper('.swiper-container',{
              // 循环模式选项
              loop:true,
              // 是否需要分页器
              pagination:{
                el:'.swiper-pagination',
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },

              // 如果需要滚动条
              // scrollbar: {
              //   el: '.swiper-scrollbar',
              // },
            })
          })
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  &.msite  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
        .swiper-button
          opacity 0.1
          height 27px

</style>
