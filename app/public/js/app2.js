$(document).ready(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    const getBitPrice = () => {
        return fetch('/price')
            .then((response) => {
                return response.json();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const bits = {};

    Highcharts.chart('container', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    
                    setInterval(function () {
                        getBitPrice().then((data) => {
                            bits.p = parseFloat(data.mid);
                        });
                        var x = (new Date()).getTime(), // current time
                            y = bits.p;
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live btc usd'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Price'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'BTC USD',
            data: (function () {
               
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: null
                    });
                }
                return data;
            }())
        }]
    });
});