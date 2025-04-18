<script setup>
definePageMeta({
  title: "Manage Student Attendance",
  middleware: ["auth"],
  requiresAuth: true,
});

const data = [
  {
    "Student Name": "Arif Aiman",
    "Attendance": "Hadir",
    "Action": ""
  },
]
</script>
<template>
  <div>
    <div>
      <div class="flex justify-between">
        <h4 class="mb-4 uppercase">Student Attendance Details</h4>
      </div>
      <rs-card class="py-5">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 px-5"
        >
          <div>
            <h5 class="font-semibold">Student Attendance</h5>
            <span class="text-sm text-gray-500">
              Below is the list of all student attendance
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
              <nuxt-link :to="`/school/student-attendance/edit-studattendance/[id]`">
                <rs-button
                  variant="primary"
                >
                  <Icon name="gg:details-more" /> 
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
