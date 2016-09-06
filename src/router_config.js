import Room from 'src/pages/room/index.vue'
import Plaza from 'src/pages/plaza/index.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
})

router.map({
    '/:roomId': {
        name: 'room',
        component: Room
    },
    '/': {
        name: 'hp',
        component: Plaza
    }
})

export default router
