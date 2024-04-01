<template>
    <div>
      <main>
        <div class="container">
          <add-component :name="name" @closeModal="closeModal" @confirm-record="confirmRecord">
            <form id="form">
              <div class="mb-3">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control" id="date" date="date" v-bind="form.date" />
              </div>
              <div class="mb-3">
                <label for="shipper" class="form-label" >Shipper</label>
                <select v-model="form.shipper" class="form-select" id ="shipper">
                    <option disabled selected > Choose Shipper... </option>
                  <option
                    v-for="shipper in shippers"
                    :key="shipper.id"
                    
                  >{{ shipper.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="customer" class="form-label">Customer</label>
                
                <select v-model="form.customer" class="form-select" id ="customer">
                    <option disabled selected > Choose Customer... </option>
                  <option
                    v-for="customer in customers"
                    :key="customer.id"
                    
                  >{{ customer.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="employee" class="form-label">Employee</label>
                
                <select v-model="form.employee" class="form-select" id ="employee">
                    <option disabled selected > Choose Employee... </option>
                  <option
                    v-for="employee in employees"
                    :key="employee.id"
                    
                  >{{ employee.name }}</option>
                </select>
              </div>
              
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="orders"
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
  
  const orders = ref([])
  const customers = ref([])
  const employees = ref([])
  const shippers = ref([])
  const name = 'orders'
  
  
  const form = ref({
    id: '',
    date: '',
    shipper: '',
    customer: '',
    employee: '',
    
  })
  
  onMounted(() => {
    getorders()
    getCustomers()
    getEmployees()
    getShippers()
  })
  
  const getorders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/orders')
      orders.value = response.data
      console.log('got orders')
    } catch (err) {
      console.log(err)
    }
  }
  const getCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/customers')
      customers.value = response.data
      console.log('got customers')
    } catch (err) {
      console.log(err)
    }
    }

    const getEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/employees')
      employees.value = response.data
      console.log('got employees')
    } catch (err) {
      console.log(err)
    }
    }

    const getShippers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/shippers')
      shippers.value = response.data
      console.log('got shippers')
    } catch (err) {
      console.log(err)
    }
    }
  
  function confirmRecord() {
      let orderid= document.getElementById('id').value
      let orderdate= (document.getElementById('date').value)
     
      let custindex = document.getElementById('customer').selectedIndex
      let empindex = document.getElementById('employee').selectedIndex
      
      let shipindex = document.getElementById('shipper').selectedIndex

        console.log(custindex)
        console.log(empindex)
        

    let order = {
      id: `${orderid}`,
      date: `${orderdate}`,
      customer: `${custindex}`,
      employee: `${empindex}`,
   
      shipper: `${shipindex}`
    }
    console.log(order)
    
    axios.post('http://localhost:3000/add/orders', order)
    .then(response => {
      console.log(response.data)
      getorders()
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
      let orderform = document.getElementById('form')
      orderform.date.value = record.date
      orderform.shipper.value = record.shipper
      orderform.customer.value = record.customer
      orderform.employee.value = record.employee
      
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/orders`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getorders()
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
  