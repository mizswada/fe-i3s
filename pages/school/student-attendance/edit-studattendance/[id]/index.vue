<script setup>

definePageMeta({
  title: "Edit Student Attendance",
  middleware: ["auth"],
  requiresAuth: true,
});

const form = ref({
  studentName: "",
  studentAttendance: ""
})

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
              <h5 class="font-semibold">Edit Student Attendance</h5>
              <span class="text-sm text-gray-500">
                  Information about the student attendance
              </span>
              </div>
          </div>

          <FormKit
            v-model="form.studentName"
            type="text"
            label="Student Name"
            validation="required|length:0,200"          
          />

          <FormKit
            v-model="form.studentAttendance"
            type="text"
            label="Student Attendance"
            validation="required|length:0,200"            
          />   
        </rs-card>

      </section>
      <rs-button btn-type="submit" class="w-full" :disabled="processing">
        {{ processing ? "Saving..." : "Save" }}
      </rs-button>
    </FormKit>
  </div>
</template>
