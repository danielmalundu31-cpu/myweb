// ==========================================
// CONTACT FORM VALIDATION AND PREVIEW
// ==========================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    // Stop the browser from reloading/submitting the form
    event.preventDefault();

    // Get the values entered by the visitor
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const message = document.getElementById("message").value.trim();

    // Error message elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const formFeedback = document.getElementById("formFeedback");
    const formPreview = document.getElementById("formPreview");

    // Clear previous messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formFeedback.textContent = "";
    formPreview.innerHTML = "";

    let valid = true;

    // Validate name
    if (name === "") {
        nameError.textContent = "Please enter your name.";
        valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
    }

    // Validate message
    if (message === "") {
        messageError.textContent = "Please enter your message.";
        valid = false;
    }

    // Stop here if something is invalid
    if (!valid) {
        formFeedback.textContent = "Please correct the errors above.";
        return;
    }

    // Show successful validation message
    formFeedback.textContent =
        "Your information has been validated successfully. This is a browser demo and the message has not been delivered.";

    // Display a preview of the information
    formPreview.innerHTML = `
        <h3>Message Preview</h3>
        <p><strong>Name:</strong> ${escapeHTML(name)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <p><strong>Topic:</strong> ${escapeHTML(topic || "No topic provided")}</p>
        <p><strong>Message:</strong> ${escapeHTML(message)}</p>
    `;
});


// Prevent HTML from being inserted into the preview
function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;

    // ==========================================
    // DARK / LIGHT THEME SWITCH
    // ==========================================

    const themeToggle = document.getElementById("themeToggle");

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            themeToggle.textContent = "🌙 Dark Mode";
        } else {
            themeToggle.textContent = "☀️ Light Mode";
        }
    });

    // ==========================================
    // PHOTO GALLERY PREVIOUS / NEXT
    // ==========================================

    const galleryFigures = document.querySelectorAll("#photos .gallery figure");
    const previousPhotoButton = document.getElementById("previousPhoto");
    const nextPhotoButton = document.getElementById("nextPhoto");
    const galleryStatus = document.getElementById("galleryStatus");

    let currentPhoto = 0;

    function showGalleryPhoto(index) {
        if (galleryFigures.length === 0) return;

        currentPhoto = (index + galleryFigures.length) % galleryFigures.length;

        galleryFigures.forEach(function (figure, i) {
            figure.style.display = i === currentPhoto ? "block" : "none";
        });

        if (galleryStatus) {
            galleryStatus.textContent =
                `Photo ${currentPhoto + 1} of ${galleryFigures.length}`;
        }
    }

    if (previousPhotoButton && nextPhotoButton && galleryFigures.length > 0) {
        previousPhotoButton.addEventListener("click", function () {
            showGalleryPhoto(currentPhoto - 1);
        });

        nextPhotoButton.addEventListener("click", function () {
            showGalleryPhoto(currentPhoto + 1);
        });

        showGalleryPhoto(0);
    }

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.toggle("menu-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕ Close Menu" : "☰ Menu";
        });

        // Close the menu after selecting a navigation link
        mainNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("menu-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰ Menu";
            });
        });
    }
}