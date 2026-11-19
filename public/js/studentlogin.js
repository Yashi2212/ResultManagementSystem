document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the input values
    const rollno = document.getElementById('rollno').value;
    const dob = document.getElementById('dob').value;

    // Validation
    if (!rollno || isNaN(rollno)) {
        alert('Please enter a valid Roll Number.');
        return;
    }

    if (!dob) {
        alert('Please enter your Date of Birth.');
        return;
    }

    // If validation passes, you can submit the form or handle the login logic here
    // alert('Validation passed!'); // For demonstration purposes
});
window.addEventListener('DOMContentLoaded', (event) => {
    const alerts = document.querySelectorAll('.fade-alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.display = 'none';
        }, 2500);
    });
});