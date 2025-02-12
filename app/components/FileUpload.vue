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
      <p v-else class="text-[var(--ui-primary)]">{{ files.length }} Datei{{ files.length > 1 ? 'en' : '' }} ausgewählt</p>

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

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const files = ref<File[]>([]);

const triggerFileInput = () => {
  const inputEl = (fileInput.value as any)?.$el?.querySelector("input");
  if (inputEl) {
    inputEl.click();
  } else {
    console.error("File input element not found.");
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

// Handle File Input Change
const handleFileInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    processFiles(Array.from(target.files));
  }
};

// Allowed File Types
const validTypes = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const processFiles = async (newFiles: File[]) => {
  for (const file of newFiles) {
    if (!validTypes.includes(file.type)) {
      showToast(`${file.name} ist keine Excel-Datei.`, "warning");
      continue;
    }

    if (files.value.some((existingFile) => existingFile.name === file.name)) {
      showToast(`Die Datei ${file.name} wurde bereits hochgeladen.`, "info");
      continue;
    }

    files.value.push(file);
    showToast(`Die Datei ${file.name} wurde erfolgreich hochgeladen.`, "success");
    await readExcelFile(file);
  }
};

// Read & Validate Excel File
const readExcelFile = async (file: File) => {
  const reader = new FileReader();

  reader.onload = async (event) => {
    try {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];


      if (!worksheet) {
        showToast("Die Excel-Datei enthält kein Arbeitsblatt.", "error");
        return;
      }

      // Extract meaningful data
      const jsonData: { [key: string]: any } = {
        customer: worksheet.getRow(3).getCell(3).value,
        returnAddress: worksheet.getRow(4).getCell(4).value,
        contactPerson: worksheet.getRow(5).getCell(3).value,
        email: worksheet.getRow(6).getCell(3).result,
        phone: worksheet.getRow(7).getCell(3).value,
        ticketNumber: worksheet.getRow(8).getCell(3).result,
        lines: []
      };

      // Validate main fields
      const requiredFields = ["customer", "returnAddress", "contactPerson", "email", "phone", "ticketNumber"];
      const missingFields = requiredFields.filter(field => !jsonData[field]);

      if (missingFields.length) {
        showToast(`Fehlende Werte: ${missingFields.join(", ")}`, "error");
      }

      // Extract table data (starting from row 12)
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

      if (jsonData.lines.length === 0) {
        showToast("Die Excel-Datei enthält keine gültigen Datenzeilen.", "warning");
      }

      // Save to localStorage
      localStorage.setItem("excelData", JSON.stringify(jsonData));
      console.log("Data saved to localStorage:", jsonData);

    } catch (error) {
      showToast("Fehler beim Lesen der Excel-Datei.", "error");
      console.error("Error reading Excel file:", error);
    }
  };

  reader.readAsArrayBuffer(file);
};

// Remove file from list
const removeFile = (index: number) => files.value.splice(index, 1);
</script>

