<template>
  <div id="home">
    <div id="nav">
      <!--      linkovi ka rutama Home About-->
      <router-link to="/category">Add Category</router-link>
      |
      <router-link to="/user">Add User</router-link>
      |
      <router-link to="/admin-news">Add News</router-link>
    </div>
    <!--   router-view - ovde ce se ucitavati komponente koje smo definisali u routes u index.js tkd ce se samo ovaj deo menjati kad klicemo na linkove home|about-->
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Cms',
  components: {}
}
</script>

<style scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 80%;
  margin-left: 100px;
  margin-top: 60px;
}
</style>
