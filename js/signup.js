document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];


    if (users.some(user => user.email === email || user.username === username)) {
        errorMessage.textContent = 'An account with this email or username already exists!';
        return;
    }

    const userId = generateGUID();
    const newUser = { id: userId, email, username, password };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = 'login.html';
});

function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}



