<template>
<div class="listArea">
<div class="search">
    <form>
        <input type="text" v-model="input">
        <button type="submit" @click.prevent="search()">搜索歌曲</button>
        <button @click.prevent="showOld()" :class="{active: showOldSongs}">歌曲历史</button>
    </form>
    <div class="searchResult" v-show="showSearchResult">
        <div v-if="searchResult.length > 0">
            <span class="one-song" v-for="one in searchResult" track-by="song_id">
                {{one.name}}<button @click="add(one)">加入歌单</button>
            </span>
        </div>
        <div v-else>
            <span>没有找到歌曲！</span>
        </div>
    </div>
    <div class="songList" v-for="song in oldSongs" track-by="$index" v-if="showOldSongs">
        <span class="one-song">{{song.name}}
            <button @click="add(song)">加入歌单</button>
        </span>
    </div>

    <div class="songList">
        <span class="one-song" v-if="activeSong.name">正在播放~~~~~{{activeSong.name}}</span>
        <span class="one-song" v-for="song in songs" track-by="id">{{song.name}}
            <button @click="remove(song)">删</button>
            <button @click="raise(song)">顶</button>
        </span>
    </div>
</div>
</div>
</template>


<script>
import * as api from '../../api'
import {addSong, deleteSong, raiseSong, initSongs, getMusic} from '../../vuex/actions'
import {oldSongs, songs, activeSong} from '../../vuex/getters'
export default {
    data () {
        return {
            input: '',
            searchResult: [],
            showSearchResult: false,
            showOldSongs: false
        }
    },
    methods: {
        search () {
            api.searchSong(this.input)
            .then(data => {
                this.searchResult = data ? data.slice(0, 5) : []
                this.showSearchResult = true
            })
        },
        add (song) {
            this.showSearchResult = false
            this.addSong(song)
        },
        raise (song) {
            this.raiseSong(song.id)
        },
        remove (song) {
            this.deleteSong(song.id)
        },
        showOld () {
            this.showOldSongs = !this.showOldSongs
        }
    },
    events: {
        wsmessage (data) {
            console.log(`获取${JSON.stringify(data)}!!!!`)
            var typeArray = ['ADD_SONG', 'CUT_SONG', 'RAISE_SONG', 'DELETE_SONG', 'ADD_ACTIVE_SONG']

            if (typeArray.indexOf(data.type) > -1) {
                this.getMusic(data)
            }
        }
    },
    ready () {
        this.initSongs()
    },
    vuex: {
        getters: {
            songs,
            activeSong,
            oldSongs
        },
        actions: {
            addSong,
            deleteSong,
            raiseSong,
            initSongs,
            getMusic
        }
    }
}
</script>

<style lang="less">
@import 'index.less';
</style>