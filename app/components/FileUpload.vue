<template>
  <div>
    <!-- Drag & Drop Area -->
    <div class="border-2 border-dashed border-gray-500 p-6 text-center rounded-lg cursor-pointer"
      @click="triggerFileInput"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
      @drop.prevent="handleDrop"
      :class="{ 'border-[var(--ui-primary)]': isDragging }">
      <p v-if="files.length === 0">Dateien hierher ziehen oder klicken zum Hochladen</p>
      <p v-else-if="files.length === 1" class="text-[var(--ui-primary)]">{{ files.length }} Datei ausgewählt</p>
      <p v-else class="text-[var(--ui-primary)]">{{ files.length }} Dateien ausgewählt</p>

      <!-- Hidden File Input -->
      <UInput type="file" v-show="false" ref="fileInput" @change="handleFileInput" accept=".csv, .xlsx, .xls" multiple />
    </div>

    <!-- File List -->
    <ul v-if="files.length" class="mt-4 space-y-2 mx-auto">
      <li v-for="(file, index) in files" :key="file.name"
        class="flex items-center justify-between border dark:border-gray-100 border-gray-100 p-2 rounded-lg">
        <span class="truncate">{{ file.name }}</span>
        <UButton icon="i-heroicons-x-mark" color="error" variant="ghost" class="cursor-pointer" @click="removeFile(index)" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ExcelJS from "exceljs";

const { showToast } = useToastNotification();

const fileInput = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const files = ref<File[]>([]);

const triggerFileInput = () => {
  const inputEl = fileInput.value?.$el.querySelector("input");
  if (inputEl) {
    inputEl.click();
  }
};

const handleFileInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    processFiles(Array.from(target.files));
  }
};

// Drag & Drop Handlers
const dragOver = () => (isDragging.value = true);
const dragLeave = () => (isDragging.value = false);

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files.length) {
    processFiles(Array.from(event.dataTransfer.files));
  }
};

// File Processing
const processFiles = async (newFiles: File[]) => {
  const validTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  for (const file of newFiles) {
    if (validTypes.includes(file.type)) {
      if (!files.value.some((existingFile) => existingFile.name === file.name)) {
        files.value.push(file);
        showToast(`Die Datei ${file.name} wurde erfolgreich hochgeladen.`, "success");
        await readExcelFile(file);
      } else {
        showToast(`Die Datei ${file.name} wurde bereits hochgeladen.`, "info");
      }
    } else {
      showToast(`${file.name} ist keine Excel-Datei.`, "warning");
    }
  }
};

// Read Excel File
const readExcelFile = async (file: File) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    const arrayBuffer = event.target?.result as ArrayBuffer;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
    const worksheet = workbook.worksheets[0];

    // Extract meaningful data
    const jsonData: any = {
      customer: worksheet.getRow(3).getCell(3).value,
      returnAddress: worksheet.getRow(4).getCell(4).value,
      contactPerson: worksheet.getRow(5).getCell(3).value,
      email: worksheet.getRow(6).getCell(3).result,
      phone: worksheet.getRow(7).getCell(3).value,
      nsr: worksheet.getRow(7).getCell(3).result,
      ticketNumber: worksheet.getRow(8).getCell(3).result,
      lines: []
    };

    // Extract table data (starting from row 10)
    for (let i = 12; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      if (row.getCell(2).value) {
        jsonData.lines.push({
          no: row.getCell(1).value,
          serialNumber: row.getCell(2).value || "",
          deviceType: row.getCell(3).value || "",
          failureDescription: row.getCell(4).value || "",
          rmaNumber: row.getCell(5).value || ""
        });
      }
    }

    // Save to localStorage
    localStorage.setItem("excelData", JSON.stringify(jsonData));

    console.log("Data saved to localStorage:", jsonData);
  };

  reader.readAsArrayBuffer(file);
};



// Remove file from list
const removeFile = (index: number) => files.value.splice(index, 1);
</script>

<style>
/* Add any custom styling here */
</style>
