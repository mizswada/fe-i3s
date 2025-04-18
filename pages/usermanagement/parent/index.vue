<script setup>
  definePageMeta({
    title: "Parent",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Id",
    "FullName",
    "NRIC",
    "WalletNumber",
    "Status",
    "Action",
  ]
  const data = [
    {
      id: 1,
      parentFullname: "Parent 1",
      parentIC: 1200,
      parentWalletNo: 340,
      status: "Active",
      action: "",
    },
    {
      id: 2,
      parentFullname: "Parent 2",
      parentIC: 1200,
      parentWalletNo: 340,
      status: "Active",
      action: "",
    },
    {
      id: 3,
      parentFullname: "Parent 3",
      parentIC: 1200,
      parentWalletNo: 340,
      status: "Active",
      action: "",
    },
  ]
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>

  <!-- BUTTON ADD PARENT -->
  <div class="flex justify-end mb-2">
    <nuxt-link :to="`/usermanagement/parent/addparent`">
      <rs-button class="mx-5 px-5">
        New Parent
      </rs-button>
    </nuxt-link>
  </div>

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >  

    <!-- TABLE LIST PARENT -->
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
          {{ data.value.parentFullname }}
        </p>
      </template>

      <template v-slot:NRIC="data" >
        <p class="">
          {{ data.value.parentIC }}
        </p>
      </template>

      <template v-slot:WalletNumber="data" >
        <p class="">
          {{ data.value.parentWalletNo }}
        </p>
      </template>

      <template v-slot:Status="data" >
          <rs-badge variant="success" v-if="data.value.status == 'Active'">Aktif</rs-badge>
          <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
      </template>

      <template v-slot:Action="data">
        <div class="flex flex-row">
          <nuxt-link :to="`/usermanagement/parent/editparent/(id)`">
              <rs-button>
                  <Icon name="material-symbols:edit-outline"></Icon>
              </rs-button>
          </nuxt-link>
          <nuxt-link :to="`/usermanagement/parent/assignstudent/(id)`" class="ml-2">
              <rs-button>
                  <Icon name="ic:sharp-people-alt"></Icon>
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
      