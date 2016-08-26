<template>
    <div class="the-close">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 16
        }
    }
}
</script>

<style lang="less">
.the-close {
    display: inline-block;
    cursor: pointer;
    width: 25px;
    height: 25px;
    .line {
        height: 18px;
        width: 1px;
        // background-color: #acacac;
        background-color: #F5F5F5;
        display: block;
        position: absolute;
        top: 50%;
        right: 50%;
        margin-top: -18px;
    }
    .line-1 {
        transform: rotate(45deg);
    }
    .line-2 {
        transform: rotate(-45deg);
    }
}
</style>