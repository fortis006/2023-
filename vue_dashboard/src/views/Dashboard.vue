<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';


const { isDarkTheme } = useLayout();

const products = ref(null);
const dropdownValues = ref([
    { name: 'SPD(km/h)', code: 'SPD' },
    { name: 'RPM', code: 'RPM' },
    { name: 'EL(%)', code: 'EL' },
    { name: 'MAF(g/s)', code: 'MAF' },
    { name: 'TPS(%)', code: 'TPS' },
    { name: 'FAR', code: 'FAR' },
    { name: 'APP(%)', code: 'APP' },
    { name: 'LFT(%)', code: 'LFT' },
    { name: 'IAT(°C)', code: 'IAT' },
    { name: 'Vol(V)', code: 'Vol' }
]);
const dropdownValue = ref(null);
const lineData = reactive({
    labels: ['Januar', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const lineOptions = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-12 xl:col-12">
            <div class="card mb-0 flex flex-row flex-wrap">
                <h4 class="mr-4 flex align-items-center justify-content-center font-bold" >Option</h4>
                <Dropdown class="flex align-items-center justify-content-center" v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Car1</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Car2</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Car3</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Car4</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
        </div>
    </div>
</template>
