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
        const token = generateToken();
        localStorage.setItem('sessionToken', JSON.stringify({ token, expiry: Date.now() + 3 * 60 * 1000 }));  //3 minuta edhe skadon
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid email/username or password.';
    }
});

function generateToken() {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}
