<template>
  <div id="app">
    <md-tabs md-sync-route>
      <md-tab id="tab-welcome" md-label="Welcome" to="/welcome"></md-tab>
      <md-tab id="tab-summary" md-label="Summary" to="/expense-summary"></md-tab>
      <md-tab id="tab-category" md-label="Category" to="/category"></md-tab>
      <md-tab id="tab-rules" md-label="Rules" to="/rules"></md-tab>
      <md-tab id="tab-upload" md-label="Upload" to="/upload"></md-tab>
    </md-tabs>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
