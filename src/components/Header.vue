<template>
  <div class="header-wrapper green-border">
    <h1 class="greeting">Hey {{ userSettings.username }}</h1>
    <h3 class="date">happy {{ date.day }}, {{ date.date }}!</h3>
  </div>
</template>

<script>
import { format } from 'date-fns';
import userSettings from '../../userSettings.json';

export default {
  name: 'Header',
  data() {
    return {
      userSettings,
    };
  },
  computed: {
    date() {
      const today = new Date();
      const day = format(today, 'iiii');
      const date = format(today, 'MMMM LL');
      return { day, date };
    },
  },
};
</script>

<style>
.header-wrapper {
  text-align: left;
  margin: 20px;
  border: 1px solid black;
}

.greeting {
  font-size: 64px;
}

.date {
  font-size: 32px;
}
</style>
