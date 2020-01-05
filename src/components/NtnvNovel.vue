<template>
  <section class="novel">
    <div class="novel-header">
      <a class="novel-title" v-bind:href="novel.url" target="_blank">
        {{ novel.title }}
      </a>
      <span>作者:{{ novel.author }}</span>
    </div>
    <div class="novel-story">{{ novel.story }}</div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Novel } from "ntnv-models";
import NtnvTag from "./NtnvTag.vue";

@Component({
  components: {}
})
export default class NtnvNovel extends Vue {
  @Prop() private novel!: Novel;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.novel {
  background-color: #ebf9fb;
  padding: 1rem;
}
.novel-header {
  margin-bottom: 1rem;
}
.novel-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 2rem;
}

.novel-story {
  white-space: pre-line;
}
</style>
