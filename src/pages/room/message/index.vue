<style lang="less">
@import 'index.less';
</style>

<template>
<div class="messageArea">
    <ul>
        <li v-for="one in messages" track-by="$index">
            <span class="name">{{one.name}}</span>
            <span class="body">{{one.body}}</span>
        </li>
    </ul>
    <div class="inputArea">
        <form>
            <input type="text" v-model="message.body">
            <button type="submit" @click.prevent="send()">发送</button>
        </form>
    </div>
</div>
</template>

<script>
import {vxGetMessage} from 'src/vuex/actions'
import {messages} from 'src/vuex/getters'
import * as api from 'src/api'

export default {
    data () {
        return {
            message: {
                name: '',
                body: '',
                time: null
            }
        }
    },
    methods: {
        send () {
            this.message.time = new Date()

            api.saveMessage(this.message)
            this.message.body = ''
        }
    },
    events: {
        wsmessage (data) {
            if (data.type === 'CHAT') {
                console.log(data)
                this.vxGetMessage(data.data)
            }
        }
    },
    vuex: {
        getters: {
            messages
        },
        actions: {
            vxGetMessage
        }
    },
    ready () {

    }
}
</script>
