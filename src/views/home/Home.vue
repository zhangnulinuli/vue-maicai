<template>
  <div id="home">
    <!-- 头部地理位置和搜索框 -->
    <div class="head">
      <Header></Header>
      <!-- 轮播图 -->
      <Sowing :sowing_list="sowing_list" />
      <!-- tip -->
      <Tip :home_ad="home_ad" />
    </div>
    <!-- Nav -->
    <Nav :nav_list="nav_list" />
    <!-- 跳转到会员界面 -->
    <VipTip></VipTip>
  </div>
</template>

<script>
import { getHomeData } from '@/request/api/index.js'
import Header from './components/Header'
import Sowing from './components/Sowing'
import Tip from './components/Tip'
import Nav from './components/Nav'
import VipTip from './components/VipTip'
export default {
  components: {
    Header,
    Sowing,
    Tip,
    Nav,
    VipTip
  },
  data () {
    return {
      sowing_list: [],              // 首页轮播图数据
      isShowLoading: true,          // 是否加载动画
      nav_list: [],
      flash_sale_product_list: [],  // 限时抢购
      tabbar_all_product_list: [],
      specialZone: {},               // 特色专区数据
      home_ad: ''                    // 首页广告
    };
  },
  computed: {

  },
  created () {
    // 0.数据初始化
    this._initData();
  },
  methods: {
    // 数据初始化
    async  _initData () {
      const response = await getHomeData();
      console.log(response)
      if (response.success) {
        const data = response.data
        // 给轮播组件 sowing_list赋值
        this.sowing_list = data.list[0].icon_list;
        // navList 赋值
        this.nav_list = data.list[2].icon_list;
        // 给限时抢购赋值
        this.flash_sale_product_list = data.list[3].product_list;
        // 给Tabbar 商品列表赋值
        this.tabbar_all_product_list = data.list[12].product_list;
        this.isShowLoading = false
        // 给特色专区赋值
        this.specialZone = data.special_zone;
        // 获取首页广告图
        this.home_ad = data.home_ad.image_url;
      }
    },
  }

};
</script>

<style scoped lang="less">
#home {
  background-color: #f5f5f5;
  padding-bottom: 3rem;
  .head {
    margin-top: -3rem;
    width: 100%;
    background-image: url("http://518taole.7-orange.cn/backImage.png");
  }
}
</style>
