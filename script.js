const activeApps = [
    {
        id: 80,
        name: "Disha Online Classes",
        img: "https://i.postimg.cc/L83KSY0N/image-search-1794827319389.png",
        servers: [
            { name: "Server 1", url: "https://primeverse.eu.cc/disha" }
        ]
    },
    {
        id: 76,
        name: "Eduteria",
        img: "https://i.postimg.cc/13xCjMbD/image-search-1787721768673.webp",
        servers: [
            { name: "Server 1", url: "https://all.codewithvivek.qzz.io/eduteria" }
        ]
    },
    {
        id: 2,
        name: "Khan Global Studies",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuCiwfy76ica73byqKIURXqN2Zi2h2Sdw0VJooGkXsyg&s",
        servers: [
            { name: "Server 1", url: "https://www.study-mate.in/batches" },
            { name: "Server 2", url: "https://primeverse.eu.cc/khan-gs" }
        ]
    },
    {
        id: 72,
        name: "Physics Wallah",
        img: "https://i.postimg.cc/ZRMVR91P/image-search-1791519463252.webp",
        servers: [
            { name: "Server 1", url: "https://madxrohitbihar-app.github.io/Physics-pro/" },
            { name: "Server 2", url: "https://vidcloud.eu.org/#batches" },
            { name: "Server 3", url: "https://www.learnxpw.site/study/batches" }
        ]
    },
    {
        id: 74,
        name: "Sachin Academy",
        img: "https://i.postimg.cc/MphZTcLR/image-search-1783742533521.jpg",
        servers: [
            { name: "Server 1", url: "https://studybeepro.site/sachinacademy/" },
            { name: "Server 2", url: "https://primeverse.eu.cc/sachin-academy" }
        ]
    },
    {
        id: 75,
        name: "Science and Fun",
        img: "https://i.postimg.cc/gksdc0cV/image-search-1791027234501.jpg",
        servers: [
            { name: "Server 1", url: "https://studybeepro.site/sf/" },
            { name: "Server 2", url: "https://primeverse.eu.cc/science-fun" }
        ]
    },
    {
        id: 21,
        name: "Vidyagram",
        img: "https://i.postimg.cc/PqbrQWnH/image-search-1791123215735.png",
        servers: [
            { name: "Server 1", url: "https://studybeepro.site/vidyagram/" },
            { name: "Server 2", url: "https://ais-pre-a5hvjqc66aerxlyco5jzkx-49225910278.asia-east1.run.app/" },
            { name: "Server 3", url: "https://primeverse.eu.cc/vidyagram" }
        ]
    }
];

let favorites = JSON.parse(localStorage.getItem('userFavs')) || [];
let currentTab = 'active';

const savedTheme = localStorage.getItem('portalTheme') || 'neon-gold';
document.body.setAttribute('data-theme', savedTheme);

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// DEVICE VERIFICATION SYSTEM FUNCTIONS
function openAroLinks() {
    const apiToken = "0aa19e644db340e405f3b7654cdc70f70d705966";
    const targetUrl = "https://madxrohitbihar-app.github.io/VIDYAGRAM-KYE/";
    const apiUrl = `https://arolinks.com/api?api=${apiToken}&url=${encodeURIComponent(targetUrl)}`;

    const msgDiv = document.getElementById("status-msg");
    msgDiv.style.color = "var(--neon-cyan)";
    msgDiv.innerText = "Generating Link...";
    showToast("Generating Access Link...");
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success" && data.shortenedUrl) {
                window.location.href = data.shortenedUrl;
            } else {
                msgDiv.style.color = "#ff4444";
                msgDiv.innerText = "Error generating link!";
                showToast("Error generating link!");
            }
        })
        .catch(() => {
            msgDiv.style.color = "#ff4444";
            msgDiv.innerText = "Network Error!";
            showToast("Network Error!");
        });
}

