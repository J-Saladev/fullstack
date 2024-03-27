<template>
    <div>
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th v-for="column in section.columns" :key="column.name">{{ column.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in section.rows" :key="row.id">
                    <td> </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['sectionname']);
const section = ref([loadView(props.sectionname)]);
console.log(section);
function loadView(sectionname) {
    fetch('/view/' + sectionname)
    .then((data) => {
        return data.json();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {

    })

}




</script>