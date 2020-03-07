import Mock from 'mockjs';
const Random = Mock.Random

Mock.mock('http://login', {
    "code": 200
})
let userList
// 用户数据
const userData = () => {
    let users = []
    for (let i = 0; i < 5; i++) {
      let user = {
        'id': i + 1,
        'name': Random.cname(),
        'address': Mock.mock('@county(true)'),
        'phone': Mock.mock(/^1[0-9]{10}$/)
      }
      users.push(user)
    }
    return users
}
userList = userData()

Mock.mock('http://userList', {"code": 200, "data": userList})

Mock.mock('http://logout', {"code": 200})

Mock.mock(RegExp('http://search.*'), 'get', options => {
    let phone = parseInt(options.url.split("=")[1])
    for (let item of userList) {
        if (item.phone == phone) {
            return {"code": 200, "data":item}
        }
    }
    return {"code": 400}
})
/**
 * 
 * @param {主体} body 
 * @param {值} Value 
 */
function getValue(body, Value) {
       let vars = body.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == Value){return pair[1];}
       }
       return(false);
}

Mock.mock('http://add', 'post', options => {
    let body = options.body
    console.log(body)
    let name = getValue(body, 'name')
    let address = getValue(body, 'address')
    let phone = getValue(body, 'phone')
    let newUser = {
        "id": userList.length + 1,
        "name": name,
        "address": address,
        "phone": phone
    }
    userList.unshift(newUser)
    
    return {"code": 200, data: userList}
})

Mock.mock('http://edit', 'post', options => {
    let body = options.body
    let name = getValue(body, 'name')
    let address = getValue(body, 'address')
    let phone = getValue(body, 'phone')
    let id = getValue(body, 'id')
    let newUserData = {
        "id": id,
        "name": decodeURIComponent(name),
        "address": decodeURIComponent(address),
        "phone": phone
    }
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == id) {
            userList[i] = newUserData
        }
    }
    return {"code": 200, data: userList}
})

Mock.mock('http://del', 'post', options => {
    let body = options.body
    let id = getValue(body, 'id')
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == id) {
            userList.splice(i, 1)
        }
    }
    return {"code": 200, data: userList}
})