import $ from 'jquery'

import auth from './auth.js'

export const wsUrl = process.env.NODE_ENV !== 'production' ? 'ws://127.0.0.1:3333' : 'ws://120.55.93.6:3333'

export const url = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3333' : 'http://120.55.93.6:3333'

const ajax = config => {
    let sendConfig = {}
    if (config.url.indexOf(url) > -1) {
        var token = auth.getToken()
        var obj = {}

        if (token) {
            obj._token = token
        }
        if (window.room_id) {
            obj.room_id = window.room_id
        }
        let sendData = Object.assign({}, config.data, obj)
        sendConfig = Object.assign({}, config, {
            data: sendData
        })
        console.log(sendConfig)
    } else {
        sendConfig = config
    }
    console.log(sendConfig)
    return new Promise((resolve, reject) => {
        $.ajax(sendConfig)
        .then(response => {
            // 如果返回值有token，存token
            if (config.url.indexOf(url) > -1 && response.token) {
                auth.saveToken(response.token)
            }
            resolve(response)
        }, err => {
            console.log(err)
            if (err.status === 416) {
                // 去了不该去的房间
                if (err.responseJSON && err.responseJSON.type === 'room fail') {
                    window.location = window.location.origin
                }
            }
            if (err.status === 404) {
                if (err.responseJSON) {
                    reject(err.responseJSON.msg)
                }
            }
            reject(err)
        })
    })
}

// eslint-disable-next-line
const ws = new WebSocket(wsUrl)

export const searchSong = songName => {
    return new Promise((resolve, reject) => {
        ajax({
            url: 'http://115.29.195.14:8083/cmusic',
            data: {
                song_url: songName
            },
            dataType: 'json'
        }).then(res => {
            var result = []
            res.forEach(item => {
                result.push({
                    name: item.title,
                    src: item.location,
                    image: item.pic,
                    song_id: item.song_id
                })
            })
            resolve(result)
        }, err => {
            reject(err)
        })
    })
}
export const addSong = data => {
    return ajax({
        url: url + '/api/addSong',
        data: {
            song_id: data.song_id,
            name: data.name,
            src: data.src,
            image: data.image
        }
    })
}

export const cutSong = () => {
    return ajax({
        url: url + '/api/cutSong'
    })
}

export const raiseSong = id => {
    return ajax({
        url: url + '/api/raiseSong',
        data: {
            id
        }
    })
}

export const deleteSong = id => {
    return ajax({
        url: url + '/api/removeSong',
        data: {
            id
        }
    })
}

export const initList = roomId => {
    return ajax({
        url: url + '/api/initList',
        dataType: 'json'
    })
}

export const saveMessage = data => {
    ws.send(JSON.stringify({type: 'CHAT', data: data}))
}

export const register = data => {
    return ajax({
        url: url + '/api/register',
        data: {
            name: data.name,
            password: data.password
        },
        type: 'post'
    })
}

export const login = data => {
    return ajax({
        url: url + '/api/login',
        data: {
            name: data.name,
            password: data.password
        },
        type: 'post'
    })
}
