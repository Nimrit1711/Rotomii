const navBarToggle = document.querySelector('.navBar-toggle');
const navBarLink = document.querySelector('.nav-links');

navBarToggle.addEventListener('click', () => {
    navBarToggle.classList.toggle('active');
    navBarLink.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});
