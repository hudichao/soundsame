<template>
<modal :show="show" :on-close="close">
    <div slot="header"></div>
    <div slot="body">
        <form>
            用户名：<input v-model="name">{{name}}
            密码：<input type="password" v-model="password">
            <button @click.prevent="register()">注册</button>
            <button @click.prevent="login()">登录</button>
        </form>
    </div>
</modal>
</template>

<script>
import Modal from './modal'
import {vxRegister, vxLogin} from 'src/vuex/actions'
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            name: '',
            password: ''
        }
    },
    components: {
        Modal
    },
    methods: {
        close () {
            this.show = false
        },
        register () {
            this.vxRegister({
                name: this.name,
                password: this.password
            })
        },
        login () {
            console.log(this.name)
            this.vxLogin({
                name: this.name,
                password: this.password
            })
        }
    },
    vuex: {
        actions: {
            vxRegister,
            vxLogin
        }
    }
}
</script>

<style lang="less" scoped>

</style>
