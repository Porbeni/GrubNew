const fs = require('fs');

// Function to read data from a JSON file
function readJSON(filePath) {
  const rawData = fs.readFileSync(filePath);
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

// Function to create a breakfast plan based on user input
function createBreakfastPlan(data, userCalories, userProtein) {
  let bestPlan = [];
  let minCaloriesDiff = Number.MAX_VALUE;
  let minProteinDiff = Number.MAX_VALUE;

  // Loop through all possible combinations of food items
  for (let i = 0; i < data.length; i++) {
    const breakfastOption = [data[i]];
    let totalCalories = parseInt(data[i].Calories);
    let totalProtein = parseFloat(data[i].Protein);

    for (let j = i + 1; j < data.length; j++) {
      totalCalories += parseInt(data[j].Calories);
      totalProtein += parseFloat(data[j].Protein);
      breakfastOption.push(data[j]);

      const caloriesDiff = Math.abs(userCalories - totalCalories);
      const proteinDiff = Math.abs(userProtein - totalProtein);

      if (caloriesDiff <= 200 && proteinDiff <= 5) {
        // Check if this combination is better than the current best plan
        if (caloriesDiff < minCaloriesDiff || (caloriesDiff === minCaloriesDiff && proteinDiff < minProteinDiff)) {
          bestPlan = breakfastOption.slice(); // Create a copy of the breakfastOption array
          minCaloriesDiff = caloriesDiff;
          minProteinDiff = proteinDiff;
        }
      }
    }
  }

  return bestPlan;
}

module.exports = createBreakfastPlan;
