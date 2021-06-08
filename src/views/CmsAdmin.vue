<template>
  <div id="home">
    <div id="nav">
      <!--      linkovi ka rutama Home About-->
      <router-link to="/top-news">Top News</router-link>
    </div>
    <!--   router-view - ovde ce se ucitavati komponente koje smo definisali u routes u index.js tkd ce se samo ovaj deo menjati kad klicemo na linkove home|about-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "CmsAdmin"
}
</script>

<style scoped>

</style>