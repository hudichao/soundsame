<style lang="less">
@import 'index.less';
</style>

<template>
<div class="songArea">
    <sound :active-song="activeSong" v-on:song-end="cut"></sound>
</div>
</template>

<script>
import sound from 'src/components/sound'
import {activeSong} from 'src/vuex/getters'
import {vxCutSong} from 'src/vuex/actions'

export default {
    components: {
        sound
    },
    data () {
        return {
            currentTime: 0
        }
    },
    methods: {
        cut () {
            console.log('cut!')
            this.currentTime = 0
            this.vxCutSong()
        }
    },
    ready () {
        // setInterval(() => {
        //     console.log(this.startTime)
        // }, 1000)
    },
    vuex: {
        actions: {
            vxCutSong
        },
        getters: {
            activeSong
        }
    }
}
</script>
