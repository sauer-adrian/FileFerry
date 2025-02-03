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
    <USelect v-model="$colorMode.preference" :items="themes" :ui="{
      icon: {
        base: 'w-6 h-6',
      },
      items: {
        base: 'flex items-center gap-2',
        selected: 'text-primary-500 dark:text-primary-400',
      },
    }">
      <template #leading>
        <Icon :name="iconName($colorMode.preference)" class="size-5" />
      </template>
      <template #items="{ items }">
        <div class="flex items-center gap-2">
          <Icon :name="iconName(items)" class="size-5" />
          <Icon :name="iconName($colorMode.preference)" class="size-5" />
          <span>{{ items }}</span>
        </div>
      </template>
    </USelect>

    <!-- <p class="mt-2">
      <ColorScheme
        placeholder="..."
        tag="span"
      >
        Preference: <b>{{ $colorMode.preference }}</b>
        <span v-if="$colorMode.preference === 'system'">&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span>
        <span v-if="$colorMode.forced">&nbsp;(<i>{{ $colorMode.value }}</i> forced)</span>
      </ColorScheme>
    </p> -->
  </div>
</template>

<style scoped></style>