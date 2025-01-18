console.log('hi')
const btnSearch = document.getElementById('btnSearch1');
const btnClear = document.getElementById('btnClear');
const recommendation = [];


function resetForm() {
   document.getElementById('conditionInput').value = "";
}

btnClear.addEventListener('click', resetForm);


function searchRecommendation() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      console.log(input);

      switch (input) {
        case "country":
        case "countries":
          const countries = data.countries;
          resultDiv.innerHTML += `<h2>Countries</h2>`;

          countries.forEach((country) => {
            country.cities.forEach((city) => {

              resultDiv.innerHTML += `
                  <div style="text-align: center; margin-bottom: 20px;">
                      <img src="${city.imageUrl}" alt="${city.name}" style="width: 100%; height: auto; border-radius: 5px;" />
                      <div style="background-color:white;text-align:left">
                        <h3 style="color:black">${city.name}</h3>
                        <p style="font-size: 16px; line-height: 1.5;color:black">${city.description}</p>
                        <button style="font-weight: bold;width:100px;">Visit</button>
                      </div>
                  </div>
              `;

            });
          });

          break;

        case "temple":
        case "temples":
          const temples = data.temples;
          resultDiv.innerHTML += `<h2>Temples</h2>`;

          temples.forEach((temple) => {

              resultDiv.innerHTML += `
                  <div style="text-align: center; margin-bottom: 20px;">
                      <img src="${temple.imageUrl}" alt="${temple.name}" style="width: 100%; height: auto; border-radius: 5px;" />
                      <div style="background-color:white;text-align:left">
                        <h3 style="color:black">${temple.name}</h3>
                        <p style="font-size: 16px; line-height: 1.5;color:black">${temple.description}</p>
                        <button style="font-weight: bold;width:100px;">Visit</button>
                      </div>
                  </div>
              `;
          });
          break;

        case "beach":
        case "beaches":
          const beaches = data.beaches;
          resultDiv.innerHTML += `<h2>Beaches</h2>`;

          beaches.forEach((beach) => {

              resultDiv.innerHTML += `
                  <div style="text-align: center; margin-bottom: 20px;">
                      <img src="${beach.imageUrl}" alt="${beach.name}" style="width: 100%; height: auto; border-radius: 5px;" />
                      <div style="background-color:white;text-align:left">
                        <h3 style="color:black">${beach.name}</h3>
                        <p style="font-size: 16px; line-height: 1.5;color:black">${beach.description}</p>
                        <button style="font-weight: bold;width:100px;">Visit</button>
                      </div>
                  </div>
              `;
          });
          break;

        default:
          resultDiv.innerHTML = "Not fund, type country, temple or beach";
          break;
      }

      /*
      
      const condition = data.conditions.find(item => item.name.toLowerCase() === input);


      if (condition) {
        const symptoms = condition.symptoms.join(', ');
        const prevention = condition.prevention.join(', ');
        const treatment = condition.treatment;

        resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;

        resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
        resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
      } else {
        resultDiv.innerHTML = 'Condition not found.';
      } */
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}
btnSearch.addEventListener('click', searchRecommendation);