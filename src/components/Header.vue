<template>
  <div class="">
    <h1 class="greeting">Hey {{ displayName }}</h1>
    <h3 class="date">happy {{ date }}!</h3>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'Header',
  props: {
    displayName: {
      type: String,
      required: false,
      default: 'Friend!',
    },
  },
  data() {
    return {};
  },
  computed: {
    date() {
      const today = new Date();
      const day = format(today, 'iiii, MMMM d');
      return day;
    },
  },
};
</script>
