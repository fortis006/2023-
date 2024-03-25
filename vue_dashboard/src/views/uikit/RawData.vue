<script setup>
import { ref } from 'vue';

const dropdownValues = ref([
    { name: 'Vehicle 1', code: 'V1' },
    { name: 'Vehicle 2', code: 'V2' }
]);

const dropdownValue = ref(null);
</script>

<template>
    <div class="grid">
        <div class="col-3 flex flex-wrap gap-2">
            <div class="card gap-2">
                <h6>選擇車輛</h6>
                <Dropdown class="flex align-items-center justify-content-center" v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
            </div>
            <div class="card">
                <h6>速度(km/h)/加速度(m/s)</h6>
            </div>
        </div>
        <span style="width:10px"></span>

        <div class="card col-8 mt-3" style="height: 360px">
            <h5>速度(km/h)/轉速(Rpm)</h5>
        </div>
        <div class="card ml-3 mr-2">
            <h5>File path</h5>
            <i class="pi pi-file" style="font-size: 40px; margin-left: 18px;"></i>
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
        <div class="card mr-2">
            <h5>GPS</h5>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.google {
    background: linear-gradient(to left, var(--purple-600) 50%, var(--purple-700) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    border-color: var(--purple-700);
    display: flex;
    align-items: stretch;
    padding: 0;

    &:enabled:hover {
        background: linear-gradient(to left, var(--purple-600) 50%, var(--purple-700) 50%);
        background-size: 200% 100%;
        background-position: left bottom;
        border-color: var(--purple-700);
    }

    &:focus {
        box-shadow: 0 0 0 1px var(--purple-400);
    }
}

.twitter {
    background: linear-gradient(to left, var(--blue-400) 50%, var(--blue-500) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    border-color: var(--blue-500);
    padding: 0;
    display: flex;
    align-items: stretch;

    &:enabled:hover {
        background: linear-gradient(to left, var(--blue-400) 50%, var(--blue-500) 50%);
        background-size: 200% 100%;
        background-position: left bottom;
        border-color: var(--blue-500);
    }

    &:focus {
        box-shadow: 0 0 0 1px var(--blue-200);
    }
}

.discord {
    background: linear-gradient(to left, var(--bluegray-700) 50%, var(--bluegray-800) 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: background-position 0.5s ease-out;
    border-color: var(--bluegray-800);
    padding: 0;
    display: flex;
    align-items: stretch;

    &:enabled:hover {
        background: linear-gradient(to left, var(--bluegray-700) 50%, var(--bluegray-800) 50%);
        background-size: 200% 100%;
        background-position: left bottom;
        border-color: var(--bluegray-800);
    }
}

@media screen and (max-width: 960px) {
    -button .p-button {
        margin-bottom: 0.5rem;
    }
    -button .p-button:not(.p-button-icon-only) {
        display: flex;
        flex-wrap: wrap;
    }
    -button .p-buttonset .p-button {
        margin-bottom: 0;
    }
}
</style>
