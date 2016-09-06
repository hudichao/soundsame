import Vue from 'vue'
import Vuex from 'vuex'

import message from './modules/message'
import music from './modules/music'
import user from './modules/user'

import createLogger from 'vuex/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        message,
        music,
        user
    },
    strict: true,
    middlewares: debug ? [createLogger()] : []
})
