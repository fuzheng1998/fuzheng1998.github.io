document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeIcon = document.getElementById('theme-icon');

    themeToggle.addEventListener('click', () => {
        // if themeIcon current class is bi-sun then remove it and add bi-moon
        // else remove bi-moon and add bi-sun
        themeIcon.classList.contains('bi-sun') ? themeIcon.classList.replace('bi-sun', 'bi-moon') : themeIcon.classList.replace('bi-moon', 'bi-sun');
        // Toggle the .dark-theme class on each click
        document.body.classList.toggle('dark-theme');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.getAttribute('data-tab');
            setActiveTab(tab);
        });
    });

    function setActiveTab(tab) {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-tab') === tab);
        });

        const tabPanes = document.querySelectorAll('.tab-pane');
        tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.getAttribute('id') === tab);
        });
    }
});

function animateLoadingBar() {
    const loadingBar = document.getElementById('loadingBar');
    let width = 0;
    const interval = setInterval(frame, 50); // Update every 50ms

    function frame() {
        if (width >= 100) {
            clearInterval(interval);
            // Hide loading overlay and display page content when the progress bar reaches 100%
            document.getElementById('loadingOverlay').style.display = 'none';
            document.getElementById('pageContent').style.display = 'block';
        } else {
            width++;
            loadingBar.style.width = width + '%';
            loadingBar.setAttribute('aria-valuenow', width);
            loadingBar.textContent = width + '%';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    animateLoadingBar();
});

// load markdown file in html page
async function loadMarkdown(file, containerId) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error('Error fetching the Markdown file');
        }

        const markdown = await response.text();
        const html = marked.parse(markdown);
        document.getElementById(containerId).innerHTML = html;
    } catch (error) {
        console.error('Error loading Markdown:', error);
    }
}

loadMarkdown('resume.md', "resume-markdown-container");