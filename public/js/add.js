document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let rollNumber = document.getElementById('rollNumber').value;
    let name = document.getElementById('name').value;
    let dob = document.getElementById('dob').value;
    let score = document.getElementById('score').value;

    // Validate fields
    if (!rollNumber || !name || !dob || !score) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate score
    if (score > 100 || score < 0) {
        alert('Score should be between 0 and 100.');
        return;
    }

    // Validate Date of Birth
    let yearOfBirth = new Date(dob).getFullYear();
    if (yearOfBirth >= 2020) {
        alert('Date of Birth should be before 2020.');
        return;
    }

    // If all checks pass
    // alert("Student details added successfully!");
});

