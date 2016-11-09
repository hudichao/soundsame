<template>
<modal :show="show" :on-close="close">
    <div slot="header"></div>
    <div slot="body">
        <div class="form">
            <form>
                用户名：<input v-model="name">
                密码：<input type="password" v-model="password">
                <button @click.prevent="register()">注册</button>
                <button @click.prevent="login()">登录</button>
            </form>
        </div>
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
            // 暂时 登录，注册完成后刷新页面
            this.vxRegister({
                name: this.name,
                password: this.password
            })
            // .then(() => {
            //     window.location.reload()
            // })
            .catch(err => {
                window.alert(err)
            })
        },
        login () {
            console.log(this.name)
            this.vxLogin({
                name: this.name,
                password: this.password
            })
            // .then(() => {
            //     window.location.reload()
            // })
            .catch(err => {
                window.alert(err)
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
.form {
    padding: 30px;
}

</style>
