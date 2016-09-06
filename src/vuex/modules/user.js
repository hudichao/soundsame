import {
    NEED_LOGIN
} from '../mutation-types'

const state = {
    needLogin: false
}

const mutations = {
    [NEED_LOGIN] (state, data) {
        state.needLogin = true
    }
}

export default {
    state,
    mutations
}
