<template>
  <span>
    <svg class="rating-star" viewBox="0 0 100 100">
      <use :xlink:href="svgId"></use>
    </svg>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class RatingStar extends Vue {
  @Prop()
  private state!: RatingStarState;

  private get svgId(): string {
    return `#${this.state}-star`;
  }
}

export enum RatingStarState {
  Empty = "empty",
  Half = "half",
  Fill = "fill"
}
</script>
<style scoped>
.rating-star {
  width: 1.25rem;
  height: 1.25rem;
}
</style>
