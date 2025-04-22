let currentCategory = null;
let currentCalculator = null;

function toggleCategory(category) {
  if (currentCategory && currentCategory !== category) {
    document.getElementById(currentCategory + "-section").classList.add("d-none");
  }

  const section = document.getElementById(category + "-section");
  const isVisible = !section.classList.contains("d-none");

  section.classList.toggle("d-none", isVisible);
  currentCategory = isVisible ? null : category;

  // Hide any visible calculator
  document.querySelectorAll("#calculator-area > div").forEach(div => div.classList.add("d-none"));
  currentCalculator = null;
}

function getNumbers(form) {
  return Array.from(form.querySelectorAll("input")).map(input => parseFloat(input.value));
}

function getSelectValue(form, index = 0) {
  return form.querySelectorAll("select")[index]?.value;
}

function showResult(form, message) {
  const resultEl = form.parentElement.querySelector("p, h5");
  if (resultEl) resultEl.textContent = message;
}

function showCalculator(type) {
  console.log("CALLED showCalculator for:", type);

  document.querySelectorAll("#calculator-area > div").forEach(div => div.classList.add("d-none"));

  const selectedCalc = document.getElementById(`${type}-calculator`);
  if (selectedCalc) {
    selectedCalc.classList.remove("d-none");
    currentCalculator = type;
  }

  const form = selectedCalc?.querySelector("form");
  if (!form) return;

  // Clone to reset listeners
  const cloned = form.cloneNode(true);
  form.parentNode.replaceChild(cloned, form);

  // Switch logic per calculator
  cloned.addEventListener("submit", function (e) {
    e.preventDefault();

    switch (type) {
      case "bmi": {
        const [feet, inches, weight] = getNumbers(cloned);
        const heightInMeters = ((feet * 12) + inches) * 0.0254;
        if (heightInMeters > 0 && weight > 0) {
          const bmi = weight / (heightInMeters ** 2);
          let status = "Obese";
          if (bmi < 18.5) status = "Underweight";
          else if (bmi < 24.9) status = "Normal weight";
          else if (bmi < 29.9) status = "Overweight";
          showResult(cloned, `Your BMI is ${bmi.toFixed(2)} (${status})`);
        } else {
          showResult(cloned, "Enter valid values.");
        }
        break;
      }

      case "bmr": {
        const age = parseInt(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const feet = parseFloat(document.getElementById("heightFeetBmr").value);
        const inches = parseFloat(document.getElementById("heightInchesBmr").value);
        const weight = parseFloat(document.getElementById("weightBmr").value);
        const heightInCm = ((feet * 12) + inches) * 2.54;

        let bmr = 0;
        if (gender === "male") {
          bmr = 10 * weight + 6.25 * heightInCm - 5 * age + 5;
        } else if (gender === "female") {
          bmr = 10 * weight + 6.25 * heightInCm - 5 * age - 161;
        }
        showResult("bmrForm", `Your BMR is ${bmr.toFixed(2)} calories/day.`);
        break;
      }

      case "calorie": {
        const [bmr] = getNumbers(cloned);
        const activity = getSelectValue(cloned);
        const factors = {
          "Sedentary": 1.2,
          "Lightly active": 1.375,
          "Moderately active": 1.55,
          "Very active": 1.725,
          "Super active": 1.9
        };
        const calories = bmr * (factors[activity] || 0);
        showResult(cloned, calories ? `Estimated calories: ${calories.toFixed(2)} kcal/day` : "Select an activity level.");
        break;
      }

      case "bodyFat": {
        const [bmi, age] = getNumbers(cloned);
        const gender = getSelectValue(cloned);
        const fat = gender === "Male"
          ? 1.20 * bmi + 0.23 * age - 16.2
          : gender === "Female"
            ? 1.20 * bmi + 0.23 * age - 5.4
            : 0;
        showResult(cloned, fat ? `Estimated Body Fat: ${fat.toFixed(2)}%` : "Check inputs.");
        break;
      }

      case "water": {
        const [weight] = getNumbers(cloned);
        const water = weight * 0.033;
        showResult(cloned, `Recommended intake: ${water.toFixed(2)} liters/day`);
        break;
      }

      case "idealWeight": {
        const [height] = getNumbers(cloned);
        const base = (height - 100) * 0.9;
        showResult(cloned, `Ideal weight: ${(base - 2.5).toFixed(1)} – ${(base + 2.5).toFixed(1)} kg`);
        break;
      }

      case "fuel": {
        const [distance, efficiency, price] = getNumbers(cloned);
        const cost = (distance / efficiency) * price;
        showResult(cloned, `Fuel cost: $${cost.toFixed(2)}`);
        break;
      }

      case "discount": {
        const [original, discount] = getNumbers(cloned);
        const final = original * (1 - discount / 100);
        showResult(cloned, `Final price: $${final.toFixed(2)}`);
        break;
      }

      case "timezone": {
        const time = cloned.querySelector("input[type='time']").value;
        const from = getSelectValue(cloned, 0);
        const to = getSelectValue(cloned, 1);
        const offsets = { "UTC": 0, "EST": -5, "PST": -8 };

        if (time && from && to) {
          const [hr, min] = time.split(":").map(Number);
          const utc = hr - offsets[from];
          const converted = (utc + offsets[to] + 24) % 24;
          showResult(cloned, `Converted time: ${String(converted).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
        } else {
          showResult(cloned, "Please select valid time zones.");
        }
        break;
      }

      default:
        alert("This calculator is under construction.");
    }
  });
}
