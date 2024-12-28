document.addEventListener("DOMContentLoaded", function () {
    const cardWrapper = document.querySelector('.card-wrapper');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;
    const totalCards = cards.length;

    function slideCards() {
        currentIndex++;
        if (currentIndex >= totalCards - 2) { // 3 card yang terlihat, jadi ketika tersisa 2 card di kanan, reset
            currentIndex = 0;
        }

        const offset = -currentIndex * (100 / 3); // Geser card-wrapper sesuai lebar card
        cardWrapper.style.transform = `translateX(${offset}%)`;
    }

    setInterval(slideCards, 5000); // 
});

window.addEventListener('scroll', function() {
    AOS.refresh();
});

let bannerScene, bannerCamera, bannerRenderer, bannerParticles;
    
    function initBannerBackground() {
      const container = document.querySelector('.banner');
      bannerScene = new THREE.Scene();
      bannerCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000);
      bannerRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bannerBackground'), alpha: true });
      bannerRenderer.setSize(container.clientWidth, container.clientHeight);
    
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const textureLoader = new THREE.TextureLoader();
      const sprite = textureLoader.load('https://threejs.org/examples/textures/sprites/disc.png');
    
      for (let i = 0; i < 3000; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
      }
    
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
      const material = new THREE.PointsMaterial({
        size: 6, // Ukuran partikel diperbesar
        sizeAttenuation: true,
        map: sprite,
        alphaTest: 0.5,
        transparent: true,
        color: 0xffffff // Warna diubah menjadi putih agar lebih terlihat
      });
    
      bannerParticles = new THREE.Points(geometry, material);
      bannerScene.add(bannerParticles);
    
      bannerCamera.position.z = 1000;
    
      animateBannerBackground();
    }
    
    function animateBannerBackground() {
      requestAnimationFrame(animateBannerBackground);
    
      bannerParticles.rotation.x += 0.0005;
      bannerParticles.rotation.y += 0.0005;
    
      const positions = bannerParticles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += 0.1; // Gerakkan partikel ke kanan
        if (positions[i] > 1000) positions[i] = -1000; // Reset posisi jika terlalu jauh ke kanan
      }
      bannerParticles.geometry.attributes.position.needsUpdate = true;
    
      bannerRenderer.render(bannerScene, bannerCamera);
    }
    
    function onBannerWindowResize() {
      const container = document.querySelector('.banner');
      bannerCamera.aspect = container.clientWidth / container.clientHeight;
      bannerCamera.updateProjectionMatrix();
      bannerRenderer.setSize(container.clientWidth, container.clientHeight);
    }
    
    window.addEventListener('resize', onBannerWindowResize, false);
  
    document.addEventListener('DOMContentLoaded', function() {
        // Inisialisasi Three.js backgrounds
        initBannerBackground();
        
    });

    function showModal(name, email, social, socialLink) {
        document.getElementById("modal-name").innerText = "Nama: " + name;
        document.getElementById("modal-email").innerText = email;
        document.getElementById("modal-social").innerText = social;
        document.getElementById("modal-social").href = socialLink; // Link ke Instagram
        // Tampilkan modal
        var infoModal = new bootstrap.Modal(document.getElementById("infoModal"));
        infoModal.show();
    }

    document.addEventListener("DOMContentLoaded", function () {
        const sections = document.querySelectorAll("section");
        const navLi = document.querySelectorAll("nav ul li a");
    
        window.onscroll = () => {
            let current = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute("id");
                }
            });
    
            navLi.forEach((a) => {
                a.classList.remove("active");
                if (a.getAttribute("href") == "#" + current) {
                    a.classList.add("active");
                }
            });
        };
    });
    
    