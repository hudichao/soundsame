<template>
<div class="modal modal-2016-8" transition v-if="show" @click="backdrop ? close() : ''">
    <div class="modal-content" @click="stopPropagation($event)">
        <div class="modal-header">
            <slot name="header"></slot>
            <div class="modal-close" @click.prevent="close()">
                <close></close>
            </div>
        </div>
        <div class="modal-body-wrapper">
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
        </div>
        <div class="modal-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
import Close from './close'
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        },
        onClose: {
            type: Function,
            required: true
        },
        backdrop: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close () {
            this.onClose()
        },
        bindFunc (event) {
            var self = this
            if (self.show && event.keyCode === 27) {
                self.onClose()
            }
        },
        stopPropagation ($event) {
            $event.stopPropagation()
        }
    },
    data () {
        return {
            cssDom: null
        }
    },
    watch: {
        show (newVal) {
            try {
                if (newVal) {
                    this.cssDom.appendTo('head')
                    document.querySelector('html').classList.add('modal-opened')
                } else {
                    setTimeout(() => {
                        document.querySelector('html').classList.remove('modal-opened')
                        this.cssDom.remove()
                    }, 200)
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e)
            }
        }
    },
    ready () {
        // 考虑滚动条宽度
        // 参考http://caibaojian.com/modal-resolve-scrollbar.html
        var w1 = $(window).width()
        document.querySelector('html').classList.add('modal-opened')
        var w2 = $(window).width()
        document.querySelector('html').classList.remove('modal-opened')
        // eslint-disable-next-line max-len
        this.cssDom = $(`<style type='text/css'>.modal-opened{margin-right:${(w2 - w1)}px}</style>`)

        document.addEventListener('keydown', this.bindFunc)
    },
    beforeDestroy () {
        document.removeEventListener('keydown', this.bindFunc)
    },
    components: {
        Close
    }
}
</script>

<style lang="less">
html.modal-opened {
    overflow: hidden!important
}
// modal 固有css（居中之类)
.modal(@input-header-height, @input-footer-height) {
    * {
      box-sizing: border-box;
    }
    @base: 1000;
    @header-height: @input-header-height;
    @footer-height: @input-footer-height;
    @body-min-height: 30px;
    @body-min-width: 300px;
    @modal-min-height: @header-height + @footer-height + @body-min-height;
    @main-space: 100px; // 弹窗离屏幕左侧的最小距离
    @cross-space: 100px; // 弹窗离屏幕顶部的最小距离
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    align-items: center;
    justify-content: center;
    z-index: @base;
    background-color: rgba(248, 248, 248, 0.9);

    &.v-transition {

    }
    &.v-enter {
        animation: modal-enter 0.2s;
    }
    &.v-leave {
        animation: modal-leave 0.2s;
    }

    @keyframes modal-enter {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes modal-leave {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .modal-content {
        position: relative;
        // less has some problem. have to use this grammer
        // less sucks
        max-height: calc(~"100vh" - 2 * @cross-space);
        min-height: @modal-min-height;
        max-width: calc(~"100vw" - 2 * @main-space);
        min-width: @body-min-width;
        background: white;
        z-index: 1;
        .modal-header {
            height: @header-height;
        }
        .modal-footer {
            height: @footer-height;
        }
        .modal-body-wrapper {
            max-height: calc(~"100vh" - (2 * @cross-space + @header-height + @footer-height));
            min-height: @body-min-height;
            overflow: auto;
            .sue-modal-body {
            }
        }
    }
    .sue-modal-backdrop {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: black;
        opacity: 0.1;
    }
}
// modal特殊样式
.modal.modal-2016-8 {
    @header-height: 36px;
    @footer-height: 0;

    .modal(@header-height, @footer-height);
    .modal-content {
        width: 580px;
        min-width: 580px;
        .modal-header {
            position: relative;
            height: @header-height;
            line-height: @header-height;
            padding: 0 16px;
            font-size: 16px;
            background: #f57773;
            color: white;
            span {
              font-size: inherit;
            }
            .modal-close {
                position: absolute;
                display: inline-block;
                font-weight: bold;
                top: 8px;
                right: 6px;
                cursor: pointer;
            }
        }
        .modal-body-wrapper {
           .ue-modal-body {
                // height: 4000px;
                padding: 40px;
                padding-bottom: 32px;
            }
        }
        .sue-modal-footer {
            padding-bottom: 48px;
            text-align: center;
            button {
              margin: 0 10px;
            }
        }
    }
}
</style>
