<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

const items = ref([
  {
    label: 'Backlog',
    icon: 'i-lucide-circle-help'
  },
  {
    label: 'Todo',
    icon: 'i-lucide-circle-plus'
  },
  {
    label: 'In Progress',
    icon: 'i-lucide-circle-arrow-up'
  },
  {
    label: 'Done',
    icon: 'i-lucide-circle-check'
  }
])
const value = ref({
  label: 'Return Address'
})

type Payment = {
  serialnumber: string
  date: string
  status: 'paid' | 'failed' | 'refunded'
  email: string
  amount: number
}

const data = ref<Payment[]>([
  {
    serialnumber: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594
  },
  {
    serialnumber: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276
  },
  {
    serialnumber: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315
  },
  {
    serialnumber: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529
  },
  {
    serialnumber: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639
  }
])

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: 'serialnumber',
    header: 'Serialnumber',
    cell: ({ row }) => `${row.getValue('serialnumber')}`
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paserialnumber: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status')
      )
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  }
]
</script>

<template>
  <h1>Daten aus der Datei: Amazon_Sammeltabelle - Kopie.xlsx</h1>
  <p>
    Kunde:
  </p>
  <p>
    Return Address:
  </p>
  <USelectMenu v-model="value" :search-input="{
    placeholder: 'Filter...',
    icon: 'i-lucide-search'
  }" :items="items" class="w-48" />
  <p>
    Ticketnummer:
  </p>
  <p>
    Kontakt:
  </p>
  <p>
    Kontakt E-Mail:
  </p>
  <h2>Geräte</h2>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>