<script setup>
function iconName(theme) {
  if (theme === 'system') return 'i-ph-laptop'
  if (theme === 'light') return 'i-ph-sun'
  if (theme === 'dark') return 'i-ph-moon'
  return 'i-ph-coffee'
}

const themes = ['system', 'light', 'dark', 'sepia']
</script>

<template>
  <div>
    <USelect v-model="$colorMode.preference" :items="themes">

      <template #leading>
        <Icon :name="iconName($colorMode.preference)" class="size-5" />
      </template>
    </USelect>
  </div>
</template>
