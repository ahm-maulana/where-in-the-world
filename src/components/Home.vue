<script setup>
import { computed, onMounted, ref, watch } from 'vue'

// Get all countries
const countries = ref()
const countriesApiUrl = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags'

const getCountries = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    countries.value = data
    localStorage.setItem('countries', JSON.stringify(data))
}

// Filter
const search = ref('')

const filteredCountries = computed(() => {
    if(search.value === '' && region.value === '')
        return countries.value

    if(search.value === '' && region.value !== ''){
        const filteredRegion = countries.value.filter(x => {
            return x.region.toLowerCase().includes(region.value.toLowerCase()) 
        })

        return filteredRegion
    }

    
    const filteredRegion = countries.value.filter(x => {
        return x.region.toLowerCase().includes(region.value.toLowerCase())
    })

    const filteredResult = filteredRegion.filter(x => {
        return x.name.common.toLowerCase().includes(search.value.toLowerCase())
    })

    return filteredResult
})

// Set the region
const region = ref('')
const isRegionExpanded = ref(false)
const setRegion = val => {
    region.value = val
    isRegionExpanded.value = false
}

onMounted(() => {
    if(localStorage.getItem('countries') === null)
        getCountries(countriesApiUrl)        
    else
        countries.value = JSON.parse(localStorage.getItem('countries'))
})

</script>

<template>
    <!-- search bar & filter -->
    <div class="flex flex-col md:flex-row md:justify-between gap-10">
        <div class="flex items-center md:w-1/2 lg:w-5/12 bg-white dark:bg-[#2B3945] dark:text-white rounded-lg shadow-lg">
            <div class="px-6 py-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
            
            <input type="text" :value="search" @input="e => search = e.target.value" placeholder="Search for a country..." class="w-full focus:outline-none placeholder:font-medium bg-transparent">

            <button @click="search = ''" class="mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="relative bg-white dark:bg-[#2B3945] dark:text-white w-4/6 md:w-1/3 lg:w-1/5 rounded-lg shadow-lg">
            <button @click="isRegionExpanded = !isRegionExpanded" @blur="isRegionExpanded = false" class="flex justify-between items-center px-6 py-4 w-full">
                <p class="text-sm font-semibold">{{ region !== '' ? region : 'Filter by Region' }}</p>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </button>
            
            <div v-show="isRegionExpanded" class="absolute translate-y-1 bg-white dark:bg-[#2B3945] w-full rounded-lg px-6 py-4">
                <ul class="text-sm font-semibold">
                    <li @mousedown.prevent="setRegion('')" class="py-1 text-sm font-semibold cursor-pointer">All</li>
                    <li @mousedown.prevent="setRegion('Africa')" class="py-1 text-sm font-semibold cursor-pointer">Africa</li>
                    <li @mousedown.prevent="setRegion('America')" class="py-1 text-sm font-semibold cursor-pointer">America</li>
                    <li @mousedown.prevent="setRegion('Asia')" class="py-1 text-sm font-semibold cursor-pointer">Asia</li>
                    <li @mousedown.prevent="setRegion('Europe')" class="py-1 text-sm font-semibold cursor-pointer">Europe</li>
                    <li @mousedown.prevent="setRegion('Oceania')" class="py-1 text-sm font-semibold cursor-pointer">Oceania</li>
                </ul>
            </div>
        </div>
    </div>

    <section>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 px-6 md:px-0 py-10">
            <router-link v-for="(country, index) in filteredCountries" :key="index" :to="country.name.common">
                <img :src="country.flags.svg" alt="" class="w-full rounded-t-lg shadow-lg">
                <div class="bg-white dark:bg-[#2B3945] dark:text-white px-4 py-6 rounded-b-lg shadow-lg">
                    <h2 class="text-xl lg:text-lg font-bold">{{ country.name.common }}</h2>
                    <ul class="mt-4">
                        <li class="font-semibold">Population: <span class="font-normal">{{ country.population.toLocaleString('en-US') }}</span></li>
                        <li class="font-semibold">Region: <span class="font-normal">{{ country.region }}</span></li>
                        <li class="font-semibold">Capital: <span class="font-normal">{{ country.capital[0] }}</span></li>
                    </ul>
                </div>
            </router-link>
        </div>
    </section>
</template>