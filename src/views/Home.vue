<template>
  <div class="home">
    <NtnvArticles
      :apiPath="apiPath"
      :request="path"
      ref="articles"
    ></NtnvArticles>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Route } from "vue-router";
import { ArticleHeader } from "ntnv-models";
import { VueLoading } from "vue-loading-template";
import NtnvArticle from "@/components/NtnvArticle.vue";
import NtnvArticles from "@/components/NtnvArticles.vue";
import { ntnvApiPath } from "@/globalConstants";

Component.registerHooks(["beforeRouteUpdate"]);

@Component({
  components: {
    VueLoading,
    NtnvArticle,
    NtnvArticles
  }
})
export default class Home extends Vue {
  get apiPath(): string {
    return ntnvApiPath;
  }

  get path(): string {
    return this.$route.fullPath;
  }

  private async beforeRouteUpdate(to: Route, from: Route, next: any) {
    const articles = this.$refs.articles as NtnvArticles;
    await articles.update(to.fullPath);
    next();
  }
}
</script>
