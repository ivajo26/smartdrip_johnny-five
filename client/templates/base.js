Template.base.helpers({
  cultivos: function () {
    // this helper returns a cursor of
    // all of the posts in the collection
    console.log(Cultivo.find());
    return Cultivo.find();
  }
});

Template.base.onRendered(function(){
console.log(Cultivo.find().fetch());
$('#container').highcharts({
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var x = (new Date()).getTime(), // current time
                        y = Cultivo.find().fetch()[1].Temperature
                    series.addPoint([x, y], true, true);
                }, 3000);
            }
        }
    },
    title: {
        text: ''
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Grados °C'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#36465D'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: true
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Envio #d324 (Monteria - Bogota)',
        color: '#428BCA',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 4000,
                    y: 2
                });
            }
            return data;
        }())
    }]
});

});
