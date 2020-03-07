<template>
    <div class="login">
        <div class="loginBlock">
            <p>欢迎登录</p>
            <el-input placeholder="请输入账号" clearable v-model="username" class="input"></el-input>
            <el-input placeholder="请输入密码" show-password v-model="password" class="input"></el-input>
            <el-button @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
import requestList from '@/request/api';
import md5 from 'js-md5';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            flag: false
        }
    },
    methods: {
        // 登录
        login() {
            let { username, password, flag } = this
            if (flag) {
                return
            }
            if (!username) {
                this.$message('请填写账号')
                return
            }
            if (!password) {
                this.$message('请填写密码')
                return
            }
            this.flag = true
            let data = {
                username: md5(username.trim()),
                password: md5(password.trim())
            }
            console.log(data)
            requestList.login().then(res => {
                if (res.code === 200) {
                    this.$router.push({path: '/main'})
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .loginBlock 
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)

        .input
            margin-bottom 20px
</style>