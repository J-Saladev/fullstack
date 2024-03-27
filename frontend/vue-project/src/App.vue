

<template >
  
    <div class="">
    <nav-bar class="fixed-top"> </nav-bar>
  

  
    <router-view id="view"></router-view>




    <footer-bar class="fixed-bottom"> </footer-bar>

  </div>

  

 

  

</template>

<script setup>
import navBar from './components/nav-bar.vue';
import footerBar from './components/footer-bar.vue';



</script>

<style scoped>
#view {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
 
</style>