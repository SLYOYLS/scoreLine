<template>
  <div id="app">
    <QueryForm />
  </div>
</template>

<script>
import QueryForm from './components/QueryForm.vue';

export default {
  name: 'App',
  components: {
    QueryForm,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
}
</style>