<script setup>
definePageMeta({
  title: "Manage Class",
  middleware: ["auth"],
  requiresAuth: true,
});

const data = [
  {
    "Class Name": "3 Melor",
    "Class Shift": "Morning",
    "Action": ""
  },
]
</script>
<template>
  <div>
    <div>
      <div class="flex justify-between">
        <h4 class="mb-4 uppercase">Class Details</h4>
      </div>
      <rs-card class="py-5">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 px-5"
        >
          <div>
            <h5 class="font-semibold">Class</h5>
            <span class="text-sm text-gray-500">
              Below is the list of all class
            </span>
          </div>

          <nuxt-link to="/school/class/add-class">
            <rs-button class="mb-4">
              <Icon name="fe:plus" class="mr-1" />
              Add Class
            </rs-button>
          </nuxt-link>
            
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
              <nuxt-link :to="`/school/class/edit-class/[id]`">
                <rs-button
                  variant="primary"
                >
                  <Icon name="material-symbols:edit-outline" /> 
                </rs-button>
              </nuxt-link>
            </div>
            <div class="flex items-center gap-x-2">
              <nuxt-link :to="`/school/class/attendance/[id]`">
                <rs-button
                  variant="primary"
                >
                  <Icon name="ic:twotone-people" /> 
                </rs-button>
              </nuxt-link>
            </div>
            <div class="flex items-center gap-x-2">
              <nuxt-link :to="``">
                <rs-button
                  variant="danger"
                >
                  <Icon name="material-symbols:delete-outline" /> 
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
