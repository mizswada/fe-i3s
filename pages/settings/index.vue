<script setup>
definePageMeta({
  title: "Manage Wallet",
  middleware: ["auth"],
  requiresAuth: true,
});

const data = [
  {
    "Transaction Type": "Reload",
    "Reference ID": "TP20244930293",
    "Amount": "20.00",
    "Status": "Success",
    "Action": ""
  },
]
</script>
<template>
  <div>
    <div>
      <div class="flex justify-between">
        <h4 class="mb-4 uppercase">Wallet Transaction</h4>
      </div>
      <rs-card class="py-5">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 px-5"
        >
          <div>
            <h5 class="font-semibold">Wallet Transaction</h5>
            <span class="text-sm text-gray-500">
              Below is the list of all wallet transaction
            </span>
          </div>
            
        </div>

        <rs-table
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
          class="mt-4"
        >
        <template v-slot:Action="data">
          <div class="flex flex-row gap-x-2">
            <div class="flex items-center gap-x-2">
              <nuxt-link :to="`/wallet/edit-wallet/[id]`">
                <rs-button
                  variant="primary-text"
                >
                  <Icon name="ph:note-pencil" /> 
                </rs-button>
              </nuxt-link>
            </div>
          </div>
        </template>
        </rs-table>
      </rs-card>
    </div>
  </div>
</template>
