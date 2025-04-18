<script setup>
definePageMeta({
  title: "Users & Transactions",
  middleware: ["auth"],
  requiresAuth: true,
})
const changedata = ref(false)
const field = [
  "Id",
  "Name",
  "Total Transaction",
  "Transaction Value(RM)",
  "Credit Balance",
  "toyyibPay Credit",
  "Action",
]
const data = [
  {
    id: 1,
    fullName: "Amira",
    transaction: 3,
    value: 10.0,
    credit: 1.0,
    typ: 11.0,
    action: "",
  },
  {
    id: 2,
    fullName: "Lily",
    transaction: 1,
    value: 4.0,
    credit: 6.0,
    typ: 10.0,
    action: "",
  },
  {
    id: 3,
    fullName: "Haqeem",
    transaction: 2,
    value: 8.0,
    credit: 2.0,
    typ: 10.0,
    action: "",
  },
  {
    id: 4,
    fullName: "Afiq",
    transaction: 1,
    value: 2.0,
    credit: 3.0,
    typ: 5.0,
    action: "",
  },
  {
    id: 5,
    fullName: "Faris",
    transaction: 2,
    value: 7.0,
    credit: 2.0,
    typ: 9.0,
    action: "",
  },
]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
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
         <nuxt-link :to="`/usersandtransactions/userstransaction`">
            <rs-button>Details</rs-button>
          </nuxt-link>
        </template>
      </rs-table>
    </rs-card>
  </div>
</template>
