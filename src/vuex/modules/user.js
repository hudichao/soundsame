import {
    NEED_LOGIN,
    LOGINED
} from '../mutation-types'

const state = {
    needLogin: false
}

const mutations = {
    [NEED_LOGIN] (state, data) {
        state.needLogin = true
    },
    [LOGINED] (state, data) {
        state.needLogin = false
    }
}

export default {
    state,
    mutations
}
