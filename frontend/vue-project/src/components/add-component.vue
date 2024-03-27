<template>
    <div v-if="showModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Your form content here -->
            <button @click="closeModal" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const showModal = ref(false);
  
      const openModal = () => {
        showModal.value = true;
      };
  
      const closeModal = () => {
        showModal.value = false;
      };
  
      return {
        showModal,
        openModal,
        closeModal,
      };
    },
  };
  </script>
  
  <style>
  /* Your dark mode styles here */
  </style>