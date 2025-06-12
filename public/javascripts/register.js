const formEl = document.querySelector('#register-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const errorMsg = document.getElementById('error');
const passwordMatch = document.getElementById('passwordMatch');

// Function to validate email format
function isValidEmail(emailValue) {
    return emailValue.includes('@') && emailValue.includes('.');
}

// Regex to validate username format (3-20 chars, letters, numbers, underscore). How cool is regex.
function isValidUsername(usernameValue) {
    return usernameValue.length >= 3 && usernameValue.length <= 20 && /^[a-zA-Z0-9_]+$/.test(usernameValue);
}

// Function to check if passwords match
function checkPasswordMatch() {
    if (password.value === '' && confirmPassword.value === '') {
        passwordMatch.textContent = '';
        passwordMatch.style.color = '';
        return;
    }
    if (password.value === confirmPassword.value) {
        passwordMatch.textContent = 'Passwords match';
        passwordMatch.style.color = 'green';
    } else {
        passwordMatch.textContent = 'Passwords do not match';
        passwordMatch.style.color = 'red';
    }
}

// Add event listeners for real-time password matching
password.addEventListener('input', checkPasswordMatch);
confirmPassword.addEventListener('input', checkPasswordMatch);

formEl.addEventListener('submit', async function(e) {
    e.preventDefault();
    errorMsg.textContent = '';

    if (!username.value || !email.value || !password.value || !confirmPassword.value) {
        errorMsg.textContent = 'All fields are required';
        return;
    }

    if (!isValidEmail(email.value)) {
        errorMsg.textContent = 'Invalid email format';
        return;
    }

    if (!isValidUsername(username.value)) {
        errorMsg.textContent = 'Username must be 3-20 characters and only contain letters, numbers, and underscores';
        return;
    }

    if (password.value.length < 8) {
        errorMsg.textContent = 'Password must be at least 8 characters long';
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMsg.textContent = 'Passwords do not match';
        return;
    }

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData); // js object

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const dataResponse = await response.json();

        if (!response.ok) {
            errorMsg.textContent = dataResponse.message || 'Registration failed';
            return;
        }

        window.location.href = '/login';
    } catch (err) {
        errorMsg.textContent = 'Something went wrong';
    }
});

