<script setup>
  definePageMeta({
    title: "Assign Staff to Class",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "ClassName",
    "Status",
    "Action",
  ]

  const className = [
    { label: "Choose class", value: null },
    { label: "Class 1", value: "Class 1" },
    { label: "Class 2", value: "Class 2" },
    { label: "Class 3", value: "Class 3" }
  ]

  const data = [
    {
      id: 1,
      className: "Class 1",
      status: "Active",
      action: "",
    },
  ]

  const form = ref({
    class_name: "",
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
    <!--- First card : Staff Name -->
    <rs-card>
      <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
        <div
          class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
        >
          <Icon class="text-primary" name="material-symbols:person"></Icon>
        </div>
        <div class="flex-1 truncate">
          <span class="block font-semibold text-xl leading-tight">
            AZLIN MAZLAN </span>
          <span class="text-base font-semibold text-gray-500">Staff</span>
        </div>
      </div>
    </rs-card>
  </div>

  <!-- BUTTON ADD CLASS -->
  <!-- <div class="flex justify-end mb-2">
    <rs-button class="mx-5 px-5" @click="showform()">
      New Class
    </rs-button>
  </div>  -->

  <!-- NEW CLASS -->
  <!-- <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
    id="relationship" hidden
  >
    <template #header>
      <div class="flex">New Class</div>
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
          <div class="basis-1/3 mr-5">
            <FormKit 
              type="select" 
              label="Class Name"
              :options="className"
              validation="required|length:0,200"
              v-model="form.class_name"
            >
              <template #label>
              <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Guardian Name <span class="text-danger">*</span></label>
              </template>
            </FormKit>
          </div>
        </div>
      </FormKit>
    </div>
    
  </rs-card> -->

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >
    <template #header>
      <div class="flex">List of Class</div>
    </template>

    <!-- TABLE LIST CLASS -->
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

      <template v-slot:GuardianName="data" >
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
      