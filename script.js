// VOYAGR TRAVEL - JAVASCRIPT

// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// 2. CURRENT YEAR
const currentYear = document.getElementById("currentYear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// 3. TOAST NOTIFICATION
let toastTimer;
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) {
        alert(message);
        return;
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3500);
}

// 4. DUMMY DESTINATION DATA
const destinations = [
    {
        id: 1,
        name: "Kerala",
        category: "Domestic",
        description: "Discover peaceful backwaters, lush green landscapes, and relaxing nature escapes.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 2,
        name: "Goa",
        category: "Domestic",
        description: "Enjoy beautiful beaches, coastal scenery, and exciting holiday experiences.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 3,
        name: "Ooty",
        category: "Domestic",
        description: "Experience cool weather, scenic hills, tea gardens, and beautiful viewpoints.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 4,
        name: "Singapore",
        category: "International",
        description: "Explore modern attractions, beautiful gardens, and a vibrant international city.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 5,
        name: "Bali",
        category: "International",
        description: "Discover tropical landscapes, cultural experiences, and peaceful coastal escapes.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 6,
        name: "Himalayas",
        category: "Adventure",
        description: "Experience mountain scenery, trekking opportunities, and unforgettable outdoor adventures.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
    }
];

// 5. DUMMY TRAVEL PACKAGE DATA
const packages = [
    {
        id: 1,
        name: "Kerala Nature Escape",
        destination: "Kerala",
        category: "Domestic",
        duration: "4 Days / 3 Nights",
        price: 9999,
        inclusions: ["Accommodation", "Transport", "Food"],
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 2,
        name: "Goa Beach Holiday",
        destination: "Goa",
        category: "Domestic",
        duration: "3 Days / 2 Nights",
        price: 11999,
        inclusions: ["Accommodation", "Transport"],
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 3,
        name: "Singapore Discovery",
        destination: "Singapore",
        category: "International",
        duration: "5 Days / 4 Nights",
        price: 39999,
        inclusions: ["Accommodation", "Transport", "Food"],
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85"
    }
];

// 6. FORMAT PRICE

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

// 7. DISPLAY DESTINATIONS

function displayDestinations(category = "all") {
    const grid = document.getElementById("homeDestinationGrid");
    if (!grid) {
        return;
    }
    const filteredDestinations = category === "all"
        ? destinations
        : destinations.filter(function (destination) {
            return destination.category === category;
        });
    grid.replaceChildren();
    if (filteredDestinations.length === 0) {
        const message = document.createElement("p");
        message.className = "loading-message";
        message.textContent = "No destinations found in this category.";
        grid.appendChild(message);
        return;
    }
    filteredDestinations.forEach(function (destination) {
        const card = document.createElement("article");
        card.className = "destination-card reveal";
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "destination-image";
        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.name;
        image.loading = "lazy";
        const tag = document.createElement("span");
        tag.className = "destination-tag";
        tag.textContent = destination.category;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(tag);
        const content = document.createElement("div");
        content.className = "destination-card-content";
        const title = document.createElement("h3");
        title.textContent = destination.name;
        const description = document.createElement("p");
        description.textContent = destination.description;
        const footer = document.createElement("div");
        footer.className = "destination-card-footer";
        const categoryLabel = document.createElement("span");
        categoryLabel.className = "destination-category";
        categoryLabel.textContent = destination.category;
        const link = document.createElement("a");
        link.className = "destination-link";
        link.href = "destination.html";
        link.textContent = "Explore →";
        footer.appendChild(categoryLabel);
        footer.appendChild(link);
        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(footer);
        card.appendChild(imageWrapper);
        card.appendChild(content);
        grid.appendChild(card);
    });
    observeRevealElements();
}

// 8. DESTINATION CATEGORY FILTER

const categoryTabs = document.getElementById("categoryTabs");
if (categoryTabs) {
    categoryTabs.addEventListener("click", function (event) {
        const button = event.target.closest(".category-tab");
        if (!button) {
            return;
        }
        categoryTabs.querySelectorAll(".category-tab").forEach(function (tab) {
            tab.classList.remove("active");
        });
        button.classList.add("active");
        displayDestinations(button.dataset.category);
    });
}

