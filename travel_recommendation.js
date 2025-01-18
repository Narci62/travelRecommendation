console.log('hi')
const btnSearch = document.getElementById('btnSearch1');
const recommendation = [];


function resetForm() {
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
  }


function searchRecommendation() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)


        switch (input) {
          case "country":
            const countries = data.countries;

            console.log(countries);


            resultDiv.innerHTML += `<h2>${input}</h2>`;

            countries.forEach((country)=>{
              console.log(countries.name);
              country.cities.forEach((city)=>{
                resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="hjh">`;
              });


            });

            break;

          case "temple":
            const temples = data.temples;
            break;

          case "beach":
            const beaches = data.beaches;
            break;
        
          default:
            resultDiv.innerHTML = "Not fund, type countries, temples or beaches";
            break;
        }

        debugger
        
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
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchRecommendation);