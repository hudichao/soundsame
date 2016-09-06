<template>
<modal :show.sync="show" :on-close="close">
    <div slot="header">歌曲历史</div>
    <div slot="body">
        <div class="songList">
            <span class="one-song" v-for="song in data" track-by="$index">{{song.name}}
                <span class="btn"><button @click="add(song)">加入歌单</button></span>
            </span>
        </div>
    </div>
</modal>
</template>

<script>
import Modal from './modal'
import {vxAddSong} from 'src/vuex/actions'

export default {
    props: {
        data: {
            type: Array
        },
        show: {
            type: Boolean,
            twoWay: true,
            required: true
        }
    },
    components: {
        Modal
    },
    methods: {
        close () {
            this.show = false
        },
        add (song) {
            this.addSong(song)
            this.close()
        }
    },
    vuex: {
        actions: {
            vxAddSong
        }
    }
}
</script>

<style lang="less" scoped>
.songList {
    margin-top: 20px;
    margin-bottom: 20px;
    .one-song {
        display: block;
        padding: 10px 20px;
        button {
            margin-right: 10px;
            float: right;
        }
    }
}
</style>
