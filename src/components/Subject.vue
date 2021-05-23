<template>
  <div>
    <h2>
      {{ subject.title }}
    </h2>

    {{ subject.content }} <br><br>
  </div>
</template>

<script>

export default {
  name: "Subject",
  props: {
    subject: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped>

</style>
