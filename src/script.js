import './style.css'

function weatherSource() {
    return new Promise((resolve, reject) => {
        fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/M5521?key=R69VLPJQYN9VB8XVYC3D9BC66&lang=es")
            .then(response => response.json())
            .then(response => {
                console.log(response);
                resolve(response)
            })
    
    .catch(error => reject(error))
})
}

weatherSource()





 const myAPIKey = "R69VLPJQYN9VB8XVYC3D9BC66";
