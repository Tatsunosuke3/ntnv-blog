<template>
  <header v-scroll="handleScroll">
    <div class="header-container">
      <!-- <span class="header-title">ntnv-blog</span> -->
      <router-link class="header-title" to="/">ntnv-blog</router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { DirectiveOptions, DirectiveFunction } from "vue";
import { Component, Prop, Vue } from "vue-property-decorator";

class ScrollDirective implements DirectiveOptions {
  public inserted: DirectiveFunction = (element: HTMLElement, binding: any) => {
    const f = (event: any) => {
      if (binding.value(event, element)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  };
}

@Component({
  directives: {
    scroll: new ScrollDirective()
  }
})
export default class ShyHeader extends Vue {
  private scrollY: number = 0;
  private positionY_: number = 0;
  private set positionY(value: number) {
    this.positionY_ = value;

    if (this.positionY_ < -this.headerElement.clientHeight) {
      this.positionY_ = -this.headerElement.clientHeight;
    } else if (this.positionY_ > 0) {
      this.positionY_ = 0;
    }
    this.headerElement.style.top = `${this.positionY_}px`;
  }

  private get positionY(): number {
    return this.positionY_;
  }

  private get headerElement(): HTMLElement {
    return this.$el as HTMLElement;
  }

  private mounted() {
    this.positionY_ = 0;
    this.scrollY = window.scrollY;
  }

  private handleScroll(event: any, el: any) {
    const diff = window.scrollY - this.scrollY;
    this.positionY -= diff;
    this.scrollY = window.scrollY;
  }
}
</script>
<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 4rem;
  /* background: #004b57; */
  background: linear-gradient(to bottom right, #004b57, #00778a);
  box-shadow: 0rem 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
}

.header-container {
  display: block;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  font-size: 2.5rem;
  color: #fff;
  line-height: 4rem;
}

.header-title {
  margin-left: 0.5rem;
  color: #fff;
  text-decoration: none;
}

a:link,
a:visited,
a:hover,
a:active {
  color: #fff;
}
</style>
