<script setup>
  definePageMeta({
    title: "POS Terminal Management",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "Model",
    "Serial Number",
    "Tag Number",
    "Location",
    "Status",
    "Action",
  ]
  const data = [
    {
      id: 1,
      model: "PT7003",
      serialNo: "201708010100186",
      tagNo: "PT/2017/STG/002",
      location: "HQ",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      model: "PT7003",
      serialNo: "201708010100186",
      tagNo: "PT/2017/STG/002",
      location: "Office",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      model: "PT7003",
      serialNo: "201708010100186",
      tagNo: "PT/2017/STG/002",
      location: "School",
      status: "Active",
      action: "",
    },
  ]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- BUTTON ADD POST TERMINAL -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/assetinventorymanagement/postterminal/add`">
      <rs-button class="mx-5 px-5">
        New POS Terminal
      </rs-button>
    </nuxt-link>

    <nuxt-link :to="`/assetinventorymanagement/postterminal/upload`">
      <rs-button class="px-5">
        Excel Upload
      </rs-button>
    </nuxt-link>
  </div> 

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >

    <!-- TABLE LIST POST TERMINAL -->
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

      <template v-slot:Model="data" >
        <p class="">
          {{ data.value.model }}
        </p>
      </template>

      <template v-slot:SerialNumber="data" >
        <p class="">
          {{ data.value.serialNo }}
        </p>
      </template>

      <template v-slot:TagNumber="data" >
        <p class="">
          {{ data.value.tagNo }}
        </p>
      </template>

      <template v-slot:Location="data" >
        <p class="">
          {{ data.value.location }}
        </p>
      </template>

      <template v-slot:Status="data" >
        <rs-badge variant="success" v-if="data.value.status == 'Active'">Aktif</rs-badge>
        <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
      </template>

      <template v-slot:Action="data">
        <div class="flex flex-row">
          <nuxt-link :to="`/assetinventorymanagement/postterminal/edit/(id)`">
            <rs-button>
              <Icon name="material-symbols:edit-outline"></Icon>
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
      