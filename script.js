// Attendre que le document HTML soit complètement chargé
document.addEventListener("DOMContentLoaded", () => {  

    /* ==========================================================================
       1. GESTION DU MODE SOMBRE / CLAIR (Avec Sauvegarde LocalStorage)
       ========================================================================== */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Si l'utilisateur avait déjà choisi le mode sombre, on l'applique
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️ Mode Clair";
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            themeToggleBtn.textContent = "☀️ Mode Clair";
        } else {
            themeToggleBtn.textContent = "🌙 Mode Sombre";
        }
        // Sauvegarde pérenne du choix de l'utilisateur
        localStorage.setItem("theme", theme);
    });

    /* ==========================================================================
       2. MENU HAMBURGER (Version Mobile)
       ========================================================================== */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Fermer automatiquement la navigation mobile lors du clic sur une ancre
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });

    /* ==========================================================================
       3. ANIMATION DES BARRES DE COMPÉTENCES AU SCROLL
       ========================================================================== */
    const progressBars = document.querySelectorAll(".progress");

    const animateSkills = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            // Déclenche l'animation dès que l'élément entre dans le champ visuel
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                const targetWidth = bar.getAttribute("data-progress");
                bar.style.width = targetWidth;
            }
        });
    };

    // Écouteurs d'événements pour l'exécution au défilement et au rafraîchissement
    window.addEventListener("scroll", animateSkills);
    animateSkills(); 

    /* ==========================================================================
       4. VALIDATION DU FORMULAIRE DE CONTACT
       ========================================================================== */
    const contactForm = document.getElementById("contact-form");
    const formError = document.getElementById("form-error");
    const formSuccess = document.getElementById("form-success");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Stoppe le rechargement de page par défaut

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Remise à l'état initial des affichages
        formError.style.display = "none";
        formSuccess.style.display = "none";

        // 1. Contrôle des champs vides
        if (name === "" || email === "" || message === "") {
            formError.textContent = "Erreur : Tous les champs doivent être remplis.";
            formError.style.display = "block";
            return;
        }

        // 2. Contrôle de conformité de l'adresse e-mail (Regex valide standard)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formError.textContent = "Erreur : Veuillez entrer une adresse email valide.";
            formError.style.display = "block";
            return;
        }

        // Succès simulé si les filtres précédents sont franchis
        formSuccess.style.display = "block";
        contactForm.reset(); // Purge les entrées du formulaire
    });

    /* ==========================================================================
       5. BOUTON RETOUR EN HAUT (Back To Top)
       ========================================================================== */
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        // Apparition du bouton si le défilement dépasse la frontière des 300px
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Défilement fluide requis
        });
    });

});