google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

const POLLING_TIME = 1000;
const chartData = [];

const getBitPrice = () => {
    return fetch('/price')
        .then((response) => {
            // console.log(response.text());
            return response.json();
        })
        .catch((err) => {
            console.log(err.message);
        });
};


function drawBasic() {
    
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'mid');
    
    getBitPrice()
        .then((data) => {
    
            chartData.push([
                new Date().getHours() * 10,
                parseFloat(data.mid),
            ]);
            console.log(chartData);
            // drawChart(chartData);
    
            let timer = setTimeout(drawBasic, POLLING_TIME);
        })
        .catch((err) => {
            console.log(err.message);
        });    


    data.addRows(chartData);
    // data.addRows([
    //     [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9]
    // ]);

    var options = {
        hAxis: {
        title: 'Time (h)'
        },
        vAxis: {
        title: 'Price (usd)'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('app'));

    chart.draw(data, options);
}