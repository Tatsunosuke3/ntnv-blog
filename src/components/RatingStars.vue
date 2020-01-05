<template>
  <span>
    <RatingStar
      v-for="(state, index) in states"
      :key="state.id"
      :index="index"
      :state="state.state"
    ></RatingStar>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RatingStar, { RatingStarState } from "./RatingStar.vue";

@Component({
  components: {
    RatingStar
  }
})
export default class RatingStars extends Vue {
  @Prop({ default: 5 })
  public starCount!: number;

  @Prop()
  public rating!: number;

  private states: Array<{ id: number; state: RatingStarState }> = [
    { id: 0, state: RatingStarState.Empty },
    { id: 1, state: RatingStarState.Empty },
    { id: 2, state: RatingStarState.Empty },
    { id: 3, state: RatingStarState.Empty },
    { id: 4, state: RatingStarState.Empty }
  ];

  private mounted() {
    this.setStates();
  }

  private setStates() {
    this.states = [];
    let tmpRating: number = this.rating;
    for (let i = 0; i < this.starCount; i++) {
      if (tmpRating - 1 >= 0) {
        this.states.push({
          id: this.states.length,
          state: RatingStarState.Fill
        });
        tmpRating -= 1;
      } else {
        break;
      }
    }

    if (tmpRating * 10 >= 5) {
      this.states.push({
        id: this.states.length,
        state: RatingStarState.Half
      });
    }

    for (let i = this.states.length; i < this.starCount; i++) {
      this.states.push({
        id: this.states.length,
        state: RatingStarState.Empty
      });
    }
  }
}
</script>
<style scoped></style>
