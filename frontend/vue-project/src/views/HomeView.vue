<script setup>

</script>

<template>
  <main>
    <div class="container">
    <div class="floating-center">
      <h1>Welcome to the computer store</h1>
    </div>
  </div>
  </main>
</template>

<style scoped>
  .floating-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: white;
            text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
            animation: bob 4s infinite;
        }

        @keyframes bob {
            0% {
                transform: translate(-50%, -50%) translateY(-10px);
            }
            50% {
                transform: translate(-50%, -50%) translateY(10px);
            }
            100% {
                transform: translate(-50%, -50%) translateY(-10px);
            }
        }
</style>
