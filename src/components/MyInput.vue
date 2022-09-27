<template>
  <div class="my-input">
    <v-text-field
      single-line
      dense
      height="57"
      v-maxlen="5"
      hide-details
      type="number"
      @keypress="filterWithoutE"
    ></v-text-field>
    <div class="mt-8">1 USD = 17.7755 ZAR</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      str: "",
    };
  },
  methods: {
    filterWithoutE(evt) {
      let expect = evt.target.value.toString() + evt.key.toString();
      if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style >
.my-input {
  padding: 30px 20px 15px;
  border: 1px solid #cdcdcd;
}
.v-text-field input {
  font-size: 41px;
  font-weight: bold;
  padding: 8px 0 !important;
}
.v-input input {
  max-height: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
