<template>
<modal :show.sync="show" :on-close="close">
    <div slot="header">搜索</div>
    <div slot="body">
        <div class="searchResult">
           <div v-if="data.data.length > 0">
               <span class="one-song" v-for="one in data.data" track-by="song_id">
                   {{one.name}}
                   <span class="btn"><button @click="add(one)">加入歌单</button></span>
               </span>
           </div>
           <div v-if="data.data.length === 0 && data.isLoading === false">
               <span class="notFound">没有找到歌曲！</span>
           </div>
           <div v-if="data.isLoading === true">
                <span class="searching">搜索中...</span>
           </div>
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
            type: Object
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
.searchResult {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 170px;

    .one-song {
        display: block;
        padding: 10px 20px;
        button {
            float: right;
        }
    }
    .notFound, .searching {
        padding: 10px 20px;
    }
}
</style>
