<template>
    <div>
      <main>
        <div class="container">
          <add-component :name="name" @closeModal="closeModal" @confirm-record="confirmRecord">
            <form id="form">
              <div class="mb-3">
                <label for="placeholder1" class="form-label">Placeholder1</label>
                <input type="text" class="form-control" id="placeholder1" placeholder1="placeholder1" v-bind="form.placeholder1" />
              </div>
              <div class="mb-3">
                <label for="placeholder2" class="form-label">Placeholder2</label>
                <input
                  type="text"
                  class="form-control"
                  id="placeholder2"
                  name="placeholder2"
                  v-bind="form.placeholder2"
                />
              </div>
              <div class="mb-3">
                <label for="placeholder3" class="form-label">Placeholder3</label>
                <input type="text" class="form-control" id="placeholder3" name="placeholder3" v-bind="form.placeholder3" />
              </div>
              <div class="mb-3">
                <label for="placeholder4" class="form-label">Placeholder4</label>
                <input type="text" class="form-control" id="placeholder4" name="placeholder4" v-bind="form.placeholder4" />
              </div>
              <div class="mb-3">
                <label for="placeholder5" class="form-label">Placeholder5</label>
                <input
                  type="text"
                  class="form-control"
                  id="placeholder5"
                  name="placeholder5"
                  v-bind="form.placeholder5"
                />
              </div>
              <input type="text" class="form-control" id="id" name="id" v-bind="form.id" hidden/>
            </form>
          </add-component>
  
          <load-view
            :section="sectionplaceholder"
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
  
  const sectionplaceholder = ref([])
  const name = 'sectionplaceholder'
  
  
  const form = ref({
    id: '',
    placeholder1: '',
    placeholder2: '',
    placeholder3: '',
    placeholder4: '',
    placeholder5: ''
  })
  
  onMounted(() => {
    getsectionplaceholder()
  })
  
  const getsectionplaceholder = async () => {
    try {
      const response = await axios.get('http://localhost:3000/views/sectionplaceholder')
      sectionplaceholder.value = response.data
      console.log('got sectionplaceholder')
    } catch (err) {
      console.log(err)
    }
  }
  function confirmRecord() {
      let sectionplaceholdershortid= document.getElementById('id').value
      let sectionplaceholdershortplaceholder1= (document.getElementById('placeholder1').value)
      let sectionplaceholdershortplaceholder3= document.getElementById('placeholder3').value
      let sectionplaceholdershortplaceholder4= document.getElementById('placeholder4').value
      let sectionplaceholdershortplaceholder5= document.getElementById('placeholder5').value
      let sectionplaceholdershortplaceholder2= document.getElementById('placeholder2').value
  
    let sectionplaceholdersingle = {
      id: `${sectionplaceholdershortid}`,
      placeholder1: `${sectionplaceholdershortplaceholder1}`,
      placeholder3: `${sectionplaceholdershortplaceholder3}`,
      placeholder4: `${sectionplaceholdershortplaceholder4}`,
      placeholder5: `${sectionplaceholdershortplaceholder5}`,
      placeholder2: `${sectionplaceholdershortplaceholder2}`
    }
    
    axios.post('http://localhost:3000/add/sectionplaceholder', sectionplaceholdersingle)
    .then(response => {
      console.log(response.data)
      getsectionplaceholder()
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
      let sectionplaceholdershortform = document.getElementById('form')
      sectionplaceholdershortform.placeholder1.value = record.placeholder1
      sectionplaceholdershortform.placeholder2.value = record.placeholder2
      sectionplaceholdershortform.placeholder3.value = record.placeholder3
      sectionplaceholdershortform.placeholder4.value = record.placeholder4
      sectionplaceholdershortform.placeholder5.value = record.placeholder5
      
  
    modal.style.display = 'block'
    
  }
  function deleteRecord(record) {
    if (confirm('Are you sure you want to delete this record?')) {
      
      axios.delete(`http://localhost:3000/delete/sectionplaceholder`, { data: { id: record.id } })
      .then(response => {
        console.log(response.data)
        getsectionplaceholder()
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
  