// 9. DISPLAY TRAVEL PACKAGES

function displayPackages() {
    const grid = document.getElementById("homePackageGrid");
    if (!grid) {
        return;
    }
    grid.replaceChildren();
    packages.forEach(function (travelPackage) {
        const card = document.createElement("article");
        card.className = "package-card reveal";
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "package-image";
        const image = document.createElement("img");
        image.src = travelPackage.image;
        image.alt = travelPackage.name;
        image.loading = "lazy";
        const label = document.createElement("span");
        label.className = "package-label";
        label.textContent = travelPackage.category;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(label);
        const content = document.createElement("div");
        content.className = "package-content";
        const title = document.createElement("h3");
        title.textContent = travelPackage.name;
        const duration = document.createElement("p");
        duration.className = "package-duration";
        duration.textContent = travelPackage.duration;
        const inclusions = document.createElement("div");
        inclusions.className = "package-inclusions";
        travelPackage.inclusions.forEach(function (item) {
            const inclusion = document.createElement("span");
            inclusion.textContent = item;
            inclusions.appendChild(inclusion);
        });
        const bottom = document.createElement("div");
        bottom.className = "package-bottom";
        const price = document.createElement("div");
        price.className = "package-price";
        const priceLabel = document.createElement("small");
        priceLabel.textContent = "Estimated price / person";
        const priceValue = document.createElement("strong");
        priceValue.textContent = formatPrice(travelPackage.price);
        price.appendChild(priceLabel);
        price.appendChild(priceValue);
        const link = document.createElement("a");
        link.className = "package-link";
        link.href = "package.html";
        link.textContent = "View Details →";
        bottom.appendChild(price);
        bottom.appendChild(link);
        content.appendChild(title);
        content.appendChild(duration);
        content.appendChild(inclusions);
        content.appendChild(bottom);
        card.appendChild(imageWrapper);
        card.appendChild(content);
        grid.appendChild(card);
    });
    observeRevealElements();
}

// 10. HOMEPAGE TRAVEL SEARCH

const travelSearch = document.getElementById("travelSearch");
if (travelSearch) {
    travelSearch.addEventListener("submit", function (event) {
        event.preventDefault();
        const category = document.getElementById("searchCategory").value;
        const travelDate = document.getElementById("travelDate").value;
        const travellers = document.getElementById("travellers").value;
        if (travelDate) {
            const selectedDate = new Date(travelDate + "T00:00:00");
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                showToast("Please select today or a future travel date.");
                return;
            }
        }
        const destinationSection =  document.getElementById("featuredDestinations");
        const categoryButton = categoryTabs
            ? Array.from(
                categoryTabs.querySelectorAll(".category-tab")
            ).find(function (button) {
                return button.dataset.category === category;
            })
            : null;
        if (categoryTabs && categoryButton) {
            categoryTabs.querySelectorAll(".category-tab").forEach(function (button) {
                button.classList.remove("active");
            });
            categoryButton.classList.add("active");
        }
        displayDestinations(category);
        if (destinationSection) {
            destinationSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
        let message = "Showing destinations";
        if (category !== "all") {
            message += " for " + category;
        }
        message += " · " + travellers + " traveller(s)";
        if (travelDate) {
            message += " · " + travelDate;
        }
        showToast(message);
    });
}

// 11. DEMO LOGIN FORM

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        if (!email || !password) {
            showToast("Please enter your email and password.");
            return;
        }
        showToast(
            "Demo login only. Real authentication is not connected yet."
        );
        loginForm.reset();
    });
}

// 12. SCROLL REVEAL ANIMATION

let revealObserver;
function observeRevealElements() {
    const elements = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("visible");
        });
        return;
    }
    if (!revealObserver) {
        revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });
    }
    elements.forEach(function (element) {
        revealObserver.observe(element);
    });
}

// 13. DEMO API CONNECTION

async function testDemoAPI() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );
        if (!response.ok) {
            throw new Error("The API request failed.");
        }
        const data = await response.json();
        console.log("Demo API response:", data);
    } catch (error) {
        console.error("Demo API error:", error.message);
    }
}

// 14. INITIALIZE HOMEPAGE

