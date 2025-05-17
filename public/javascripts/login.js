
const form = document.querySelector('#login-form');
const errorMsg = document.getElementById('error');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Clear previous error message
  errorMsg.textContent = '';
  
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    const dataResponse = await response.json();
    
    if (response.ok) {
      window.location.href = '/';
    } else {
      errorMsg.textContent = dataResponse.message || 'Login failed';
    }
  } catch (err) {
    console.error('Login error:', err);
    errorMsg.textContent = 'Something went wrong. Please try again.';
  }
});
