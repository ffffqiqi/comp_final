// 获取提交按钮的引用
const submitButton = document.querySelector('.submit');

// 点击事件处理程序
submitButton.addEventListener('click', (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    const usernameInput = document.querySelector('.username');
    const passwordInput = document.querySelector('.password');

    // 获取用户名和密码的值
    const username = usernameInput.value;
    const password = passwordInput.value;

    // 检查用户名和密码是否正确
    if (username === 'fangqiqi' && password === '123456') {
        // 当用户名和密码正确时，跳转到端口为 7000 的页面
        window.location.href = 'http://localhost:7000/';
    } else {
        // 当用户名和密码不正确时，弹出提示窗口
        alert('用户名或密码不正确');
    }
});
