<template>
  <div>
    <h1 align="center" class="mt-4">Most Visited News</h1>

    <div class="row">
      <div>
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
    <b-pagination @change="handlePageChange" size="lg" align="center"
                  v-model="currentPage"
                  :total-rows="size-1"
                  :per-page="perPage"
    ></b-pagination>

    <p align="center" class="mt-3">Current Page: {{ currentPage }}</p>

  </div>
</template>

<script>

export default {
  name: "TopNews",
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
      newsList: [],
      size: 0,
      perPage: 2,
      currentPage: 1,
    }
  },
  methods: {
    handlePageChange(value) {
      this.$axios.get(`/api/news/page-num/${value}`).then((response) => {
        this.newsList = response.data;
        this.currentPage = value
      });
    },
    findById(id) {
      this.$router.push(`/news/${id}`)
    }
  },
  mounted() {
    this.$axios.get("/api/news/top-visited").then((response) => {
      this.newsList = response.data;
      this.size = this.newsList.length;
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
  width: 80%;
  margin-left: 100px;
  margin-top: 60px;
}
</style>