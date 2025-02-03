<template>
  <div :class="'min-h-screen flex flex-col'">
    <header class="p-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
      <!-- Logo and App Name -->
      <div class="flex items-center space-x-2">
        <UIcon name="hugeicons:ferry-boat" size="25" />
        <h1 class="text-lg font-bold">FileFerry</h1>
      </div>

      <!-- Controls: Theme and Color Switchers -->
      <div class="flex items-center space-x-4">
        <ColorModeButton />
      </div>
    </header>

    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>

<script lang="ts">

</script>

<style></style>
