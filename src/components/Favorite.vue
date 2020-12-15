<template>
  <div>
    Favorite websites
  </div>
</template>

<script>
import userSettings from '../../userSettings.json';

export default {
  name: 'Header',
  data() {
    return {
      userSettings,
    };
  },
};
</script>
