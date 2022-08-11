<template>
  <div class="fit">
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="autoplay"
      height="20rem"
      transition-duration="3000"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="~assets/click-here-pana.svg" />
      <q-carousel-slide :name="2" img-src="~assets/creativity-pana.svg" />
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
