<template>
  <div>
    <v-row>
      <h1>City {{ this.$route.params.id }}</h1>
    </v-row>
    <v-row>
      <v-col cols="4"> </v-col>
      <v-col cols="8">
        <v-row>
          <v-col cols="4">
            <v-card
              class="pa-3"
              style="cursor: pointer"
              color="blue"
              :dark="true"
            >
              <v-card-title class="pa-2">
                <div class="subtitle-2">Rent</div>
              </v-card-title>
              <v-divider />
              <v-card-subtitle class="mt-2">
                <h3>Single</h3>
              </v-card-subtitle>
              <v-card-text>€2,100.00</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              class="pa-3"
              style="cursor: pointer"
              color="green"
              :dark="true"
            >
              <v-card-title class="pa-2">
                <div class="subtitle-2">Rent</div>
              </v-card-title>
              <v-divider />
              <v-card-subtitle class="mt-2">
                <h3>Family</h3>
              </v-card-subtitle>
              <v-card-text>€3,456.00</v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-card
              class="pa-3"
              style="cursor: pointer"
              color="blue"
              :dark="true"
            >
              <v-card-title class="pa-2">
                <div class="subtitle-2">Other Expenses</div>
              </v-card-title>
              <v-divider />
              <v-card-subtitle class="mt-2">
                <h3>Single</h3>
              </v-card-subtitle>
              <v-card-text>€2,100.00</v-card-text>
              <div class="px-4">
                <v-switch
                  :label="`${isExpanded(item) ? 'Hide' : 'Show'} details`"
                  :model-value="isExpanded(item)"
                  density="compact"
                  inset
                  @click="() => toggleExpand(item)"
                ></v-switch>
              </div>
              <v-divider></v-divider>
              <v-expand-transition>
                <div v-if="isExpanded(item)">
                  <v-list :lines="false" density="compact">
                    <v-list-item
                      :title="`🔥 Calories: ${item.raw.calories}`"
                      active
                    ></v-list-item>
                    <v-list-item
                      :title="`🍔 Fat: ${item.raw.fat}`"
                    ></v-list-item>
                    <v-list-item
                      :title="`🍞 Carbs: ${item.raw.carbs}`"
                    ></v-list-item>
                    <v-list-item
                      :title="`🍗 Protein: ${item.raw.protein}`"
                    ></v-list-item>
                    <v-list-item
                      :title="`🧂 Sodium: ${item.raw.sodium}`"
                    ></v-list-item>
                    <v-list-item
                      :title="`🦴 Calcium: ${item.raw.calcium}`"
                    ></v-list-item>
                    <v-list-item
                      :title="`🧲 Iron: ${item.raw.iron}`"
                    ></v-list-item>
                  </v-list>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card
              class="pa-3"
              style="cursor: pointer"
              color="green"
              :dark="true"
            >
              <v-card-title class="pa-2">
                <div class="subtitle-2">Other Expenses</div>
              </v-card-title>
              <v-divider />
              <v-card-subtitle class="mt-2">
                <h3>Family</h3>
              </v-card-subtitle>
              <v-card-text>€3,456.00</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>
