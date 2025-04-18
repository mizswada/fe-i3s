<script setup>
definePageMeta({
  title: "List of Roles",
  middleware: ["auth"],
  requiresAuth: true,
})

const changedata = ref(false)
const field = [
  "Id",
  "Roles",
  "Registered Number",
  "Unregistered Number",
  "Action",
]
const data = [
  {
    id: 1,
    name: "Merchant",
    register: 2,
    unregister: 0,
    action: "",
  },
  {
    id: 2,
    name: "Students",
    register: 860,
    unregister: 340,
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
          <nuxt-link to="/typregistration/userdetailslist">
            <rs-button>Details</rs-button>
          </nuxt-link>
        </template>
      </rs-table>
    </rs-card>
  </div>
</template>
