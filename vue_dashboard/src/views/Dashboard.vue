<script setup>
import { onMounted, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import moment from 'moment';

ChartJS.register(...registerables, zoomPlugin); // 註冊 Chart.js 的所有模組

const { isDarkTheme } = useLayout();

const productv1 = ref([]);
const dropdownValues = ref([
    { name: 'SPD(km/h)', code: 'SPD(km/h)' },
    { name: 'RPM', code: 'RPM' },
    { name: 'EL(%)', code: 'EL(%)' },
    { name: 'MAF(g/s)', code: 'MAF(g/s)' },
    { name: 'TPS(%)', code: 'TPS(%)' },
    { name: 'FAR', code: 'FAR' },
    { name: 'APP(%)', code: 'APP(%)' },
    { name: 'LFT(%)', code: 'LFT(%)' },
    { name: 'IAT(°C)', code: 'IAT(°C)' },
    { name: 'Vol(V)', code: 'batter(V)' }
]);

const dropdownValue = ref(dropdownValues.value[0]); // 默認選擇第一個選項
const lineData = ref({
    labels: [],
    datasets: [{
            label: 'Dataset',
            data: [],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        }
    ]
});
const lineOptions = ref(null);
const productService = new ProductService();

const fetchData = async () => {
    try {
        const data = await productService.getv1();
        productv1.value = data;
        updateChartData();
    } catch (error) {
        console.error('Error fetching data from v1.json:', error);
    }
};

onMounted(() => {
    fetchData();
});

const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x'
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
                },
                min: 0,
                max: 5 // 顯示範圍限制為6個數據點
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
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x'
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
                },
                min: 0,
                max: 5 // 顯示範圍限制為6個數據點
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

const updateChartData = () => {
    if (dropdownValue.value) {
        const selectedMetric = dropdownValue.value.code;
        lineData.value.labels = productv1.value.map(item => moment(item.time["$date"]).isValid() ? moment(item.time["$date"]).format('YYYY-MM-DD HH:mm:ss') : 'Invalid date');
        lineData.value.datasets[0].label = selectedMetric;
        lineData.value.datasets[0].data = productv1.value.map(item => item[selectedMetric]);
    }
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

watch(dropdownValue, updateChartData);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-12 xl:col-12">
            <div class="card mb-0 flex flex-row flex-wrap">
                <h4 class="mr-4 flex align-items-center justify-content-center font-bold">Option</h4>
                <Dropdown class="flex align-items-center justify-content-center" v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
            </div>
        </div>
        <div class="col-12 xl:col-6" v-for="car in 4" :key="car">
            <div class="card chart-card">
                <h5 class="chart-title">Car {{ car }}</h5>
                <div class="chart-container">
                    <Chart type="line" :data="lineData" :options="lineOptions" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    overflow-x: auto;
    position: relative;
}

.chart-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chart-container {
    width: 100%; /* 設定容器的寬度 */
    height: 600px; /* 設定容器的高度 */
    flex-grow: 1;
    position: relative;
    white-space: nowrap;
}

.chart-title {
    position: sticky;
    left: 0;
    top: 0;
    background: white;
    z-index: 10;
    padding: 0.5rem 1rem;
    margin: 0;
    border-bottom: 1px solid #ebedef;
    text-align: left;
    width: 100%;
}

.chart-container {
    width: 100% !important; /* 強制寬度 */
    height: 350px !important; /* 強制高度 */
    flex-grow: 1;
    position: relative;
    white-space: nowrap;
}

.chart-container canvas {
    display: block;
    width: 100% !important; /* 強制寬度 */
    height: 100% !important; /* 強制高度 */
    overflow: hidden;
    white-space: nowrap;
}
</style>