function verifyUserKey() {
    const userKey = document.getElementById("accessKeyInput").value.trim().toUpperCase();
    const msgDiv = document.getElementById("status-msg");
    
    const targetLen = 20; 
    if (userKey.length !== targetLen || !userKey.startsWith("MAD") || !userKey.endsWith("APP")) {
        msgDiv.style.color = "#ff4444";
        msgDiv.innerText = "⚠️ Invalid Access Key!";
        showToast("⚠️ Invalid Access Key!");
        return;
    }

    let usedKeys = JSON.parse(localStorage.getItem("usedKeysRegistry")) || {};
    const currentTime = new Date().getTime();

    if (usedKeys[userKey]) {
        msgDiv.style.color = "#ff4444";
        msgDiv.innerText = "⚠️ This key has already been used! Please generate a new key.";
        showToast("⚠️ Key already used!");
        return;
    }

    usedKeys[userKey] = currentTime;
    localStorage.setItem("usedKeysRegistry", JSON.stringify(usedKeys));

    const keyExpiryDuration = 24 * 60 * 60 * 1000; // 24 Hours
    const globalExpiryTime = currentTime + keyExpiryDuration; 
    localStorage.setItem("appAuthExpiry", globalExpiryTime);
    
    msgDiv.style.color = "var(--neon-green)";
    msgDiv.innerText = "Portal Unlocked Successfully!";
    showToast("Portal Unlocked Successfully!");

    setTimeout(() => {
        document.getElementById("authScreenWrapper").style.display = "none";
    }, 600);
}

function checkAuthStatus() {
    const expiryTime = localStorage.getItem("appAuthExpiry");
    const currentTime = new Date().getTime();
    const isVerified = expiryTime && currentTime < expiryTime;

    const authWrapper = document.getElementById('authScreenWrapper');
    if (authWrapper) {
        if (isVerified) {
            authWrapper.style.display = 'none';
        } else {
            authWrapper.style.display = 'flex';
        }
    }
}

