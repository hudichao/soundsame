import * as api from '../api'
import * as types from './mutation-types'

export const vxGetMessage = ({dispatch, state}, data) => {
    dispatch(types.GET_MESSAGE, data)
}

export const vxGetMusic = ({dispatch, state}, data) => {
    console.log(types['REMOTE_' + data.type])
    dispatch(types['REMOTE_' + data.type], data.data)
}

export const vxAddSong = ({dispatch, state}, data) => {
    api.addSong(data)
}

export const vxCutSong = ({dispatch, state}) => {
    api.cutSong()
}

export const vxDeleteSong = ({dispatch, state}, id) => {
    api.deleteSong(id)
}

export const vxRaiseSong = ({dispatch, state}, id) => {
    api.raiseSong(id)
}

export const vxInitSongs = ({dispatch, state}, data) => {
    var roomId = 2
    return api.initList(roomId)
    .then(res => {
        dispatch(types.INIT_SONGS, res)
        return Promise.resolve()
    }, err => {
        return Promise.reject(err)
    })
}

export const vxRegister = ({dispatch, state}, data) => {
    return api.register({
        name: data.name,
        password: data.password
    })
    .then(res => {
        return Promise.resolve()
    })
}

export const vxLogin = ({dispatch, state}, data) => {
    console.log(data)
    return api.login({
        name: data.name,
        password: data.password
    })
    .then(res => {
        return Promise.resolve()
    })
}

export const vxLoginByToken = ({dispatch, state}) => {
    return api.login({
        name: '2',
        password: '23'
    })
    .then(res => {
    })
}

export const vxNotAuthed = ({dispatch, state}) => {
    dispatch(types.NEED_LOGIN)
}
