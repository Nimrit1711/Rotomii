
let darkMode = localStorage.getItem('darkMode');
const themeSwitch = document.getElementById('theme-switch');

function updateThemePreference(theme) {
    try {
    fetch('/profile/update-theme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ theme })
    });
} catch(err) {
    console.error("Theme update failed:", err);
    }
}

const enableDarkMode = () => {
    document.body.classList.add('darkMode');
    localStorage.setItem('darkMode', 'active');

};

const disableDarkMode = () => {
    document.body.classList.remove('darkMode');
    localStorage.setItem('darkMode',null);
    updateThemePreference('Light');
};



if(darkMode === "active"){
    updateThemePreference('Dark');
    enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
    darkMode = localStorage.getItem('darkMode');
    if(darkMode !== "active"){
        enableDarkMode();
    } else{
        disableDarkMode();
    }
});



