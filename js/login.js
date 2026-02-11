// login.js - COMPLETE REWRITE
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching function
    function showTab(tabName) {
        // Hide both forms
        document.getElementById('loginSection').classList.add('opacity-0', 'pointer-events-none', 'absolute', 'invisible', '-translate-x-5');
        document.getElementById('loginSection').classList.remove('opacity-100', 'transform-none');
        
        document.getElementById('registerSection').classList.add('opacity-0', 'pointer-events-none', 'absolute', 'invisible', '-translate-x-5');
        document.getElementById('registerSection').classList.remove('opacity-100', 'transform-none');
        
        // Show selected form
        const activeSection = document.getElementById(tabName + 'Section');
        activeSection.classList.remove('opacity-0', 'pointer-events-none', 'absolute', 'invisible', '-translate-x-5');
        activeSection.classList.add('opacity-100', 'transform-none');
        
        // Update tab buttons
        document.getElementById('loginTab').classList.remove('bg-yllow', 'text-brwn');
        document.getElementById('registerTab').classList.remove('bg-yllow', 'text-brwn');
        document.getElementById('loginTab').classList.add('text-gray-600');
        document.getElementById('registerTab').classList.add('text-gray-600');
        
        const activeTab = document.getElementById(tabName + 'Tab');
        activeTab.classList.add('bg-yllow', 'text-brwn');
        activeTab.classList.remove('text-gray-600');
    }
    
    // Start with login tab
    showTab('register');
    
    // Tab click events
    document.getElementById('loginTab').addEventListener('click', () => showTab('login'));
    document.getElementById('registerTab').addEventListener('click', () => showTab('register'));
    
    // Switch links
    document.getElementById('switchToRegister').addEventListener('click', () => showTab('register'));
    document.getElementById('switchToLogin').addEventListener('click', () => showTab('login'));
    
    // LOGIN
    document.getElementById('loginBtn').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Login clicked');
        
        const username = document.querySelector('#loginSection input[type="text"]').value;
        const password = document.querySelector('#loginSection input[type="password"]').value;
        
        if (!username || !password) {
            alert('Please enter username and password');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('genshinUsers') || '[]');
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ username }));
            window.location.href = 'all-product.html';
        } else {
            alert('Invalid username or password');
        }
    });
    
    // REGISTER
    document.getElementById('registerBtn').addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Register clicked');
        
        const email = document.querySelector('#registerSection input[type="email"]').value;
        const username = document.querySelector('#registerSection input[type="text"]').value;
        const password = document.querySelector('#registerSection input[type="password"]').value;
        
        if (!email || !username || !password) {
            alert('Please fill all fields');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('genshinUsers') || '[]');
        
        if (users.some(user => user.username === username)) {
            alert('Username already taken');
            return;
        }
        
        users.push({ email, username, password });
        localStorage.setItem('genshinUsers', JSON.stringify(users));
        
        document.querySelector('#registerSection form').reset();
        alert('Registration successful! Please login.');
        showTab('login');
    });
});