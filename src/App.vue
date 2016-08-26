<template>
    <div id="app">
        <music-area></music-area>
        <list-area></list-area>
        <message-area></message-area>
    </div>
</template>

<script>
import store from './vuex/store'

import musicArea from './area/music'
import messageArea from './area/message'
import listArea from './area/list'

import * as api from './api'

export default {
    data () {
        return {
            ws: new window.WebSocket(api.wsUrl)
        }
    },
    store,
    created () {
        var onopen = event => {

        }
        var onmessage = event => {
            console.log(event.data)
            this.$broadcast('wsmessage', JSON.parse(event.data))
        }
        var onclose = event => {
            console.log('server was closed')
        }

        this.ws.onopen = onopen
        this.ws.onmessage = onmessage
        this.ws.onclose = onclose
    },
    components: {
        musicArea,
        messageArea,
        listArea
    }
}
</script>

<style lang="less">
// #093d5a #08415a #e8f0f3 #f57773 #f39b9c
body {
    font-family: Helvetica, sans-serif;
    overflow: hidden;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 14px;
}
ul {
    list-style-type: none;
}
html,body,#app {
    height: 100%;
}
button {
    cursor: pointer;
}
input[type="text"] {
    display: inline-block;
    height: 28px;
    padding-left: 10px;
}
#app {
    font-size: 0;
}
a {
    text-decoration: none;
}

</style>
