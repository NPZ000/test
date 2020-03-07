<template>
    <div>
        <el-button type="primary" @click="logout">登出</el-button>
    </div>
</template>

<script>
import requestList from '@/request/api';
export default {
    name: 'Edit',
    data() {
        return {
            flag: false
        }
    },
    methods: {
        logout() {
            if (this.flag) {
                return
            }
            requestList.logout().then(res => {
                if (res.code === 200) {
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>