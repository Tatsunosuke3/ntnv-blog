<template>
  <div>
    <transition name="fade" mode="out-in">
      <VueLoading
        v-if="articleHeaders.length === 0"
        type="cylon"
        color="#004b57"
        :size="{ width: '7rem', height: '7rem' }"
      ></VueLoading>
      <div v-else>
        <NtnvArticle
          v-for="articleHeader in articleHeaders"
          :key="articleHeader.id"
          :articleHeader="articleHeader"
          :host="host"
        ></NtnvArticle>
      </div>
    </transition>
    <div class="pagination-container">
      <router-link class="pagination prev first" :to="prevPage" rel="prev">
        前のページ
      </router-link>
      <router-link class="pagination next" :to="nextPage" rel="next">
        次のページ
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Watch, Component, Prop, Vue } from "vue-property-decorator";
import { ArticleHeader, Tag } from "ntnv-models";
import { VueLoading } from "vue-loading-template";
import NtnvArticle from "./NtnvArticle.vue";

@Component({
  components: {
    VueLoading,
    NtnvArticle
  }
})
export default class NtnvArticles extends Vue {
  @Prop()
  host!: string;

  @Prop({ default: "/" })
  request!: string;

  articleHeaders: ArticleHeader[] = [];

  get requestUrl(): string {
    return this.host + this.request;
  }

  public async fetch(request: string) {
    this.articleHeaders = await this.fetchArticleHeaders(this.host + request);
  }

  private async created() {
    this.articleHeaders = await this.fetchArticleHeaders(this.requestUrl);
  }

  private async fetchArticleHeaders(url: string): Promise<ArticleHeader[]> {
    const res = await fetch(url);
    const json = await res.json();
    return json as ArticleHeader[];
  }

  get nextPage(): string {
    const path = this.$route.path;
    const queries = this.editQueries(
      this.$route.query.page as string,
      this.$route.query.order as string,
      1
    );
    return `${path}?${queries}`;
  }

  get prevPage(): string {
    const path = this.$route.path;
    const queries = this.editQueries(
      this.$route.query.page as string,
      this.$route.query.order as string,
      -1
    );
    return `${path}?${queries}`;
  }

  private editQueries(page: string, order: string, increment: number): string {
    const queries: string[] = [];

    let p: string;
    if (page) {
      p = (Number(page) + increment).toString();
    } else {
      p = (1 + increment).toString();
    }
    queries.push(`page=${p}`);

    if (order) {
      queries.push(`order=${order}`);
    }

    return queries.join("&");
  }
}
</script>
<style scoped>
.pagination-container {
  margin: 0.5rem;
}

.pagination {
  display: inline-block;
  width: 50%;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  font-weight: bold;
  text-decoration: none;
  color: #004b57;
  border-style: solid solid solid none;
  border-width: 1px;
  border-color: #004b57;
  transition: 0.4s;
}
.pagination.first {
  border-left: 1px solid #004b57;
}
.pagination:hover {
  background: #004b57;
  color: white;
}
</style>
