<script setup>

definePageMeta({
  title: "Add School Session",
  middleware: ["auth"],
  requiresAuth: true,
});

const form = ref({
  sessionCode: "",
  startTime: "",
  lateTime: "",
  recessEndTime: ""
})

const statusDropdown = ref([
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
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
              <h5 class="font-semibold">Add School Session</h5>
              <span class="text-sm text-gray-500">
                  Information about the school session
              </span>
              </div>
          </div>

          <FormKit
            v-model="form.sessionCode"
            type="text"
            label="School Session Code"
            validation="required|length:0,200"          
          />

          <FormKit
            v-model="form.startTime"
            type="time"
            label="Start Time"
            rows="3"
            validation="required|length:0,200"            
          />

          <FormKit
            v-model="form.lateTime"
            type="time"
            label="Late Time"
            validation="required|length:0,200"        
          />      

          <FormKit
            v-model="form.recessEndTime"
            type="time"
            label="Recess End Time"
            validation="required|length:0,200"  
          />

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
