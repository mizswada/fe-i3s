<script setup>
definePageMeta({
  title: "User's Transaction Details",
  middleware: ["auth"],
  requiresAuth: true,
})
const changedata = ref(false)
const field = [
  "Id",
  "Transaction Number",
  "Amount (RM)",
  "Date",
  "Payment Status",
  "Merchant Name",
  "Flag"
]
const data = [
  {
    id: 1,
    number: "PAY-1234-5678-000",
    value: 4.0,
    date: "20/06/2023 10:45:00",
    status: "Success",
    merchant: "PakMat Kantin",
    flag: "N"
  },
  {
    id: 2,
    number: "PAY-1884-5678-111",
    value: 6.0,
    date: "20/06/2023 10:45:00",
    status: "Success",
    merchant: "PakMat Kantin",
    flag: "N"
  },
]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
      <!--- First card : to show user's name -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:sharp-person"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              Amira</span
            >
            <span class="text-base font-semibold text-gray-500"
              >User's Name</span
            >
          </div>
        </div>
      </rs-card>

      <!--- second card : to show user's total transactions -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:outline-show-chart"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 2</span>
            <span class="text-base font-semibold text-gray-500"
              >Total Transactions</span
            >
          </div>
        </div>
      </rs-card>

      <!--- THIRD card : to show user's credit balance -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:baseline-account-balance-wallet"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              RM1.00</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Credit Balance</span
            >
          </div>
        </div>
      </rs-card>

      <!--- forth card : to show user's toyyibpay credit balance  -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:baseline-account-balance-wallet"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              RM10.00</span
            >
            <span class="text-base font-semibold text-gray-500"
              >toyyibPay Credit Balance</span
            >
          </div>
        </div>
      </rs-card>
    </div>

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
      </rs-table>
    </rs-card>
  </div>
</template>
