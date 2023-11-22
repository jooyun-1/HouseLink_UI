import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import BoardFormView from '../views/BoardFormView.vue'
import DetailSearchView from '../views/DetailSearchView.vue'
import ReviewListView from '../views/ReviewListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:name',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/reviewform/:name',
      name: 'reviewform',
      component: BoardFormView
    },
    {
      path: '/detailsearch',
      name: 'detailsearch',
      component: DetailSearchView
    },
    {
      path: '/reviewlist',
      name: 'reviewlist',
      component: ReviewListView
    }
    // {
    //   path: '/signin',
    //   name: 'signin',
    //   component: SignInView,
    //   children: [
    //     {
    //       path: '/west',
    //       component: West,
    //     },
    //     {
    //       path: '/east',
    //       component: East,
    //     },
    //   ],
    // },
    // {
    //   path: '/named',
    //   name: 'named',
    //   component: () => import('../views/')),
    // },
  ]
})

export default router
