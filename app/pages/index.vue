<template>
  <div>
    <!-- Drag & Drop Area -->
    <div class="border-2 border-dashed border-gray-500 p-6 text-center rounded-lg cursor-pointer"
      @click="triggerFileInput"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
      @drop.prevent="handleDrop"
      :class="{'border-[var(--ui-primary)': isDragging }">
      <p v-if="files.length === 0">Dateien hierher ziehen oder klicken zum Hochladen</p>
      <p v-else class="text-[var(--ui-primary)]">{{ files.length }} Dateien ausgewählt</p>

      <!-- Hidden File Input -->
      <UInput type="file" v-show="false" ref="fileInput" @change="handleFileInput" accept=".csv, .xlsx, .xls"
        multiple />
    </div>

    <!-- File List -->
    <ul v-if="files.length" class="mt-4 space-y-2 mx-auto">
      <li v-for="(file, index) in files" :key="file.name"
        class="flex items-center justify-between border dark:boder-red-100 boder-red-100 p-2 rounded-lg">
        <span class="truncate">{{ file.name }}</span>
        <UButton icon="i-heroicons-x-mark" color="error" variant="ghost" @click="removeFile(index)" />
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
const { showToast } = useToastNotification()


const fileInput = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const files = ref<File[]>([]);

const triggerFileInput = () => {
  const inputEl = fileInput.value?.$el.querySelector('input');
  if (inputEl) {
    inputEl.click();
  }
};

const handleFileInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    addFiles(Array.from(target.files));
  }
};

// Drag & Drop Handlers
const dragOver = () => isDragging.value = true;
const dragLeave = () => isDragging.value = false;

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files.length) {
    addFiles(Array.from(event.dataTransfer.files));
  }
};

// File Processing
const addFiles = (newFiles: File[]) => {
  const validTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

  newFiles.forEach((file) => {
    if (validTypes.includes(file.type)) {
      if (!files.value.some((existingFile) => existingFile.name === file.name)) {
        files.value.push(file);
        showToast("Die Datei " + file.name + " wurde erfolgreich hochgeladen.", "success");
      }
    } else {
      showToast(file.name + " ist keine Excel-Datei.", "warning");
    }
  });
};

// Remove file from list
const removeFile = (index: number) => files.value.splice(index, 1);
</script>
