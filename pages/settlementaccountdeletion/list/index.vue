<script setup>
definePageMeta({
  title: "List of Settlement Account Deletion",
  middleware: ["auth"],
  requiresAuth: true,
})

const changedata = ref(false)
const field = [
  "Id",
  "Name",
  "Roles",
  "Credit Balance (RM)",
  "Date Delete",
  "Status",
  "Action",
]
const data = [
  {
    id: 1,
    name: "Siti Abu",
    roles: "Parents",
    balance: "20.00",
    date: "11/06/2023 00:00:00",
    status: "Pending",
    action: "",
  },
  {
    id: 2,
    name: "Bedah Karim",
    roles: "Parents",
    balance: "12.00",
    date: "20/06/2023 00:00:00",
    status: "Pending",
    action: "",
  },
  {
    id: 3,
    name: "Nur Jannah",
    roles: "Parents",
    balance: "6.00",
    date: "14/06/2023 00:00:00",
    status: "Pending",
    action: "",
  },
]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <rs-table
        :field="field"
        :data="data"
        :options="{
          variant: 'default',
          striped: true,
          bordered: true,
          borderless: true,
          hover: true,
          fixed: false,
        }"
        advanced
      >
        <template v-slot:Action="data">
          <FormKit type="checkbox" />
        </template>
      </rs-table>
    </rs-card>
    <rs-button @click="submit">Verify</rs-button>
  </div>
</template>
