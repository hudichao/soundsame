<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
import Vue from 'vue'
Vue.filter('date', (value, format) => {
    var date = new Date(value)
    var year = date.getFullYear()
    var month = (`0${date.getMonth() + 1}`).substr(-2)
    var day = (`0${date.getDate()}`).substr(-2)
    var result = ''
    if (format === 'yyyy-mm-dd') {
        result = `${year}-${month}-${day}`
    }
    return result
})
export default {
}
</script>

<style lang="less">
</style>