displayDestinations();
displayPackages();
observeRevealElements();
testDemoAPI();

// DESTINATION PAGE DATA

const destinationPageData = [
    // DOMESTIC DESTINATIONS
    {
        name: "Ooty",
        category: "Domestic",
        emoji: "🏔️",
        country: "Tamil Nadu, India",
        description: "Enjoy cool weather, green tea gardens, mountain views, and peaceful hill stations.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Kerala",
        category: "Domestic",
        emoji: "🌿",
        country: "Kerala, India",
        description: "Discover beautiful backwaters, lush landscapes, waterfalls, and relaxing nature escapes.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Goa",
        category: "Domestic",
        emoji: "🏖️",
        country: "Goa, India",
        description: "Relax on golden beaches and experience coastal scenery, local food, and exciting activities.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Jaipur",
        category: "Domestic",
        emoji: "🏰",
        country: "Rajasthan, India",
        description: "Explore magnificent forts, royal palaces, colourful markets, and historic architecture.",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Manali",
        category: "Domestic",
        emoji: "❄️",
        country: "Himachal Pradesh, India",
        description: "Discover snow-covered mountains, pine forests, scenic valleys, and charming hill views.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Madurai",
        category: "Domestic",
        emoji: "🛕",
        country: "Tamil Nadu, India",
        description: "Experience historic temples, traditional culture, colourful streets, and local cuisine.",
        image: "https://images.unsplash.com/photo-1600100397608-f010c8f4e5a2?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Andaman Islands",
        category: "Domestic",
        emoji: "🌊",
        country: "India",
        description: "Enjoy turquoise waters, tropical islands, coral reefs, and beautiful beaches.",
        image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Mysore",
        category: "Domestic",
        emoji: "👑",
        country: "Karnataka, India",
        description: "Visit grand palaces, peaceful gardens, and places filled with history and culture.",
        image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Darjeeling",
        category: "Domestic",
        emoji: "🍃",
        country: "West Bengal, India",
        description: "Admire tea plantations, mountain scenery, misty mornings, and charming viewpoints.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85"
    },

    // INTERNATIONAL DESTINATIONS

    {
        name: "Singapore",
        category: "International",
        emoji: "🌆",
        country: "Singapore",
        description: "Explore modern attractions, beautiful gardens, waterfront views, and vibrant city life.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Bali",
        category: "International",
        emoji: "🌴",
        country: "Indonesia",
        description: "Discover tropical beaches, green rice terraces, cultural landmarks, and peaceful escapes.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Paris",
        category: "International",
        emoji: "🗼",
        country: "France",
        description: "Experience famous landmarks, charming streets, art, architecture, and romantic city views.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Dubai",
        category: "International",
        emoji: "🏙️",
        country: "United Arab Emirates",
        description: "Discover impressive skyscrapers, desert landscapes, shopping destinations, and attractions.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Switzerland",
        category: "International",
        emoji: "🏞️",
        country: "Europe",
        description: "Admire alpine mountains, crystal-clear lakes, scenic villages, and beautiful landscapes.",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "New York",
        category: "International",
        emoji: "🗽",
        country: "United States",
        description: "Explore famous city landmarks, vibrant neighbourhoods, museums, and exciting city life.",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=85"
    },
    // ADVENTURE DESTINATIONS
    {
        name: "Himalayas",
        category: "Adventure",
        emoji: "⛰️",
        country: "Northern India",
        description: "Discover mountain trails, spectacular peaks, and unforgettable outdoor experiences.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Rishikesh",
        category: "Adventure",
        emoji: "🛶",
        country: "Uttarakhand, India",
        description: "Experience river rafting, riverside landscapes, trekking, and outdoor adventures.",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Ladakh",
        category: "Adventure",
        emoji: "🏍️",
        country: "India",
        description: "Travel through dramatic mountain roads, high-altitude lakes, and breathtaking valleys.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85"
    },
    {
        name: "Spiti Valley",
        category: "Adventure",
        emoji: "🥾",
        country: "Himachal Pradesh, India",
        description: "Explore rugged mountains, remote villages, winding roads, and dramatic Himalayan scenery.",
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85"
    }
];

