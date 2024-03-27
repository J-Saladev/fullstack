<template>
  <div >
    
  <div class="modal" tabindex="-1" role="dialog" id="sectionModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add {{ name }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('closeModal')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="$emit('confirm-record')">Submit</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('closeModal')">Close</button>
      </div>
    </div>
  </div>
</div>
 

  </div>
</template>

<script setup >

const props = defineProps({
    name: String
})

</script>

<style scoped>
h5 {
    text-transform: capitalize;
}
</style>