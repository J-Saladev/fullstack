<template>
    <div>
      <main>
        <div class="container">
          <add-component :name="name" @closeModal="closeModal" @confirm-record="confirmRecord">
            <form id="form">
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" name="name" v-bind="form.name" />
              </div>
              <div class="mb-3">
                <label for="birthday" class="form-label">Birthday</label>
                <input
                  type="text"
                  class="form-control"
                  id="birthday"
                  name="birthday"
                  v-bind="form.birthday"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" id="email" name="email" v-bind="form.email" />
              </div>
            
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="employees"
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
  
  const employees = ref([])
  const name = 'employees'
  
  
  const form = ref({
    id: '',
    name: '',
    birthday: '',
    email: '',
 
  })
  
  onMounted(() => {
    getemployees()
  })
  
  const getemployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/employees')
      employees.value = response.data
      console.log('got employees')
    } catch (err) {
      console.log(err)
    }
  }
  function confirmRecord() {
      let emplid= document.getElementById('id').value
      let emplname= (document.getElementById('name').value)
      let emplcity= document.getElementById('email').value
   
      let emplbirth= document.getElementById('birthday').value
  
    let employee = {
      id: `${emplid}`,
      name: `${emplname}`,
      birthday: `${emplbirth}`,  
      email: `${emplcity}`,
    }
    
      
      
    
    axios.post('http://localhost:3000/add/employees', employee)
    .then(response => {
      console.log(response.data)
      getemployees()
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
      let emplform = document.getElementById('form')
      emplform.id.value = record.id
      emplform.name.value = record.name
      emplform.birthday.value = record.birthday
      emplform.email.value = record.email
    
      
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/employees`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getemployees()
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
  