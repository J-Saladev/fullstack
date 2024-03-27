<template>
    <div>
        <h1 class="text-center text-white ">{{name}}</h1>
        <i class="bi bi-plus-circle text-white fs-1" @click="$emit('add-record')" style="cursor: pointer;"></i>
        <h1 v-if = "section.length == 0" class="text-center text-white">No Records Found</h1>
        <div v-else>
        
        <table  class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                <th v-for="key in sectionkeys" :key="key" >{{key}}</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody class="table-striped table-dark ">
                <tr v-for="section in section" :key="section.id">
                    <td v-for="key in sectionkeys" :key="key">{{ section[key] }}</td>
                    <td> 
                        <div class="d-flex justify-content-center align-items-center gap-2">
                        <button class="btn btn-sm btn-primary" @click="$emit('edit-record', section)">Edit</button> 
                        <button class="btn btn-sm btn-danger" @click="$emit('delete-record', section)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
const props = defineProps({
    section: Array,
    name : String
})
const sectionkeys = ref([ ]);

const getKeys = async() => {
    sectionkeys.value = Object.keys(props.section[0]);
    
}


onMounted(() => {
    setTimeout(getKeys, 100);
    
});



</script>

<style scoped>
th {
    background-color: #343a40;
    color: white;
    text-transform: capitalize;
    
}
h1{
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
    text-transform: capitalize;
}


</style>