<script setup>
  definePageMeta({
    title: "Assign Merchant to School",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "SchoolName",
    "SchoolType",
    "State",
    "Status",
    "Action",
  ]

  const school = [
    { label: "Choose school", value: null },
    { label: "School 1", value: "School 1" },
    { label: "School 2", value: "School 2" },
    { label: "School 3", value: "School 3" }
  ]

  const data = [
    {
      id: 1,
      schoolName: "School A",
      schoolType: "Sekolah Jenis Kebangsaan",
      state: "Selangor",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      schoolName: "School B",
      schoolType: "Sekolah Jenis Kebangsaan",
      state: "Selangor",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      schoolName: "School C",
      schoolType: "Sekolah Jenis Kebangsaan",
      state: "Selangor",
      status: "Active",
      action: "",
    },
  ]

  const form = ref({
    school_name: "",
    school_type: "",
    school_state: "",
  });


  function showform(){
    // document.getElementById('relationship').style.display = 'block';
    var x = document.getElementById("relationship");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
    <!--- First card : Merchant Name -->
    <rs-card>
      <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
        <div
          class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
        >
          <Icon class="text-primary" name="material-symbols:person"></Icon>
        </div>
        <div class="flex-1 truncate">
          <span class="block font-semibold text-xl leading-tight">
            Company A </span>
          <span class="text-base font-semibold text-gray-500">Merchant</span>
        </div>
      </div>
    </rs-card>
  </div>

  <!-- BUTTON ADD SCHOOL -->
  <div class="flex justify-end mb-2">
    <rs-button class="mx-5 px-5" @click="showform()">
      New School
    </rs-button>
  </div> 

  <!-- NEW SCHOOL -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
    id="relationship" hidden
  >
    <template #header>
      <div class="flex">New School</div>
    </template>

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
          <div class="basis-1/2 mr-5">
            <!-- <FormKit 
              type="text" 
              label="School Type"
              validation="required|length:0,200"
              v-model="form.school_type"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">School Type <span class="text-danger">*</span></label>
              </template>
            </FormKit> -->
          </div>
          <div class="basis-1/2">
            <!-- <FormKit 
              type="text" 
              label="State"
              validation="required"
              v-model="form.school_state"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">State <span class="text-danger">*</span></label>
              </template>
            </FormKit> -->
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
      <div class="flex">List of School</div>
    </template>

    <!-- TABLE LIST SCHOOL -->
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

      <template v-slot:SchoolName="data" >
        <p class="">
          {{ data.value.schoolName }}
        </p>
      </template>

      <template v-slot:SchoolType="data" >
        <p class="">
          {{ data.value.schoolType }}
        </p>
      </template>

      <template v-slot:State="data" >
        <p class="">
          {{ data.value.state }}
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
      