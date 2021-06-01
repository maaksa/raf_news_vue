<template>
  <div>
    <!--    rijuzujemo komponentu Subject-->
    <news :subject="subject"></news>
  </div>
</template>

<script>
import News from "../components/SingleNews";

export default {
  name: "SingleSubject",
  components: {News},
  data() {
    return {
      subject: {},
    }
  },
  created() {
    this.$axios.get(`/api/subjects/${this.$route.params.id}`).then((response) => {
      this.subject = response.data;
    });
  }
}
</script>

<style scoped>

</style>
