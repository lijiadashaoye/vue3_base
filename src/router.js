import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [{
        name: 'one',
        path: '/',
        component: () =>
            import ('@/components/one.vue')
    },
    {
        name: 'two',
        path: '/two',
        component: () =>
            import ('@/components/two.vue'),
        // 将路由参数作为组件props
        props: route => ({
            query: route.query,
            params: route.params,
        })
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router