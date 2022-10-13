<script setup>
import { onMounted, ref, watch } from 'vue'

const isDark = ref(JSON.parse(localStorage.getItem('isDark')) || false)

watch(isDark, newVal => {
  localStorage.setItem('isDark', newVal)
})

</script>

<template>
  <div :class="{ dark : isDark }">
    <div class="bg-[#FAFAFA] dark:bg-[#202C37] min-h-screen">
      <header>
        <div class="bg-white dark:bg-[#2B3945] shadow-lg py-6 lg:py-4">
          <div class="flex justify-between px-4 dark:text-white max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
            <h1 class="text-sm md:text-lg lg:text-xl font-bold"><router-link to="/">Where in the world?</router-link></h1>
            <button @click="isDark = !isDark" class="flex gap-2 items-center text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 dark:fill-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
              <span class="font-semibold">Dark Mode</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <div class="px-4 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto mt-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style>

</style>
