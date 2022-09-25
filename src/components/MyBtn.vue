<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn depressed color="white" v-bind="attrs" v-on="on" class="px-8 py-4">
        <slot></slot>
      </v-btn>
    </template>
    <span>{{ nameCurrency }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["nameCurrency"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-btn {
  border-radius: 0;
  border: 1px solid #cdcdcd !important;
}
</style>
