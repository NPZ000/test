<template>
    <div class="main">
        <el-row class="tac" :gutter="20">
            <el-col :span="5">
                <el-menu
                class="el-menu-vertical-demo"
                :default-active="activeIndex"
                background-color="#545c64"
                text-color="#fff"
                router
                active-text-color="#ffd04b">
                    <el-menu-item index="List">
                        <i class="el-icon-document"></i>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="Edit">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统设置</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="17">
                <router-view></router-view>
            </el-col>
        </el-row>
            
    </div>
</template>
<script>
export default {
    name: 'Main',
    data() {
        return {
            activeIndex: 'List'
        }
    },
    methods: {
        
    },
    mounted() {
        this.activeIndex = this.$route.name
        console.log(this.$route.name)
    }
}
</script>
<style lang="stylus" scoped>
    .main 
        display flex
        width 80%
        margin 0 auto

        .tac 
            width 100%
    
</style>