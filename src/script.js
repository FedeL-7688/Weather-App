import "./style.css";

const myAPIKey = "R69VLPJQYN9VB8XVYC3D9BC66";

function weatherSource(loc, lan, meas) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=${myAPIKey}&unitGroup=${meas}&lang=${lan}`,
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        resolve(response);
      })

      .catch((error) => reject(error));
  });
}

const form = document.querySelector("#formulary");
const loctInput = document.querySelector("#location");
const langInput = document.querySelector("#lang");

loctInput.addEventListener("input", () => {
  if (!loctInput.validity.valid) {
    loctInput.setCustomValidity("the location is invalid");
    loctInput.reportValidity();
  } else if (loctInput.validity.valueMissing) {
    loctInput.setCustomValidity(
      "the location is required. eg. ZIP CODE / city name / country",
    );
    loctInput.reportValidity();
  } else {
    loctInput.setCustomValidity("");
  }
});

langInput.addEventListener("input", () => {
  if (langInput.validity.tooLong) {
    langInput.setCustomValidity("the language code must be 2 characters long");
    langInput.reportValidity();
  } else if (langInput.validity.tooShort) {
    langInput.setCustomValidity("the language code must be 2 characters long");
    langInput.reportValidity();
  } else if (langInput.validity.patternMismatch) {
    langInput.setCustomValidity(
      "the language code must be 2 characters long from a to z (lowercase)",
    );
    langInput.reportValidity();
  } else {
    langInput.setCustomValidity("");
  }
});

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", async (event) => {
  const weatherInfo = document.querySelector("#weather-info");
  weatherInfo.innerHTML = "";
  event.preventDefault();

  const measureInput = document.querySelector(`input[name="measure"]:checked`);
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  weatherInfo.classList.add("hidden");

  await weatherSource(
    loctInput.value,
    langInput.value,
    measureInput.value,
  ).then((response) => {
    const weatherIcon = document.createElement("img");
    weatherInfo.classList.remove("hidden");
    weatherIcon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/2nd%20Set%20-%20Color/${response.currentConditions.icon}.svg`;
    console.log("aca deberia estar el problema:", weatherIcon.src);
    weatherInfo.appendChild(weatherIcon);
    const weatherText = document.createElement("p");
    weatherText.innerHTML = `Location: ${response.resolvedAddress}<br>
        Weather: ${response.currentConditions.conditions} <br>
        Time: ${response.currentConditions.datetime} <br>
        Temperature: ${response.currentConditions.temp}°${measureInput.value === "metric" ? "C" : "F"} <br>
        Feels like: ${response.currentConditions.feelslike}°${measureInput.value === "metric" ? "C" : "F"}`;
    weatherInfo.appendChild(weatherText);
  });
});
