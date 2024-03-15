<style>
.v-input__details {
  display: none !important;
}
.v-container {
  padding: 5px;
  max-width: 100% !important;
}
</style>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span style="font-size: 25px; font-weight: bold">
          {{ this.cityName }}
        </span>
      </v-col>

      <v-col cols="6">
        <v-row
          v-for="(category, index) in this.categories"
          :key="category.id"
          data-test="category"
        >
          <v-col cols="4">
            <Vue3Lottie
              ref="customControl"
              :animationData="AnimateJSON"
              :animationLink="animations[index]"
              :loop="true"
              :speed="1"
              :autoPlay="true"
              :direction="forward"
              :pauseAnimation="true"
              :pauseOnHover="true"
            />
          </v-col>
          <v-col cols="8" style="align-self: center">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-header @click="getSubcategories(category.id)"
                  ><v-btn style="width: 100%" append-icon="mdi-arrow-down">
                    {{ category.name }}
                  </v-btn></v-expansion-header
                >
                <v-expansion-panel-content
                  v-for="subCategory in categories[category.id - 1].sub"
                  :key="subCategory.id"
                >
                  <div style="padding: 10px">
                    <v-row>
                      <v-col cols="8">
                        <div class="d-flex">
                          <v-col cols="1">
                            <input
                              type="checkbox"
                              :checked="getCheckBoxValue(subCategory.id)"
                              v-bind:false-value="0"
                              v-bind:true-value="1"
                              @change="
                                getFinalExpenses(
                                  $event,
                                  subCategory.average_price,
                                  subCategory.id
                                )
                              "
                          /></v-col>
                          <v-col cols="11"
                            ><span>{{ subCategory.subcategory_name }}</span>
                          </v-col>
                        </div>
                      </v-col>
                      <v-col
                        style="align-self: center; text-align: right"
                        cols="4"
                      >
                        <span style="color: green"
                          >{{ subCategory.average_price }} €</span
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" style="text-align: center">
         <v-btn color="primary">{{currencyTitle}}

      <v-menu activator="parent">
        <v-list style="max-height:300px;overflow:auto">
          <v-list-item
            v-for="(currency, index) in currencies"
            :key="index"
            :value="index"
          >
            <v-list-item-title @click="changeCurrency(currency)">{{ currency }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
        <div>
          <span style="font-size: 30px"
            >Your Expenses:
            <span style="font-weight: bold; font-size: 40px"
              >{{ finalExpenses }} €</span
            ></span
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

export default {
  name: "CityDetail",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    this.getCategories();
    return {
      a: 1,
      currencyTitle: "EUR",
      currencies:["EUR €", "USD $", "JPY ¥", "BGN лв", "CZK Kč", "DKK kr", "GBP £", "HUF Ft",
                "PLN zł", "RON lei", "SEK kr", "CHF CHF", "ISK kr", "NOK kr", "RUB ₽", "TRY ₺",
                "AUD $", "BRL R$","CAD $", "CNY ¥", "HKD $", "IDR Rp", "ILS ₪", "INR Rs", "KRW ₩",
                "MXN $", "MYR RM", "NZD $", "PHP ₱", "SGD $", "THB ฿", "ZAR R"],
      allCurrencyRatios: {},
      currentCurrency: {
        "title": "EUR",
        "ratio": 1,
      },
      finalExpenses: 0,
      categories: null,
      animations: null,
      subCategories: null,
      checkedValues: {},
      cityName:
        this.$route.params.id == 7
          ? "Helsinki"
          : this.$route.params.id == 8
          ? "Lappeenranta"
          : "Lahti",
      citiesFinalExpenses: [0, 0],
    };
  },
  mounted(){
    this.getAllCurrencyRatio()
  },
  methods: {
    
    getCheckBoxValue(id) {
      return this.checkedValues[id] != null && this.checkedValues[id] == true
        ? true
        : false;
    },

    getFinalExpenses(value, price, subCategoryId) {
      if (value.target.checked) {
        this.finalExpenses += price;
        this.checkedValues[subCategoryId] = true;
      } else {
        this.finalExpenses -= price;
        this.checkedValues[subCategoryId] = false;
      }
    },
    async getCategories() {
      this.categories = (
        await axios.get("http://localhost:8080/api/v1/get-categories/")
      ).data;
      this.categories.splice(9, 1);
      this.animations = [
        "https://lottie.host/b2609a02-bcb1-4621-bdbf-4ca667b01d5f/qKaKzOePbQ.json",
        "https://lottie.host/05e6e52f-20eb-4f3f-b3ac-43f8edf9c3fc/18eMtCBHxy.json",
        "https://lottie.host/a5c0ebb7-349a-4e7e-9d45-77f30f9254c3/Xvz878J0U1.json",
        "https://lottie.host/38ca4d1b-e444-45be-a086-946e778eae7e/kuR6OQrPpk.json",
        "https://lottie.host/9e50963c-153a-4788-80f0-154266985dbb/k39vURwzdP.json",
        "https://lottie.host/ee87fbe4-e819-4d8a-ada4-dda3f9034b18/aBob0xGvYS.json",
        "https://lottie.host/d0d28912-9cce-4324-b700-eca75022367b/dawUrq0rvU.json",
        "https://lottie.host/be3607c6-3076-4636-89f7-c1e989357057/Z6MNDuXfeK.json",
        "https://lottie.host/d1e69b6d-e09d-42c9-95e6-990d06b006ee/JyDcnADyUH.json",
      ];
    },
    async getSubcategories(categoryId) {
      if (this.categories[categoryId - 1]["sub"] == null) {
        this.subCategories = (
          await axios.get(
            "http://localhost:8080/api/v1/get-subcategories-by-city-and-category/" +
              this.$route.params.id +
              "/" +
              categoryId
          )
        ).data;
        this.categories[categoryId - 1]["sub"] = this.subCategories;
      } else {
        this.categories[categoryId - 1]["sub"] = null;
      }
    },
    getAllCurrencyRatio(){
      const freecurrencyapi = new Freecurrencyapi('fca_live_9ztRlxjMVYB7PnVHzHDHDUSbVe0krUGZFNtj2QiQ');
      freecurrencyapi.latest({
        base_currency: 'EUR',
        currencies: "EUR,USD,JPY,BGN,CZK,DKK,GBP,HUF,PLN,RON,SEK,CHF,ISK,NOR,RUB," +
         "TRY,AUD,BRL,CAD,CNY,HKD,IDR,ILS,INR,KRW,MXN,MYR,NZD,PHP,SGD,THB,ZAR"
    }).then(res => {
      this.allCurrencyRatios = res.data;
      console.log(this.allCurrencyRatios.USD);
    });
    
    },
    changeCurrency(currency){
      var newRatio=0;
      if(currency=="EUR"){
        newRatio = this.allCurrencyRatios.EUR/this.currentCurrency.ratio;
        this.currentCurrency.title="EUR";
        this.currencyTitle="EUR";
        this.currentCurrency.ratio= newRatio;
        this.finalExpenses = this.finalExpenses * newRatio;
      }
      else if(currency == "USD"){
        newRatio = this.allCurrencyRatios.USD/this.currentCurrency.ratio;
        this.currentCurrency.title="USD";
        this.currencyTitle="USD";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses =this.finalExpenses * newRatio ;
      }
      else if(currency == "JPY"){
        newRatio = this.allCurrencyRatios.JPY/this.currentCurrency.ratio;
        this.currentCurrency.title="JPY";
        this.currencyTitle="JPY";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "BGN"){
        newRatio = this.allCurrencyRatios.BGN/this.currentCurrency.ratio;
        this.currentCurrency.title="BGN";
        this.currencyTitle="BGN";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "CZK"){
        newRatio = this.allCurrencyRatios.CZK/this.currentCurrency.ratio;
        this.currentCurrency.title="CZK";
        this.currencyTitle="CZK";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;  
      }
       else if(currency == "DKK"){
        newRatio = this.allCurrencyRatios.DKK/this.currentCurrency.ratio;
        this.currentCurrency.title="DKK";
        this.currencyTitle="DKK";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = this.finalExpenses * newRatio;
      }
       else if(currency == "GBP"){
        newRatio = this.allCurrencyRatios.GBP/this.currentCurrency.ratio;
        this.currentCurrency.title="GBP";
        this.currencyTitle="GBP";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = this.finalExpenses * newRatio;
      }
       else if(currency == "HUF"){
        newRatio = this.allCurrencyRatios.HUF/this.currentCurrency.ratio;
        this.currentCurrency.title="HUF";
        this.currencyTitle="HUF";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "PLN"){
        newRatio = this.allCurrencyRatios.PLN/this.currentCurrency.ratio;
        this.currentCurrency.title="PLN";
        this.currencyTitle="PLN";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
       else if(currency == "RON"){
        newRatio = this.allCurrencyRatios.RON/this.currentCurrency.ratio;
        this.currentCurrency.title="RON";
        this.currencyTitle="RON";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
       else if(currency == "SEK"){
        newRatio = this.allCurrencyRatios.SEK/this.currentCurrency.ratio;
        this.currentCurrency.title="SEK";
        this.currencyTitle="SEK";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "CHF"){
        newRatio = this.allCurrencyRatios.CHF/this.currentCurrency.ratio;
        this.currentCurrency.title="CHF";
        this.currencyTitle="CHF";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "ISK"){
        newRatio = this.allCurrencyRatios.ISK/this.currentCurrency.ratio;
        this.currentCurrency.title="ISK";
        this.currencyTitle="ISK";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "NOK"){
        newRatio = this.allCurrencyRatios.NOK/this.currentCurrency.ratio;
        this.currentCurrency.title="NOK";
        this.currencyTitle="NOK";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "RUB"){
        newRatio = this.allCurrencyRatios.RUB/this.currentCurrency.ratio;
        this.currentCurrency.title="RUB";
        this.currencyTitle="RUB";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "TRY"){
        newRatio = this.allCurrencyRatios.TRY/this.currentCurrency.ratio;
        this.currentCurrency.title="TRY";
        this.currencyTitle="TRY";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "AUD"){
        newRatio = this.allCurrencyRatios.AUD/this.currentCurrency.ratio;
        this.currentCurrency.title="AUD";
        this.currencyTitle="AUD";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "BRL"){
        newRatio = this.allCurrencyRatios.BRL/this.currentCurrency.ratio;
        this.currentCurrency.title="BRL";
        this.currencyTitle="BRL";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "CAD"){
        newRatio = this.allCurrencyRatios.CAD/this.currentCurrency.ratio;
        this.currentCurrency.title="CAD";
        this.currencyTitle="CAD";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "CNY"){
        newRatio = this.allCurrencyRatios.CNY/this.currentCurrency.ratio;
        this.currentCurrency.title="CNY";
        this.currencyTitle="CNY";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "HKD"){
        newRatio = this.allCurrencyRatios.HKD/this.currentCurrency.ratio;
        this.currentCurrency.title="HKD";
        this.currencyTitle="HKD";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "IDR"){
        newRatio = this.allCurrencyRatios.IDR/this.currentCurrency.ratio;
        this.currentCurrency.title="IDR";
        this.currencyTitle="IDR";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "ILS"){
        newRatio = this.allCurrencyRatios.ILS/this.currentCurrency.ratio;
        this.currentCurrency.title="ILS";
        this.currencyTitle="ILS";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "INR"){
        newRatio = this.allCurrencyRatios.INR/this.currentCurrency.ratio;
        this.currentCurrency.title="INR";
        this.currencyTitle="INR";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "KRW"){
        newRatio = this.allCurrencyRatios.KRW/this.currentCurrency.ratio;
        this.currentCurrency.title="KRW";
        this.currencyTitle="KRW";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "MXN"){
        newRatio = this.allCurrencyRatios.MXN/this.currentCurrency.ratio;
        this.currentCurrency.title="MXN";
        this.currencyTitle="MXN";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "MYR"){
        newRatio = this.allCurrencyRatios.MYR/this.currentCurrency.ratio;
        this.currentCurrency.title="MYR";
        this.currencyTitle="MYR";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "NZD"){
        newRatio = this.allCurrencyRatios.NZD/this.currentCurrency.ratio;
        this.currentCurrency.title="NZD";
        this.currencyTitle="NZD";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "PHP"){
        newRatio = this.allCurrencyRatios.PHP/this.currentCurrency.ratio;
        this.currentCurrency.title="PHP";
        this.currencyTitle="PHP";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "SGD"){
        newRatio = this.allCurrencyRatios.SGD/this.currentCurrency.ratio;
        this.currentCurrency.title="SGD";
        this.currencyTitle="SGD";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
      else if(currency == "THB"){
        newRatio = this.allCurrencyRatios.THB/this.currentCurrency.ratio;
        this.currentCurrency.title="THB";
        this.currencyTitle="THB";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
    else if(currency == "ZAR"){
        newRatio = this.allCurrencyRatios.ZAR/this.currentCurrency.ratio;
        this.currentCurrency.title="ZAR";
        this.currencyTitle="ZAR";
        this.currentCurrency.ratio = newRatio;
        this.finalExpenses = Math.round(this.finalExpenses * newRatio * 100) / 100;
      }
    }
  },
};
</script>
