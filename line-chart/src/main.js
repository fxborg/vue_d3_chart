import Vue from 'vue'
import App from './App.vue'
import * as d3 from 'd3'
import chart from './helpers/chart.js'

Vue.config.productionTip = false

Vue.use(chart);
Object.defineProperty(Vue.prototype, '$d3', {value: d3});

new Vue({
  render: h => h(App),
}).$mount('#app')
