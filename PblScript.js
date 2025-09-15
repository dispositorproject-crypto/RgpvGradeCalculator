// Theme switching functionality
const themeToggle = document.getElementById('theme-toggle');
const themeOptions = document.getElementById('theme-options');
const themeOptionButtons = document.querySelectorAll('.theme-option');

// Set initial theme based on system preference or saved preference
let currentTheme = localStorage.getItem('theme') || 'light';

// Function to set theme
function setTheme(theme) {
    if (theme === 'system') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }

    currentTheme = theme;
    localStorage.setItem('theme', theme);

    // Update theme option buttons
    themeOptionButtons.forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Apply theme variables
    document.documentElement.style.setProperty('--bg', `var(--${theme}-bg)`);
    document.documentElement.style.setProperty('--container-bg', `var(--${theme}-container-bg)`);
    document.documentElement.style.setProperty('--text', `var(--${theme}-text)`);
    document.documentElement.style.setProperty('--tab-bg', `var(--${theme}-tab-bg)`);
    document.documentElement.style.setProperty('--tab-active-bg', `var(--${theme}-tab-active-bg)`);
    document.documentElement.style.setProperty('--section-bg', `var(--${theme}-section-bg)`);
    document.documentElement.style.setProperty('--input-border', `var(--${theme}-input-border)`);
    document.documentElement.style.setProperty('--button-bg', `var(--${theme}-button-bg)`);
    document.documentElement.style.setProperty('--add-button', `var(--${theme}-add-button)`);
    document.documentElement.style.setProperty('--remove-button', `var(--${theme}-remove-button)`);
    document.documentElement.style.setProperty('--result-bg', `var(--${theme}-result-bg)`);
    document.documentElement.style.setProperty('--scale-bg', `var(--${theme}-scale-bg)`);
    document.documentElement.style.setProperty('--table-bg', `var(--${theme}-table-bg)`);
    document.documentElement.style.setProperty('--th-bg', `var(--${theme}-th-bg)`);
    document.documentElement.style.setProperty('--th-text', `var(--${theme}-th-text)`);
    document.documentElement.style.setProperty('--tr-even', `var(--${theme}-tr-even)`);
    document.documentElement.style.setProperty('--tr-hover', `var(--${theme}-tr-hover)`);
}

// Initialize theme
setTheme(currentTheme);

// Toggle theme options visibility
themeToggle.addEventListener('click', () => {
    themeOptions.style.display = themeOptions.style.display === 'flex' ? 'none' : 'flex';
});

// Close theme options when clicking outside
document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
        themeOptions.style.display = 'none';
    }
});

// Set theme when option is clicked
themeOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTheme(button.dataset.theme);
        themeOptions.style.display = 'none';
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (currentTheme === 'system') {
        setTheme('system');
    }
});

