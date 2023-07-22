// Function to handle the button click and communicate with Glide
function calculateBreakfastPlan() {
  const userCalories = parseFloat(document.getElementById('calories').value);
  const userProtein = parseFloat(document.getElementById('protein').value);

  Glide.run('breakfastPlan', { calories: userCalories, protein: userProtein })
    .then(result => {
      displayBreakfastPlan(result);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').innerText = 'Error occurred while planning breakfast.';
    });
}

// Function to display the breakfast plan result
function displayBreakfastPlan(result) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  if (Array.isArray(result) && result.length > 0) {
    const header = document.createElement('h2');
    header.innerText = 'Breakfast Plan:';
    resultDiv.appendChild(header);

    const ul = document.createElement('ul');
    for (const food of result) {
      const li = document.createElement('li');
      li.innerText = `${food.Food} - Calories: ${food.Calories} Protein: ${food.Protein}`;
      ul.appendChild(li);
    }
    resultDiv.appendChild(ul);
  } else {
    const message = document.createElement('p');
    message.innerText = 'No breakfast plan found within the specified criteria.';
    resultDiv.appendChild(message);
  }
}