// DISPLAY DESTINATIONS

const destinationPageGrid = document.getElementById("destinationPageGrid");
const destinationPageTabs = document.getElementById("destinationPageTabs");
function displayDestinationPage(category = "all") {
    if (!destinationPageGrid) return;
    const filteredDestinations = category === "all" ? destinationPageData : destinationPageData.filter(function (destination) {
                return destination.category === category;
            });
    destinationPageGrid.replaceChildren();
    if (filteredDestinations.length === 0) {
        const message = document.createElement("p");
        message.className = "destination-empty";
        message.textContent = "No destinations found.";
        destinationPageGrid.appendChild(message);
        return;
    }
    filteredDestinations.forEach(function (destination) {
        const card = document.createElement("article");
        card.className = "destination-card";
        // Image
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "destination-image";
        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.name;
        image.loading = "lazy";
        const tag = document.createElement("span");
        tag.className = "destination-tag";
        tag.textContent = destination.emoji + " " + destination.category;
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(tag);

        // Card content
        const content = document.createElement("div");
        content.className = "destination-card-content";
        const title = document.createElement("h3");
        title.textContent = destination.emoji + " " + destination.name;
        const location = document.createElement("p");
        location.className = "destination-location";
        location.textContent = "📍 " + destination.country;
        const description = document.createElement("p");
        description.textContent = destination.description;

        // Card footer
        const footer = document.createElement("div");
        footer.className = "destination-card-footer";
        const categoryLabel = document.createElement("span");
        categoryLabel.className = "destination-category";
        categoryLabel.textContent = destination.category;
        const link = document.createElement("a");
        link.className = "destination-link";
        link.href = "plan-trip.html";
        link.textContent = "Plan a Trip ↗";
        footer.appendChild(categoryLabel);
        footer.appendChild(link);
        // Assemble card
        content.appendChild(title);
        content.appendChild(location);
        content.appendChild(description);
        content.appendChild(footer);
        card.appendChild(imageWrapper);
        card.appendChild(content);
        destinationPageGrid.appendChild(card);
    });
}

// FILTER DESTINATIONS

if (destinationPageTabs) {
    destinationPageTabs.addEventListener("click", function (event) {
        const button = event.target.closest(".category-tab");
        if (!button) return;
        destinationPageTabs
            .querySelectorAll(".category-tab")
            .forEach(function (tab) {
                tab.classList.remove("active");
                tab.setAttribute("aria-pressed", "false");
            });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        displayDestinationPage(button.dataset.category);
    });
}

// Show all destinations when the page loads.
displayDestinationPage();

 //  VOYAGR TRAVEL PACKAGES PAGE
