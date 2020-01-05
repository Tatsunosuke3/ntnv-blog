<template>
  <router-link class="ntnv-tag" :to="'/tags/' + name">
    <span class="tag-kind" v-if="tagKindExists">
      {{ this.tag.category }}：
    </span>
    <span class="tag-name">
      {{ name }}
    </span>
  </router-link>
  <!-- <span class="ntnv-tag">
    <span class="tag-kind" v-if="tagKindExists">
      {{ this.tag.category }}：
    </span>
    <span class="tag-name">
      {{ name }}
    </span>
  </span> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tag } from "ntnv-models";

@Component
export default class NtnvTag extends Vue {
  @Prop() private tag!: Tag;

  private get tagKindExists(): boolean {
    return this.tag.category !== "小説属性";
  }

  private get name(): string {
    return this.tag.name;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ntnv-tag {
  display: inline-block;
  line-height: 1.7rem;
  margin: 0.25rem;
  padding: 0.2rem 0.4rem 0.1rem 0.4rem;
  border-radius: 3px;
  border: solid 1px #004b57;
  background: #006777;
  text-decoration: none;
  transition: 0.2s;
  /* border: solid 1px #999;
  background: #f1f1f1; */
}

.ntnv-tag:hover {
  background: #00899e;
}

.tag-kind {
  display: inline;
  color: #a2bbbe;
  /* color: #666; */
  font-size: 0.8rem;
}

.tag-name {
  display: inline;
  /*color: #2a727d;*/
  color: rgb(255, 255, 255);
  /*font-weight: bold;*/
}
</style>
