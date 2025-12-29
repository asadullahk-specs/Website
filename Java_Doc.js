let currentSort = { field: 'sno', order: 'asc' };

// Academic Table Data
const academicData = [
    {
        sno: 1,
        level: 'Primary (Grade 1-8)',
        institute: 'Scholars School System & Gulistan Shah Abdul Latif Boys Higher Secondary School, Karachi',
        year: '2013-20'
    },
    {
        sno: 2,
        level: 'Matriculation (Grade 9-10)',
        institute: 'Gulistan Shah Abdul Latif Boys Higher Secondary School, Karachi',
        year: '2021-23'
    },
    {
        sno: 3,
        level: 'Intermediate (Grade 11-12)',
        institute: 'Bahria College Karsaz, Karachi & Hadaf College, Peshawar',
        year: '2023-25'
    },
    {
        sno: 4,
        level: 'Bachelors (Currently at 1st Semester)',
        institute: 'University Of Engineering & Technology (UET), Peshawar, Abbottabad Campus',
        year: 'Present'
    }
];

// Showing Pictures In Gallery
const projectsData = [
    {
        title: 'Library Store Management',
        description: 'A complete library management system with book tracking.',
        gradient: 'blue',
        images: ['Lib_1.jpeg', 'Lib_2.jpeg']
    },
    {
        title: 'Bank Account System',
        description: 'Banking application with account management and transactions.',
        gradient: 'green',
        images: ['Bank_1.jpeg']
    },
    {
        title: 'Fuel Station Billing',
        description: 'Fuel station management with billing and inventory.',
        gradient: 'orange',
        images: ['Fuel_1.jpeg', 'Fuel_2.jpeg']
    },
    {
        title: 'Restaurant Management',
        description: 'Restaurant POS system with menu management and orders.',
        gradient: 'purple',
        images: ['rest_1.jpeg']
    },
    {
        title: 'Event Video Editing',
        description: 'Creative event video edits with cinematic cuts and smooth transitions.',
        gradient: 'red',
        images: ['APP_1.jpeg', 'APP_2.jpeg', 'APP_3.jpeg']
    },
    {
        title: 'Web Designing',
        description: 'Well-structured and responsive web pages using clean HTML layouts.',
        gradient: 'teal',
        images: ['HTML_1.jpeg', 'HTML_2.jpeg', 'HTML_3.jpeg', 'HTML_4.jpeg', 'HTML_5.jpeg']
    },
    {
        title: 'Portfolio Designs',
        description: 'Attractive portfolio designs with modern CSS styling and effects.',
        gradient: 'pink',
        images: ['CSS_1.jpeg', 'CSS_2.jpeg', 'CSS_3.jpeg', 'CSS_4.jpeg', 'CSS_5.jpeg', 'CSS_6.jpeg', 'CSS_7.jpeg', 'CSS_8.jpeg']
    },
    {
        title: 'Web Development',
        description: 'Interactive and dynamic websites powered by JavaScript.',
        gradient: 'cyan',
        images: ['JS_1.jpeg', 'JS_2.jpeg', 'JS_3.jpeg', 'JS_4.jpeg', 'JS_5.jpeg', 'JS_6.jpeg', 'JS_7.jpeg', 'JS_8.jpeg']
    }
];

let currentProjectIndex = 0;
let currentImageIndex = 0;

// Theme Changing Button Working
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Page Changer
function navigateTo(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigation() {
    document.querySelectorAll('[data-page]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            navigateTo(page);
        });
    });
    
    const dropdownBtn = document.querySelector('.dropdown-btn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdown.classList.toggle('active');
        });
    }
}

