<script setup>
definePageMeta({
  title: "Account Adjustment",
  middleware: ["auth"],
  requiresAuth: true,
})

const changedata = ref(false)
const field = [
  "Id",
  "From Account",
  "To Account",
  "Amount (RM)",
  "Description",
  "Adjustment Date",
  "School",
  "Status",
  "Action",
]
const data = [
  {
    id: 1,
    from: "Siti Faqihah",
    to: "Kantin A",
    amount: 2.0,
    description: "Account adjustment - Failed transfer due to system failure",
    date: "20/06/2023 00:00:00",
    school: "SMK Seksyen 7, Shah Alam",
    status: "Success",
    action: "",
  },
  {
    id: 2,
    from: "Nur Aminah",
    to: "Kantin B",
    amount: 1.1,
    description: "Account adjustment - Failed transfer due to system failure",
    date: "19/06/2023 00:00:00",
    school: "SMK Saujan Impian",
    status: "Success",
    action: "",
  },
  {
    id: 3,
    from: "Siti Faqihah",
    to: "Kantin A",
    amount: 5.0,
    description: "Account adjustment - Failed transfer due to system failure",
    date: "12/06/2023 00:00:00",
    school: "SMK Bangsar, KL",
    status: "Success",
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
          <nuxt-link :to="`/accountadjustment/adjustmentform`">
            <rs-button>Details</rs-button>
          </nuxt-link>
        </template>
      </rs-table>
    </rs-card>
  </div>
</template>
