<template>
  <div>
    <h1 class="mt-4">Tag: {{ this.$route.params.word }}</h1>

    <div class="row">
      <div class="col-6">
        <div v-for="news in newsList" :key="news.id">
          <br>
          <div id="home">
            <b-jumbotron border-variant="dark">
              <template v-slot:header><h1>{{ news.title | capitalize }}</h1></template>
              <template v-slot:lead><h3>{{ news.category.name }}</h3></template>
              <p>Posted on: {{ new Date(news.createdAt).toISOString().split('T')[0] }}</p>
              <hr class="my-4">
              <p>{{ news.content | shortText }}</p>
              <b-button variant="primary" @click="findById(news.id)">More Info
              </b-button>
            </b-jumbotron>
          </div>
        </div>
      </div>

    </div>
    <br>
    <b-pagination size="lg" align="center"
                  v-model="currentPage"
                  :total-rows="rows"
                  :per-page="perPage"
                  aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>

export default {
  name: "NewsByTag",
  filters: {
    shortText(value) {
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + '...'
    }
  },
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    findById(id) {
      this.$router.push(`/news/${id}`)
    }
  },
  mounted() {
    this.$axios.get(`/api/news/tag/${this.$route.params.word}`).then((response) => {
      this.newsList = response.data;
    });
  },

}
</script>

<style scoped>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>