<template>
  <div class="my-input">
    <v-text-field
      :value="value"
      @input="inputChange"
      ref="convertInput"
      single-line
      dense
      height="57"
      hide-details
      type="number"
      :key="inputKey"
      @keypress="filterWithoutE"
    ></v-text-field>
    <div class="mt-8">
      1 {{ availableCurrency.CharCode }} =
      {{
        readbleNumber(
          calculationCourse(1, wantBuyCurrencies, availableCurrency)
        )
      }}
      {{ wantBuyCurrencies.CharCode }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["wantBuyCurrencies", "availableCurrency", "value"],
  data() {
    return {
      inputKey: 0,
    };
  },
  inject: ["calculationCourse", "readbleNumber"],
  methods: {
    inputChange(value) {
      if (value.length < 11) {
        this.$emit("input", value);
      } else {
        this.inputKey++;
        this.$nextTick(() => {
          this.$refs.convertInput.focus();
        });
      }
    },
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
