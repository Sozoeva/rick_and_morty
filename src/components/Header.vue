<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header>
    <nav class="p-5 flex items-center justify-between">
      <RouterLink to="/">
        <img src="../assets/logo.png" alt="logo" class="w-10" />
      </RouterLink>
      <ul class="flex items-center gap-5 font-bold">
        <li>Docs</li>
        <li>About</li>
        <li>
          <button class="btn">Support us</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.btn {
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid rgb(255, 152, 0);
  cursor: auto;
}
</style>
