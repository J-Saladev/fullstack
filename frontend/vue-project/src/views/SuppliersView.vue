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
                <label for="address" class="form-label">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  name="address"
                  v-bind="form.address"
                />
              </div>
              <div class="mb-3">
                <label for="city" class="form-label">City</label>
                <input type="text" class="form-control" id="city" name="city" v-bind="form.city" />
              </div>
              <div class="mb-3">
                <label for="zip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="zip" name="zip" v-bind="form.zip" />
              </div>
              <div class="mb-3">
                <label for="country" class="form-label">Country</label>
                <input
                  type="text"
                  class="form-control"
                  id="country"
                  name="country"
                  v-bind="form.country"
                />
              </div>
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="suppliers"
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
  
  const suppliers = ref([])
  const name = 'suppliers'
  
  
  const form = ref({
    id: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    country: ''
  })
  
  onMounted(() => {
    getsuppliers()
  })
  
  const getsuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/suppliers')
      suppliers.value = response.data
      console.log('got suppliers')
    } catch (err) {
      console.log(err)
    }
  }
  function confirmRecord() {
      let supid= document.getElementById('id').value
      let supname= (document.getElementById('name').value)
      let supcity= document.getElementById('city').value
      let supzip= document.getElementById('zip').value
      let supcountry= document.getElementById('country').value
      let supaddress= document.getElementById('address').value
  
    let supplier = {
      id: `${supid}`,
      name: `${supname}`,
      city: `${supcity}`,
      zip: `${supzip}`,
      country: `${supcountry}`,
      address: `${supaddress}`
    }
    
    axios.post('http://localhost:3000/add/suppliers', supplier)
    .then(response => {
      console.log(response.data)
      getsuppliers()
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
      let supform = document.getElementById('form')
      supform.name.value = record.name
      supform.address.value = record.address
      supform.city.value = record.city
      supform.zip.value = record.zip
      supform.country.value = record.country
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/suppliers`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getsuppliers()
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
  