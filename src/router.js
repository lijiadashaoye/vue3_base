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
            import ('@/components/two.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router