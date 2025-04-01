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

function showCalculator(type) {
    console.log("CALLED showCalculator for:", type);

    // Hide all calculators
    document.querySelectorAll("#calculator-area > div").forEach(div => div.classList.add("d-none"));

    // Show selected calculator
    const selectedCalc = document.getElementById(`${type}-calculator`);
    if (selectedCalc) {
        selectedCalc.classList.remove("d-none");
        currentCalculator = type;
    }

    // Clear existing form listeners for non-BMI/BMR
    if (type !== "bmi" && type !== "bmr") {
        const form = selectedCalc.querySelector("form");
        if (form) {
            const cloned = form.cloneNode(true);
            form.parentNode.replaceChild(cloned, form);

            cloned.addEventListener("submit", function (e) {
                e.preventDefault();
                alert("This calculator is under construction.");
            });
        }
    }

    // BMI Calculation
    if (type === "bmi") {
        const bmiForm = document.getElementById("bmiForm");
        bmiForm.onsubmit = function (e) {
            e.preventDefault();
            const feet = parseFloat(document.getElementById("heightFeet").value);
            const inches = parseFloat(document.getElementById("heightInches").value);
            const weight = parseFloat(document.getElementById("weight").value);
            const heightInMeters = ((feet * 12) + inches) * 0.0254;

            if (heightInMeters > 0 && weight > 0) {
                const bmi = weight / (heightInMeters * heightInMeters);
                let result = "";

                if (bmi < 18.5) result = "Underweight";
                else if (bmi < 24.9) result = "Normal weight";
                else if (bmi < 29.9) result = "Overweight";
                else result = "Obese";

                document.getElementById("bmiResult").textContent = `Your BMI is ${bmi.toFixed(2)} (${result})`;
            } else {
                document.getElementById("bmiResult").textContent = "Enter valid values.";
            }
        };
    }

    // BMR Calculation
    if (type === "bmr") {
        const bmrForm = document.getElementById("bmrForm");
        bmrForm.onsubmit = function (e) {
            e.preventDefault();
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

            document.getElementById("bmrResult").textContent = `Your BMR is ${bmr.toFixed(2)} calories/day.`;
        };
    }
}
