// frontend.js
const dataContainer = document.getElementById('data-container');

fetch('http://localhost:3000/data')
  .then((response) => response.json())
  .then((data) => {
    dataContainer.innerHTML = JSON.stringify(data[0]['filename']);
    console.log(data)
  })
  .catch((error) => {
    console.error('Error fetching data: ' + error);
  });

