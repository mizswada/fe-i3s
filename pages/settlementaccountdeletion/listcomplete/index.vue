<script setup>
definePageMeta({
  title: "List of Complete Deletion",
  middleware: ["auth"],
  requiresAuth: true,
})
const { $swal } = useNuxtApp()

const submit = async () => {
  $swal
    .fire({
      position: "center",
      icon: "success",
      title: "Success",
      text: "User has been added",
      timer: 3000,
      showConfirmButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/dashboard`
      }
    })
}

const changedata = ref(false)
const field = [
  "Id",
  "Name",
  "Roles",
  "Credit Balance (RM)",
  "Date Delete",
  "Settlement Date",
  "Status",
]
const data = [
  {
    id: 1,
    name: "Siti Abu",
    roles: "Siti Abu",
    balance: "20.00",
    date: "11/06/2023 00:00:00",
    settlement: "13/06/2023 00:00:00",
    status: "Processing",
  },
  {
    id: 2,
    name: "Bedah Karim",
    roles: "Parents",
    balance: "12.00",
    date: "20/06/2023 00:00:00",
    settlement: "21/06/2023 00:00:00",
    status: "Complete",
  },
  {
    id: 3,
    name: "Nur Jannah",
    roles: "Parents",
    balance: "6.00",
    date: "14/06/2023 00:00:00",
    settlement: "16/06/2023 00:00:00",
    status: "Complete",
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
        <template v-slot:name="data" >
          <a class="text-decoration: underline"></a>
        </template>
      </rs-table>
    </rs-card>
  </div>
</template>
