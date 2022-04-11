
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name: 'login',
    component: () => import('../views/login/Login'),
    meta: {
      title: '衣衣布舍管理端登录',
      auth: false
    }
  },
  {
    path: '/',
    name: 'main',
    redirect: '/sourcecate',
    component: () => import('@/views/main/Main'),
    meta: {
      title: '衣衣布舍管理端',
      auth: true
    },
    children: [
      {
        path:'datacenter',
        name:'datacenter',
        component: () => import('../views/datacenter/DataCenter'),
        meta: {
          title: '数据中心'
        }
      },
      {
        path:'sourcecate',
        name:'sourcecate',
        component: () => import('../views/coursecate/CourseCate'),
        meta: {
          title: '课程分类'
        }
      },
      {
        path:'password',
        name: 'password',
        component: () => import('../views/password/password'),
        meta: {
          title: '密码修改',
          auth: false
        }
      },
      {
        path:'courseinsert',
        name: 'courseinsert',
        component: () => import('../views/course/insert'),
        meta: {
          title: '课程添加',
          auth: false
        }
      },
      {
        path:'coursequery',
        name: 'coursequery',
        component: () => import('../views/course/query'),
        meta: {
          title: '课程查看',
          auth: false
        }
      },
      {
        path: 'swiperinsert',
        name:'swiperinsert',
        component: () => import('../views/swiper/insert'),
        meta: {
          title: '轮播添加',
          auth: false
        }
      },
      {
        path: 'swiperquery',
        name:'swiperquery',
        component: () => import('../views/swiper/query'),
        meta: {
          title: '轮播查看',
          auth: false
        }
      },
      {
        path: 'orderquery',
        name:'orderquery',
        component: () => import('../views/order/query'),
        meta: {
          title: '订单查看',
          auth: false
        }
      },
      {
        path: 'websitequery',
        name: 'websitequery',
        component: () => import('../views/websiteinfo/query'),
        meta: {
          title: '网站信息查看',
          auth: false
        }
      },
      {
        path: 'websiteupdate',
        name: 'websiteupdate',
        component: () => import('../views/websiteinfo/update'),
        meta: {
          title: '网站信息修改',
          auth: false
        }
      },
      {
        path: 'chapterindex',
        name: 'chapterindex',
        component: () => import('../views/chapter/index'),
        meta: {
          title: '章节管理',
          auth: false
        },
        children: [
          {
            path: 'chapterinsert',
            name: 'chapterinsert',
            component: () => import('../views/chapter/insert'),
            meta: {
              title: '章节添加',
              auth: false
            }
          },
          {
            path: 'chapterquery',
            name: 'chapterquery',
            component: () => import('../views/chapter/query'),
            meta: {
              title: '章节查看',
              auth: false
            }
          }
        ]
      },
      {
        path: '/questionquery',
        name: 'questionquery',
        component: () => import('../views/question/query'),
        meta: {
          title: '问答查看',
          auth: false
        }
      },
      {
        path: '/dynamicquery',
        name: 'dynamicquery',
        component: () => import('../views/dynamic/query'),
        meta: {
          title: '动态查看',
          auth: false
        }
      },
      {
        path: 'question-commit',
        name: 'questioncommit',
        component:() => import('../views/question/commitQuery.vue'),
        meta: {
          title: '问答-评论',
          auth: true
        }
      },
      {
        path:'news-insert',
        name: 'newsinsert',
        component:() => import('../views/news/insert.vue'),
        meta: {
          title: '咨询-添加',
          auth: true
        }
      },
      {
        path: 'news-query',
        name: 'newsquery',
        component:() => import('../views/news/query.vue'),
        meta: {
          title: '咨询-查询',
          auth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
});

// router.beforeEach((to,from,next) => {
//   document.title = to.meta.title || '衣衣布舍管理系统';
//   if(to.name === 'login' || to.name==='main') {
//     next();
//   }else {
//     let loginFlag = sessionStorage.getItem('token');
//     if(loginFlag && loginFlag.trim().length) {
//       next();
//     }else {
//       next('/login');
//     }
//   }
// })

export default router
