
//如果登录了直接进入个人中心页面
if(!getCookie('token')){
    location.href = '/login.html';
}