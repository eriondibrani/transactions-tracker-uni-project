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

    const preStoredAccount = [
        {
            id: "1",
            username: "admin123",
            email: "admin@example.com",
            password: "admin123",
        },

    ];
        localStorage.setItem('users', JSON.stringify(preStoredAccounts));

    if (user) {
        const sessionToken = generateToken();
        const expiryTime = new Date().getTime() + 60 * 1000;

        localStorage.setItem('sessionToken', JSON.stringify({ token: sessionToken, expires: expiryTime }));
        localStorage.setItem('currentUser', JSON.stringify(user)); 

        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'Invalid email/username or password.';
    }
});

function generateToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
