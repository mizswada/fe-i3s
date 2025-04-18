<script setup>
  definePageMeta({
    title: "Upload Wireless Access Point",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    // "Model",
    "Serial Number",
    "Tag Number",
    "Location",
    "Status",
    "Action",
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
    wireless_doc: "",
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
        <FormKit 
          type="file"
          label="Documents"
          accept=".pdf,.doc,.docx,.xml,.md,.csv"
          validation="required|length:0,200"
          v-model="form.wireless_doc"
        >
          <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Documents <span class="text-danger">*</span></label>
          </template>
        </FormKit>
      </FormKit>
    </div>
    
  </rs-card>

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >
    <template #header>
      <div class="flex">List of Wireless Access Point</div>
    </template>

    <!-- TABLE LIST -->
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
      