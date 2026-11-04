// Data Source Definition - Sorted Alphabetically (A to Z) without DISHA Online
const activeApps = [
    { id: 76, name: "Eduteria", img: "https://i.postimg.cc/13xCjMbD/image-search-1787721768673.webp", link: "https://all.codewithvivek.qzz.io/eduteria" },
    { id: 2, name: "Khan Global Studies", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuCiwfy76ica73byqKIURXqN2Zi2h2Sdw0VJooGkXsyg&s", link: "https://studymate-v14-13-07-11-17.onrender.com/batches" },
    { id: 72, name: "Physics Wallah", img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp", link: "https://www.learnxpw.site/study/batches" },
    { id: 73, name: "Physics Wallh 2 ", img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp", link: "https://vidcloud.eu.org/#batches" },
    { id: 74, name: "Sachin Academy", img: "https://i.postimg.cc/MphZTcLR/image-search-1783742533521.jpg", link: "https://studybeepro.site/sachinacademy/" },
    { id: 75, name: "Science and Fun", img: "https://i.postimg.cc/gksdc0cV/image-search-1791027234501.jpg", link: "https://studybeepro.site/sf/" },
    { id: 21, name: "Vidyagram", img: "https://i.postimg.cc/PqbrQWnH/image-search-1791123215735.png", link: "https://studybeepro.site/vidyagram/" },
    { id: 78, name: "Vidyagram 2", img: "https://i.postimg.cc/PqbrQWnH/image-search-1791123215735.png", link: "https://madxrohitbihar-app.github.io/Vidyagram-pro/" },
    { id: 77, name: "Yes Officer", img: "https://i.postimg.cc/RCLCNqRm/image-search-1793245189282.jpg", link: "https://studybeepro.site/yesoff/index.html" },
    { id: 79, name: "Yes Officer 2", img: "https://i.postimg.cc/RCLCNqRm/image-search-1793245189282.jpg", link: "https://yes.learnvortex.cc.cd/" }
];

const upcomingApps = [];

let favorites = JSON.parse(localStorage.getItem('userFavs')) || [];
let currentTab = 'active';

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function renderApps() {
    // Render Active Apps
    const activeContainer = document.getElementById('tab-active');
    activeContainer.innerHTML = activeApps.map(app => `
        <div class="app-card" data-name="${app.name.toLowerCase()}">
            <div class="app-info">
                <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">
                <div class="app-details">
                    <span class="app-name">${app.name}</span>
                    <span class="app-tag">Server Active</span>
                </div>
            </div>
            <div class="app-actions">
                <button class="fav-btn ${favorites.includes(app.id) ? 'active' : ''}" onclick="toggleFavorite(${app.id})">
                    <i class="fa-${favorites.includes(app.id) ? 'solid' : 'regular'} fa-heart"></i>
                </button>
                <a href="${app.link}" class="open-btn" target="_blank">Open</a>
            </div>
        </div>
    `).join('');

    // Render Upcoming Apps
    const upcomingContainer = document.getElementById('tab-upcoming');
    if (upcomingApps.length === 0) {
        upcomingContainer.innerHTML = `<div class="no-data">No upcoming apps at the moment.</div>`;
    } else {
        upcomingContainer.innerHTML = upcomingApps.map(app => `
            <div class="app-card" data-name="${app.name.toLowerCase()}">
                <div class="app-info">
                    <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">
                    <div class="app-details">
                        <span class="app-name">${app.name}</span>
                        <span class="app-tag" style="color: var(--neon-cyan);">Coming Soon</span>
                    </div>
                </div>
                <div class="app-actions">
                    <button class="fav-btn ${favorites.includes(app.id) ? 'active' : ''}" onclick="toggleFavorite(${app.id})">
                        <i class="fa-${favorites.includes(app.id) ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                    <a href="${app.link}" class="open-btn" target="_blank">Open</a>
                </div>
            </div>
        `).join('');
    }

    // Render Favorites Tab
    const favContainer = document.getElementById('tab-favorites');
    const allApps = activeApps.concat(upcomingApps);
    const favApps = allApps.filter(app => favorites.includes(app.id));

    if (favApps.length === 0) {
        favContainer.innerHTML = `<div class="no-data">No favorite apps saved yet.</div>`;
    } else {
        favContainer.innerHTML = favApps.map(app => `
            <div class="app-card" data-name="${app.name.toLowerCase()}">
                <div class="app-info">
                    <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">
                    <div class="app-details">
                        <span class="app-name">${app.name}</span>
                        <span class="app-tag" style="color: var(--neon-pink);">Saved Item</span>
                    </div>
                </div>
                <div class="app-actions">
                    <button class="fav-btn active" onclick="toggleFavorite(${app.id})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <a href="${app.link}" class="open-btn" target="_blank">Open</a>
                </div>
            </div>
        `).join('');
    }

    updateCounts();
    filterApps();
}

function updateCounts() {
    const countEl = document.getElementById('header-count');
    if (currentTab === 'active') {
        countEl.innerText = `${activeApps.length} Available`;
    } else if (currentTab === 'upcoming') {
        countEl.innerText = `${upcomingApps.length} Coming Soon`;
    } else {
        const allApps = activeApps.concat(upcomingApps);
        const favCount = allApps.filter(app => favorites.includes(app.id)).length;
        countEl.innerText = `${favCount} Saved`;
    }
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
        showToast("Removed from Favorites");
    } else {
        favorites.push(id);
        showToast("Added to Favorites");
    }
    localStorage.setItem('userFavs', JSON.stringify(favorites));
    renderApps();
}

function switchTab(tabName, element) {
    currentTab = tabName;
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');

    ['active', 'upcoming', 'favorites'].forEach(tab => {
        document.getElementById(`tab-${tab}`).classList.add('hidden');
    });

    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    const sectionLabel = document.getElementById('section-label');
    const liveDot = document.getElementById('live-dot-indicator');

    if (tabName === 'active') {
        sectionLabel.innerText = "All Active App";
        liveDot.style.display = "inline-block";
    } else if (tabName === 'upcoming') {
        sectionLabel.innerText = "Upcoming Apps";
        liveDot.style.display = "none";
    } else {
        sectionLabel.innerText = "Favorite Apps";
        liveDot.style.display = "none";
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('searchInput').value = '';
    renderApps();
}

function filterApps() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const currentTabEl = document.getElementById(`tab-${currentTab}`);
    currentTabEl.querySelectorAll('.app-card').forEach(card => {
        const name = card.getAttribute('data-name');
        card.style.display = (!name || name.includes(query)) ? 'flex' : 'none';
    });
}

/* =========================================
   AUTHENTICATION CHECK
========================================== */

function checkAuthStatus() {
    const expiryTime = localStorage.getItem("app_expiry_time");
    const authScreen = document.getElementById("authScreen");
    if (!authScreen) return;
    const now = Date.now();
    if (expiryTime && now < parseInt(expiryTime, 10)) {
        authScreen.style.display = "none";
    } else {
        authScreen.style.display = "flex";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
    renderApps();
});

window.addEventListener("pageshow", function () {
    checkAuthStatus();
});

document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        checkAuthStatus();
    }
});

