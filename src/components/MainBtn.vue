<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        color="white"
        :class="{
          active: active,
        }"
        v-bind="attrs"
        v-on="on"
        class="py-3"
        @click="changeAvailableCurrency(currency, true)"
      >
        {{ currency.CharCode }}
      </v-btn>
    </template>
    <span>{{ currency.Name }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["currency", "active", "changeAvailableCurrency"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-btn {
  border-radius: 0;
  border: 1px solid #cdcdcd !important;
  height: auto !important;
  width: 100%;
}
.active {
  color: #fff;
  background-color: #16b67f !important;
}
</style>
