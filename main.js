const loaderContainer = document.querySelector(".loader-container")
const canvasChart = document.getElementById("myChart").getContext("2d")
const dateInterval = document.getElementById("dateInterval")
let myChart = null
let dateStart = "2022-01-01"
let moneyData = {}

function showLoader() {
    loaderContainer.style.display = "flex"
}

function hideLoader() {
    loaderContainer.style.display = "none"
}

function renderChart() {
    myChart = new Chart(canvasChart, {
        type: "bar",
        data: {
            labels: Object.keys(moneyData.rates),
            datasets: [
                {
                    label: "Valor del Dolar",
                    data: Object.values(moneyData.rates),
                    backgroundColor: [
                        "rgba(62, 149, 255, 0.2)",
                        "rgba(255, 132, 96, 0.2)",
                        "rgba(102, 255, 178, 0.2)",
                        "rgba(255, 228, 55, 0.2)",
                        "rgba(238, 73, 255, 0.2)",
                        "rgba(255, 139, 238, 0.2)",
                        "rgba(187, 255, 62, 0.2)",
                        "rgba(255, 232, 188, 0.2)",
                        "rgba(76, 255, 217, 0.2)",
                        "rgba(255, 123, 62, 0.2)",
                        "rgba(185, 62, 255, 0.2)",
                        "rgba(90, 255, 140, 0.2)",
                        "rgba(255, 194, 209, 0.2)",
                        "rgba(119, 255, 102, 0.2)",
                        "rgba(255, 71, 71, 0.2)",
                        "rgba(255, 240, 155, 0.2)",
                        "rgba(103, 62, 255, 0.2)",
                        "rgba(62, 255, 210, 0.2)",
                        "rgba(255, 96, 175, 0.2)",
                        "rgba(170, 255, 212, 0.2)",
                        "rgba(255, 163, 106, 0.2)",
                        "rgba(92, 255, 180, 0.2)",
                        "rgba(255, 209, 246, 0.2)",
                    ],
                    borderColor: [
                        "rgba(62, 149, 255, 1)",
                        "rgba(255, 132, 96, 1)",
                        "rgba(102, 255, 178, 1)",
                        "rgba(255, 228, 55, 1)",
                        "rgba(238, 73, 255, 1)",
                        "rgba(255, 139, 238, 1)",
                        "rgba(187, 255, 62, 1)",
                        "rgba(255, 232, 188, 1)",
                        "rgba(76, 255, 217, 1)",
                        "rgba(255, 123, 62, 1)",
                        "rgba(185, 62, 255, 1)",
                        "rgba(90, 255, 140, 1)",
                        "rgba(255, 194, 209, 1)",
                        "rgba(119, 255, 102, 1)",
                        "rgba(255, 71, 71, 1)",
                        "rgba(255, 240, 155, 1)",
                        "rgba(103, 62, 255, 1)",
                        "rgba(62, 255, 210, 1)",
                        "rgba(255, 96, 175, 1)",
                        "rgba(170, 255, 212, 1)",
                        "rgba(255, 163, 106, 1)",
                        "rgba(92, 255, 180, 1)",
                        "rgba(255, 209, 246, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
    })
}

function filterRates() {
    Object.keys(moneyData.rates).forEach((rate) => {
        if (moneyData.rates[rate] > 23) {
            delete moneyData.rates[rate]
        }
    })
}

async function getMoney() {
    showLoader()

    const response = await axios.get(
        `https://api.frankfurter.app/${dateStart}?base=USD`
    )

    moneyData = response.data

    filterRates()
    renderChart()
    hideLoader()
}

dateInterval.addEventListener("change", function (event) {
    dateStart = event.target.value
    myChart.destroy()
    getMoney()
})

// rutina principal
getMoney()
