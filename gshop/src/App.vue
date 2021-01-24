<template>
    <div id="app">
<!--      分成两层结构-->
<!--      显示路由-->
      <router-view></router-view>
<!--      显示导航-->
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
// 引入导航
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'
  // import {mapActions} from 'vuex'
  // import {reqFoodTypes} from "./api"



//   import {mapActions} from 'vuex'
// mounted(){
//     this.getAddress()
// },
// methods:{
//     ...mapActions(['getAddress'])
// }
export default {
  // async mounted(){
  //   const result = await reqFoodTypes();
  //     console.log(result)
  // },
  mounted(){
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getShops')
    this.$store.dispatch('getLoginInfo')
    // this.getLoginInfo()
  },
  methods:{
    // ...mapActions(['getLoginInfo'])
  },
      // 映射成标签
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
