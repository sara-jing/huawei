<template>
  <div>
    <el-container class="main">
      <el-aside width="200px">
        <el-menu :default-active="activeIndex" :router="true">
          <!-- <el-menu-item index="/datacenter"
            ><i class="el-icon-menu"></i>
            <span slot="title">数据中心</span></el-menu-item
          > -->
          <div class="logo"><img src="../../assets/images/logo.png" alt=""></div>
          <el-menu-item index="/sourcecate"
            ><i class="el-icon-s-fold"></i>
            <span slot="title">课程分类管理</span></el-menu-item
          >

           <el-menu-item index="/questionquery">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">问答管理</span>
          </el-menu-item>

          <el-menu-item index="/dynamicquery">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">动态管理</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>课程管理
            </template>
            <el-menu-item index="/courseinsert">课程添加</el-menu-item>
            <el-menu-item index="/coursequery">课程查看</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-picture"></i>轮播管理
              </template>
              <el-menu-item index="/swiperinsert">添加轮播</el-menu-item>
              <el-menu-item index="/swiperquery">查看轮播</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-home"></i>网站信息管理
            </template>
            <el-menu-item index="/websitequery">网站信息查看</el-menu-item>
            <el-menu-item index="/websiteupdate">网站信息修改</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
               <i class="el-icon-s-home"></i>咨询管理
            </template>
            <el-menu-item index="/news-insert">咨询添加</el-menu-item>
            <el-menu-item index="/news-query">咨询查询</el-menu-item>
          </el-submenu>
          <el-menu-item index="/orderquery"
            ><i class="el-icon-menu"></i>
            <span slot="title">订单管理</span></el-menu-item
          >
          
         
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="main-header">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            style="float: right"
            :router="true"
          >
            <el-menu-item>
              <i class="el-icon-menu"></i>
              <span v-if="userInfo">{{ userInfo.username }}</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">设置</template>
              <el-menu-item index="/password">密码修改</el-menu-item>
              <el-menu-item @click="logoutDialog = true">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-main>
          <el-breadcrumb separator="/" style="margin-bottom: 15px">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item
              ><a>{{ $route.meta.title }}</a></el-breadcrumb-item
            >
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog class="logout"
     title="退出"
     :visible.sync="logoutDialog"
     width="30%">
       <span>您确定要退出么</span>
       <span slot="footer" class="dialog-footer">
          <el-button @click="logoutDialog = false">取 消</el-button>
          <el-button type="primary" @click="handlerLogout">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      userInfo: null,
      logoutDialog: false
    };
  },
  methods: {
    initUserInfo() {
      let userInfo = JSON.parse(sessionStorage.getItem("userinfo"));
      this.userInfo = userInfo;
    },
    handlerLogout() {
      this.logoutDialog = false;
      sessionStorage.clear();
      this.$router.push({path: '/login'});
    }
  },
  mounted() {
    this.initUserInfo();
  },
};
</script>
<style scoped>
@import "../../assets/css/main.css";
</style>