<script setup>
definePageMeta({
  title: "User Detail List",
  middleware: ["auth"],
  requiresAuth: true,
})

const registerStudent = ref(false)

const clickOk = () => {
 registerStudent.value = false;
}

const changedata = ref(false)
const field = ["Id", "Student", "Register Status", "Action"]
const data = [
  {
    id: 1,
    name: "Puteri Yana",
    status: "Unregistered",
    action: "",
  },
  {
    id: 2,
    name: "Amira Nunu",
    status: "Unregistered",
    action: "",
  },
  {
    id: 3,
    name: "Nur Hanie",
    status: "Unregistered",
    action: "",
  },
  {
    id: 4,
    name: "Ahmad Nur",
    status: "Unregistered",
    action: "",
  },
  {
    id: 5,
    name: "Mimi Momo",
    status: "Unregistered",
    action: "",
  },
  {
    id: 6,
    name: "Muhammad Ali",
    status: "Unregistered",
    action: "",
  },
  {
    id: 7,
    name: "Arif Fofo",
    status: "Unregistered",
    action: "",
  },
  {
    id: 8,
    name: "Shakirah Nur",
    status: "Unregistered",
    action: "",
  },
]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
      <!--- First card : to show school's name -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:sharp-person"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              SMK Seksyen 7, Shah Alam</span
            >
            <span class="text-base font-semibold text-gray-500">School</span>
          </div>
        </div>
      </rs-card>

      <!--- second card : to show user's total register -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:outline-show-chart"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 1200</span>
            <span class="text-base font-semibold text-gray-500"
              >Total Students</span
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
            <Icon
              class="text-primary"
              name="ic:baseline-account-balance-wallet"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 340</span>
            <span class="text-base font-semibold text-gray-500"
              >Unregisterd Students in toyyibPay</span
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
        <template v-slot:Action="data">
          <Form-kit type="checkbox"></Form-kit>
        </template>
      </rs-table>
      <rs-button @click="registerStudent = true">Register User</rs-button>
      <rs-modal
        title="Registration Confirmation"
        v-model="registerStudent"
        :ok-callback="clickOk"
      >
        5 students will be registered in toyyibPay.
      </rs-modal>
    </rs-card>
  </div>
</template>