const packagePageData = [
    {
        id: 1,
        name: "Kerala Nature Escape",
        location: "🌴 Kerala, India",
        category: "Domestic",
        duration: "4 Days / 3 Nights",
        price: 8999,
        description: "Explore peaceful backwaters, green landscapes, and beautiful hill stations.",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 2,
        name: "Goa Beach Holiday",
        location: "🏖️ Goa, India",
        category: "Domestic",
        duration: "3 Days / 2 Nights",
        price: 6999,
        description: "Enjoy sunny beaches, coastal views, local food, and relaxing evenings.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 3,
        name: "Ooty Hills Retreat",
        location: "🌿 Ooty, Tamil Nadu",
        category: "Domestic",
        duration: "3 Days / 2 Nights",
        price: 5499,
        description: "Experience cool weather, tea gardens, scenic viewpoints, and mountain roads.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 4,
        name: "Singapore City Explorer",
        location: "🌆 Singapore",
        category: "International",
        duration: "5 Days / 4 Nights",
        price: 45999,
        description: "Discover modern attractions, beautiful gardens, and vibrant city life.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 5,
        name: "Bali Tropical Escape",
        location: "🌺 Bali, Indonesia",
        category: "International",
        duration: "6 Days / 5 Nights",
        price: 52999,
        description: "Enjoy tropical scenery, cultural attractions, beaches, and peaceful escapes.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 6,
        name: "Dubai City Experience",
        location: "🏙️ Dubai, UAE",
        category: "International",
        duration: "5 Days / 4 Nights",
        price: 48999,
        description: "Explore impressive architecture, lively markets, and memorable city attractions.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 7,
        name: "Himalayan Trek Adventure",
        location: "🏔️ Himalayas, India",
        category: "Adventure",
        duration: "6 Days / 5 Nights",
        price: 14999,
        description: "Discover mountain trails, breathtaking views, and unforgettable outdoor moments.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 8,
        name: "Rishikesh Adventure",
        location: "🛶 Rishikesh, India",
        category: "Adventure",
        duration: "3 Days / 2 Nights",
        price: 7999,
        description: "Experience river activities, beautiful landscapes, and exciting outdoor adventures.",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85"
    },
    {
        id: 9,
        name: "Mountain Camping Escape",
        location: "⛺ Mountain Retreat",
        category: "Adventure",
        duration: "2 Days / 1 Night",
        price: 3999,
        description: "Enjoy peaceful surroundings, scenic views, and an outdoor camping experience.",
        image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=85"
    }
];
const packagePageGrid = document.getElementById("packagePageGrid");
const packagePageTabs = document.getElementById("packagePageTabs");
function formatPackagePrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}
function displayPackagePage(category = "All") {
    if (!packagePageGrid) {
        return;
    }
    const filteredPackages = category === "All"
        ? packagePageData
        : packagePageData.filter(function (travelPackage) {
            return travelPackage.category === category;
        });
    if (filteredPackages.length === 0) {
        packagePageGrid.innerHTML = `
            <p class="package-page-empty">
                No packages found in this category.
            </p>
        `;
        return;
    }
    packagePageGrid.innerHTML = filteredPackages.map(function (travelPackage) {
        return `
            <article class="package-page-card reveal">
                <div class="package-page-image-wrap">
                    <img
                        class="package-page-image"
                        src="${travelPackage.image}"
                        alt="${travelPackage.name}"
                        loading="lazy">
                    <span class="package-page-badge">
                        ${travelPackage.category}
                    </span>
                </div>
                <div class="package-page-content">
                    <p class="package-page-location">
                        ${travelPackage.location}
                    </p>
                    <h3>${travelPackage.name}</h3>
                    <p class="package-page-description">
                        ${travelPackage.description}
                    </p>
                    <div class="package-page-meta">
                        <span>🗓️ ${travelPackage.duration}</span>
                        <span>✈️ Travel package</span>
                    </div>
                    <div class="package-page-bottom">
                        <div class="package-page-price">
                            <small>Estimated price / person</small>
                            <strong>${formatPackagePrice(travelPackage.price)}</strong>
                        </div>
                        <a href="booking-success.html?package=${encodeURIComponent(travelPackage.name)}" class="package-page-plan">
                            Book Now ↗
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join("");
    if (typeof observeRevealElements === "function") {
        observeRevealElements();
    }
}
if (packagePageGrid && packagePageTabs) {
    displayPackagePage();
    packagePageTabs.addEventListener("click", function (event) {
        const clickedTab = event.target.closest(".package-page-tab");
        if (!clickedTab) {
            return;
        }
        packagePageTabs
            .querySelectorAll(".package-page-tab")
            .forEach(function (tab) {
                tab.classList.remove("active");
            });
        clickedTab.classList.add("active");
        displayPackagePage(clickedTab.dataset.category);
    });
}

// plan-trip
const planTripForm = document.getElementById("planTripForm");
if (planTripForm) {
    const tripDestination = document.getElementById("tripDestination");
    const otherDestinationGroup = document.getElementById("otherDestinationGroup");
    const otherDestination = document.getElementById("otherDestination");
    const travelType = document.getElementById("travelType");
    const travelTypeMessage = document.getElementById("travelTypeMessage");
    const departureDate = document.getElementById("departureDate");
    const returnDate = document.getElementById("returnDate");
    const travellerCount = document.getElementById("travellerCount");
    const stayPreference = document.getElementById("stayPreference");
    const suggestedPlacesMessage = document.getElementById("suggestedPlacesMessage");
    const suggestedPlacesList = document.getElementById("suggestedPlacesList");
    const additionalDestinations = document.getElementById("additionalDestinations");
    const calculatedBudget = document.getElementById("calculatedBudget");
    const budgetDisplay = document.getElementById("budgetDisplay");
    const tripNotes = document.getElementById("tripNotes");
    const tripSummary = document.getElementById("tripSummary");
    const formMessage = document.getElementById("formMessage");
    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
    departureDate.min = todayString;
    returnDate.min = todayString;
    const destinationPlaces = {
        Singapore: {
            type: "International",
            places: [
                "Marina Bay Sands",
                "Gardens by the Bay",
                "Sentosa Island"
            ]
        },
        Bali: {
            type: "International",
            places: [
                "Ubud",
                "Kuta Beach",
                "Tanah Lot"
            ]
        },
        Dubai: {
            type: "International",
            places: [
                "Burj Khalifa",
                "Dubai Marina",
                "Dubai Mall"
            ]
        },
        Kerala: {
            type: "Domestic",
            places: [
                "Munnar",
                "Alleppey",
                "Thekkady"
            ]
        },
        Goa: {
            type: "Domestic",
            places: [
                "Baga Beach",
                "Fort Aguada",
                "Dudhsagar Falls"
            ]
        },
        Ooty: {
            type: "Domestic",
            places: [
                "Ooty Lake",
                "Doddabetta Peak",
                "Botanical Garden"
            ]
        },
        Thanjavur: {
            type: "Domestic",
            places: [
                "Brihadeeswarar Temple",
                "Thanjavur Palace",
                "Saraswathi Mahal Library"
            ]
        },
        Himalayas: {
            type: "Adventure",
            places: [
                "Mountain Trails",
                "Scenic Viewpoints",
                "Camping Locations"
            ]
        },
        Rishikesh: {
            type: "Adventure",
            places: [
                "River Rafting",
                "Lakshman Jhula",
                "Neer Garh Waterfall"
            ]
        }
    };
    const travelPrices = {
        Domestic: {
            base: 3000,
            place: 500
        },
        International: {
            base: 12000,
            place: 2500
        },
        Adventure: {
            base: 4500,
            place: 800
        },
        Relaxation: {
            base: 3500,
            place: 600
        }
    };
    const accommodationPrices = {
        "No preference": 1500,
        "Budget stay": 1000,
        "Standard hotel": 2000,
        "Luxury resort": 4500,
        "Camping": 1200
    };
    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    }
    function formatDate(dateValue) {
        if (!dateValue) {
            return "-";
        }
        const date = new Date(dateValue + "T00:00:00");
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
    }
    function getDuration() {
        if (!departureDate.value || !returnDate.value) {
            return 1;
        }
        const start = new Date(departureDate.value + "T00:00:00");
        const end = new Date(returnDate.value + "T00:00:00");
        const difference = end.getTime() - start.getTime();
        const nights = Math.ceil(difference / (1000 * 60 * 60 * 24));
        return Math.max(1, nights);
    }
    function getSelectedPlaces() {
        const selected = suggestedPlacesList.querySelectorAll(
            'input[name="suggestedPlace"]:checked'
        );
        return Array.from(selected).map(function (checkbox) {
            return checkbox.value;
        });
    }
    function getAdditionalPlaces() {
        return additionalDestinations.value
            .split(",")
            .map(function (place) {
                return place.trim();
            })
            .filter(function (place) {
                return place.length > 0;
            });
    }
    function showSuggestedPlaces(destination) {
        suggestedPlacesList.replaceChildren();
        if (!destinationPlaces[destination]) {
            suggestedPlacesMessage.textContent =
                "Enter your destination and add any places you would like to visit.";
            return;
        }
        const places = destinationPlaces[destination].places;
        suggestedPlacesMessage.textContent =
            "Suggested places for " + destination +
            ". All places are selected by default. Uncheck any place you do not want to visit.";
        places.forEach(function (place) {
            const label = document.createElement("label");
            label.className = "suggested-place-option";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "suggestedPlace";
            checkbox.value = place;
            checkbox.checked = true;
            const text = document.createElement("span");
            text.textContent = place;
            checkbox.addEventListener("change", calculateBudget);
            label.appendChild(checkbox);
            label.appendChild(text);
            suggestedPlacesList.appendChild(label);
        });
    }
    function updateDestinationSettings() {
        const destination = tripDestination.value;
        if (destination === "Other") {
            otherDestinationGroup.hidden = false;
            otherDestination.required = true;
            travelType.disabled = false;
            travelType.value = "";
            travelTypeMessage.textContent = "Enter your destination and choose your preferred travel category.";
            suggestedPlacesList.replaceChildren();
            suggestedPlacesMessage.textContent = "For a custom destination, enter any places you want to visit in the additional destinations field.";
        } else {
            otherDestinationGroup.hidden = true;
            otherDestination.required = false;
            otherDestination.value = "";
            if (destinationPlaces[destination]) {
                travelType.value = destinationPlaces[destination].type;
                travelType.disabled = true;
                travelTypeMessage.textContent = "Travel category selected automatically for " + destination + ".";
                showSuggestedPlaces(destination);
            } else {
                travelType.value = "";
                travelType.disabled = false;
                suggestedPlacesList.replaceChildren();
                suggestedPlacesMessage.textContent = "Choose a destination to see suggested places to visit.";
            }
        }
        calculateBudget();
    }
    function calculateBudget() {
        const category = travelType.value;
        const destination = tripDestination.value;
        const travelers = Number(travellerCount.value) || 1;
        const nights = getDuration();
        const prices = travelPrices[category];
        if (!prices || !destination) {
            calculatedBudget.value = formatCurrency(0);
            budgetDisplay.textContent = formatCurrency(0);
            return 0;
        }
        const selectedPlaces = getSelectedPlaces();
        const extraPlaces = getAdditionalPlaces();
        const baseTravelCost = prices.base * travelers;
        const accommodationCost =
            (accommodationPrices[stayPreference.value] || 0) *
            travelers *
            nights;
        const suggestedPlacesCost =
            prices.place *
            selectedPlaces.length *
            travelers;
        const extraPlacesCost =
            prices.place *
            extraPlaces.length *
            travelers;
        const total =
            baseTravelCost +
            accommodationCost +
            suggestedPlacesCost +
            extraPlacesCost;
        calculatedBudget.value = formatCurrency(total);
        budgetDisplay.textContent = formatCurrency(total);
        return total;
    }
    function showFormMessage(message) {
        formMessage.textContent = message;
        formMessage.hidden = false;
        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
    function clearFormMessage() {
        formMessage.textContent = "";
        formMessage.hidden = true;
    }
    function showReceiptText(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value || "-";
        }
    }
    function createReceiptNumber() {
        const timestamp = Date.now().toString().slice(-8);
        const randomNumber = Math.floor(100 + Math.random() * 900);
        return "VYG-" + timestamp + randomNumber;
    }
    function displayReceipt(total) {
        const selectedPlaces = getSelectedPlaces();
        const extraPlaces = getAdditionalPlaces();
        const destination = tripDestination.value === "Other"
            ? otherDestination.value.trim()
            : tripDestination.value;
        const duration = getDuration();
        const travelerNumber = Number(travellerCount.value);
        showReceiptText("receiptNumber", createReceiptNumber());
        showReceiptText(
            "receiptDate",
            new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            })
        );
        showReceiptText(
            "summaryName",
            document.getElementById("travellerName").value.trim()
        );
        showReceiptText(
            "summaryEmail",
            document.getElementById("travellerEmail").value.trim()
        );
        showReceiptText("summaryDestination", destination);
        showReceiptText("summaryTravelType", travelType.value);
        showReceiptText("summaryDeparture", formatDate(departureDate.value));
        showReceiptText("summaryReturn", formatDate(returnDate.value));
        showReceiptText(
            "summaryDuration",
            duration + (duration === 1 ? " night" : " nights")
        );
        showReceiptText(
            "summaryTravelers",
            travelerNumber + (travelerNumber === 1 ? " traveler" : " travelers")
        );
        showReceiptText("summaryAccommodation", stayPreference.value);
        showReceiptText("summaryBudget", formatCurrency(total));
        const summaryPlaces = document.getElementById("summaryPlaces");
        summaryPlaces.replaceChildren();
        const allPlaces = selectedPlaces.concat(extraPlaces);
        if (allPlaces.length === 0) {
            const listItem = document.createElement("li");
            listItem.textContent = "No additional places selected.";
            summaryPlaces.appendChild(listItem);
        } else {
            allPlaces.forEach(function (place) {
                const listItem = document.createElement("li");
                listItem.textContent = place;
                summaryPlaces.appendChild(listItem);
            });
        }
        const summaryAdditionalSection = document.getElementById(
            "summaryAdditionalSection"
        );
        const summaryAdditionalDestinations = document.getElementById(
            "summaryAdditionalDestinations"
        );
        if (extraPlaces.length > 0) {
            summaryAdditionalSection.hidden = false;
            summaryAdditionalDestinations.textContent = extraPlaces.join(", ");
        } else {
            summaryAdditionalSection.hidden = true;
            summaryAdditionalDestinations.textContent = "";
        }
        const summaryNotesSection = document.getElementById("summaryNotesSection");
        const summaryNotes = document.getElementById("summaryNotes");
        const notes = tripNotes.value.trim();
        if (notes) {
            summaryNotesSection.hidden = false;
            summaryNotes.textContent = notes;
        } else {
            summaryNotesSection.hidden = true;
            summaryNotes.textContent = "";
        }
        tripSummary.hidden = false;
        tripSummary.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
    tripDestination.addEventListener("change", updateDestinationSettings);
    travelType.addEventListener("change", calculateBudget);
    travellerCount.addEventListener("change", calculateBudget);
    stayPreference.addEventListener("change", calculateBudget);
    departureDate.addEventListener("change", function () {
        returnDate.min = departureDate.value || todayString;
        if (
            returnDate.value &&
            departureDate.value &&
            returnDate.value < departureDate.value
        ) {
            returnDate.value = "";
        }
        calculateBudget();
    });
    returnDate.addEventListener("change", function () {
        calculateBudget();
    });
    additionalDestinations.addEventListener("input", calculateBudget);
    planTripForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearFormMessage();
        if (!planTripForm.checkValidity()) {
            planTripForm.reportValidity();
            return;
        }
        if (!travelType.value) {
            showFormMessage("Please select a travel category.");
            travelType.focus();
            return;
        }
        if (departureDate.value < todayString) {
            showFormMessage("Departure date cannot be in the past.");
            departureDate.focus();
            return;
        }
        if (returnDate.value < departureDate.value) {
            showFormMessage("Return date must be on or after the departure date.");
            returnDate.focus();
            return;
        }
        const total = calculateBudget();
        displayReceipt(total);
    });
    planTripForm.addEventListener("reset", function () {
        window.setTimeout(function () {
            clearFormMessage();
            tripSummary.hidden = true;
            suggestedPlacesList.replaceChildren();
            otherDestinationGroup.hidden = true;
            otherDestination.required = false;
            travelType.disabled = false;
            travelTypeMessage.textContent = "Your travel category will be selected automatically for recognized destinations.";
            suggestedPlacesMessage.textContent = "Choose a destination to see suggested places to visit.";
            departureDate.min = todayString;
            returnDate.min = todayString;
            calculatedBudget.value = formatCurrency(0);
            budgetDisplay.textContent = formatCurrency(0);
        }, 0);
    });
    document.getElementById("printTripPlan").addEventListener("click", function () {
        window.print();
    });
    document.getElementById("editTripPlan").addEventListener("click", function () {
        tripSummary.hidden = true;
        document.getElementById("tripPlanner").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
    const packageDestinations = {
        "Kerala Nature Escape": "Kerala",
        "Goa Beach Holiday": "Goa",
        "Ooty Hills Retreat": "Ooty",
        "Singapore City Explorer": "Singapore",
        "Bali Tropical Escape": "Bali",
        "Dubai City Experience": "Dubai",
        "Himalayan Trek Adventure": "Himalayas",
        "Rishikesh Adventure": "Rishikesh"
    };
    const urlParameters = new URLSearchParams(window.location.search);
    const packageName = urlParameters.get("package");
    if (packageName && packageDestinations[packageName]) {
        tripDestination.value = packageDestinations[packageName];
        updateDestinationSettings();
    } else {
        calculateBudget();
    }
}