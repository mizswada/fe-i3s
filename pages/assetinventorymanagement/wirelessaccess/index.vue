<script setup>
  definePageMeta({
    title: "Wireless Access Point Management",
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
    {
      id: 1,
      // model: "AP5",
      serialNo: "E6311015816001740",
      tagNo: "WS/AP/2021/0001",
      location: "SMKCJ",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      // model: "AP5",
      serialNo: "E6311015816001740",
      tagNo: "WS/AP/2021/0001",
      location: "SMKCJ",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      // model: "AP5",
      serialNo: "E6311015816001740",
      tagNo: "WS/AP/2021/0001",
      location: "SMKCJ",
      status: "Active",
      action: "",
    },
  ]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- BUTTON ADD WIRELESS ACCESS -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/assetinventorymanagement/wirelessaccess/add`">
      <rs-button class="mx-5 px-5">
        New Wireless Access Point
      </rs-button>
    </nuxt-link>

    <nuxt-link :to="`/assetinventorymanagement/wirelessaccess/upload`">
      <rs-button class="px-5">
        Excel Upload
      </rs-button>
    </nuxt-link>
  </div> 

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >

    <!-- TABLE LIST WIRELESS ACCESS -->
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

      <!-- <template v-slot:Model="data" >
        <p class="">
          {{ data.value.model }}
        </p>
      </template> -->

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
          <nuxt-link :to="`/assetinventorymanagement/wirelessaccess/edit/(id)`">
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
      