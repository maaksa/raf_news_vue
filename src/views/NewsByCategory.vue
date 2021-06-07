<template>
  <div>
    <h1 class="mt-4">Category: {{ this.$route.params.category }} </h1>

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

  </div>
</template>

<script>

export default {
  name: "NewsByCategory",
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
    }
  },
  methods: {
    findById(id) {
      this.$router.push(`/news/${id}`)
    }
  },
  mounted() {
    this.$axios.get(`/api/news/category/${this.$route.params.category}`).then((response) => {
      this.newsList = response.data;
    });
  },
  updated() {
    this.$axios.get(`/api/news/category/${this.$route.params.category}`).then((response) => {
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
  width: 80%;
  margin-left: 100px;
}
</style>