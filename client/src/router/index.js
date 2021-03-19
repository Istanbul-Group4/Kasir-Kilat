import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from '../components/Board.vue';
import Login from '../components/LoginForm.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  
  {
    path: '/playgame',
    name: 'Board',
    component: Board,
  },
  
];

// router.beforeEach((to, from, next) => {
//   // ...
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from ,next)=>{
  if(to.name == 'Board' && !localStorage.currentUser){
    next({name: 'Login'})
  }else{
    next()
  }
})

export default router;