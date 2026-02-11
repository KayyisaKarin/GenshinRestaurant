document.addEventListener('DOMContentLoaded', () => {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 80,
        reset: true 
    });

    // Reveal elements
    sr.reveal('.reveal', {
        interval: 100 // Delay between each element
    });

    // Get elements safely
    const menuButton = document.getElementById('menuButton');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Cart elements - ALL buttons with ID "cart"
    const cartButtons = document.querySelectorAll('#cart');
    const shopping = document.getElementById("shopping");
    const closeCart = document.querySelector("#shopping .ri-close-large-line");

    // Open sidebar
    if (menuButton && sidebar && sidebarOverlay) {
        menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close sidebar
    if (closeSidebar && sidebar && sidebarOverlay) {
        closeSidebar.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // Open Cart - untuk SEMUA tombol dengan ID "cart"
    if (cartButtons.length > 0 && shopping && sidebarOverlay) {
        cartButtons.forEach(cartButton => {
            cartButton.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                sidebarOverlay.classList.remove('hidden');
                shopping.classList.remove("hidden");
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Close Cart
    if (closeCart && shopping && sidebarOverlay) {
        closeCart.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            shopping.classList.add("hidden");
            sidebarOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    // PARALLAX
    const hero = document.getElementById('heroLogo');
    if (hero) {
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        let animationFrameId = null;

        // Set initial values
        hero.style.setProperty('--mouse-x', '0');
        hero.style.setProperty('--mouse-y', '0');

        // Mouse move
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;

            targetX = x;
            targetY = y;
        });

        // Mouse leave - reset target
        hero.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });

        // Animation loop
        function animate() {
            // Smooth movement
            mouseX += (targetX - mouseX) * 0.2;
            mouseY += (targetY - mouseY) * 0.2;

            // Update CSS
            hero.style.setProperty('--mouse-x', mouseX.toFixed(2));
            hero.style.setProperty('--mouse-y', mouseY.toFixed(2));

            animationFrameId = requestAnimationFrame(animate);
        }

        // Start animation
        animate();

        // Cleanup on page navigation
        window.addEventListener('beforeunload', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }

    // POPUP

    document.getElementById('submit-button').addEventListener('click', function (e) {
        e.preventDefault();

        // Ambil semua input yang required
        const inputs = document.querySelectorAll('input[required]');
        let allFilled = true;

        // Cek apakah semua field sudah terisi
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
                // Tambahkan efek visual untuk field yang kosong
                input.classList.add('border-red-500', 'bg-red-50');

                // Hapus efek setelah beberapa saat
                setTimeout(() => {
                    input.classList.remove('border-red-500', 'bg-red-50');
                }, 2000);
            }
        });

        // Jika semua field terisi, tampilkan popup
        if (allFilled) {
            const button = this;
            const buttonText = button.querySelector('.button-text');
            const icon = button.querySelector('i');

            // Ubah tampilan tombol
            button.disabled = true;
            button.classList.add('opacity-50', 'cursor-not-allowed');
            buttonText.textContent = 'Processing...';
            icon.classList.remove('ri-bank-card-line');
            icon.classList.add('ri-loader-4-line', 'animate-spin');

            // Tampilkan popup setelah delay
            setTimeout(() => {
                showPopup();

                // Reset tombol
                setTimeout(() => {
                    button.classList.remove('opacity-50', 'cursor-not-allowed');
                    button.disabled = false;
                    buttonText.textContent = 'Pay now';
                    icon.classList.remove('ri-loader-4-line', 'animate-spin');
                    icon.classList.add('ri-bank-card-line');
                }, 500);

            }, 1000);
        }
    });

    // Fungsi untuk menampilkan popup
    function showPopup() {
        const popupOverlay = document.getElementById('popup-overlay');
        const popupContent = document.getElementById('popup-content');

        popupOverlay.classList.remove('hidden');

        setTimeout(() => {
            popupContent.classList.remove('scale-95', 'opacity-0');
            popupContent.classList.add('scale-100', 'opacity-100');
        }, 50);
    }

    // Fungsi untuk menutup popup
    function closePopup() {
        const popupOverlay = document.getElementById('popup-overlay');
        const popupContent = document.getElementById('popup-content');

        popupContent.classList.remove('scale-100', 'opacity-100');
        popupContent.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            popupOverlay.classList.add('hidden');
        }, 300);
    }

    // Event listener untuk close button
    document.getElementById('close-popup').addEventListener('click', closePopup);

    // Close popup saat klik di luar konten
    document.getElementById('popup-overlay').addEventListener('click', function (e) {
        if (e.target === this) {
            closePopup();
        }
    });
});

