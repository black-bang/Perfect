import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user/index'
import FooterB from '@/components/user/footer/index'
import Footer from '@/components/footer/index'
import Logout from '@/components/logout/index'
import UserLogin from '@/components/user/login/index'
import UserLoginB from '@/components/user/login-b/index'
import UserLoginC from '@/components/user/login-c/index'
import UserLoginD from '@/components/user/login-d/index'
import UserLogOut from '@/components/user/logout/index'
import UserLogoutheader from '@/components/user/logout/header/index'
import Logoutheader from '@/components/logout/header/index'

Vue.use(Router)

const routes = [
  {
    path:'/',
    redirect: '/user/login'
  },

  {
    path: '/user',
    components:{
      content:User,

     
     
    },
    children:[
      {
        path:'/',
        components:{
          usercon:UserLogOut,
        
        }
      },
      {
        path:'login',
        components:{
          usercon:UserLogin,
          
        }
      },
      {
        path:'login-b',
        components:{
          usercon:UserLoginB,
          footer:Footer
        
        }
      },
      {
        path:'login-c',
        components:{
          usercon:UserLoginC,
        
        }
      },
      {
        path:'login-d',
        components:{
          usercon:UserLoginD,
        
        }
      }
    ]
  },
  {
    path: '/logout',
    components:{

      content:Logout
    }
  }
]

var router = new Router({
  routes
})


export default router
