const navBarToggle = document.querySelector('.navBar-toggle');
const navBarLink = document.querySelector('.nav-links');

navBarToggle.addEventListener('click', () => {
    navBarToggle.classList.toggle('active');
    console.log("Toggle button clicked!");
    navBarLink.classList.toggle('active');
});