// Updated Table Rendering with Highlighting
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.style.animation = `slideUp 0.3s ease ${index * 0.1}s forwards`;
        tr.style.opacity = '0';
        tr.innerHTML = `
            <td>${row.sno}.</td>
            <td>${row.level}</td>
            <td>${row.institute}</td>
            <td>${row.year}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Table Codes
function updateTable() {
    const searchTerm = document.getElementById('tableSearch').value.trim();

    let data = filterData(academicData, searchTerm);
    data = sortData(data, currentSort.field, currentSort.order);

    renderTable(data);
}

function sortData(data, field, order) {
    return [...data].sort((a, b) => {
        let aVal = a[field];
        let bVal = b[field];
        
        if (typeof aVal === 'number') {
            return order === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
        
        if (order === 'asc') {
            return aVal.localeCompare(bVal);
        } else {
            return bVal.localeCompare(aVal);
        }
    });
}

function filterData(data, searchTerm) {
    if (!searchTerm) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter(row => 
        row.level.toLowerCase().includes(term) ||
        row.institute.toLowerCase().includes(term) ||
        row.year.toLowerCase().includes(term)
    );
}

function initTable() {
    renderTable(academicData);
    
    const searchInput = document.getElementById('tableSearch');
    searchInput.addEventListener('input', updateTable);
    
    const headers = document.querySelectorAll('#academicTable th');
    headers.forEach(th => {
        th.addEventListener('click', function() {
            const field = this.dataset.sort;
            if (currentSort.field === field) {
                currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.field = field;
                currentSort.order = 'asc';
            }
            updateTable();
        });
    });
}

// Contact Form Valid Checking
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}

function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    if (input) input.classList.remove('error');
    if (error) {
        error.textContent = '';
        error.classList.remove('show');
    }
}

function clearAllErrors() {
    ['name', 'email', 'phone', 'city'].forEach(clearError);
}

function validateForm() {
    let isValid = true;
    clearAllErrors();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length > 100) {
        showError('name', 'Name must be less than 100 characters');
        isValid = false;
    }
    
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!phone) {
        showError('phone', 'Phone number is required');
        isValid = false;
    } else if (phone.length > 20) {
        showError('phone', 'Phone number too long');
        isValid = false;
    }
    
    if (!city) {
        showError('city', 'City/Country is required');
        isValid = false;
    }
    
    return isValid;
}

function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        city: document.getElementById('city').value.trim(),
        reviews: document.getElementById('reviews').value.trim(),
        address: document.getElementById('address').value.trim(),
        suggestions: document.getElementById('suggestions').value.trim(),
        submittedAt: new Date().toISOString()
    };
}

function saveToLocalStorage(data) {
    const existing = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    existing.push(data);
    localStorage.setItem('contactSubmissions', JSON.stringify(existing));
    
    console.log('Form Submission Saved:', data);
    console.log('All Submissions:', existing);
}

function resetForm() {
    document.getElementById('contactForm').reset();
    clearAllErrors();
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const resetBtn = document.getElementById('resetBtn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = getFormData();
            submitToGoogleForm(formData);;
            navigateTo('thanks');
        }
    });
    
    resetBtn.addEventListener('click', resetForm);
    
    ['name', 'email', 'phone', 'city'].forEach(fieldId => {
        const input = document.getElementById(fieldId);
        input.addEventListener('input', () => clearError(fieldId));
    });
}

// Gallery Working
function openLightbox(index) {
    currentProjectIndex = index;
    currentImageIndex = 0;
    updateLightboxContent();
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

function updateLightboxContent() {
    const project = projectsData[currentProjectIndex];
    const imgPath = project.images[currentImageIndex];

    const iconArea = document.querySelector('.lightbox-icon');
    iconArea.innerHTML = `
        <img src="${imgPath}" style="width:100%; max-height:400px; object-fit:contain; border-radius:12px;">
    `;

    document.querySelector('.lightbox-title').textContent = project.title;
    document.querySelector('.lightbox-desc').textContent =
        `${project.description} (Image ${currentImageIndex + 1} of ${project.images.length})`;

    document.querySelector('.lightbox-content').className =
        `lightbox-content ${project.gradient}`;

    updateDots();
}

function nextLightbox() {
    currentImageIndex =
        (currentImageIndex + 1) % projectsData[currentProjectIndex].images.length;
    updateLightboxContent();
}

function prevLightbox() {
    currentImageIndex =
        (currentImageIndex - 1 + projectsData[currentProjectIndex].images.length) %
        projectsData[currentProjectIndex].images.length;
    updateLightboxContent();
}

function updateDots() {
    const dotsContainer = document.querySelector('.lightbox-dots');
    dotsContainer.innerHTML = '';

    projectsData[currentProjectIndex].images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'lightbox-dot' + (i === currentImageIndex ? ' active' : '');
        dot.addEventListener('click', () => {
            currentImageIndex = i;
            updateLightboxContent();
        });
        dotsContainer.appendChild(dot);
    });
}

function initLightbox() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.addEventListener('click', () => openLightbox(index));
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-next').addEventListener('click', nextLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', prevLightbox);

    document.getElementById('lightbox').addEventListener('click', function (e) {
        if (e.target === this) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!document.getElementById('lightbox').classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
    });
}

// EXPORT SUBMISSIONS TO CSV (Bonus)
function exportToCSV() {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    
    if (submissions.length === 0) {
        alert('No submissions to export!');
        return;
    }
    
    const headers = ['Name', 'Email', 'Phone', 'City', 'Reviews', 'Address', 'Suggestions', 'Submitted At'];
    const csvContent = [
        headers.join(','),
        ...submissions.map(s => [
            `"${s.name}"`,
            `"${s.email}"`,
            `"${s.phone}"`,
            `"${s.city}"`,
            `"${s.reviews}"`,
            `"${s.address}"`,
            `"${s.suggestions}"`,
            `"${s.submittedAt}"`
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initTable();
    initContactForm();
    initLightbox();

    navigateTo('home');
    
    console.log('Portfolio Website Initialized');
    console.log('Contact submissions stored in localStorage');
    console.log('Type exportToCSV() in console to download submissions as CSV');

});

function previewFile(input) {
    const file = input.files[0];
    const preview = document.getElementById('previewImage');
    const circle = document.getElementById('imagePreviewCircle');
    const removeBtn = document.getElementById('removeImageBtn');

    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            circle.classList.add('has-image');
            removeBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    const input = document.getElementById('image');
    const preview = document.getElementById('previewImage');
    const circle = document.getElementById('imagePreviewCircle');
    const icon = circle.querySelector('.preview-icon');
    const removeBtn = document.getElementById('removeImageBtn');

    input.value = '';
    preview.src = '';
    preview.style.display = 'none';
    icon.style.display = 'block';
    circle.classList.remove('has-image');
    removeBtn.style.display = 'none';
}

// For Front Name In Typing Style
function startTypingEffect() {
    const textElement = document.querySelector('.profile-name-top h1');
    if (!textElement) return;

    const texts = [
        "Asadullah Khan",
        "Welcomes You To The Website...",
        "Registration No: 10-001-2025-01107",
        "UET Peshawar, Abbottabad Campus",
        "Basic Level Web Designing"
    ];
    let currentText = 0;
    let index = 0;
    let typingForward = true;

    if (window.typingInterval) clearInterval(window.typingInterval);

    window.typingInterval = setInterval(() => {
        if (typingForward) {
            textElement.textContent += texts[currentText].charAt(index);
            index++;
            if (index >= texts[currentText].length) {
                typingForward = false;
                clearInterval(window.typingInterval);
                setTimeout(() => { // wait 5 sec before erase
                    window.typingInterval = setInterval(typeErase, 50);
                }, 2000);
            }
        }
    }, 50);

    function typeErase() {
        textElement.textContent = textElement.textContent.slice(0, -1);
        if (textElement.textContent.length === 0) {
            clearInterval(window.typingInterval);
            currentText = (currentText + 1) % texts.length;
            index = 0;
            typingForward = true;
            window.typingInterval = setInterval(() => {
                textElement.textContent += texts[currentText].charAt(index);
                index++;
                if (index >= texts[currentText].length) {
                    typingForward = false;
                    clearInterval(window.typingInterval);
                    setTimeout(() => {
                        window.typingInterval = setInterval(typeErase, 50);
                    }, 2000);
                }
            }, 50);
        }
    }
}


// Navigation Working
function navigateTo(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    const targetId = pageName + 'Page'; 
    const targetPage = document.getElementById(targetId);
    
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'block';
    }

    if (pageName.toLowerCase() === 'home') {
        startTypingEffect();
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
    if (activeLink) activeLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Automatically Run typing Words When Home Page Loads
document.addEventListener("DOMContentLoaded", () => {
    const homePage = document.getElementById('homePage');
    if (homePage && homePage.classList.contains('active')) {
        startTypingEffect();
    }
});

// Left Typewriter Words Working
function typeTopLeftText() {
    const el = document.querySelector('.top-left-small');
    if (!el) return;

    const texts = ["Welcome To My Website", "Analyze My Portfolio", "See My Academic Background", "Check My CV", "See My Projects", "Get In Touch With Me"];
    let currentText = 0;
    let index = 0;

    function typeNextChar() {
        if (index < texts[currentText].length) {
            el.textContent += texts[currentText].charAt(index);
            index++;
            setTimeout(typeNextChar, 50);
        } else {
            // 3 sec baad erase and next text
            setTimeout(() => {
                el.textContent = "";
                currentText = (currentText + 1) % texts.length;
                index = 0;
                typeNextChar();
            }, 2000);
        }
    }

    typeNextChar();
}

document.addEventListener("DOMContentLoaded", () => {
    typeTopLeftText();
});

function previewFile(input) {
    const file = input.files[0];
    const preview = document.getElementById('previewImage');
    const circle = document.getElementById('imagePreviewCircle');
    const icon = circle.querySelector('.preview-icon');
    const removeBtn = document.getElementById('removeImageBtn');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            if (icon) icon.style.display = 'none';
            removeBtn.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    const input = document.getElementById('image');
    const preview = document.getElementById('previewImage');
    const circle = document.getElementById('imagePreviewCircle');
    const icon = circle.querySelector('.preview-icon');
    const removeBtn = document.getElementById('removeImageBtn');

    input.value = '';
    preview.src = '';
    preview.style.display = 'none';
    if (icon) icon.style.display = 'block';
    removeBtn.style.display = 'none';
}