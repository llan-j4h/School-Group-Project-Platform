// State management
let currentRole = 'instructor';
let currentTab = 'course';

// Navigation items for each role
const instructorNav = [
    { id: 'course', label: 'Course Info', icon: 'file' },
    { id: 'enrollment', label: 'Enrollment', icon: 'users' },
    { id: 'grouping', label: 'Grouping', icon: 'users' },
    { id: 'grades', label: 'All Grades', icon: 'chart' }
];

const studentNav = [
    { id: 'progress', label: 'Your Progress', icon: 'chart' },
    { id: 'group', label: 'Group', icon: 'users' },
    { id: 'peer-eval', label: 'Peer Evaluation', icon: 'message' },
    { id: 'student-grades', label: 'Grades', icon: 'award' },
    { id: 'appeal-grader', label: 'Appeal Grader', icon: 'settings' },
    { id: 'review-history', label: 'Review History', icon: 'file' }
];

// Icon SVG paths
const icons = {
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
    award: '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
    settings: '<circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m5.2-13.8l-4.2 4.2m-2 2l-4.2 4.2M23 12h-6m-6 0H1m18.8-5.2l-4.2 4.2m-2 2l-4.2 4.2"></path>'
};

// Generate SVG icon
function generateIcon(iconType) {
    return `<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[iconType]}</svg>`;
}

// Render navigation
function renderNavigation() {
    const nav = document.getElementById('navigation');
    const navItems = currentRole === 'instructor' ? instructorNav : studentNav;
    
    nav.innerHTML = navItems.map(item => `
        <button class="nav-button ${item.id === currentTab ? 'active' : ''}" data-tab="${item.id}">
            ${generateIcon(item.icon)}
            <span>${item.label}</span>
        </button>
    `).join('');
    
    // Add event listeners to nav buttons
    nav.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            currentTab = button.dataset.tab;
            renderNavigation();
            renderContent();
        });
    });
}

// Render main content
function renderContent() {
    const mainContent = document.getElementById('mainContent');
    let templateId;
    
    if (currentRole === 'instructor') {
        switch(currentTab) {
            case 'course':
                templateId = 'instructorCourseInfo';
                break;
            case 'enrollment':
                templateId = 'instructorEnrollment';
                break;
            case 'grouping':
                templateId = 'instructorGrouping';
                break;
            case 'grades':
                templateId = 'instructorGrades';
                break;
        }
    } else {
        switch(currentTab) {
            case 'progress':
                templateId = 'studentProgress';
                break;
            case 'group':
                templateId = 'studentGroup';
                break;
            case 'peer-eval':
                templateId = 'studentPeerEval';
                break;
            case 'student-grades':
                templateId = 'studentGrades';
                break;
            case 'appeal-grader':
                templateId = 'studentAppealGrader';
                break;
            case 'review-history':
                templateId = 'studentReviewHistory';
                break;
        }
    }
    
    const template = document.getElementById(templateId);
    if (template) {
        mainContent.innerHTML = template.innerHTML;
    }
}

// Update user info in header
function updateUserInfo() {
    const userName = document.getElementById('userName');
    const userRoleText = document.getElementById('userRoleText');
    
    if (currentRole === 'instructor') {
        userName.textContent = 'Dr. Jane Smith';
        userRoleText.textContent = 'Instructor';
    } else {
        userName.textContent = 'Alice Chen';
        userRoleText.textContent = 'Student';
    }
}

// Handle role change
function handleRoleChange() {
    const roleSelector = document.getElementById('roleSelector');
    roleSelector.addEventListener('change', (e) => {
        currentRole = e.target.value;
        currentTab = currentRole === 'instructor' ? 'course' : 'progress';
        updateUserInfo();
        renderNavigation();
        renderContent();
    });
}

// Initialize the application
function init() {
    handleRoleChange();
    updateUserInfo();
    renderNavigation();
    renderContent();
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}