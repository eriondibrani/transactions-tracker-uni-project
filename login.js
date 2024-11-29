document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const emailOrUsername = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    errorMessage.textContent = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
        (user) =>
            (user.email === emailOrUsername || user.username === emailOrUsername) &&
            user.password === password
    );

    if (user) {
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid email/username or password.';
    }
});
