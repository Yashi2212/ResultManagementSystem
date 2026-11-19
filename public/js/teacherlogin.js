document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userid = document.getElementById('userid').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    if(userid.length== 0 && userid.length < 3){
        errorMsg.textContent = 'Password should be at least 4 characters long.';
        return;  
    }
   if (password.length < 4 && password.length==0) {
        errorMsg.textContent = 'UserID should be at least 3 characters long.';
        return;
    }
});