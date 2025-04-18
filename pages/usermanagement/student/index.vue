<script setup>
  definePageMeta({
    title: "Student",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "FullName",
    "NRIC",
    "WalletNumber",
    "SchoolName",
    "Status",
    "Action",
  ]
  const data = [
    {
      id: 1,
      fullname: "Student 1",
      nric: 1200,
      walletNo: 340,
      schoolName: "SMKCJ",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      fullname: "Student 2",
      nric: 1200,
      walletNo: 340,
      schoolName: "SMKCJ",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      fullname: "Student 3",
      nric: 1200,
      walletNo: 340,
      schoolName: "SMKCJ",
      status: "Active",
      action: "",
    },
  ]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- BUTTON ADD STUDENT -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/usermanagement/student/addstudent`">
      <rs-button class="mx-5 px-5">
        New Student
      </rs-button>
    </nuxt-link>

    <nuxt-link :to="`/usermanagement/student/uploadstudent`">
      <rs-button class="px-5">
        Excel Upload
      </rs-button>
    </nuxt-link>
  </div> 

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >

    <!-- TABLE LIST STUDENT -->
    <rs-table v-if="data && data.length > 0"
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
    <template v-slot:Id="data" >
        <p class="">
          {{ data.value.id }}
        </p>
      </template>

      <template v-slot:FullName="data" >
        <p class="">
          {{ data.value.fullname }}
        </p>
      </template>

      <template v-slot:NRIC="data" >
        <p class="">
          {{ data.value.nric }}
        </p>
      </template>

      <template v-slot:WalletNumber="data" >
        <p class="">
          {{ data.value.walletNo }}
        </p>
      </template>

      <template v-slot:SchoolName="data" >
        <p class="">
          {{ data.value.schoolName }}
        </p>
      </template>

      <template v-slot:Status="data" >
        <rs-badge variant="success" v-if="data.value.status == 'Active'">Aktif</rs-badge>
        <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
      </template>

      <template v-slot:Action="data">
        <div class="flex flex-row">
          <nuxt-link :to="`/usermanagement/student/editstudent/(id)`">
            <rs-button>
              <Icon name="material-symbols:edit-outline"></Icon>
            </rs-button>
          </nuxt-link>
          <nuxt-link :to="`/usermanagement/student/assignclass/(id)`" class="ml-2">
            <rs-button>
              <Icon name="ic:baseline-class"></Icon>
            </rs-button>
          </nuxt-link>
          <nuxt-link :to="``" class="ml-2">
            <rs-button variant="danger">
              <Icon name="material-symbols:delete-outline"></Icon>
            </rs-button>
          </nuxt-link>
        </div>  
        
      </template>

    </rs-table>
    <div v-else class="">
      <rs-empty-table :field="field"></rs-empty-table>        
    </div>
  </rs-card>
</template>
      