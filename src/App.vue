<template>
  <div id="app">
    <SvgDefs></SvgDefs>
    <ShyHeader></ShyHeader>
    <div class="content-columns">
      <main class="main-column">
        <router-view />
      </main>
      <div class="side-column">
        開発中
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ShyHeader from "./components/ShyHeader.vue";
import SvgDefs from "./components/SvgDefs.vue";

@Component({
  components: {
    ShyHeader,
    SvgDefs
  }
})
export default class App extends Vue {}
</script>
<style>
#app {
  font-family: "Avenir", "Helvetica Neue", "Helvetica", "Arial", "Hiragino Sans",
    "ヒラギノ角ゴシック", "YuGothic", "Yu Gothic", "メイリオ", "Meiryo",
    "ＭＳ Ｐゴシック", "MS PGothic";
}

#app {
  height: 100%;
}

.content-columns {
  min-height: 100%;
  height: auto;
  width: 1200px;
  min-height: 100%;
  margin: 0 auto;
  padding-top: 4rem;

  background: #fff;
  box-shadow: 0rem 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.2);

  display: flex;
}

.main-column {
  background: #fff;
}

.side-column {
  background: #f5f5f5;
}

/*レスポンシブ対応*/
@media screen and (max-width: 900px) {
  .content-columns {
    width: 100%;
  }

  .main-column {
    width: 100%;
  }

  .side-column {
    display: none;
  }
}
@media screen and (min-width: 900px) {
  .content-columns {
    width: 1200px;
  }

  .main-column {
    width: 900px;
  }

  .side-column {
    width: 300px;
  }
}
</style>
