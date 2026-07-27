// script.js
// Basic state management and interactive functionality

document.addEventListener("DOMContentLoaded", () => {
    console.log("DecodeLabs Project 1 Interface Loaded Successfully.");

    // 1. CTA Buttons Logic
    const ctaButtons = document.querySelectorAll(".cta-button");
    ctaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Welcome to DecodeLabs! This feature is currently under construction.");
        });
    });

    // 2. Mobile Sidebar Menu State Management
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const sidebar = document.getElementById("sidebar-navigation");

    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener("click", () => {
            const isOpen = sidebar.classList.toggle("open");
            mobileMenuToggle.setAttribute("aria-expanded", isOpen.toString());
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener("click", (e) => {
            if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove("open");
                mobileMenuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 3. Navigation Active Link State Management
    const navLinks = document.querySelectorAll(".nav-link, .sidebar-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Find parent list to scope active state
            const parentNav = link.closest("nav");
            if (parentNav) {
                parentNav.querySelectorAll("a").forEach(item => item.classList.remove("active"));
            }
            link.classList.add("active");

            // If on mobile and inside sidebar, close sidebar on navigation
            if (sidebar && sidebar.classList.contains("open") && link.classList.contains("sidebar-link")) {
                sidebar.classList.remove("open");
                if (mobileMenuToggle) mobileMenuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // 4. Interactive Card Bookmark State Management
    const bookmarkButtons = document.querySelectorAll(".card-action-btn");
    bookmarkButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const isBookmarked = btn.classList.toggle("bookmarked");
            const countSpan = btn.querySelector(".count");
            let count = parseInt(btn.getAttribute("data-count") || "0", 10);

            if (isBookmarked) {
                count += 1;
                btn.setAttribute("aria-label", btn.getAttribute("aria-label").replace("Bookmark", "Remove bookmark for"));
            } else {
                count -= 1;
                btn.setAttribute("aria-label", btn.getAttribute("aria-label").replace("Remove bookmark for", "Bookmark"));
            }

            btn.setAttribute("data-count", count.toString());
            if (countSpan) countSpan.textContent = count.toString();
        });
    });
});
