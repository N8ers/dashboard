<template>
  <div>
    <h1>Hey, {{ userSettings.username }}</h1>
    <h3>happy {{ date.day }}, {{ date.date }}</h3>
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
