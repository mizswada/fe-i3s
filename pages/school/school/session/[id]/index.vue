<script setup>
definePageMeta({
  title: "Manage School Session",
  middleware: ["auth"],
  requiresAuth: true,
});

const dataSession = [
  {
    "School Session Code": "Morning",
    "Start Time": "07:15 AM",
    "Late Time": "02:00 PM",
    "Recess End Time": "11:15 AM",
    "Action": ""
  },
]

const dataStaft = [
{
    "Staff Shift Code": "Morning",
    "Start Time": "07:15 AM",
    "End Time": "05:00 PM",
    "Action": ""
  },
]
</script>
<template>
  <rs-tab>
    <rs-tab-item title="School Session"> 
      <div>
        <div>
          <div class="flex justify-between">
            <h4 class="mb-4 uppercase">School Session Details</h4>
          </div>
          <rs-card class="py-5">
            <div
              class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 px-5"
            >
              <div>
                <h5 class="font-semibold">School Session</h5>
                <span class="text-sm text-gray-500">
                  Below is the list of all school session
                </span>
              </div>

              <nuxt-link to="/school/school-session/add-schoolsession">
                <rs-button class="mb-4">
                  <Icon name="fe:plus" class="mr-1" />
                  Add School Session
                </rs-button>
              </nuxt-link>
                
            </div>

            <rs-table
              :data="dataSession"
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
                  <nuxt-link :to="`/school/school-session/edit-schoolsession/[id]]`">
                    <rs-button
                      variant="primary"
                    >
                      <Icon name="material-symbols:edit-outline" /> 
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
    </rs-tab-item>
    <rs-tab-item title="Staft Shift"> 
      <div>
        <div>
          <div class="flex justify-between">
            <h4 class="mb-4 uppercase">Staff Shift Details</h4>
          </div>
          <rs-card class="py-5">
            <div
              class="flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2 px-5"
            >
              <div>
                <h5 class="font-semibold">Staff Shift</h5>
                <span class="text-sm text-gray-500">
                  Below is the list of all Staff Shift
                </span>
              </div>

              <nuxt-link to="/school/staff-shift/add-staffshift">
                <rs-button class="mb-4">
                  <Icon name="fe:plus" class="mr-1" />
                  Add Staff Shift
                </rs-button>
              </nuxt-link>
                
            </div>

            <rs-table
              :data="dataStaft"
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
                  <nuxt-link :to="`/school/staff-shift/edit-staffshift/[id]`">
                    <rs-button
                      variant="primary"
                    >
                      <Icon name="material-symbols:edit-outline" /> 
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
    </rs-tab-item>
  </rs-tab>
    
</template>
