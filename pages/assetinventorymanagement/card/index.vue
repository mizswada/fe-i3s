<script setup>
  definePageMeta({
    title: "Card Management",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "CardNumber",
    // "UID",
    "Location",
    "Status",
    "Action",
  ]
  const data = [
    {
      id: 1,
      cardNo: "6060050100028161",
      // uid: "6953FDD01",
      location: "HQ",
      status: "Active",
      action: "",
    },
    {
      id: 2,
      cardNo: "6060050100028162",
      // uid: "6953FDD02",
      location: "Office",
      status: "Active",
      action: "",
    },
    {
      id: 3,
      cardNo: "6060050100028163",
      // uid: "6953FDD03",
      location: "School",
      status: "Active",
      action: "",
    },
  ]

  // const { data: cardList } = await useFetch("/api/assetinventory/listasset", {
  //   method: "GET",
  // });
  // console.log("cardList:", cardList.value.data.listcard);
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- BUTTON ADD CARD -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/assetinventorymanagement/card/add`">
      <rs-button class="mx-5 px-5">
        New Card
      </rs-button>
    </nuxt-link>

    <nuxt-link :to="`/assetinventorymanagement/card/upload`">
      <rs-button class="px-5">
        Excel Upload
      </rs-button>
    </nuxt-link>
  </div> 

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >

    <!-- TABLE LIST CARD -->
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

      <template v-slot:CardNumber="data" >
        <p class="">
          {{ data.value.cardNo }}
        </p>
      </template>

      <!-- <template v-slot:UID="data" >
        <p class="">
          {{ data.value.uid }}
        </p>
      </template> -->

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
          <nuxt-link :to="`/assetinventorymanagement/card/edit/(id)`">
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
      