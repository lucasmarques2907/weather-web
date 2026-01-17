<script setup lang="ts">
const city = ref<string>("");
const weather = ref<any>(null);
const loading = ref<boolean>(false);
const error = ref<string>("");

const searchCity = async () => {
  if (!city.value) return;

  loading.value = true;
  error.value = "";

  try {
    weather.value = await $fetch("/api/weather", {
      params: {
        city: city.value,
      },
    });

    console.log(weather.value);
  } catch (err: any) {
    error.value = "City not found";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <input type="text" name="city" v-model="city" placeholder="Enter city" @keyup.enter="searchCity">
  
    <button @click="searchCity">Search</button>
    
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
