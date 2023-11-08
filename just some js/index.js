const body = document.querySelector('body')
const sidebar = document.querySelector('.sidebar')
const toggleBtn = document.querySelector('.first_child button')

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open')
    console.log('just clicked')
})

// const { fetchDataFromDatabase } = require('./database');
fetch('http://localhost:3000/data')// Replace 'data.json' with the path to your JSON file
.then(response => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Data from localhost3000:', data);
    // You can now work with the 'data' object
})
.catch(error => {
    console.error('Error reading JSON file:', error);
});
