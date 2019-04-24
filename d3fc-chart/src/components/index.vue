<template>
  <div class="flex-container" id="app">
    <div class="flex-item">
      <div>
        <div class="item"><b>バーの種類を選択する</b></div>
        <div class="item">
          <input id="close" type="radio" value="close" v-model="options.barType" v-on:change="changeBarType">
          <label for="close">Close Price</label>
        </div>
        <div class="item">
          <input id="ohlc" type="radio" value="ohlc" v-model="options.barType" v-on:change="changeBarType">
          <label for="ohlc">OHLC</label>
        </div>
        <div class="item">
          <input id="candle" type="radio" value="candle" v-model="options.barType" v-on:change="changeBarType">
          <label for="candle">Candlesticks</label>
      </div>
      <div class="item"><p>チャートを更新するスクリプト。D3fc.jsを使用しています。 </p></div>
      </div>
     
    </div>
    <div class="flex-item">
      <div id="chart" v-bind:style="{ width: width + 'px', height: height+'px'}"></div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'Chart',
  data() {
    return {
      margin : { top: 50, right: 50, bottom: 50, left: 20 },
      height: 300,
      width:500,
      stream:{},
      data: {},
      options: {
        barType: 'ohlc',
        selector: '#chart'
      }
    }
  },
  mounted: function() {
      this.setChartSize();
      window.addEventListener('resize', this.setChartSize, false);
      this.stream = this.$fc.randomFinancial().stream();
      this.data = this.stream.take(80);
      this.renderCharts(); 

      if (window.intervalId) {
        window.clearInterval(window.intervalId);
      }
      const self=this;
      window.intervalId = setInterval(self.renderCharts, 200);
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.setChartSize, false);
  },
  methods: {
    changeBarType: function(){
      this.$d3.select(this.options.selector).selectAll('g').remove();
      this.$helpers.chart.renderChart(this.$d3, this.$fc,this.data,this.options);
    },
    renderCharts: function(){
      this.data.push(this.stream.next());
      this.data.shift();
      this.$helpers.chart.renderChart(this.$d3, this.$fc,this.data,this.options);
    },
    setChartSize: _.debounce(function(){
      const viewportWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth
      );
      const viewportHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight
      );
      if (viewportWidth <= 768) {
        this.width = viewportWidth - this.margin.left - this.margin.right; // Use the window's width
        this.height = 0.5 * viewportHeight - this.margin.top - this.margin.bottom; // Use the window's height
      } else {
        this.width = 0.75 * viewportWidth - this.margin.left - this.margin.right;
        this.height = viewportHeight - this.margin.top - this.margin.bottom; // Use the window's height
      }

    }, 100)
  }
}
</script>
<style>
</style>

