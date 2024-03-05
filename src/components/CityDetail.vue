<style >
.v-input__details {
  display: none !important;
}
.v-container{
  padding: 5px;
  max-width: 100% !important;
}

</style>
<template>
    <v-container>
    <v-row>
      <v-col cols="12">
        <span style="font-size: 25px;font-weight: bold;">
          {{ this.cityName }}
        </span>
      </v-col>
        <v-col cols="6">
      <v-row v-for="(category,index) in this.categories" :key="category.id" data-test="category">
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
        <v-col cols="8" style="align-self: center;">
          
            <v-expansion-panels>
  <v-expansion-panel
  >
<v-expansion-header @click="getSubcategories(category.id)"><v-btn style="width: 100%;" append-icon="mdi-arrow-down">
  {{ category.name }}
</v-btn></v-expansion-header>
  <v-expansion-panel-content v-for="subCategory in categories[category.id-1].sub" :key="subCategory.id">
    <div style="padding: 10px;">
    <v-row>
    <v-col cols="8">
    <div class="d-flex">
      <v-col cols="1">
      <input type="checkbox" :checked="getCheckBoxValue(subCategory.id)" v-bind:false-value="0"
                        v-bind:true-value="1" @change="getFinalExpenses($event,subCategory.average_price,subCategory.id)"
        
      ></v-col>
      <v-col cols="11"><span>{{ subCategory.subcategory_name }}</span>
      </v-col>
    </div>
  </v-col>
  <v-col style="align-self: center;text-align: right;" cols="4">
    <span style="color: green;">{{ subCategory.average_price }} €</span>
  </v-col>
</v-row>
</div>
  </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>

        </v-col>
        
      </v-row>
      
      </v-col>
      <v-col cols="6" style="text-align: center;">
      <div>
        <span style="font-size: 30px;">Your Expenses: <span style="font-weight: bold;font-size: 40px;">{{finalExpenses}} €</span></span>
      </div>
    </v-col>
    </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios'
  import VueApexCharts from "vue3-apexcharts";
  
  export default {
    name: "CityDetail",
    components: {
      apexchart: VueApexCharts,
    },
    data() {
      this.getCategories();
      return {
        a:1,
        finalExpenses:0,
        categories: null,
        animations : null,
        subCategories: null,
        checkedValues: {},
        cityName:this.$route.params.id==7 ? 'Helsinki' : 
        this.$route.params.id==8 ? 'Lappeenranta' : 'Lahti',
        citiesFinalExpenses: [0,0]
        
      };
    },
    methods: {
      getCheckBoxValue(id){
        return this.checkedValues[id]!=null && this.checkedValues[id]==true ? true : false;
      },

    getFinalExpenses(value,price,subCategoryId){
      
      if(value.target.checked){
        this.finalExpenses+=price
        this.checkedValues[subCategoryId] = true
      }
      else{
        this.finalExpenses-=price
        this.checkedValues[subCategoryId] = false
      }
    },
    async getCategories() {
      this.categories = (await axios.get('http://localhost:8080/api/v1/get-categories/')).data
      this.categories.splice(9,1);
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
      if(this.categories[categoryId-1]['sub'] == null){
      this.subCategories = (await axios.get('http://localhost:8080/api/v1/get-subcategories-by-city-and-category/'+this.$route.params.id+'/'+categoryId)).data
      this.categories[categoryId-1]['sub'] = this.subCategories;
    }
    else{
      this.categories[categoryId-1]['sub'] = null
    }
  }
  }
  };
  </script>
  