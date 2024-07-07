<script setup>
import { ref, watch } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, registerables } from 'chart.js';
import moment from 'moment';

ChartJS.register(...registerables);

const dropdownValues = ref([
    { name: 'Vehicle 1', code: 'V1' },
    { name: 'Vehicle 2', code: 'V2' }
]);

const dropdownValue = ref(null);
const speedData = ref([]);
const accelerationData = ref([]); // 加速度資料
const rpmData = ref([]);
const labels = ref([]);

// 模擬資料，實際情況應該從v1.json檔案中取得資料
const vehicleData = {
    V1: {
        speed: [20, 30, 40, 50, 60],
        acceleration: [0.1, 0.2, 0.3, 0.4, 0.5], // 加速度資料
        rpm: [1000, 1500, 2000, 2500, 3000],
        time: ['2021-07-08 22:30:08', '2021-07-08 22:30:10', '2021-07-08 22:30:12', '2021-07-08 22:30:14', '2021-07-08 22:30:16']
    },
    V2: {
        speed: [25, 35, 45, 55, 65],
        acceleration: [0.15, 0.25, 0.35, 0.45, 0.55], // 加速度資料
        rpm: [1200, 1600, 2200, 2600, 3200],
        time: ['2021-07-08 22:30:08', '2021-07-08 22:30:10', '2021-07-08 22:30:12', '2021-07-08 22:30:14', '2021-07-08 22:30:16']
    }
};

const speedChartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Speed (km/h)',
            data: [],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            yAxisID: 'y'
        },
        {
            label: 'Acceleration (m/s²)',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            yAxisID: 'y1'
        }
    ]
});

const rpmChartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Speed (km/h)',
            data: [],
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            yAxisID: 'y'
        },
        {
            label: 'RPM',
            data: [],
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            yAxisID: 'y1'
        }
    ]
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false, // 新增這行以確保圖表不會超出容器
    interaction: {
        mode: 'index',
        intersect: false
    },
    stacked: false,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left'
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false
            }
        }
    }
});

watch(dropdownValue, (newVal) => {
    if (newVal) {
        const data = vehicleData[newVal.code];
        labels.value = data.time.map((t) => moment(t).format('YYYY-MM-DD HH:mm:ss'));
        speedData.value = data.speed;
        accelerationData.value = data.acceleration; // 新增這行
        rpmData.value = data.rpm;

        speedChartData.value.labels = labels.value;
        speedChartData.value.datasets[0].data = speedData.value;
        speedChartData.value.datasets[1].data = accelerationData.value; // 新增這行

        rpmChartData.value.labels = labels.value;
        rpmChartData.value.datasets[0].data = speedData.value;
        rpmChartData.value.datasets[1].data = rpmData.value;
    }
});
</script>

<template>
    <div class="grid">
        <div class="col-3 flex flex-wrap gap-2">
            <div class="card gap-2">
                <h6>選擇車輛</h6>
                <Dropdown class="flex align-items-center justify-content-center" v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
            </div>
            <div class="card chart-card">
                <h6>速度(km/h)/加速度(m/s²)</h6>
                <div class="chart-container">
                    <Line :data="speedChartData" :options="chartOptions"></Line>
                </div>
            </div>
        </div>
        <span style="width: 10px"></span>

        <div class="card col-8 mt-3 chart-card" style="height: 360px">
            <h5>速度(km/h)/轉速(Rpm)</h5>
            <div class="chart-container">
                <Line :data="rpmChartData" :options="chartOptions"></Line>
            </div>
        </div>
        <div class="card ml-3 mr-2">
            <h5>File path</h5>
            <i class="pi pi-file" style="font-size: 40px; margin-left: 18px"></i>
        </div>

        <div class="card mr-2">
            <h5>電類電壓(V)</h5>
        </div>

        <div class="card mr-2">
            <h5>空氣流量計(g/s)</h5>
        </div>

        <div class="card mr-2">
            <h5>燃空當量比</h5>
        </div>
        <div class="card mr-2">
            <h5>總里程(km)</h5>
        </div>

        <div class="card mr-2">
            <h5>油門位置</h5>
        </div>
        <div class="card mr-2">
            <h5>節氣門位置</h5>
        </div>
        <div class="card mr-2">
            <h5>進氣溫度(℃)</h5>
        </div>
        <div class="card mr-2">
            <h5>長期燃油修正</h5>
        </div>
        <div class="card mr-2">
            <h5>引擎負荷(%)</h5>
        </div>
        <div class="card mr-2">
            <h5>駕駛影像</h5>
        </div>
        <div class="card mr-2 last-card">
            <h5>GPS</h5>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 5px;
}
.last-card {
    margin-right: 0;
    margin-bottom: 0;
}
.chart-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.chart-container {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>