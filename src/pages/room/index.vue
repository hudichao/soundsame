<template>
    <div id="room">
        <login-modal :show="showLoginModal"></login-modal>
        <music-area></music-area>
        <list-area></list-area>
        <message-area></message-area>
        <button id="wb_connect_btn"></button>
    </div>
</template>

<script>
import store from 'src/vuex/store'
import {needLogin} from 'src/vuex/getters'
import musicArea from 'src/pages/room/music'
import messageArea from 'src/pages/room/message'
import listArea from 'src/pages/room/list'

import LoginModal from 'src/components/login_modal.vue'

import * as api from 'src/api'

export default {
    data () {
        return {
            ws: new window.WebSocket(api.wsUrl)
        }
    },
    store,
    vuex: {
        getters: {
            showLoginModal: needLogin
        }
    },
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

        setTimeout(function () {
            // eslint-disable-next-line
            WB2.anyWhere(function (W) {
                W.widget.connectButton({
                    id: 'wb_connect_btn',
                    type: '1,2',
                    callback: {
                        login: function (o) {
                            console.log(o)
                        },
                        logout: function (o) {
                        }
                    }
                })
            })
        }, 300)
    },
    components: {
        musicArea,
        messageArea,
        listArea,
        LoginModal
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
#room {
    font-size: 0;
}
a {
    text-decoration: none;
}

#wb_connect_btn {
    position: fixed;
    left: 50%;
    top: 50%;
}

</style>
