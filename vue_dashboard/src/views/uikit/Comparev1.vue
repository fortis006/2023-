<script setup>
import { ref, watch, onMounted } from 'vue';
import { Chart as ChartJS, registerables } from 'chart.js';
import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

ChartJS.register(...registerables);

const { layoutConfig } = useLayout();
let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');

const pieData = ref(null);
const pieOptions = ref(null);
const activeTab = ref('All');

const myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

const vehicleStatus = ref([
    { vehicle: 'Car 1', status: 'Available', issue: 'None' },
    { vehicle: 'Car 2', status: 'Warning', issue: '車速、剩餘油量' },
    { vehicle: 'Car 3', status: 'Warning', issue: '引擎冷卻液溫度' },
    { vehicle: 'Car 4', status: 'Warning', issue: '進氣溫度' }
]);

const filteredVehicles = ref([...vehicleStatus.value]);
const vehicleLocations = ref([]);

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
};

const setChart = () => {
    pieData.value = {
        labels: ['Available', 'Warnings'],
        datasets: [
            {
                data: [1, 3],
                backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400')]
            }
        ]
    };

    pieOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};

const filterVehicles = () => {
    if (activeTab.value === 'All') {
        filteredVehicles.value = [...vehicleStatus.value];
    } else {
        filteredVehicles.value = vehicleStatus.value.filter((vehicle) => vehicle.status === activeTab.value);
    }
};

onMounted(async () => {
    try {
        const response = await axios.get('/mock/v1.json'); // 確認這個路徑是否正確
        console.log('Fetched data:', response.data);
        vehicleLocations.value = response.data.map((item) => ({
            lat: item.lat_lon[0],
            lon: item.lat_lon[1]
        }));
        console.log('Vehicle locations:', vehicleLocations.value);
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
    }
});

watch(
    layoutConfig.theme,
    () => {
        setColorOptions();
        setChart();
    },
    { immediate: true }
);

watch(activeTab, filterVehicles);
</script>

<template>
    <div class="grid p-fluid">
        <div class="col-6 card error-count">
            <h2>3</h2>
            <p>Vehicles with Errors</p>
        </div>
        <div class="col-6 card available-count">
            <h2>1</h2>
            <p>Available Vehicles</p>
        </div>
        <div class="col-12 card total-vehicles">
            <h3>Total Vehicles</h3>
            <Chart type="pie" :data="pieData" :options="pieOptions"></Chart>
            <div class="legend">
                <div class="legend-item">
                    <span class="color available"></span>
                    <span>Available</span>
                    <span>1</span>
                </div>
                <div class="legend-item">
                    <span class="color warnings"></span>
                    <span>Warnings</span>
                    <span>3</span>
                </div>
            </div>
        </div>
        <div class="col-12 card status">
            <h3>All Status</h3>
            <ul class="tabs">
                <li :class="{ active: activeTab === 'All' }" @click="activeTab = 'All'">All</li>
                <li :class="{ active: activeTab === 'Available' }" @click="activeTab = 'Available'">Available</li>
                <li :class="{ active: activeTab === 'Warning' }" @click="activeTab = 'Warning'">Warning</li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>VEHICLE</th>
                        <th>status</th>
                        <th>異常 Col</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vehicle in filteredVehicles" :key="vehicle.vehicle">
                        <td>{{ vehicle.vehicle }}</td>
                        <td>{{ vehicle.status }}</td>
                        <td>{{ vehicle.issue }}</td>
                        <td><button class="view-btn">VIEW</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 地圖視圖部分 -->
        <div class="col-12 card map-view">
            <h3>Vehicle Locations</h3>
            <LMap v-if="vehicleLocations.length" style="height: 500px; width: 100%" :zoom="13" :center="[23.021015, 120.22256]">
                <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
                <LMarker v-for="(location, index) in vehicleLocations" :key="index" :lat-lng="[location.lat, location.lon]" :icon="myIcon"></LMarker>
            </LMap>
            <p v-else>No locations to display</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .col-6 {
        flex: 0 0 48%;
    }

    .col-12 {
        flex: 0 0 100%;
    }

    .leaflet-container {
        height: 100%;
        width: 100%;
    }

    .card {
        background-color: white;
        padding: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &.error-count,
        &.available-count {
            h2 {
                font-size: 2.5rem;
                margin: 0;
            }

            p {
                margin: 0;
            }
        }

        &.total-vehicles {
            .legend {
                display: flex;
                justify-content: space-around;
                width: 100%;

                .legend-item {
                    display: flex;
                    align-items: center;

                    .color {
                        display: inline-block;
                        width: 1rem;
                        height: 1rem;
                        border-radius: 50%;

                        &.available {
                            background-color: #4caf50;
                        }

                        &.warnings {
                            background-color: #ffeb3b;
                        }
                    }

                    span {
                        margin-left: 0.5rem;
                    }
                }
            }
        }

        &.status {
            .tabs {
                display: flex;
                justify-content: space-around;
                margin-bottom: 1rem;
                font-size: 1.25rem;

                li {
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                    border-bottom: 2px solid transparent;
                    list-style: none;

                    &.active {
                        border-bottom-color: #333;
                    }
                }
            }

            table {
                width: 100%;
                border-collapse: collapse;

                th,
                td {
                    padding: 0.5rem;
                    text-align: left;
                }

                th {
                    background-color: #f4f4f4;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                .view-btn {
                    background-color: #333;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
