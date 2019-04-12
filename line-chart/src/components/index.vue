<template>
<div class="content">
  <div class="segment">
    <svg class="chart" id="chart" ></svg>
  </div>
</div>
</template>
<script>
export default {
  name: 'LineChart',
  data() {
    return {
      dataSet: [
{"date":"1-May-12","close":558.13},
{"date":"30-Apr-12","close":553.98},
{"date":"27-Apr-12","close":567.00},
{"date":"26-Apr-12","close":589.70},
{"date":"25-Apr-12","close":599.00},
{"date":"24-Apr-12","close":630.28},
{"date":"23-Apr-12","close":666.70},
{"date":"20-Apr-12","close":634.98},
{"date":"19-Apr-12","close":645.44},
{"date":"18-Apr-12","close":643.34},
{"date":"17-Apr-12","close":543.70},
{"date":"16-Apr-12","close":580.13},
{"date":"13-Apr-12","close":605.23},
{"date":"12-Apr-12","close":622.77},
{"date":"11-Apr-12","close":626.20},
{"date":"10-Apr-12","close":628.44},
{"date":"9-Apr-12","close":636.23},
{"date":"5-Apr-12","close":633.68},
{"date":"4-Apr-12","close":624.31},
{"date":"3-Apr-12","close":629.32},
{"date":"2-Apr-12","close":618.63},
{"date":"30-Mar-12","close":599.55},
{"date":"29-Mar-12","close":609.86},
{"date":"28-Mar-12","close":617.62},
{"date":"27-Mar-12","close":614.48},
{"date":"26-Mar-12","close":606.98}
      ],
      options: {
        x:"date",
        y:"close",
        height: 300,
        width: 800
      }
    }
  },
  mounted: function() {
    this.renderCharts();
  },
  beforeUpdate: function(){
    this.renderCharts();
  },
  methods: {
     renderCharts: function (){
      this.options.selector = '#chart',
      this.options.title = "Simple Line Chart!"
      var parseTime = this.$d3.timeParse("%d-%b-%y");

      var ds = this.dataSet.map(function(d) {
      return {
            date: parseTime(d['date']),
            close: +d['close']
          };
      });

      this.$helpers.chart.lineChart(this.$d3, ds, this.options);
     }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.segment {
  width: 100%;
  float: left;
  align-content:center;
}
.chart {
  padding: 20px;
  background: #EEFFFF;
}
</style>

