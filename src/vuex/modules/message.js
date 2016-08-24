import {
    GET_MESSAGE
} from '../mutation-types'

const state = {
    messages: []
}

const mutations = {
    [GET_MESSAGE] (state, data) {
        state.messages.push(data)
        console.log(JSON.stringify(state.messages))
    }
}

export default {
    state,
    mutations
}
