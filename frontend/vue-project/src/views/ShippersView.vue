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
                <label for="phone" class="form-label">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  name="phone"
                  v-bind="form.phone"
                />
              </div>
              
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="shippers"
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
  
  const shippers = ref([])
  const name = 'shippers'
  
  
  const form = ref({
    id: '',
    name: '',
    phone: '',
   
  })
  
  onMounted(() => {
    getshippers()
  })
  
  const getshippers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/shippers')
      shippers.value = response.data
      console.log('got shippers')
    } catch (err) {
      console.log(err)
    }
  }
  function confirmRecord() {
      let shipid= document.getElementById('id').value
      let shipname= (document.getElementById('name').value)
     
      let shipphone= document.getElementById('phone').value
  
    let shipper = {
      id: `${shipid}`,
      name: `${shipname}`,
      
      phone: `${shipphone}`
    }
    
    axios.post('http://localhost:3000/add/shippers', shipper)
    .then(response => {
      console.log(response.data)
      getshippers()
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
      let shipform = document.getElementById('form')
      shipform.name.value = record.name
      shipform.phone.value = record.phone
      shipform.placeholder3.value = record.placeholder3
      shipform.placeholder4.value = record.placeholder4
      shipform.placeholder5.value = record.placeholder5
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/shippers`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getshippers()
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
  