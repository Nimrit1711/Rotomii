document.querySelector('.login form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (response.ok) {
    window.location.href = '/dashboard';
  } else {
    console.log(data.message);
  }
});
