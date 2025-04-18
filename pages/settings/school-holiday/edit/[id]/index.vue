<script setup>

definePageMeta({
  title: "Edit School Holiday",
  middleware: ["auth"],
  requiresAuth: true,
});

const form = ref({
  holidayName: "",
  startDate: "",
  endDate: "",
  school: "",
})

const statusDropdown = ref([
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]);

const schoolDropdown = ref([
  { label: "SMK Shah Alam", value: "Selangor" },
  { label: "SK Pandan", value: "Terengganu" },
  { label: "SK Saujana Impian 2", value: "SK Saujana Impian 2" },
  { label: "SMK Seksyen 18 Shah Alam", value: "SMK Seksyen 18 Shah Alam" },
  { label: "MRSM Lenggong", value: "MRSM Lenggong" },
  { label: "Smk Taman Tun Dr Ismail", value: "Smk Taman Tun Dr Ismail" },
  { label: "Greenview International School", value: "Greenview International School" },

]);

</script>

<template>
  <div>
    <div class="flex justify-between">
    <h4 class="mb-4 uppercase"></h4>
    </div>

    <FormKit type="form" :actions="false" :incomplete-message="true" @submit="submitForm">
      <section>
        <rs-card class="p-5">
          <div class="flex justify-between items-center mb-5">
              <div>
              <h5 class="font-semibold">Edit School Holiday</h5>
              <span class="text-sm text-gray-500">
                  Information about the school holiday
              </span>
              </div>
          </div>

          <FormKit
            v-model="form.holidayName"
            type="text"
            label="Holiday Name"
            validation="required|length:0,200"          
          />

          <FormKit
            v-model="form.startDate"
            type="date"
            label="Start Date"
            validation="required|length:0,200"            
          />   

          <FormKit
            v-model="form.endDate"
            type="date"
            label="End Date"
            validation="required|length:0,200"            
          />   

          <div class="mb-4">
            <span class="font-semibold">School</span>
            <v-select
              v-model="form.school" 
              name="State" 
              multiple
              :options="schoolDropdown"
              >
            </v-select>
          </div>

          <!-- <FormKit
            v-model="form.status"
            type="select"
            :options="statusDropdown"
            label="Status"
            validation="required|length:0,200" 
          /> -->
        </rs-card>

      </section>
      <rs-button btn-type="submit" class="w-full" :disabled="processing">
        {{ processing ? "Saving..." : "Save" }}
      </rs-button>
    </FormKit>
  </div>
</template>
