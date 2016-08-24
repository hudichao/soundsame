import {
    REMOTE_ADD_ACTIVE_SONG,
    REMOTE_ADD_SONG,
    REMOTE_CUT_SONG,
    REMOTE_DELETE_SONG,
    REMOTE_RAISE_SONG,
    INIT_SONGS
} from '../mutation-types'

const state = {
    songs: [
    // {
    //     title: 'test',
    //     song_id: '1'
    // }
    ],
    oldSongs: [],
    activeSong: {
        name: '',
        src: '',
        song_id: '',
        id: ''
    }
}

import _ from 'lodash'

const mutations = {
    [REMOTE_ADD_ACTIVE_SONG] (state, data) {
        state.activeSong = data
    },
    [REMOTE_ADD_SONG] (state, data) {
        state.songs.push(data)
    },
    [REMOTE_CUT_SONG] (state, data) {
        // data为要播的歌
        // 如果有当前歌，设为已播放
        if (state.activeSong) {
            state.oldSongs.push(state.activeSong)
        }

        // 如果后面有歌
        if (data.id) {
            state.activeSong = data
            // 清除队列中的这首歌
            mutations[REMOTE_DELETE_SONG](state, data.id)
        } else {
            state.activeSong = {}
            console.log('no song in queue')
        }
    },
    [REMOTE_DELETE_SONG] (state, id) {
        let index = _.findIndex(state.songs, {id: id})
        if (index > -1) {
            state.songs.splice(index, 1)
        }
    },
    [REMOTE_RAISE_SONG] (state, id) {
        let index = _.findIndex(JSON.parse(JSON.stringify(state.songs)), {id: id})
        if (index > -1) {
            var data = state.songs.splice(index, 1)[0]
            state.songs.unshift(data)
        }
    },
    [INIT_SONGS] (state, data) {
        console.log('init songs')
        state.songs = data.songs || []
        state.oldSongs = data.oldSongs || []
        state.activeSong = data.activeSong || {}
    }
}

export default {
    state,
    mutations
}