function renderApps() {
    const activeContainer = document.getElementById('tab-active');
    if (activeContainer) {
        activeContainer.innerHTML = activeApps.map((app, index) => {
            const tagText = app.servers.length > 1 ? "Multiple Server" : "Single Server";
            return `
                <div class="app-card" data-name="${app.name.toLowerCase()}">
                    <div class="app-info">
                        <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">
                        <div class="app-details">
                            <span class="app-name">${index + 1}. ${app.name}</span>
                            <span class="app-tag">${tagText}</span>
                        </div>
                    </div>
                    <div class="app-actions">
                        <button class="fav-btn ${favorites.includes(app.id) ? 'active' : ''}" onclick="toggleFavorite(${app.id})">
                            <i class="fa-${favorites.includes(app.id) ? 'solid' : 'regular'} fa-heart"></i>
                        </button>
                        <button class="open-btn" onclick="handleAppClick(${app.id})">Open</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    const favContainer = document.getElementById('tab-favorites');
    if (favContainer) {
        const favApps = activeApps.filter(app => favorites.includes(app.id));

        if (favApps.length === 0) {
            favContainer.innerHTML = `<div class="no-data">No favorite apps saved yet.</div>`;
        } else {
            favApps.forEach((app) => {
                app.originalIndex = activeApps.findIndex(a => a.id === app.id) + 1;
            });
            favContainer.innerHTML = favApps.map(app => {
                const tagText = app.servers.length > 1 ? "Multiple Server" : "Single Server";
                return `
                    <div class="app-card" data-name="${app.name.toLowerCase()}">
                        <div class="app-info">
                            <img src="${app.img}" class="app-icon" alt="${app.name}" onerror="this.src='https://via.placeholder.com/48/0d1424/fff?text=App'">
                            <div class="app-details">
                                <span class="app-name">${app.originalIndex}. ${app.name}</span>
                                <span class="app-tag" style="color: var(--neon-pink);">Saved Item</span>
                            </div>
                        </div>
                        <div class="app-actions">
                            <button class="fav-btn active" onclick="toggleFavorite(${app.id})">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                            <button class="open-btn" onclick="handleAppClick(${app.id})">Open</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    updateCounts();
    filterApps();
}

function handleAppClick(appId) {
    const app = activeApps.find(item => item.id === appId);
    if (!app) return;

    if (app.servers.length === 1) {
        window.open(app.servers[0].url, '_blank');
        return;
    }

    const serverModal = document.getElementById('serverModal');
    const logoEl = document.getElementById('serverModalLogo');
    const titleEl = document.getElementById('serverModalTitle');
    const buttonsContainer = document.getElementById('serverButtonsList');

    logoEl.src = app.img;
    titleEl.innerText = `${app.name} - Servers`;
    
    buttonsContainer.innerHTML = app.servers.map(server => `
        <a href="${server.url}" target="_blank" class="btn-social btn-server" onclick="closeServerModal()">
            <i class="fa-solid fa-server"></i> ${server.name}
        </a>
    `).join('');

    serverModal.style.display = 'flex';
}

function closeServerModal() {
    document.getElementById('serverModal').style.display = 'none';
}

function openThemeModal() {
    document.getElementById('themeModal').style.display = 'flex';
}

function closeThemeModal() {
    document.getElementById('themeModal').style.display = 'none';
}

function setTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('portalTheme', themeName);
    closeThemeModal();
    showToast("Theme Updated Successfully!");
}

function updateCounts() {
    const countEl = document.getElementById('header-count');
    if (!countEl) return;
    
    if (currentTab === 'active') {
        countEl.innerText = `${activeApps.length} Available`;
    } else {
        const favCount = activeApps.filter(app => favorites.includes(app.id)).length;
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

    ['active', 'favorites'].forEach(tab => {
        const tabEl = document.getElementById(`tab-${tab}`);
        if (tabEl) tabEl.classList.add('hidden');
    });

    const targetTabEl = document.getElementById(`tab-${tabName}`);
    if (targetTabEl) targetTabEl.classList.remove('hidden');

    const sectionLabel = document.getElementById('section-label');
    const liveDot = document.getElementById('live-dot-indicator');

    if (sectionLabel && liveDot) {
        if (tabName === 'active') {
            sectionLabel.innerText = "All Active App";
            liveDot.style.display = "inline-block";
        } else {
            sectionLabel.innerText = "Favorite Apps";
            liveDot.style.display = "none";
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    renderApps();
}

function filterApps() {
    const searchInput = document.getElementById('searchInput');
    const currentTabEl = document.getElementById(`tab-${currentTab}`);
    if (!searchInput || !currentTabEl) return;

    const query = searchInput.value.toLowerCase();
    currentTabEl.querySelectorAll('.app-card').forEach(card => {
        const name = card.getAttribute('data-name');
        card.style.display = (!name || name.includes(query)) ? 'flex' : 'none';
    });
}

// BFCache and Back Navigation handling to instantly show portal without splash screen
window.addEventListener('pageshow', function(event) {
    const splash = document.getElementById("splash-screen");
    if (splash) {
        splash.classList.add("hide-splash");
    }
    checkAuthStatus();
    renderApps();
});

document.addEventListener("DOMContentLoaded", function () {
    const splash = document.getElementById("splash-screen");
    const popupModal = document.getElementById("popupModal");

    setTimeout(function () {
        if (splash) {
            splash.classList.add("hide-splash");
        }

        checkAuthStatus();

        if (!sessionStorage.getItem("popupShownOnce")) {
            if (popupModal) {
                popupModal.style.display = "flex";
            }
        }
    }, 4000);

    renderApps();
});

function closePopup() {
    const popupModal = document.getElementById("popupModal");
    if (popupModal) {
        popupModal.style.display = "none";
    }
    sessionStorage.setItem("popupShownOnce", "true");
}
