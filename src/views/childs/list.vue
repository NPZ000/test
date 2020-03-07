<template>
    <div>
        <div class="search">
            <el-input class="input" placeholder="请输入手机号" v-model="phone"></el-input>
            <el-button class="btn" @click="search">查找</el-button>
        </div>
        <div class="add">
            <el-button type="primary" class="addBtn" @click="add()">添加用户</el-button>
        </div>
        <el-table
        :data="userList"
        style="width: 100%">
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form">
                <el-input v-model="form.id" type='hidden'></el-input>
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="address"> 
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import requestList from '@/request/api';
export default {
    name: 'List',
    data() {
        return {
            userList: [

            ],
            phone: '',
            form: {
                id: '',
                name: '',
                address:'',
                phone: ''
            },
            formLabelWidth: '50px',
            dialogTableVisible: false,
            dialogFormVisible: false,
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                phone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { min: 3, max: 11, trigger: 'blur' }
                ]
            },
            isEdit: false
        }
    },
    methods: {
        // 查找用户
        search() {
            if (!this.phone) {
                return 
            }
            requestList.search({phone: this.phone}).then(res => {
                if (res.code === 200) {
                    this.userList = [res.data]
                } else {
                    this.$message('暂无此人')
                }
            })
        },
        // 添加按钮
        add() {
            this.dialogFormVisible = true
            this.form.id = ''
            this.form.name = ''
            this.form.address = ''
            this.form.phone = ''

        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.dialogFormVisible = false
                if (this.isEdit) {
                    requestList.edit(this.form).then(res => {
                        if (res.code === 200) {
                            this.userList = res.data
                            this.isEdit = false
                        }
                    })
                } else {
                    requestList.add(this.form).then(res => {
                        if (res.code === 200) {
                            this.userList = res.data
                        }
                    })
                }
            } else {
                console.log('error submit!!');
                return false;
            }
            });
            
        },
        // 编辑用户
        edit(row) {
            this.dialogFormVisible = true
            this.form.id = row.id
            this.form.name = row.name
            this.form.address = row.address
            this.form.phone = row.phone
            this.isEdit = true
        },
        // 删除用户
        del(row) {
            let id = row.id
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                requestList.del({'id': id}).then(res => {
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.userList = res.data
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                }); 
            })
        }
    },
    mounted() {
        requestList.getUserList().then(res => {
            if (res.code === 200) {
                this.userList = res.data
            }
        })
    }
}
</script>

<style lang="stylus" scoped>
    .search
        display flex
        margin-bottom 10px

        .input 
            width 20%
            margin-right 20px
        
        .btn
            width 10%
    
    .add
        display flex

        .addBtn 
            width 16%
</style>