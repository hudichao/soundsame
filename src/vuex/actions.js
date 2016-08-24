import * as api from '../api'
import * as types from './mutation-types'

export const getMessage = ({dispatch, state}, data) => {
    dispatch(types.GET_MESSAGE, data)
}

export const getMusic = ({dispatch, state}, data) => {
    console.log(types['REMOTE_' + data.type])
    dispatch(types['REMOTE_' + data.type], data.data)
}

export const addSong = ({dispatch, state}, data) => {
    api.addSong(data)
}

export const cutSong = ({dispatch, state}) => {
    api.cutSong()
}

export const deleteSong = ({dispatch, state}, id) => {
    api.deleteSong(id)
}

export const raiseSong = ({dispatch, state}, id) => {
    api.raiseSong(id)
}

export const initSongs = ({dispatch, state}, data) => {
    var roomId = 2
    api.initList(roomId)
    .then(res => {
        dispatch(types.INIT_SONGS, res)
    })
}
