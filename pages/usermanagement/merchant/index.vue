<script setup>
  definePageMeta({
    title: "Merchant Management",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "CompanyName",
    "OwnerName",
    "Status",
    "Action",
  ]
  const data = [
    {
      id: 1,
      companyName: "Company A",
      ownerName: "Yusuf",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      companyName: "Company B",
      ownerName: "Zarif",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      companyName: "Company C",
      ownerName: "Shella",
      status: "Active",
      action: "",
    },
  ]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- BUTTON ADD MERCHANT -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/usermanagement/merchant/addmerchant`">
      <rs-button class="mx-5 px-5">
        New Merchant
      </rs-button>
    </nuxt-link>
  </div>

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >  

    <!-- TABLE LIST MERCHANT -->
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

      <template v-slot:CompanyName="data" >
        <p class="">
          {{ data.value.companyName }}
        </p>
      </template>

      <template v-slot:OwnerName="data" >
        <p class="">
          {{ data.value.ownerName }}
        </p>
      </template>

      <template v-slot:Status="data" >
          <rs-badge variant="success" v-if="data.value.status == 'Active'">Aktif</rs-badge>
          <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
      </template>

      <template v-slot:Action="data">
        <div class="flex flex-row">
          <nuxt-link :to="`/usermanagement/merchant/editmerchant/(id)`">
            <rs-button>
              <Icon name="material-symbols:edit-outline"></Icon>
            </rs-button>
          </nuxt-link>
          <nuxt-link :to="`/usermanagement/merchant/assignschool/(id)`" class="ml-2">
            <rs-button>
              <Icon name="teenyicons:school-outline"></Icon>
            </rs-button>
          </nuxt-link>
          <nuxt-link :to="`/usermanagement/merchant/assignterminal/(id)`" class="ml-2">
            <rs-button>
              <Icon name="material-symbols:dock-outline"></Icon>
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
      