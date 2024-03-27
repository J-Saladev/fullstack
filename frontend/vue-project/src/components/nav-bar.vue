<template >
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <a class="navbar-brand" href="#">Your Brand</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <router-link active-class="active" class="nav-link" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/customers">Customers</router-link>
        
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/employees">Employees</router-link>
        
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/categories">Categories</router-link>
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/products">Products</router-link>
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/suppliers">Suppliers</router-link>
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/shippers">Shippers</router-link>
      </li>
      <li class="nav-item">
        <router-link active-class="active" class="nav-link" to="/categories">Orders</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script setup>


</script>