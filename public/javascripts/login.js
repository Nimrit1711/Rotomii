

  const form = document.querySelector('#login-form');
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

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
      document.getElementById('error').textContent = dataResponse.message || 'login failed';
    }

  });




