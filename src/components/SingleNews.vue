<template>
  <div id="div-glavni" class="row" border-variant="dark">
    <h1>
      {{ singleNews.title }}
    </h1>

    <h4 v-if="singleNews.author">Author: {{ singleNews.author.name }}</h4>

    <h6>Tags: <a v-for="tag in newsById.tags" :key="tag.word" @click="getByTag(tag.word)"> {{ tag.word }}
    </a></h6>

    <h6>Posted on: {{ new Date(singleNews.createdAt).toISOString().split('T')[0] }}</h6>
    <hr class="my-4">

    <h3>Content:</h3>
    <p>
      {{ singleNews.content }} <br><br>
    </p>
    <hr class="my-4">

    <form @submit.prevent="addComment">
      <p class="h4 text-center mb-4">New Comment</p>

      <label for="defaultFormContactNameEx" class="grey-text">Your name</label>
      <input v-model="comment.author" type="text" id="defaultFormContactNameEx" class="form-control" required="true">

      <br>

      <label for="defaultFormContactMessageEx" class="grey-text">Your message</label>
      <textarea v-model="comment.content" type="text" id="defaultFormContactMessageEx" class="form-control" rows="3"
                required="true"></textarea>

      <div class="text-center mt-4">
        <button class="btn btn-primary" type="submit">Send<i class="far fa-paper-plane ml-2"></i>
        </button>
      </div>
    </form>


    <div>
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
      comment: {
        author: '',
        content: ''
      },
      newsById: {},
    }
  },
  methods: {
    getByTag(word) {
      this.$router.push(`/news/tag/${word}`)
    },
    addComment() {
      this.$axios.post(`/api/news/${this.singleNews.id}/comments`, {
        author: this.comment.author,
        content: this.comment.content
      });
      this.comment.content = ''
      this.comment.author = ''
    }
  },
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

#single_comment {
  width: 100%;
  border: 3px solid black;
  padding: 10px;
}
</style>
