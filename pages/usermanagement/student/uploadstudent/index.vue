<script setup>
  definePageMeta({
    title: "Upload Student",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "FullName",
    "Nric",
    "WalletNumber",
    "SchoolName",
    "Status",
    "Action",
  ]

  const school = [
    { label: "Choose school", value: null },
    { label: "School 1", value: "School 1" },
    { label: "School 2", value: "School 2" },
    { label: "School 3", value: "School 3" }
  ]

  const className = [
    { label: "Choose class", value: null },
    { label: "Class 1", value: "Class 1" },
    { label: "Class 2", value: "Class 2" },
    { label: "Class 3", value: "Class 3" }
  ]

  const data = [
    // {
    //   id: 1,
    //   fullname: "Student 1",
    //   nric: 1200,
    //   walletNo: 340,
    //   status: "Active",
    //   action: "",
    // },
    // {
    //   id: 2,
    //   fullname: "Student 2",
    //   nric: 1200,
    //   walletNo: 340,
    //   status: "Active",
    //   action: "",
    // },
    // {
    //   id: 3,
    //   fullname: "Student 3",
    //   nric: 1200,
    //   walletNo: 340,
    //   status: "Active",
    //   action: "",
    // },
  ]

  const form = ref({
    student_school: "",
    student_class: "",
    student_doc: "",
  });
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- UPLOAD DOC -->
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
              type="file"
              label="Documents"
              accept=".pdf,.doc,.docx,.xml,.md,.csv"
              validation="required|length:0,200"
              v-model="form.student_doc"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Documents <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2 mr-5">
            <FormKit 
              type="select" 
              label="School Name"
              :options="school"
              validation="required|length:0,200"
              v-model="form.student_school"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">School Name <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
          <div class="basis-1/2">
          <FormKit 
            type="select" 
            label="Class"
            :options="className"
            validation="required|length:0,200"
            v-model="form.student_class"
          >
            <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Class <span class="text-danger">*</span></label>
            </template>
          </FormKit>
        </div>
        </div>
      </FormKit>
    </div>
    
  </rs-card>

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >
    <template #header>
      <div class="flex">List of Student</div>
    </template>

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

      <template v-slot:Nric="data" >
        <p class="">
          {{ data.value.nric }}
        </p>
      </template>

      <template v-slot:WalletNumber="data" >
        <p class="">
          {{ data.value.walletNo }}
        </p>
      </template>

      <template v-slot:Status="data" >
        <rs-badge variant="success" v-if="data.value.status == 'Active'">Aktif</rs-badge>
        <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
      </template>

      <template v-slot:Action="data">
        <div class="flex flex-row">
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
      