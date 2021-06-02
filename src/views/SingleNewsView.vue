<template>
  <div>
    <single-news :singleNews="news"></single-news>
  </div>
</template>

<script>
import SingleNews from "../components/SingleNews";

export default {
  name: "SingleNewsView",
  components: {SingleNews},
  data() {
    return {
      news: {},
    }
  },
  created() {
    this.$axios.get(`/api/news/${this.$route.params.id}`).then((response) => {
      this.news = response.data;
    });
  }
}
</script>

<style scoped>

</style>
