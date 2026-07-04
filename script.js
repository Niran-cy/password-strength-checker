const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const progressBar = document.getElementById('progress-bar');
const percentText = document.getElementById('strength-percent');
const statusBadge = document.getElementById('status-badge');
const statusText = document.getElementById('status-text');

// Requirements elements
const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqLower = document.getElementById('req-lower');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// Right panel elements
const largeShield = document.getElementById('large-shield');
const timeIcon = document.getElementById('time-icon');
const crackTimeText = document.getElementById('crack-time-text');
const crackTimeDesc = document.getElementById('crack-time-desc');

// Toggle Password Visibility
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '&#128584;'; // closed eye emoji
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '&#128065;'; // open eye emoji
    }
});

// Update UI based on input
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    
    // 1. Check Requirements
    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasLower = /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    // Update Checklist UI
    reqLength.className = hasLength ? 'valid' : '';
    reqUpper.className = hasUpper ? 'valid' : '';
    reqLower.className = hasLower ? 'valid' : '';
    reqNumber.className = hasNumber ? 'valid' : '';
    reqSpecial.className = hasSpecial ? 'valid' : '';

    // 2. Calculate Percentage
    let validCount = 0;
    if (hasLength) validCount++;
    if (hasUpper) validCount++;
    if (hasLower) validCount++;
    if (hasNumber) validCount++;
    if (hasSpecial) validCount++;

    const percent = (validCount / 5) * 100;
    
    // 3. Update Progress Bar & Text
    progressBar.style.width = `${percent}%`;
    percentText.textContent = `${percent}%`;

    // 4. Update Tiers (Weak, Fair, Good, Strong)
    if (percent === 0) {
        updateUI('Weak', 'var(--color-red)', 'Instantly', 'It would take a computer no time to crack this password.', '⚠', 'red-glow');
        progressBar.style.background = 'var(--color-red)';
    } else if (percent <= 25) {
        updateUI('Weak', 'var(--color-red)', 'Instantly', 'It would take a computer no time to crack this password.', '⚠', 'red-glow');
        progressBar.style.background = 'var(--color-red)';
    } else if (percent <= 50) {
        updateUI('Fair', 'var(--color-orange)', 'Minutes', 'A computer could guess this rather quickly.', '≈', 'orange-glow');
        progressBar.style.background = 'var(--color-orange)';
    } else if (percent <= 75) {
        updateUI('Good', 'var(--color-blue)', 'Years', 'It would take a standard computer years to crack this.', '★', 'blue-glow');
        progressBar.style.background = 'var(--color-blue)';
    } else {
        updateUI('Strong', 'var(--color-green)', 'Centuries', 'It would take a supercomputer centuries to crack this password.', '∞', 'green-glow');
        progressBar.style.background = 'linear-gradient(90deg, #3b82f6, #22c55e)';
    }
});

// Helper function to update text and colors
function updateUI(badgeTxt, color, timeTxt, descTxt, icon, shieldClass) {
    statusBadge.textContent = badgeTxt;
    statusBadge.style.color = color;
    statusBadge.style.borderColor = color;
    percentText.style.color = color;
    crackTimeText.style.color = color;
    
    crackTimeText.textContent = timeTxt;
    crackTimeDesc.textContent = descTxt;
    timeIcon.textContent = icon;

    // Reset shield classes
    largeShield.className = 'large-shield';
    largeShield.classList.add(shieldClass);

    // Dynamic descriptive text based on tier
    if (badgeTxt === 'Weak') statusText.textContent = 'Your password is easy to guess.';
    if (badgeTxt === 'Fair') statusText.textContent = 'Your password could be stronger.';
    if (badgeTxt === 'Good') statusText.textContent = 'Your password is fairly secure.';
    if (badgeTxt === 'Strong') statusText.textContent = 'Your password is difficult to guess.';
}