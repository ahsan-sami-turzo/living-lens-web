<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar app title="Living Lens"></v-app-bar>
    <v-main class="d-flex" style="min-height: 900px">
      <v-container fluid class="py-8 px-6">
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>
