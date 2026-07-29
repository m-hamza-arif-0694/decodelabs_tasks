const API_URL = 'http://localhost:5000/api/users';

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Drawer Toggle (Project 1 logic)[cite: 2]
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const sidebar = document.getElementById("sidebar-navigation");

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("open");
            mobileMenuToggle.setAttribute("aria-expanded", isOpen.toString());
        });
    }

    // DOM Target Elements
    const userForm = document.getElementById("user-form");
    const usersGrid = document.getElementById("users-grid");
    const refreshBtn = document.getElementById("refresh-btn");
    const errorBanner = document.getElementById("error-banner");
    const loadingSpinner = document.getElementById("loading-spinner");

    // UI State Helpers
    const showLoading = () => loadingSpinner.classList.remove("hidden");
    const hideLoading = () => loadingSpinner.classList.add("hidden");

    const showError = (msg) => {
        errorBanner.textContent = msg; // Safe text injection against XSS
        errorBanner.classList.remove("hidden");
    };

    const clearError = () => {
        errorBanner.textContent = "";
        errorBanner.classList.add("hidden");
    };

    /**
     * FETCH USERS (GET)
     * Demonstrates async/await, response.ok verification, and safe DOM insertion
     */
    async function loadUsers() {
        clearError();
        showLoading();

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Server returned status ${response.status}`);
            }

            const result = await response.json();
            renderUsers(result.data);

        } catch (err) {
            showError(`Failed to load database records: ${err.message}`);
        } finally {
            hideLoading();
        }
    }

    /**
     * REGISTER USER (POST)
     * Serializes payload, sends request headers, handles database constraints
     */
    async function handleUserRegistration(event) {
        event.preventDefault();
        clearError();

        const nameInput = document.getElementById("user-name");
        const emailInput = document.getElementById("user-email");
        const ageInput = document.getElementById("user-age");

        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            age: parseInt(ageInput.value, 10)
        };

        showLoading();

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload) // Serialization
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `HTTP error ${response.status}`);
            }

            userForm.reset();
            await loadUsers(); // Refresh grid state

        } catch (err) {
            showError(`Registration Error: ${err.message}`);
        } finally {
            hideLoading();
        }
    }

    /**
     * DELETE USER (DELETE)
     */
    async function deleteUser(id) {
        clearError();
        showLoading();

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Deletion failed with status ${response.status}`);
            }

            await loadUsers();

        } catch (err) {
            showError(`Delete Error: ${err.message}`);
        } finally {
            hideLoading();
        }
    }

    /**
     * DOM RENDER FUNCTION (Safe against XSS using textContent)
     */
    function renderUsers(users) {
        usersGrid.innerHTML = "";

        if (!users || users.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "No user records currently found in SQLite vault.";
            usersGrid.appendChild(emptyMsg);
            return;
        }

        users.forEach(user => {
            const card = document.createElement("article");
            card.className = "card";

            const nameHeader = document.createElement("h3");
            nameHeader.textContent = user.name; // Safe data injection

            const emailPara = document.createElement("p");
            emailPara.textContent = `Email: ${user.email}`;

            const agePara = document.createElement("p");
            agePara.textContent = `Age: ${user.age} years`;

            const delBtn = document.createElement("button");
            delBtn.className = "delete-btn";
            delBtn.textContent = "Delete User";
            delBtn.onclick = () => deleteUser(user.id);

            card.appendChild(nameHeader);
            card.appendChild(emailPara);
            card.appendChild(agePara);
            card.appendChild(delBtn);

            usersGrid.appendChild(card);
        });
    }

    // Helper function to update active blue background status on links
    function updateActiveNavLink(targetId) {
        navLinks.forEach(item => {
            const itemHref = item.getAttribute("href");
            if (itemHref === targetId || (targetId === "#hero" && itemHref === "#dashboard")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // Navigation Link Click & Smooth Scroll Logic
    const navLinks = document.querySelectorAll(".nav-link, .sidebar-link");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const rawTargetId = link.getAttribute("href");

            // Ensure it's an internal section link (starts with #)
            if (rawTargetId && rawTargetId.startsWith("#")) {
                e.preventDefault();
                const targetId = rawTargetId === "#dashboard" ? "#hero" : rawTargetId;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Smoothly scroll to requested section
                    targetSection.scrollIntoView({ behavior: "smooth" });

                    // Update active state class on corresponding links
                    updateActiveNavLink(rawTargetId);

                    // Close sidebar on mobile if open
                    if (sidebar && sidebar.classList.contains("open")) {
                        sidebar.classList.remove("open");
                        if (mobileMenuToggle) mobileMenuToggle.setAttribute("aria-expanded", "false");
                    }
                }
            }
        });
    });

    // ScrollSpy / IntersectionObserver to automatically update active blue status on scroll
    const sections = document.querySelectorAll("article.hero-section, section.form-section, section#users-sec");
    if (sections.length > 0 && "IntersectionObserver" in window) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = `#${entry.target.id}`;
                    updateActiveNavLink(sectionId);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // Event Listeners
    userForm.addEventListener("submit", handleUserRegistration);
    
    // Fetch Data button reloads records AND scrolls to User Records section
    refreshBtn.addEventListener("click", () => {
        loadUsers();
        const usersSection = document.getElementById("users-sec");
        if (usersSection) {
            usersSection.scrollIntoView({ behavior: "smooth" });
            updateActiveNavLink("#users-sec");
        }
    });

    // Initial Fetch on Load
    loadUsers();
});