<script setup>

definePageMeta({
  title: "Add Public Holiday",
  middleware: ["auth"],
  requiresAuth: true,
});

const form = ref({
  holidayName: "",
  startDate: "",
  endDate: "",
  state: "",
})

const statusDropdown = ref([
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]);

const stateDropdown = ref([
  { label: "Selangor", value: "Selangor" },
  { label: "Terengganu", value: "Terengganu" },
  { label: "Pahang", value: "Pahang" },
  { label: "Kelantan", value: "Kelantan" },
  { label: "Melaka", value: "Melaka" },
  { label: "Negeri Sembilan", value: "Negeri Sembilan" },
  { label: "Johor", value: "Johor" },
  { label: "Kedah", value: "Kedah" },

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
              <h5 class="font-semibold">Add Public Holiday</h5>
              <span class="text-sm text-gray-500">
                  Information about the public holiday
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
            <span class="font-semibold">State</span>
            <v-select
              v-model="form.state" 
              name="State" 
              multiple
              :options="stateDropdown"
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
