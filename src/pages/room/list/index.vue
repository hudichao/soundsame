<template>
<div class="listArea">
    <oldsong-modal :show.sync="showHistoryModal" :data="oldSongs"></oldsong-modal>
    <searchsong-modal :show.sync="showSearchModal" :data="searchResult"></searchsong-modal>
    <div class="wrapper">
        <div class="search">
            <form>
                <input type="text" v-model="input">
                <span class="btns">
                    <button type="submit" @click.prevent="doSearch()">搜索歌曲</button>
                    <button @click.prevent="viewHistory()">歌曲历史</button>
                </span>
            </form>
        </div>

        <div class="songList">
            <span class="one-song" v-if="activeSong.name">正在播放~~~~~{{activeSong.name}}
                <span class="btn">
                    <button class="musicAction" @click="cut(song)">切</button>
                </span>
            </span>
            <span class="one-song" v-for="song in songs" track-by="id">{{song.name}}
                <span class="btns">
                    <button class="musicAction" @click="raise(song)">顶</button>
                    <button class="musicAction" @click="remove(song)">删</button>
                </span>
            </span>
        </div>
    </div>
</div>
</div>
</template>


<script>
import * as api from 'src/api'
import {vxAddSong, vxDeleteSong, vxRaiseSong, vxInitSongs, vxGetMusic, vxCutSong, vxNotAuthed} from 'src/vuex/actions'
import {oldSongs, songs, activeSong} from 'src/vuex/getters'

import OldsongModal from 'src/components/oldsong_modal.vue'
import SearchsongModal from 'src/components/searchsong_modal.vue'

export default {
    data () {
        return {
            input: '',
            searchResult: {data: [], isLoading: false},
            showOldSongs: false,
            showHistoryModal: false,
            showSearchModal: false
        }
    },
    methods: {
        doSearch () {
            if (this.input) {
                this.showSearchModal = true
                this.searchResult = {data: [], isLoading: true}
                api.searchSong(this.input)
                .then(data => {
                    var result = data ? data.slice(0, 5) : []
                    this.searchResult = {
                        data: result,
                        isLoading: false
                    }
                })
            }
        },
        add (song) {
            this.vxAddSong(song)
        },
        raise (song) {
            this.vxRaiseSong(song.id)
        },
        remove (song) {
            this.vxDeleteSong(song.id)
        },
        cut () {
            this.currentTime = 0
            this.vxCutSong()
        },
        viewHistory () {
            this.showHistoryModal = true
        }
    },
    events: {
        wsmessage (data) {
            console.log(`获取${JSON.stringify(data)}!!!!`)
            var typeArray = ['ADD_SONG', 'CUT_SONG', 'RAISE_SONG', 'DELETE_SONG', 'ADD_ACTIVE_SONG']

            if (typeArray.indexOf(data.type) > -1) {
                this.vxGetMusic(data)
            }
        }
    },
    ready () {
        this.vxInitSongs()
        .then(() => {}, err => {
            if (err.status === 401 || err.status === 403) {
                this.vxNotAuthed()
            }
        })
    },
    components: {
        OldsongModal,
        SearchsongModal
    },
    vuex: {
        getters: {
            songs,
            activeSong,
            oldSongs
        },
        actions: {
            vxAddSong,
            vxDeleteSong,
            vxRaiseSong,
            vxInitSongs,
            vxGetMusic,
            vxCutSong,
            vxNotAuthed
        }
    }
}
</script>

<style lang="less">
@import 'index.less';
</style>