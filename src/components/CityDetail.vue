<style>
.v-input__details {
  display: none !important;
}
.v-container {
  padding: 5px;
  max-width: 100% !important;
}
.v-expansion-panels{
position: absolute !important;
    z-index: 3 !important;
    width: 300px !important;
}
.v-expansion-panels{
max-height: 200px !important;
overflow: auto;
}
.v-btn{
  background-color: white !important;
    color: black !important;
    width: 250px;
}
.v-row{
  margin: 0 !important;
}
.v-list-item--variant-text .v-list-item__overlay {
  background: transparent !important;
}
.v-list-item{
  cursor:default;
}
.v-list-item.active, /* This targets the active state */
  .v-list-item--active, /* This targets the active modifier */
  .v-list-item--active .v-list-item__content { /* This targets the content within an active item */
    background-color: transparent !important; /* Set the background color to transparent */
  }
</style>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row style="justify-content: space-between;">
        <span style="font-size: 25px; font-weight: bold">
          {{ this.city.city_name }}
        </span>
        <v-btn style="width: auto !important" color="primary">{{currentCurrency.title}}

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
</v-row>
      </v-col>

      <v-col cols="6">
        <v-row
          v-for="(category, index) in this.categories"
          :key="category.id"
          data-test="category"
        >
        <div v-if="index%2==0">
          <v-row>
        <v-col cols="6">
          <v-col style="height: 100%;">
          <Vue3Lottie
              ref="customControl"
              
              :animationLink="animations[index]"
              :loop="true"
              :speed="1"
              :autoPlay="true"
              :pauseAnimation="true"
              :pauseOnHover="true"
            />
            <v-btn>
              {{ this.categories[index].name }}

<v-menu :close-on-content-click="false" activator="parent">
  <v-list style="max-height:300px;overflow:auto">
    <v-list-item :ripple="false"
    v-for="(subCategory, index2) in categories[this.categories[index].id - 1].sub"
                  :key="subCategory.id"
                  
            :value="index2"
    >
      <v-list-item-title>
        <div style="padding: 10px">
                    <v-row>
                      <v-col cols="8">
                        <div class="d-flex">
                          <v-col cols="1">
                            <input
                              type="checkbox"
                              :checked="getCheckBoxValue(index,index2)"
                              v-bind:false-value="0"
                              v-bind:true-value="1"
                              @change="
                                calculateExpenses(
                                  $event,
                                  index,
                                  index2
                                )
                              "
                          /></v-col>
                          <v-col style="white-space: nowrap ;overflow: hidden ;text-overflow: ellipsis" cols="11"
                            ><span>{{ subCategory.subcategory_name }}</span>
                          </v-col>
                        </div>
                      </v-col>
                      <v-col
                        style="align-self: center; text-align: right"
                        cols="4"
                      >
                      <v-row style="justify-content: space-evenly;">
                        <v-text-field v-if="subCategory.checked==true" style="max-width: 100px;" type="number" v-model="subCategory.quantity" label="Quantity" @change="changeQuantityNumber(subCategory)"></v-text-field>
                        <span style="color: green;align-self: center;"
                          >{{ (subCategory.average_price * currentCurrency.ratio).toFixed(2) }} {{ currentCurrency.title.split(" ")[1] }}</span
                        >
                      </v-row>
                        
                      </v-col>
                    </v-row>
                  </div>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</v-btn>
           
        </v-col>
      </v-col>

        <v-col cols="6">
          <v-col style="height: 100%;">
          <Vue3Lottie v-if="index  <= this.categories.length-2"
              ref="customControl"
              
              :animationLink="animations[index + 1]"
              :loop="true"
              :speed="1"
              :autoPlay="true"
              :pauseAnimation="true"
              :pauseOnHover="true"
            />
            <v-btn v-if="index <= this.categories.length-2">
              {{ this.categories[index+1].name }}

