<script setup>
import { onBeforeMount, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const country = ref(null)
const countriesList = ref(JSON.parse(localStorage.getItem('detailCountry')) || {})
const countryName = route.params.country.toLowerCase()
const countryApiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`

const getCountry = async(name, url) => {
    if(countriesList.value[name] !== undefined){
        country.value = countriesList.value[name]
    } else {
        const response = await fetch(url)
        const data = await response.json()
        country.value = data[0]
        countriesList.value[name] = data[0]
    }
}

watch(countriesList, newVal => {
    localStorage.setItem('detailCountry', JSON.stringify(newVal))
}, { deep: true })

const getLang = language => {
    return Object.keys(language).map(x => language[x]).join(", ")
}

onMounted(() => {
    getCountry(countryName, countryApiUrl)
})

</script>

<template>
    <!-- back button -->
    <div>
        <button @click="$router.go(-1)" class="flex gap-2 items-center bg-white dark:bg-[#2B3945] dark:text-white px-6 py-1 rounded-md shadow-lg">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </span>
            <span class="font-semibold">Back</span>
        </button>
    </div>

    <section>
        <div v-if="country !== null" class="flex flex-col lg:flex-row lg:items-center py-10 gap-10 lg:gap-20">
            <div class="w-full lg:w-1/2">
                <img :src="country.flags.svg" alt="" class="w-full">
            </div>
            <div class="dark:text-white">
                <h2 class="font-bold text-xl lg:text-2xl">{{ country.name.common }}</h2>
                <div class="flex flex-col lg:flex-row text-sm gap-10 mt-5">
                    <ul class="space-y-1">
                        <li class="font-bold">Official Name: <span class="font-normal">{{ country.name.official }}</span></li>
                        <li class="font-bold">Population: <span class="font-normal">{{ country.population.toLocaleString('en-US') }}</span></li>
                        <li class="font-bold">Region: <span class="font-normal">{{ country.region }}</span></li>
                        <li class="font-bold">Sub Region: <span class="font-normal">{{ country.subregion }}</span></li>
                        <li class="font-bold">Capital: <span class="font-normal">{{ country.capital[0] }}</span></li>
                    </ul>
                    <ul class="space-y-1">
                        <li class="font-bold">Top Level Domain: <span class="font-normal">{{ country.tld[0] }}</span></li>
                        <li class="font-bold capitalize">Currencies: <span class="font-normal">{{ Object.values(country.currencies)[0].name }}</span></li>
                        <li class="font-bold">Languages: <span class="font-normal">{{ getLang(country.languages) }}</span></li>
                    </ul>
                </div>
                <div class="mt-10">
                    <div class="flex flex-col lg:flex-row gap-4 lg:items-center">
                        <div class="flex-none">
                            <p class="text-md font-bold">Border Countries:</p>
                        </div>
                        <div class="flex flex-wrap text-sm gap-2">
                            <div v-for="(border, index) in country.borders" :key="index" class="text-center bg-white dark:bg-[#2B3945] dark:text-white rounded-md px-6 py-1 shadow-lg">{{ border }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>