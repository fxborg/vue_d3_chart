import Vue from 'vue'
import App from './App.vue'
import * as d3 from 'd3'
import chart from './helpers/chart.js'
import * as fc from 'd3fc'
Vue.config.productionTip = false

Vue.use(chart);
Object.defineProperty(Vue.prototype, '$d3', {value: d3});
Object.defineProperty(Vue.prototype, '$fc', {value: fc});

new Vue({
  render: h => h(App),
}).$mount('#app')
