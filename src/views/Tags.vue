<template>
  <div class="tags">
    <NtnvArticles :request="path" ref="articles"></NtnvArticles>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Route } from "vue-router";
import { ArticleHeader } from "ntnv-models";
import { VueLoading } from "vue-loading-template";
import NtnvArticles from "@/components/NtnvArticles.vue";

Component.registerHooks(["beforeRouteUpdate"]);

@Component({
  components: {
    VueLoading,
    NtnvArticles
  }
})
export default class Tags extends Vue {
  get path() {
    return this.$route.fullPath;
  }

  private async beforeRouteUpdate(to: Route, from: Route, next: any) {
    const articles = this.$refs.articles as NtnvArticles;
    await articles.fetch(to.fullPath);
    next();
  }
}
</script>
