import { get, post } from './http'
/* 
    所有的请求统一放在这里便于管理
    放在一个对象里，暴露出去
    在页面里直接调用对象里的方法就行了 
*/

// 也可以像这样单个方法暴露出去
// export const apiAddress = p => post('http://calman.jctmj.net/index.php/Home/Login/pwdInit', p);

// 请求的列表
const requestList = {
    // 登录
    login(data) {
        return get('http://login')
    },

    // 获取用户列表
    getUserList() {
        return get('http://userList')
    },

    // 查找用户
    search(data) {
        return get('http://search', data)
    },

    // 添加用户
    add(data) {
        return post('http://add', data)
    },

    // 修改
    edit(data) {
        return post('http://edit', data)
    },

    // 删除
    del(data) {
        return post('http://del', data)
    },

    // 登出
    logout() {
        return get('http://logout')
    }
}

export default requestList;
