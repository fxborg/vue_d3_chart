<template>
<div><index /></div>
</template>

<script>
import index from './components/index.vue'

export default {
  name: 'app',
  components: {
    index
  }
}
</script>

<style>
body {
  background: #042935;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

#chart {
  background: #284a5d;
  color: #67809f;
  width: 100%;
  height: 100%;
}

.flex-container {
  padding: 0;
  margin: 0;
  list-style: none;

  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

.flex-item {
  color: white;
  text-align: left;
  font-size: 0.9em;
  letter-spacing: 0.01em;
}

.flex-item:first-child > div, p {
  padding: 1em 1em 1em 0;
}

@media screen and (max-width: 768px) {
  .flex-container {
    -webkit-flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }
}


</style>
