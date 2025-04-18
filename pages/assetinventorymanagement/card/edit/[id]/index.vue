<script setup>
  definePageMeta({
    title: "Edit Card",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const cardstatus = [
    { label: "Choose status", value: null },
    { label: "Active", value: "Active" },
    { label: "Inctive", value: "Inactive" },
    { label: "In Stock", value: "In Stock" },
    { label: "Lost", value: "Lost" },
    { label: "Faulty", value: "Faulty" },
    { label: "Blacklist", value: "Blacklist" }
  ]

  const location = [
    { label: "Choose location", value: null },
    { label: "HQ", value: "HQ" },
    { label: "Office", value: "Office" },
    { label: "School", value: "School" }
  ]

  const form = ref({
    card_no: "",
    card_uid: "",
    card_location: "",
    card_status: "",
  });
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >
    <div class="p-5">
      <FormKit
        type="form"
        :action="false"
        @submit="submit"
        :incomplete-message="false"
        id="myForm"
      >
        <div class="flex flex-row justify-between">
          <div class="basis-1/2 mr-5">
            <FormKit 
              type="text" 
              label="Card Number"
              validation="required|length:0,200"
              v-model="form.card_no"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Card Number <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2 mr-5">
            <FormKit 
              type="text" 
              label="UID"
              validation="required|length:0,200"
              v-model="form.card_uid"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">UID <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2">
            <FormKit 
              type="select" 
              label="Location"
              :options="location"
              validation="required|length:0,200"
              v-model="form.card_location"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Location <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
        </div>

        <div class="flex flex-row justify-between">
          <div class="basis-1/3">
            <FormKit 
              type="select" 
              label="Card Status"
              :options="cardstatus"
              validation="required|length:0,200"
              v-model="form.card_status"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Card Status <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
        </div>
      </FormKit>
    </div>
    
  </rs-card>
</template>
      