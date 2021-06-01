<template>
  <div id="div-glavni" class="row" border-variant="dark">
    <h1>
      {{ singleNews.title }}
    </h1>

    <h4>Author: {{ singleNews.author.name }}</h4>

    <h6>Tags: <a v-for="tag in newsById.tags" :key="tag.word" href="#"> {{ tag.word }}
    </a></h6>

    <h6>Posted on: {{ new Date(singleNews.createdAt).toISOString().split('T')[0] }}</h6>
    <hr class="my-4">

    <h3>Content:</h3>
    <p>
      {{ singleNews.content }} <br><br>
    </p>
    <hr class="my-4">

    <b-jumbotron lead="Comments">
      <p id="single_comment" v-for="comment in newsById.comments" :key="comment.id">
        Author: {{ comment.author }}
        <br>
        Posted on: {{ new Date(comment.createdAt).toISOString().split('T')[0] }}
        <br>
        Comment: {{ comment.content }}
        <br>
      </p>
    </b-jumbotron>

  </div>
</template>




<script>

export default {
  name: "News",
  props: {
    singleNews: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      newsById: {},
    }
  },
  methods: {},
  beforeUpdate() {
    this.$axios.get(`/api/news/${this.singleNews.id}`).then((response) => {
      this.newsById = response.data;
    });
  }
}
</script>

<style scoped>
#div-glavni {
  border: 1px solid black;
  margin-top: 23px;
}
#single_comment{
  width: 100%;
  border: 3px solid black;
  padding: 10px;
}
</style>