/* =========================================
   GENERATE SECRET KEY & AROLINKS
========================================== */

function generateSecretKey() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let middlePart = "";
    for (let i = 0; i < 14; i++) {
        middlePart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return "MAD" + middlePart + "APP";
}

function openAroLinks() {
    const apiToken = "0aa19e644db340e405f3b7654cdc70f70d705966";
    const freshKey = generateSecretKey();
    localStorage.setItem("expected_app_key", freshKey);

    const targetUrl = "https://madxrohitbihar-app.github.io/VIDYAGRAM-KYE/?key=" + encodeURIComponent(freshKey);
    const apiUrl = `https://arolinks.com/api?api=${apiToken}&url=${encodeURIComponent(targetUrl)}`;

    const msgDiv = document.getElementById("status-msg");
    msgDiv.style.color = "#00f2fe";
    msgDiv.innerText = "Generating Token...";

    fetch(apiUrl)
        .then(function (response) { return response.json(); })
        .then(function (data) {
            if (data.status === "success" && data.shortenedUrl) {
                window.location.href = data.shortenedUrl;
            } else {
                msgDiv.style.color = "#ff4d4d";
                msgDiv.innerText = "Error generating link!";
            }
        })
        .catch(function () {
            msgDiv.style.color = "#ff4d4d";
            msgDiv.innerText = "Network Error!";
        });
}

function verifyUserKey() {
    const userKey = document.getElementById("accessKeyInput").value.trim().toUpperCase();
    const expectedKey = localStorage.getItem("expected_app_key");
    const usedKeys = JSON.parse(localStorage.getItem("used_app_keys") || "[]");
    const msgDiv = document.getElementById("status-msg");

    if (!userKey) {
        msgDiv.style.color = "#ff4d4d";
        msgDiv.innerText = "Please enter access key!";
        return;
    }

    const patternValid = userKey.startsWith("MAD") && userKey.endsWith("APP") && userKey.length === 20;

    if (!patternValid) {
        msgDiv.style.color = "#ff4d4d";
        msgDiv.innerText = "Invalid token format!";
        return;
    }

    if (usedKeys.includes(userKey)) {
        msgDiv.style.color = "#ff4d4d";
        msgDiv.innerText = "This token has already been used! Please generate a new key.";
        return;
    }

    if ((expectedKey && userKey === expectedKey) || patternValid) {
        usedKeys.push(userKey);
        localStorage.setItem("used_app_keys", JSON.stringify(usedKeys));

        const twentyFourHours = 24 * 60 * 60 * 1000;
        const expiryTimestamp = Date.now() + twentyFourHours;
        localStorage.setItem("app_expiry_time", expiryTimestamp);

        document.getElementById("authScreen").style.display = "none";

        if (window.history && window.history.replaceState) {
            const cleanUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({ path: cleanUrl }, "", cleanUrl);
        }
    } else {
        msgDiv.style.color = "#ff4d4d";
        msgDiv.innerText = "Invalid Access Token!";
    }
}

/* =========================================
   SPLASH + POPUP + URL KEY
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splash-screen");

    if (!sessionStorage.getItem("splashShown")) {
        setTimeout(function () {
            splash.classList.add("hide-splash");
            sessionStorage.setItem("splashShown", "true");
        }, 1200);
    } else {
        splash.style.display = "none";
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlKey = urlParams.get("key");

    if (urlKey) {
        document.getElementById("accessKeyInput").value = urlKey;
        localStorage.setItem("expected_app_key", urlKey);
    }

    if (!sessionStorage.getItem("popupShown")) {
        setTimeout(function () {
            document.getElementById("popupModal").style.display = "flex";
        }, 2000);
    }

    checkAuthStatus();
});

function closePopup() {
    document.getElementById("popupModal").style.display = "none";
    sessionStorage.setItem("popupShown", "true");
}
