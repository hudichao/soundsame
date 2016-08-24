<template>
<audio controls>
    <source type="audio/mpeg">
</audio>
</template>

<script>
export default {
    props: {
        activeSong: {
            type: Object
        }
    },
    data () {
        return {
            audio: null
        }
    },
    ready () {
        this.audio = this.$el
        this.audio.onended = () => {
            console.log('歌曲自然结束')
            this.$dispatch('song-end')
        }
        // setTimeout(() => {
        //     console.log('手动切割')
        //     this.$dispatch('song-end')
        // }, 20000)
    },
    watch: {
        activeSong (newVal) {
            if (newVal) {
                this.audio.pause()
                if (newVal.src) {
                    this.audio.src = newVal.src
                    if (newVal.startTime) {
                        this.audio.currentTime = (Date.now() - newVal.startTime) / 1000
                    }
                    this.audio.play()
                }
            }
        }
    }

}
</script>

<style>
</style>