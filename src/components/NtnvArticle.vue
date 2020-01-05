<template>
  <article>
    <div>
      <span class="article-date">{{ updatedAt }}</span>
    </div>
    <div class="article-header">
      <div>
        <svg class="category-icon" viewBox="0 0 100 100">
          <use v-bind:xlink:href="'#' + categoryIconId"></use>
        </svg>
      </div>
      <div>
        <h1 class="article-title">
          {{ articleHeader.title }}
        </h1>
        <div class="rating-stars">
          おすすめ度：<RatingStars :rating="articleHeader.rating"></RatingStars>
        </div>
      </div>
    </div>

    <div>
      <span v-for="tag in articleHeader.tags" v-bind:key="tag.id">
        <NtnvTag :tag="tag"></NtnvTag>
      </span>
    </div>

    <button
      class="more-button"
      type="button"
      v-on:click="whenMoreButtonClicked"
    >
      {{ moreButtonText }}
    </button>

    <div v-if="isOpen">
      <NtnvNovel :novel="article.novel"></NtnvNovel>
      <div class="article-text">
        {{ article.text }}
      </div>
    </div>
  </article>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article, ArticleHeader, Tag, Novel } from "ntnv-models";
import NtnvTag from "./NtnvTag.vue";
import RatingStars from "./RatingStars.vue";
import NtnvNovel from "./NtnvNovel.vue";

@Component({
  components: {
    NtnvTag,
    RatingStars,
    NtnvNovel
  }
})
export default class NtnvArticle extends Vue {
  @Prop() private articleHeader!: ArticleHeader;

  @Prop({ default: "http://localhost:58001" })
  host!: string;

  private article: Article = new Article(
    0,
    "",
    0,
    "",
    new Date(0),
    new Date(0),
    0,
    new Novel(0, "", "", "", ""),
    []
  );
  private isOpen: boolean = false;
  private isContentLoaded: boolean = false;

  get moreButtonText(): string {
    return this.isOpen ? "続きを閉じる" : "続きを読む";
  }

  get categoryIconId(): string {
    const tag = this.articleHeader.tags.find(
      tag => tag.category === "カテゴリ"
    );
    if (!tag) return "#category-icon-original";

    switch (tag.name) {
      case "オリジナル":
        return "category-icon-origin";
      case "二次創作":
        return "category-icon-fanfiction";
      case "やる夫スレ":
        return "category-icon-yaruo";
      case "書籍":
        return "category-icon-book";
      default:
        return "category-icon-origin";
    }
  }

  get updatedAt(): string {
    const date = new Date(this.articleHeader.updatedAt);

    const yyyy = date.getFullYear();
    const m = ("00" + (date.getMonth() + 1)).slice(-2);
    const d = ("00" + date.getDate()).slice(-2);
    const h = ("00" + date.getHours()).slice(-2);
    const mi = ("00" + date.getMinutes()).slice(-2);
    const s = ("00" + date.getSeconds()).slice(-2);

    return `${yyyy}/${m}/${d} ${h}:${mi}:${s}`;
  }

  get text(): string {
    if (!this.article) {
      return "";
    }

    return this.article.novel.story;
  }

  async whenMoreButtonClicked() {
    console.log("続きを読むがクリックされた。");
    if (!this.isContentLoaded) {
      const res = await fetch(`${this.host}/article/${this.articleHeader.id}`);
      const json = await res.json();
      this.article = json as Article;
      this.isContentLoaded = true;
    }
    this.isOpen = !this.isOpen;
    this.$forceUpdate();
  }
}
</script>
<style scoped>
article {
  margin: 0.5rem 0.5rem 4rem 0.5rem;
}

.article-header {
  display: flex;
  background: #004b57;
}

.category-icon {
  display: block;
  height: 4.5rem;
  width: 4.5rem;
}

.article-title {
  color: #fff;
  font-size: 1.2rem;
  line-height: 2rem;
  margin: 0.4rem 0 0 0.4rem;
}

.rating-stars {
  display: block;
  margin: 0 0 0.4rem 0.4rem;
  color: #fff;
}

.rating-star {
  width: 1.25rem;
  height: 1.25rem;
}

.more-button {
  width: 100%;
  margin: 2rem 0 2rem 0;
  height: 3rem;
}

.article-text {
  margin-top: 2rem;
  padding: 1rem;
  white-space: pre-line;
}

.article-date {
  font-size: 1.2rem;
}
</style>
