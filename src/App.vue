<template>
  <v-app class="app__wrapper">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="text-h3">Currency Converter</span>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="d-flex justify-space-between mt-16 converter__wrapper">
        <converter-component
          title="У меня есть"
          :availableCurrency="avaibleCurrencies"
          :wantBuyCurrencies="wantBuyCurrencies"
          :changeAvailableCurrency="setaAaibleCurrencies"
        ></converter-component>
        <converter-component
          title="Хочу приобрести"
          :availableCurrency="wantBuyCurrencies"
          :wantBuyCurrencies="avaibleCurrencies"
          :changeAvailableCurrency="setwWantBuyCurrencies"
        ></converter-component>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ConverterComponent from "@/components/ConverterComponent.vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "App",

  components: { ConverterComponent },

  data: () => ({
    //
  }),
  methods: {
    ...mapMutations(["setaAaibleCurrencies", "setwWantBuyCurrencies"]),
    ...mapActions(["downloadCurrencies"]),
  },
  computed: {
    ...mapState(["avaibleCurrencies", "wantBuyCurrencies"]),
  },

  mounted() {
    this.downloadCurrencies();
  },
};
</script>

<style>
.app__wrapper {
  justify-content: center !important;
}
.converter__wrapper {
  max-width: 930px;
  width: 100%;
}
.v-main__wrap {
  display: flex;
  justify-content: center;
}
.v-menu__content {
  margin-top: 6px;
  left: auto !important;
  max-width: 930px;
  width: 100%;
}
</style>
