// --- 1. Three.js 3D Showcase ---
let scene, camera, renderer, bag, controls;
const container = document.getElementById('three-canvas-container');

function initThree() {
    if (!container) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded.');
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(-5, 5, 5);
    scene.add(spotLight);

    // Orbit Controls
    if (THREE.OrbitControls) {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 8;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;
    } else {
        console.warn('OrbitControls is not loaded.');
    }

    // Load 3D Model (briefcase.glb)
    const loader = (typeof THREE.GLTFLoader !== 'undefined') ? new THREE.GLTFLoader() : null;
    
    if (loader) {
        loader.load('assets/briefcase.glb', function(gltf) {
            bag = gltf.scene;
            // Center model
            const box = new THREE.Box3().setFromObject(bag);
            const center = box.getCenter(new THREE.Vector3());
            bag.position.sub(center);
            scene.add(bag);
        }, undefined, function(error) {
            console.error('GLTFLoader error:', error);
            createFallbackBag();
        });
    } else {
        console.warn('GLTFLoader is not loaded. Using fallback model.');
        createFallbackBag();
    }

    animate();
}

function createFallbackBag() {
    // 가방 몸체
    const bodyGeo = new THREE.BoxGeometry(2, 2.5, 0.8);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x1A1A1A, 
        roughness: 0.3,
        metalness: 0.2
    });
    bag = new THREE.Mesh(bodyGeo, material);
    
    // 손잡이 (Torus)
    const handleGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 100, Math.PI);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.y = 1.25;
    bag.add(handle);

    scene.add(bag);
}

function animate() {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    if (renderer && scene && camera) renderer.render(scene, camera);
}

// Color Change Function
const initColorPicker = () => {
    const colorButtons = document.querySelectorAll('#color-options button');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const colorHex = btn.getAttribute('data-color');
            
            // Update button UI
            colorButtons.forEach(b => {
                b.classList.remove('ring-2', 'ring-blue-600', 'scale-110', 'shadow-lg');
                b.classList.add('hover:ring-2', 'hover:ring-gray-300');
            });
            btn.classList.add('ring-2', 'ring-blue-600', 'scale-110', 'shadow-lg');
            btn.classList.remove('hover:ring-2', 'hover:ring-gray-300');

            // Update 3D Model Color
            if (bag) {
                bag.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material.color.set(colorHex);
                    }
                });
            }
        });
    });
};

// Resize Listener
window.addEventListener('resize', () => {
    if (camera && container && renderer) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
});

// --- 2. Popular Products Slider ---
const products = [
    { id: 1, name: "Urban Explorer Backpack", price: "249,000", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", tag: "NEW" },
    { id: 2, name: "Canvas Shopper Bag", price: "89,000", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600", tag: "BEST" },
    { id: 3, name: "Leather Crossbody Mini", price: "159,000", image: "https://images.unsplash.com/photo-1590874103328-eac7a68e0a8a?auto=format&fit=crop&q=80&w=600", tag: "HOT" },
    { id: 4, name: "Minimalist Tote Bag", price: "129,000", image: "https://images.unsplash.com/photo-1584917006201-6b832e55c1c6?auto=format&fit=crop&q=80&w=600", tag: "NEW" },
    { id: 5, name: "Vintage Leather Satchel", price: "329,000", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600", tag: "BEST" },
    { id: 6, name: "Sleek Laptop Sleeve", price: "69,000", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600", tag: "NEW" }
];

const renderProducts = () => {
    const slider = document.getElementById('product-slider');
    if (!slider) return;

    slider.innerHTML = products.map(p => `
        <div class="snap-start shrink-0 w-[280px] md:w-[350px] group">
            <div class="relative overflow-hidden rounded-2xl mb-6 aspect-[4/5] bg-gray-200">
                <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${p.name}">
                <div class="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest shadow-sm">${p.tag}</div>
                <button class="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-xl hover:bg-blue-600 hover:text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                </button>
            </div>
            <h4 class="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">${p.name}</h4>
            <p class="text-gray-400 font-bold tracking-tighter text-xl">₩${p.price}</p>
        </div>
    `).join('');
};

const initSliderControls = () => {
    const slider = document.getElementById('product-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && slider) {
        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -380, behavior: 'smooth' });
        });
    }

    if (nextBtn && slider) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: 380, behavior: 'smooth' });
        });
    }
};

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    initThree();
    renderProducts();
    initColorPicker();
    initSliderControls();
});
