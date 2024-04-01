<template>
    <div>
      <main>
        <div class="container">
          <add-component :name="name" @closeModal="closeModal" @confirm-record="confirmRecord">
            <form id="form">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" v-bind="form.name" />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Description</label>
               
                <textarea
                  class="form-control" id="description" name="description" v-bind="form.description"></textarea>
                
              </div>
             
              
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="categories"
            :name="name"
            @delete-record="deleteRecord"
            @edit-record="editRecord"
            @add-record="addRecord"
          ></load-view>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import loadView from '../components/load-view.vue'
  import addComponent from '@/components/add-component.vue'
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const categories = ref([])
  const name = 'categories'
  
  
  const form = ref({
    id: '',
    name: '',
    description: '',
  })
  
  onMounted(() => {
    getcategories()
  })
  
  const getcategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/categories')
      categories.value = response.data
      console.log('got categories')
    } catch (err) {
      console.log(err)
    }
  }
  function confirmRecord() {
      let cateid= document.getElementById('id').value
      let catename= (document.getElementById('name').value)
      let catedescription = document.getElementById('description').value
  
    let categorie = {
      id: `${cateid}`,
      name: `${catename}`,
      description: `${catedescription}`
    }
    
    axios.post('http://localhost:3000/add/categories', categorie)
    .then(response => {
      console.log(response.data)
      getcategories()
      closeModal()
      
    })
    .catch(error => {
      console.log(error)
    })
    
    
  }
  function editRecord(record) {
  let modal = document.getElementById('sectionModal')
      console.log(form.value)
      console.log(record)
      let cateform = document.getElementById('form')
      cateform.name.value = record.name
      cateform.description.value = record.description
      cateform.id.value = record.id
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/categories`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getcategories()
      })
    }
  }
  function addRecord() {
      
      let modal = document.getElementById('sectionModal')
    modal.style.display = 'block'
  }
  function closeModal() {
      let modal = document.getElementById('sectionModal')
    modal.style.display = 'none'
  
    clearForm()
  }
  function clearForm() {
      let filledform = document.getElementById('form')
    filledform.reset()
  }
  </script>
  