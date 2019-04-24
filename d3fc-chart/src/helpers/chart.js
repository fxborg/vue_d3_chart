export default {
  install: function(Vue) {
    Vue.prototype.$helpers = {
      chart: {
        /* Helper Function */
        renderChart: function(d3, fc, data, options) {
          const xTicks = 5;
          const gridlines = fc.annotationSvgGridline().xTicks(xTicks);
          const series = this.getSeries(fc, options.barType);
          const xScale = fc.scaleDiscontinuous(d3.scaleTime());

          // use the extent component to determine the x and y domain
          const xExtent = fc.extentDate()
            .accessors([d => d.date]);

          const yExtent = fc.extentLinear()
            .accessors([d => d.high, d => d.low]);

          const chart = fc.chartSvgCartesian(
              xScale,
              d3.scaleLinear()
            ).xDomain(xExtent(data))
            .xTicks(xTicks)
            .yDomain(yExtent(data));

          // select and render
          const multi = fc.seriesSvgMulti().series([gridlines,series]);

          chart.plotArea(multi);

          d3.select(options.selector)
            .datum(data)
            .call(chart);
        },
        getSeries: function(fc, barType){
          if(barType=='ohlc'){
            return fc.seriesSvgOhlc();
          } else if(barType=='candle'){
            return fc.seriesSvgCandlestick();
          } else {
            return fc.seriesSvgLine()
              .mainValue(d => d.close)
      	      .crossValue(d => d.date);

          }
        }
      }
    }
  }
}
