Template.grafic.onRendered(function(){
  $(function () {
      $(document).ready(function () {
          Highcharts.setOptions({
              global: {
                  useUTC: false
              }
          });

          $('#Temperature').highcharts({
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
                                  y = Math.random();
                              series.addPoint([x, y], true, true);
                          }, 1000);
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
                      text: '°C'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#A3BE8C'
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
                  enabled: false
              },
              exporting: {
                  enabled: false
              },
              series: [{
                  name: 'Demo',
                  data: (function () {
                      var datos = Cultivo.find().fetch();
                      var data = [],
                          time = (new Date()).getTime(),
                          i;

                      for (i = -19; i <= 0; i += 1) {
                          data.push({
                              x: time + i * 1000,
                              y: Math.random()
                          });
                      }
                      return data;
                  }())
              }]
          });
      });
  });

});
