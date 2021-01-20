<template>
  <div>
    <font-awesome-icon icon="spinner" />
    <div v-if="message">{{ message }}...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    message: {
      type: String,
      required: false,
    },
  },
  data() {
    return { };
  },
  methods: { },
  computed: { },
  created() { },
  watch: { },
};
</script>
