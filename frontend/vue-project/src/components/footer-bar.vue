
<template>
    <footer class="container-fluid bg-dark text-light py-3">
  <div class="container">
    <p class="text-center">&copy; {{year}} Your Company. All rights reserved.</p>
  </div>
</footer>
</template>

<script setup>

const year = new Date().getFullYear();

</script>
