const app = document.querySelector('#app');

const POLLING_TIME = 1000;
let timer = null;
const chartData = [];

const startPolling = () => {
    getBitPrice()
        .then((data) => {

            chartData.push([
                new Date().getSeconds(),
                parseFloat(data.mid),
            ]);

            drawChart(chartData);

            timer = setTimeout(startPolling, POLLING_TIME);
        })
        .catch((err) => {
            console.log(err.message);
        });    
}

const getBitPrice = () => {
    return fetch('/price')
        .then((response) => {
            // return response.json();
            return response;
        })
        .catch((err) => {
            console.log(err.message);
        });
}

const drawChart = (chartData) => {
    const data = new google.visualization.DataTable();

    

    data.addColumn('number', 'Date');
    data.addColumn('number', 'Price');

    data.addRows(chartData);

    const options = {
        hAxis: { title: 'Time' },
        vAxis: { title: 'avr price' }
    };
    const chart = new google.visualization.LineChart(app);

    chart.draw(data, options);
};

google.charts.load('current', {
    packages: [
        'corechart',
        'line'
    ]
});
google.charts.setOnLoadCallback(startPolling());


