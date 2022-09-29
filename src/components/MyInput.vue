<template>
  <div class="my-input">
    <v-text-field
      @input="updateInput"
      :value="inputValue"
      single-line
      dense
      height="57"
      hide-details
      type="number"
      @keypress="filterWithoutE"
    ></v-text-field>
    <div class="mt-8">
      1 {{ availableCurrency.CharCode }} =
      {{
        calculationCourse(1, wantBuyCurrencies, availableCurrency).toFixed(4)
      }}
      {{ wantBuyCurrencies.CharCode }}
    </div>
  </div>
</template>

<script>
import { fx } from "money";

export default {
  props: ["wantBuyCurrencies", "availableCurrency", "changeAvailableCurrency"],
  data() {
    return {
      inputValue: "",
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
    updateInput(val) {
      this.changeAvailableCurrency({
        inputValue: val,
      });
    },
    calculationCourse(
      num,
      availableCurrency = this.availableCurrency,
      wantBuyCurrencies = this.wantBuyCurrencies
    ) {
      return fx.convert(num, {
        from: availableCurrency.CharCode,
        to: wantBuyCurrencies.CharCode,
      });
    },
  },
  watch: {
    wantBuyCurrencies(newVal) {
      const correctNumber = this.calculationCourse(newVal.inputValue);
      const expression = Math.abs(
        Number.parseFloat(correctNumber) -
          Number.parseFloat(this.inputValue === "" ? 0 : this.inputValue)
      );
      if (expression > 0.0005) {
        this.inputValue = correctNumber !== 0 ? correctNumber : "";
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