// Tab switching functionality
const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.calculator-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${target}-calculator`) {
                section.classList.add('active');
            }
        });
    });
});

// Create confetti effect
function createConfetti() {
    const colors = ['#6a11cb', '#2575fc', '#ff416c', '#ff4b2b', '#00b09b', '#96c93d', '#f6d365', '#fda085'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Grade Calculator
const calculateGradeBtn = document.getElementById('calculate-grade');
calculateGradeBtn.addEventListener('click', () => {
    const totalMarks = parseFloat(document.getElementById('total-marks').value);
    const obtainedMarks = parseFloat(document.getElementById('obtained-marks').value);

    if (isNaN(totalMarks) || isNaN(obtainedMarks) || totalMarks <= 0) {
        alert('Please enter valid marks values.');
        return;
    }
    if (obtainedMarks > totalMarks) {
        alert('Obtained marks cannot be greater than total marks.');
        return;
    }

    const percentage = (obtainedMarks / totalMarks) * 100;
    let grade = '';
    let gradeClass = '';

    if (percentage >= 90) {
        grade = 'A+';
        gradeClass = 'excellent';
    } else if (percentage >= 80) {
        grade = 'A';
        gradeClass = 'very-good';
    } else if (percentage >= 70) {
        grade = 'B+';
        gradeClass = 'good';
    } else if (percentage >= 60) {
        grade = 'B';
        gradeClass = 'good';
    } else if (percentage >= 50) {
        grade = 'C+';
        gradeClass = 'average';
    } else if (percentage >= 40) {
        grade = 'C';
        gradeClass = 'average';
    } else if (percentage >= 35) {
        grade = 'D';
        gradeClass = 'poor';
    } else {
        grade = 'F';
        gradeClass = 'fail';
    }

    document.getElementById('percentage').textContent = `Percentage: ${percentage.toFixed(2)}%`;
    document.getElementById('grade').textContent = `Grade: ${grade}✨`;

    // Add class for styling based on grade
    document.getElementById('grade').className = 'grade-display ' + gradeClass;

    document.getElementById('grade-result').style.display = 'block';

    // Add confetti for good grades
    if (percentage >= 80) {
        createConfetti();
    }
});

// GPA Calculator
const addCourseBtn = document.getElementById('add-course');
const coursesContainer = document.getElementById('courses-container');
const calculateGpaBtn = document.getElementById('calculate-gpa');

addCourseBtn.addEventListener('click', () => {
    const courseRow = document.createElement('div');
    courseRow.className = 'course-row';
    courseRow.innerHTML = `
        <input type="text" placeholder="Subject name (optional)" class="course-name">
        <input type="number" placeholder="Earned credit" class="credit-hours" min="1">
        <select class="grade">
            <option value="">Select Grade(Points)</option>
            <option value="10">A+ (10)</option>
            <option value="9">A (9)</option>
            <option value="8">B+ (8)</option>
            <option value="7">B (7)</option>
            <option value="6">C+ (6)</option>
            <option value="5">C (5)</option>
            <option value="4">D (4)</option>
            <option value="0">F (0)</option>
        </select>
        <button class="remove-btn"><i class="fas fa-trash"></i></button>
    `;

    coursesContainer.appendChild(courseRow);

    // Add event listener to the remove button
    const removeBtn = courseRow.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        courseRow.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            coursesContainer.removeChild(courseRow);
        }, 500);
    });
});

calculateGpaBtn.addEventListener('click', () => {
    const courseRows = document.querySelectorAll('.course-row');
    let totalCreditHours = 0;
    let totalGradePoints = 0;
    let hasError = false;

    courseRows.forEach(row => {
        const creditHours = parseFloat(row.querySelector('.credit-hours').value);
        const gradeValue = parseFloat(row.querySelector('.grade').value);

        if (isNaN(creditHours) || creditHours <= 0 || isNaN(gradeValue)) {
            hasError = true;
            row.style.border = '2px solid #ff416c';
            setTimeout(() => {
                row.style.border = '';
            }, 1000);
            return;
        }

        totalCreditHours += creditHours;
        totalGradePoints += creditHours * gradeValue;
    });

    if (hasError || totalCreditHours === 0) {
        alert('Please enter valid credit hours and select grades for all courses.');
        return;
    }

    const gpa = totalGradePoints / totalCreditHours;
    document.getElementById('gpa-value').textContent = `Your GPA is: ${gpa.toFixed(2)}✨`;

    // Add class for styling based on GPA
    let gpaClass = '';
    if (gpa >= 9.0) gpaClass = 'excellent';
    else if (gpa >= 8.0) gpaClass = 'very-good';
    else if (gpa >= 7.0) gpaClass = 'good';
    else if (gpa >= 6.0) gpaClass = 'average';
    else if (gpa >= 5.0) gpaClass = 'below-average';
    else gpaClass = 'poor';

    document.getElementById('gpa-value').className = 'grade-display ' + gpaClass;
    document.getElementById('gpa-result').style.display = 'block';

    // Add confetti for good GPA
    if (gpa >= 8.0) {
        createConfetti();
    }
});

// CGPA Calculator
const addSemesterBtn = document.getElementById('add-semester');
const semestersContainer = document.getElementById('semesters-container');
const calculateCgpaBtn = document.getElementById('calculate-cgpa');
let semesterCount = 1;

addSemesterBtn.addEventListener('click', () => {
    semesterCount++;
    const semesterDiv = document.createElement('div');
    semesterDiv.className = 'form-group';
    semesterDiv.innerHTML = `
        <label><i class="fas fa-university icon"></i>Semester ${semesterCount} GPA (out of 10)</label>
        <input type="number" step="0.01" min="0" max="10" placeholder="Enter GPA (0-10)" class="semester-gpa">
        <button class="remove-btn"><i class="fas fa-trash"></i></button>
    `;

    semestersContainer.appendChild(semesterDiv);

    // Add event listener to the remove button
    const removeBtn = semesterDiv.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        semesterDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            semestersContainer.removeChild(semesterDiv);
        }, 500);
    });
});

calculateCgpaBtn.addEventListener('click', () => {
    const semesterGpas = document.querySelectorAll('.semester-gpa');
    let totalGpa = 0;
    let validCount = 0;

    semesterGpas.forEach(input => {
        const gpa = parseFloat(input.value);
        if (!isNaN(gpa) && gpa >= 0 && gpa <= 10) {
            totalGpa += gpa;
            validCount++;
        } else {
            input.style.border = '2px solid #ff416c';
            setTimeout(() => {
                input.style.border = '';
            }, 1000);
        }
    });

    if (validCount === 0) {
        alert('Please enter valid GPA values for at least one semester.');
        return;
    }

    const cgpa = totalGpa / validCount;
    document.getElementById('cgpa-value').textContent = `Your CGPA is: ${cgpa.toFixed(2)}✨`;

    // Add class for styling based on CGPA
    let cgpaClass = '';
    if (cgpa >= 9.0) cgpaClass = 'excellent';
    else if (cgpa >= 8.0) cgpaClass = 'very-good';
    else if (cgpa >= 7.0) cgpaClass = 'good';
    else if (cgpa >= 6.0) cgpaClass = 'average';
    else if (cgpa >= 5.0) cgpaClass = 'below-average';
    else cgpaClass = 'poor';

    document.getElementById('cgpa-value').className = 'grade-display ' + cgpaClass;
    document.getElementById('cgpa-result').style.display = 'block';

    // Add confetti for good CGPA
    if (cgpa >= 8.0) {
        createConfetti();
    }
});

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
    
    .excellent { background: linear-gradient(45deg, #00b09b, #96c93d); color: white; }
    .very-good { background: linear-gradient(45deg, #a8ff78, #78ffd6); color: #333; }
    .good { background: linear-gradient(45deg, #fbd786, #f7797d); color: #333; }
    .average { background: linear-gradient(45deg, #ffd26f, #ff7c7c); color: #333; }
    .below-average { background: linear-gradient(45deg, #ff9a8b, #ff6a88); color: white; }
    .poor { background: linear-gradient(45deg, #ff416c, #ff4b2b); color: white; }
    .fail { background: linear-gradient(45deg, #8e0e00, #1f1c18); color: white; }
`;
document.head.appendChild(style);