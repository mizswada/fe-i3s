<script setup>
  definePageMeta({
    title: "Switch Management",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "Serial Number",
    "Tag Number",
    "SchoolName",
    "NetworkServiceProvider",
    "SimCardSerialNumber",
    "Location",
    "Status",
    "Action",
  ]
  const data = [
    {
      id: 1,
      serialNo: "S36Y3H3000135",
      tagNo: "WS/NE/2021/0001",
      schoolName: "-",
      nsp: "",
      scsn: "S36Y3H3000135",
      location: "HQ",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      serialNo: "S36Y3H3000135",
      tagNo: "WS/NE/2021/0001",
      schoolName: "SMKCJ",
      nsp: "",
      scsn: "S36Y3H3000135",
      location: "Office",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      serialNo: "S36Y3H3000135",
      tagNo: "WS/NE/2021/0001",
      schoolName: "SMKCJ",
      nsp: "",
      scsn: "S36Y3H3000135",
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

  <!-- BUTTON ADD SWITCH -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/assetinventorymanagement/switch/add`">
      <rs-button class="mx-5 px-5">
        New Switch
      </rs-button>
    </nuxt-link>

    <nuxt-link :to="`/assetinventorymanagement/switch/upload`">
      <rs-button class="px-5">
        Excel Upload
      </rs-button>
    </nuxt-link>
  </div> 

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >

    <!-- TABLE LIST SWITCH -->
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

      <template v-slot:SchoolName="data" >
        <p class="">
          {{ data.value.schoolName }}
        </p>
      </template>

      <template v-slot:NetwordServiceProvider="data" >
        <p class="">
          {{ data.value.nsp }}
        </p>
      </template>

      <template v-slot:SimCardSerialNumber="data" >
        <p class="">
          {{ data.value.scsn }}
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
          <nuxt-link :to="`/assetinventorymanagement/switch/edit/(id)`">
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
      