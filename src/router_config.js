import Room from 'src/pages/room/index.vue'
// import Plaza from 'src/pages/plaza/index.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
})

router.map({
    // '/:roomId': {
    //     name: 'room',
    //     component: Room
    // },
    // '/': {
    //     name: 'hp',
    //     component: Plaza
    // }
    '/:roomId': {
        name: 'room',
        component: Room
    }
})

router.redirect({
    '*': '/test'
})

router.beforeEach(transition => {
    window.room_id = transition.to.params.roomId
    transition.next()
})

export default router
