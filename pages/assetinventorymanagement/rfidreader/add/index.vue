<script setup>
  definePageMeta({
    title: "Add RFID Reader",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const hardwarestatus = [
    { label: "Choose status", value: null },
    { label: "In Stock", value: "In Stock" },
    { label: "Active", value: "Active" },
    { label: "Missing", value: "Missing" },
    { label: "Faulty", value: "Faulty" },
    { label: "Repair", value: "Repair" },
    { label: "Dispose", value: "Dispose" }
  ]

  const location = [
    { label: "Choose location", value: null },
    { label: "HQ", value: "HQ" },
    { label: "Office", value: "Office" },
    { label: "School", value: "School" }
  ]

  const form = ref({
    model: "",
    serial_number: "",
    tag_number: "",
    ip_address: "",
    description: "",
    location: "",
    hardware_status: "",
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
              label="Serial Number"
              validation="required|length:0,200"
              v-model="form.serial_number"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Serial Number <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2">
            <FormKit 
              type="text" 
              label="Tag Number"
              validation="required|length:0,200"
              v-model="form.tag_number"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Tag Number <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2 mr-5">
            <!-- <FormKit 
              type="text" 
              label="Model"
              validation="required|length:0,200"
              v-model="form.model"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Model <span class="text-danger">*</span></label>
              </template>
            </FormKit> -->
          </div>
        </div>

        <div class="flex flex-row justify-between">
          <div class="basis-1/2 mr-5">
            <FormKit 
              type="text" 
              label="IP Address"
              placeholder="255.255.255.255"
              validation="required|length:0,200"
              v-model="form.ip_address"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">IP Address <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2 mr-5">
            <FormKit 
              type="text" 
              label="Description"
              validation="required|length:0,200"
              v-model="form.description"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Description <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2">
            <FormKit 
              type="select" 
              label="Hardware Status"
              :options="hardwarestatus"
              validation="required|length:0,200"
              v-model="form.hardware_status"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Hardware Status <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
        </div>

        <div class="flex flex-row justify-between">
          <div class="basis-1/3">
            <FormKit 
              type="select" 
              label="Location"
              :options="location"
              validation="required|length:0,200"
              v-model="form.location"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Location <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
        </div>
      </FormKit>
    </div>
  </rs-card>
</template>
      