<v-menu :close-on-content-click="false" activator="parent">
  <v-list style="max-height:300px;overflow:auto">
    <v-list-item :ripple="false"
    v-for="(subCategory, index2) in categories[this.categories[index+1].id - 1].sub"
                  :key="subCategory.id"
                  
            :value="index2"
    >
      <v-list-item-title>
        <div style="padding: 10px">
                    <v-row>
                      <v-col cols="8">
                        <div class="d-flex">
                          <v-col cols="1">
                            <input
                              type="checkbox"
                              :checked="getCheckBoxValue(index+1,index2)"
                              v-bind:false-value="0"
                              v-bind:true-value="1"
                              @change="
                                calculateExpenses(
                                  $event,
                                  index+1,
                                  index2
                                )
                              "
                          /></v-col>
                          <v-col style="white-space: nowrap ;overflow: hidden ;text-overflow: ellipsis" cols="11"
                            ><span>{{ subCategory.subcategory_name }}</span>
                          </v-col>
                        </div>
                      </v-col>
                      <v-col
                        style="align-self: center; text-align: right"
                        cols="4"
                      >
                      <v-row style="justify-content: space-evenly;">
                        <v-text-field v-if="subCategory.checked==true" style="max-width: 100px;" type="number" v-model="subCategory.quantity" @change="changeQuantityNumber(subCategory)" label="Quantity"></v-text-field>
                        <span style="color: green;align-self: center;"
                          >{{ (subCategory.average_price * currentCurrency.ratio).toFixed(2) }} {{ currentCurrency.title.split(" ")[1] }}</span
                        >
                      </v-row>
                      </v-col>
                    </v-row>
                  </div>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</v-btn>
          </v-col>
        </v-col>
      </v-row>
      </div>
        </v-row>
      </v-col>
      <v-col cols="6" style="text-align: center"> 
        <v-row style="place-content: center;">
          <span style="font-size: 30px;font-weight: bold;padding: 25px;"
            >Expenses</span
          >
        </v-row>
          <v-row>
            <v-col cols="3">
              <v-row style="place-content: center;">
              <span>
                Yearly
              </span>
            </v-row>
            <v-row style="padding-top: 15px;">
              <div style="width:100%;display: flex;align-items: center;
    justify-content: center;;background-color: #004e00;border-radius: 5px;color: white;height: 40px;">
                <span style="font-weight: bold;">
                  {{ (finalExpenses * 12 * currentCurrency.ratio).toFixed(2)  }}
                </span>
              </div>
            </v-row>
            </v-col>
            <v-col cols="3">
              <v-row style="place-content: center;">
              <span>
                Monthly
              </span>
            </v-row>
            <v-row style="padding-top: 15px;">
              <div style="width:100%;display: flex;align-items: center;
    justify-content: center;;background-color: #004e00;border-radius: 5px;color: white;height: 40px;">
                <span style="font-weight: bold;">
                  {{ (finalExpenses * currentCurrency.ratio / 1).toFixed(2)  }}
                </span>
              </div>
            </v-row>
            </v-col>
            <v-col cols="3">
              <v-row style="place-content: center;">
              <span>
                Weekly
              </span>
            </v-row>
            <v-row style="padding-top: 15px;">
              <div style="width:100%;display: flex;align-items: center;
    justify-content: center;;background-color: #004e00;border-radius: 5px;color: white;height: 40px;">
                <span style="font-weight: bold;">
                  {{ (finalExpenses * currentCurrency.ratio / 4).toFixed(2) }}
                </span>
              </div>
            </v-row>
            </v-col>
            <v-col cols="3">
              <v-row style="place-content: center;">
              <span>
                Daily
              </span>
            </v-row>
            <v-row style="padding-top: 15px;">
              <div style="width:100%;display: flex;align-items: center;
    justify-content: center;;background-color: #004e00;border-radius: 5px;color: white;height: 40px;">
                <span style="font-weight: bold;">
                  {{ (finalExpenses * currentCurrency.ratio / 30).toFixed(2) }}
                </span>
              </div>
            </v-row>
            </v-col>
          </v-row>
          <v-row style="place-content: center;">
          <span style="font-size: 30px;font-weight: bold;padding: 25px;"
            >City Comparison</span
          >
        </v-row>
        <v-row style="justify-content: center;
    padding: 25px;">
          <v-btn>
              {{ compareToCountry.name }}
          <v-menu activator="parent">
  <v-list style="max-height:300px;overflow:auto">
    <v-list-item
      v-for="(country, index) in countries"
      :key="index"
      :value="index"
    >
      <v-list-item-title @click="changeCountry(country)">{{ country.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
          </v-btn>
        </v-row>
      <v-row style="justify-content: center;">
          <v-btn>
              {{ compareToCity.city_name }}
<v-menu activator="parent">
  <v-list style="max-height:300px;overflow:auto">
    <v-list-item
      v-for="(city, index) in cities"
      :key="index"
      :value="index"
    >
      <v-list-item-title @click="changeCity(city)">{{ city.city_name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
          </v-btn>
        </v-row>
        <v-row v-if="city1Sum!=0" style="justify-content: center;padding-top: 25px;">
            <span v-if="city1Sum > city2Sum" style="font-size: 18px;">
              <span style="font-weight: bold;">{{ city.city_name }}</span> is <span style="color: red;font-weight: bold;">{{100 -  (city2Sum/city1Sum).toFixed(2) * 100}}%</span> more <span style="color: red;font-weight: bold;">expensive</span> than <span style="font-weight: bold;">{{ compareToCity.city_name }}</span>
            </span>
            <span v-else-if="city1Sum < city2Sum">
              <span style="font-weight: bold;">{{ city.city_name }}</span> is <span style="color: green;font-weight: bold;">{{100 - (city1Sum/city2Sum).toFixed(2) * 100}}% cheaper</span> than <span style="font-weight: bold;">{{ compareToCity.city_name }}</span>
            </span>
            <span v-else-if="city1Sum < city2Sum">
              <span style="font-weight: bold;">{{ city.city_name }}</span> and {{ compareToCity.city_name }} have the <span style="color: gray;">same</span> expenses
            </span>
          </v-row>
          <v-row>
            <div id="chart" style="width: 100%;">
        <apexchart type="bar" height="430" :options="chartOptions" :series="series"></apexchart>
      </div>
          </v-row>
          
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import { cloneDeep } from 'lodash-es';

export default {
  name: "CityDetail",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    
    return {
      series: [
        {'data' : [],'name':''},
        {'data' : [],'name' : ''} 
      ],
          chartOptions: {
            chart: {
              toolbar: {
      show: false
    },
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            labels:[],
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
    },
      countries : null,
      cities: null,
      city1Sum : 0,
      city2Sum : 0,
      comparisonText : '',
      compareToCity : {'city_name':'Choose a City'},
      compareToCountry : {'name':'Choose a Country'},
      allCurrencyRatios: {},
      currentCurrency: {
        "title": "EUR €",
        "ratio": 1,
      },
      finalExpenses: 0,
      categories: null,
      animations: null,
      compareToCityCategories: null,
      city: {},
      currencies:["EUR €", "USD $", "JPY ¥", "BGN лв", "CZK Kč", "DKK kr", "GBP £", "HUF Ft",
                "PLN zł", "RON lei", "SEK kr", "CHF CHF", "ISK kr", "NOK kr", "RUB ₽", "TRY ₺",
                "AUD $", "BRL R$","CAD $", "CNY ¥", "HKD $", "IDR Rp", "ILS ₪", "INR Rs", "KRW ₩",
                "MXN $", "MYR RM", "NZD $", "PHP ₱", "SGD $", "THB ฿", "ZAR R"],
    };
  },
  mounted(){
    this.getCityById()
    this.getCountries();
    this.getCategories();
    this.getAllCurrencyRatio()
  },
  methods: {
    changeQuantityNumber(sub){
      if(sub.quantity>=5000){
        sub.quantity=5000
      }
      else if(sub.quantity<=1){
        sub.quantity=1
      }
      if(sub.previousQuantity < sub.quantity){
        this.finalExpenses += sub.average_price * this.currentCurrency.ratio
      }
      else if(sub.previousQuantity > sub.quantity){
        this.finalExpenses -= sub.average_price * this.currentCurrency.ratio 
      }
      sub.previousQuantity = sub.quantity; 
      if(this.compareToCity.city_name!='Choose a City'){
      this.getChartSubcategories()
      }
    },
    async getCityById(){
      var data = 
        await axios.get("http://localhost:8080/api/v1/get-city-by-id/"+this.$route.params.id);
        this.city = data.data
      
    },
    
    getChartSubcategories(){
      this.city1Sum = 0;
      this.city2Sum = 0;
      this.series[0].data = []
      this.series[0].name = this.city.city_name
      this.series[1].data = []
      this.series[1].name = this.compareToCity.city_name
      var res = []
      this.chartOptions= {
            chart: {
              toolbar: {
      show: false
    },
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            labels:[],
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
    };
      for(let i = 0; i < this.categories.length; i+=1){
        for (let j = 0; j < this.categories[i].sub.length; j+=1){
          if(this.categories[i].sub[j].checked){
            this.series[1].data.push((this.compareToCityCategories[i].sub[j].average_price * this.categories[i].sub[j].quantity * this.currentCurrency.ratio / 1).toFixed(2))
            this.series[0].data.push((this.categories[i].sub[j].average_price * this.categories[i].sub[j].quantity * this.currentCurrency.ratio / 1).toFixed(2))
            res.push(this.categories[i].sub[j].subcategory_name)
          }
        }
      }
      this.chartOptions= {
            chart: {
              toolbar: {
      show: false
    },
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            labels:res,
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
    };
    
    for (let item of this.series[0].data){
      this.city1Sum+=parseFloat(item);
    }
    for (let item of this.series[1].data){
      this.city2Sum+=parseFloat(item);
    }
    
    },
    changeCity(city){
      this.compareToCity = city;
      this.getCompareToCityData(city)
    },
    changeCountry(country){
      this.city1Sum = 0;
      this.city2Sum = 0;
      this.compareToCountry = country
      this.compareToCity.city_name = 'Choose a City'
      this.series= [
        {'data' : [],'name':''},
        {'data' : [],'name' : ''} 
      ];
      this.chartOptions= {
            chart: {
              toolbar: {
      show: false
    },
              type: 'bar',
              height: 430
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            labels:[],
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            tooltip: {
              shared: true,
              intersect: false
            },
    };
      this.getCities(country)
    },

    async getCities(country){
        var data = 
        await axios.get("http://localhost:8080/api/v1/get-cities/"+country.id);
        this.cities = data.data
    },

    async getCountries(){
      var data=
        await axios.get("http://localhost:8080/api/v1/get-countries/");
        this.countries = data.data
        
    },

    getCheckBoxValue(categoryIndex,subCategoryIndex) {
      return this.categories[this.categories[categoryIndex].id - 1].sub[subCategoryIndex].checked != null && this.categories[this.categories[categoryIndex].id - 1].sub[subCategoryIndex].checked == true
        ? true
        : false;
    },

    async getCompareToCityData(city){
      var compareToCitySubCategories = null;
      for (let category of this.compareToCityCategories){
        compareToCitySubCategories = (
          await axios.get(
            "http://localhost:8080/api/v1/get-subcategories-by-city-and-category/" +
              city.id +
              "/" +
              category.id
          )
        ).data;
        this.compareToCityCategories[category.id - 1]["sub"] = compareToCitySubCategories;
    }
      this.getChartSubcategories()
          
    },

    calculateExpenses(value, categoryIndex,subCategoryIndex) {
      if (value.target.checked) {
        this.finalExpenses += this.categories[categoryIndex].sub[subCategoryIndex].average_price * this.categories[categoryIndex].sub[subCategoryIndex].quantity;
        this.categories[categoryIndex].sub[subCategoryIndex].checked= true;
      } else {
        this.finalExpenses -= this.categories[categoryIndex].sub[subCategoryIndex].average_price * this.categories[categoryIndex].sub[subCategoryIndex].quantity;
        this.categories[categoryIndex].sub[subCategoryIndex].checked= false;
      }
      if(this.compareToCity.city_name!='Choose a City'){
      this.getChartSubcategories()
      }
    },
    async getCategories() {
      var data =
        await axios.get("http://localhost:8080/api/v1/get-categories/");
      this.categories = data.data;
      this.compareToCityCategories = cloneDeep(this.categories);
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
      this.getSubcategories();
    },
    async getSubcategories() {
      var subCategories = null;
      for (let category of this.categories){
      if (this.categories[category.id - 1]["sub"] == null) {
        subCategories = (
          await axios.get(
            "http://localhost:8080/api/v1/get-subcategories-by-city-and-category/" +
              this.$route.params.id +
              "/" +
              category.id
          )
        ).data;
        this.categories[category.id - 1]["sub"] = subCategories;
        for (let i = 0 ; i < this.categories[category.id - 1]["sub"].length;i+=1){
        this.categories[category.id - 1]["sub"][i]["checked"] = false
        this.categories[category.id - 1]["sub"][i]["quantity"] = 1
        this.categories[category.id - 1]["sub"][i]["previousQuantity"] = 1
      }
      } else {
        this.categories[category.id - 1]["sub"] = null;
      }
    }
    
  },
    getAllCurrencyRatio(){
      const freecurrencyapi = new Freecurrencyapi('fca_live_9ztRlxjMVYB7PnVHzHDHDUSbVe0krUGZFNtj2QiQ');
      freecurrencyapi.latest({
        base_currency: 'EUR',
        currencies: ""
    }).then(res => {
      this.allCurrencyRatios = res.data;
    });
    
    },
    changeCurrency(currency){
      if(currency=="EUR €"){
        this.currentCurrency.title="EUR €";
        this.currentCurrency.ratio= 1;
      }
      else if(currency == "USD $"){
        this.currentCurrency.title="USD $";
        this.currentCurrency.ratio = this.allCurrencyRatios.USD;
      }
      else if(currency == "JPY ¥"){
        this.currentCurrency.title="JPY ¥";
        this.currentCurrency.ratio = this.allCurrencyRatios.JPY;
      }
      else if(currency == "BGN лв"){
        this.currentCurrency.title="BGN лв";
        this.currentCurrency.ratio = this.allCurrencyRatios.BGN;
      }
      else if(currency == "CZK Kč"){
        this.currentCurrency.title="CZK Kč";
        this.currentCurrency.ratio = this.allCurrencyRatios.CZK; 
      }
       else if(currency == "DKK kr"){
        this.currentCurrency.title="DKK kr";
        this.currentCurrency.ratio = this.allCurrencyRatios.DKK;
      }
       else if(currency == "GBP £"){
        this.currentCurrency.title="GBP £";
        this.currentCurrency.ratio = this.allCurrencyRatios.GBP;
      }
       else if(currency == "HUF Ft"){
        this.currentCurrency.title="HUF Ft";
        this.currentCurrency.ratio = this.allCurrencyRatios.HUF;
      }
      else if(currency == "PLN zł"){
        this.currentCurrency.title="PLN zł";
        this.currentCurrency.ratio = this.allCurrencyRatios.PLN;
      }
       else if(currency == "RON lei"){
        this.currentCurrency.title="RON lei";
        this.currentCurrency.ratio = this.allCurrencyRatios.RON;
      }
       else if(currency == "SEK kr"){
        this.currentCurrency.title="SEK kr";
        this.currentCurrency.ratio = this.allCurrencyRatios.SEK;
      }
      else if(currency == "CHF CHF"){
        this.currentCurrency.title="CHF CHF";
        this.currentCurrency.ratio = this.allCurrencyRatios.CHF;
      }
      else if(currency == "ISK kr"){
        this.currentCurrency.title="ISK kr";
        this.currentCurrency.ratio = this.allCurrencyRatios.ISK;
      }
      else if(currency == "NOK kr"){
        this.currentCurrency.title="NOK kr";
        this.currentCurrency.ratio = this.allCurrencyRatios.NOK;
      }
      else if(currency == "RUB ₽"){
        this.currentCurrency.title="RUB ₽";
        this.currentCurrency.ratio = this.allCurrencyRatios.RUB;
      }
      else if(currency == "TRY ₺"){
        this.currentCurrency.title="TRY ₺";
        this.currentCurrency.ratio = this.allCurrencyRatios.TRY;
      }
      else if(currency == "AUD $"){
        this.currentCurrency.title="AUD $";
        this.currentCurrency.ratio = this.allCurrencyRatios.AUD;
      }
      else if(currency == "BRL R$"){
        this.currentCurrency.title="BRL R$";
        this.currentCurrency.ratio = this.allCurrencyRatios.BRL;
      }
      else if(currency == "CAD $"){
        this.currentCurrency.title="CAD $";
        this.currentCurrency.ratio = this.allCurrencyRatios.CAD;
      }
      else if(currency == "CNY ¥"){
        this.currentCurrency.title="CNY ¥";
        this.currentCurrency.ratio = this.allCurrencyRatios.CNY;
      }
      else if(currency == "HKD $"){
        this.currentCurrency.title="HKD $";
        this.currentCurrency.ratio = this.allCurrencyRatios.HKD;
      }
      else if(currency == "IDR Rp"){
        this.currentCurrency.title="IDR Rp";
        this.currentCurrency.ratio = this.allCurrencyRatios.IDR;
      }
      else if(currency == "ILS ₪"){
        this.currentCurrency.title="ILS ₪";
        this.currentCurrency.ratio = this.allCurrencyRatios.ILS;
      }
      else if(currency == "INR Rs"){
        this.currentCurrency.title="INR Rs";
        this.currentCurrency.ratio = this.allCurrencyRatios.INR;
      }
      else if(currency == "KRW ₩"){
        this.currentCurrency.title="KRW ₩";
        this.currentCurrency.ratio = this.allCurrencyRatios.KRW;
      }
      else if(currency == "MXN $"){
        this.currentCurrency.title="MXN $";
        this.currentCurrency.ratio = this.allCurrencyRatios.MXN;
      }
      else if(currency == "MYR RM"){
        this.currentCurrency.title="MYR RM";
        this.currentCurrency.ratio = this.allCurrencyRatios.MYR;
      }
      else if(currency == "NZD $"){
        this.currentCurrency.title="NZD $";
        this.currentCurrency.ratio = this.allCurrencyRatios.NZD;
      }
      else if(currency == "PHP ₱"){
        this.currentCurrency.title="PHP ₱";
        this.currentCurrency.ratio = this.allCurrencyRatios.PHP;
      }
      else if(currency == "SGD $"){
        this.currentCurrency.title="SGD $";
        this.currentCurrency.ratio = this.allCurrencyRatios.SGD;
      }
      else if(currency == "THB ฿"){
        this.currentCurrency.title="THB ฿";
        this.currentCurrency.ratio = this.allCurrencyRatios.THB;
      }
    else if(currency == "ZAR R"){
        this.currentCurrency.title="ZAR R";
        this.currentCurrency.ratio = this.allCurrencyRatios.ZAR;
      }
      if(this.compareToCity.city_name!='Choose a City'){
      this.getChartSubcategories()
      }
    }
  },
};
</script>
