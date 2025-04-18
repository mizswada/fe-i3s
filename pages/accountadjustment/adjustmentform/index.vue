<script setup>
definePageMeta({
  title: "Account Adjustment Form",
  middleware: ["auth"],
  requiresAuth: true,
})

const fromlist = ["Amirah Diana", "Muhammad Hazz", "Siti Aminah", "Ammar Afiq"]
const tolist = ["Kantin A", "Kantin B"]
const schoollist = [
  "SMK Seksyen 7, Shah Alam",
  "SMK Saujana Impian",
  "SMK Bangi",
]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <FormKit type="select" label="School" :options="schoollist" />
      <FormKit type="select" label="From Account" :options="fromlist" />
      <FormKit type="select" label="To Account" :options="tolist" />
      <FormKit
        type="textarea"
        placeholder="reward description"
        label="Description"
        rows="2"
      />
      <FormKit type="mask" label="Adjustment Value (RM)" mask="##.##" />

      <rs-button>Save</rs-button>
    </rs-card>
  </div>
</template>
