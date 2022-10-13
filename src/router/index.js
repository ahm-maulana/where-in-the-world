import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Detail from '../components/Detail.vue'

const routes = [
    { 
        path: '/', 
        component:  Home,
        meta: {
            title: 'Where in The World?'
        }
    },
    { 
        path: '/:country', 
        component:  Detail,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.title){
        document.title = to.meta.title
    } else {
        document.title = to.params.country
    }
    next()
})

export default router