const formEl = document.querySelector('#register-form');

formEl.addEventListener('submit', async function(e) {
    e.preventDefault();
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
      document.getElementById('error').textContent = dataResponse.message || 'Registration failed';
      return;
    }

    //redirection
    window.location.href = '/login';
  } catch (err) {
    console.error('Signup error:', err);
    document.getElementById('error').textContent = 'Something went wrong';
  }

});

