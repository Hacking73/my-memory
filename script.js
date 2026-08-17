/* =========================================================
   MY MEMORIES — JAVASCRIPT
   ========================================================= */


/* -----------------------------
   MOBILE MENU
----------------------------- */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });

    });

}


/* -----------------------------
   NAVIGATION ACTIVE LINK
----------------------------- */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);


/* -----------------------------
   IMAGE LIGHTBOX
----------------------------- */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const imagePath = button.dataset.image;

        const cardImage = button
            .closest(".photo-card")
            ?.querySelector("img");

        if (cardImage) {
            lightboxImage.src = cardImage.src;
        } else {
            lightboxImage.src = imagePath;
        }

        lightbox.classList.add("show");
        document.body.classList.add("modal-open");

    });

});


function closeLightbox() {

    lightbox.classList.remove("show");
    document.body.classList.remove("modal-open");

    setTimeout(() => {
        lightboxImage.src = "";
    }, 300);

}


lightboxClose.addEventListener("click", closeLightbox);


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


/* -----------------------------
   VIDEO MODAL
----------------------------- */

const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoModalClose = document.getElementById("videoModalClose");

const videoCards = document.querySelectorAll(".video-card");


videoCards.forEach(card => {

    const video = card.querySelector("video");
    const playButton = card.querySelector(".video-play");

    playButton.addEventListener("click", event => {

        event.stopPropagation();

        modalVideo.src = video.currentSrc || video.src;

        videoModal.classList.add("show");
        document.body.classList.add("modal-open");

        modalVideo.play().catch(() => {});

    });

});


function closeVideoModal() {

    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute("src");
    modalVideo.load();

    videoModal.classList.remove("show");
    document.body.classList.remove("modal-open");

}


videoModalClose.addEventListener("click", closeVideoModal);


videoModal.addEventListener("click", event => {

    if (event.target === videoModal) {
        closeVideoModal();
    }

});


/* -----------------------------
   ESCAPE KEY
----------------------------- */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (lightbox.classList.contains("show")) {
            closeLightbox();
        }

        if (videoModal.classList.contains("show")) {
            closeVideoModal();
        }

        if (mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
        }

    }

});


/* -----------------------------
   VIDEO HOVER PREVIEW
----------------------------- */

videoCards.forEach(card => {

    const video = card.querySelector("video");

    card.addEventListener("mouseenter", () => {

        video.play()
            .then(() => {
                video.pause();
                video.currentTime = 0;
            })
            .catch(() => {});

    });

});


/* -----------------------------
   BACKGROUND MUSIC
----------------------------- */

const music = document.getElementById("backgroundMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {

                musicPlaying = true;
                musicBtn.classList.add("playing");

            })
            .catch(() => {

                console.log("Music could not start.");

            });

    } else {

        music.pause();

        musicPlaying = false;
        musicBtn.classList.remove("playing");

    }

});


/* -----------------------------
   SCROLL REVEAL
----------------------------- */

const revealElements = document.querySelectorAll(
    ".photo-card, .video-card, .featured-section, .quote-section, .about-grid"
);


revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* -----------------------------
   SMOOTH IMAGE LOADING
----------------------------- */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("load", () => {
        img.classList.add("loaded");
    });

});


/* -----------------------------
   INITIALIZATION
----------------------------- */

window.addEventListener("load", () => {

    updateActiveNavigation();

    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 200);

});
