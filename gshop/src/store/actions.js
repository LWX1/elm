// 通过mutation间接更新state的多个方法的对象
/*
vuex 的 actions 模块
  */
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUser,
  reqLogout,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  QUIT_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS
} from './mutation-types'
export default {
// 异步获取地址
  async getAddress({commit, state}) {
    // 发送异步Ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if(result.code === 0){
      // 提交一个mutation
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }

    // commit(RECEIVE_ADDRESS, {address: result.data})
  },
// 异步获取分类列表
  async getCategorys({commit}) {
    const result = await reqFoodCategorys()
    if(result.code === 0){
      // 提交一个mutation
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
    // commit(RECEIVE_CATEGORYS, {categorys: result.data})
  },
// 异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  getUserInfo({commit},userInfo){
    commit(RECEIVE_USER_INFO,{userInfo})
  },
  async getLoginInfo({commit}){
    const result = await reqUser()
    if(result.code === 0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  async loseLoginInfo({commit}){
    const result = await reqLogout()
    if(result.code === 0){
      commit(QUIT_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_SHOP_INFO, {info})
    }
  },
// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_SHOP_RATINGS, {ratings})
    }
  },
// 异步获取商家商品列表
  async getShopGoods({commit}) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS, {goods})
// 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组键
    }
  },
}

