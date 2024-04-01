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
                <label for="units" class="form-label">Units</label>
                <input
                  type="number"
                  class="form-control"
                  id="units"
                  name="units"
                  v-bind="form.units"
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" class="form-control" id="price" name="price" v-bind="form.price" />
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                
                <select id="category" name="category" class="form-control" v-bind="form.category" >
                <option disabled selected > Choose Category... </option>
                  <option v-for="category in categories" :key="category.id" >{{ category.name }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="supplier" class="form-label">Supplier</label>
                <select id="supplier" name="supplier" class="form-control">
                <option disabled selected > Choose Supplier... </option>
                 <option v-for="supplier in suppliers" :key="supplier.id" @click = "form.supplier = supplier.id">{{ supplier.name }}</option>
                </select>

              </div>
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="products"
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
  
  const products = ref([])
  const categories = ref([])
  const suppliers = ref([])
  const name = 'products'
  
  
  const form = ref({
    id: '',
    name: '',
    units: '',
    price: '',
    category: '',
    supplier: ''
  })
  
  onMounted(() => {
    getProducts()
    getCategories()
    getSuppliers()
  })


  
  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/products')
      products.value = response.data
      console.log('got products')
    } catch (err) {
      console.log(err)
    }
  }
  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/categories')
      categories.value = response.data
      console.log('got categories')
    } catch (err) {
      console.log(err)
    }
  }
  const getSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/suppliers')
      suppliers.value = response.data
      console.log('got suppliers')
    } catch (err) {
        
      console.log(err)
    }
    }
  
  function confirmRecord() {
      let prodid= document.getElementById('id').value
      let prodname= (document.getElementById('name').value)
      let prodprice= document.getElementById('price').value
      
      let catindex = document.getElementById('category').selectedIndex
      let supindex = document.getElementById('supplier').selectedIndex
      let produnits= document.getElementById('units').value
      console.log(catindex)
      console.log(supindex)

    


  
    let product = {
      id: `${prodid}`,
      name: `${prodname}`,
      price: `${prodprice}`,
      category: `${catindex}`,
      supplier: `${supindex}`,
      units: `${produnits}`
    }
    
    axios.post('http://localhost:3000/add/products', product)
    .then(response => {
      console.log(response.data)
      getProducts()
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
      let prodform = document.getElementById('form')
      prodform.name.value = record.name
      prodform.units.value = record.units
      prodform.price.value = record.price
      prodform.category.value = record.id
      prodform.supplier.value = record.supplier
      prodform.id.value = record.id
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/products`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getProducts()
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
  