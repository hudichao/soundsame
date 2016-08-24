import $ from 'jquery'

// eslint-disable-next-line
const ws = new WebSocket('ws://127.0.0.1:3333')

const ajax = config => {
    return new Promise((resolve, reject) => {
        $.ajax(config)
        .then(response => {
            resolve(response)
        }, err => {
            reject(err)
        })
    })
}

export const wsUrl = process.env.NODE_ENV !== 'production' ? 'ws://127.0.0.1:3333' : 'ws://120.55.93.6:3333'

export const url = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:3333' : 'http://120.55.93.6:3333'

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
        data: {
            room_id: roomId
        },
        dataType: 'json'
    })
}

export const saveMessage = data => {
    ws.send(JSON.stringify({type: 'CHAT', data: data}))
}

