<script setup>
  definePageMeta({
    title: "List of Roles",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const changedata = ref(false)
  const field = [
    //"Id",
    //"SchoolName",
    "Roles",
    "RegisteredNumber",
    "UnregisteredNumber",
    "Action",
  ]

  const schoolID = useRoute().params.id;

  const {data: listroles} = await useFetch("/api/listofusers/listofroles", {
    method: "GET",
    query: {
      school_id: schoolID,
    },
  });

  console.log(schoolID);
  console.log("Data length:", listroles.value.data.length);
  console.log("listroles:",listroles.value.data);

  const schoolname = listroles.value.data.school_name;
  console.log("school name:",schoolname);

  
  
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <div>
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:sharp-person"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ schoolname }}</span
            >
            <span class="text-base font-semibold text-gray-500">School</span>
          </div>
        </div>
      </rs-card>
    </div>

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >  

      <rs-table v-if="listroles.data.listRoles && listroles.data.listRoles.length > 0"
        :field="field"
        :data="listroles.data.listRoles"
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
        <!-- <template v-slot:Id="data">
          <p class="">
            {{ data.value.school_id }}
          </p>
        </template>

        <template v-slot:SchoolName="data">
          <p class="">
            {{ data.value.school_name }}
          </p>
        </template> -->

        <template v-slot:Roles="data">
          <p class="">
            {{ data.value.roles }}
          </p>
        </template>

        <template v-slot:RegisteredNumber="data">
          <p class="">
            {{ data.value.total_register_typ }}
          </p>
        </template>

        <template v-slot:UnregisteredNumber="data">
          <p class="">
            {{ data.value.total_unregister_typ }}
          </p>
        </template>

        <template v-slot:Action="data">
          <nuxt-link v-if="data.value.roles == 'Student'" :to="`/typregistration/listofstudents/${data.value.school_id}`">
            <rs-button>List of Students</rs-button>
          </nuxt-link>
          <nuxt-link v-else-if="data.value.roles == 'Merchant'" :to="`/typregistration/listofmerchants/${data.value.school_id}`">
            <rs-button>List of Merchants</rs-button>
          </nuxt-link>
          <nuxt-link v-else-if="data.value.roles == 'Staff'" :to="`/typregistration/listofstaffs/${data.value.school_id}`">
            <rs-button>List of Staffs</rs-button>
          </nuxt-link>
        </template>

      </rs-table>

      <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
      </div>

    </rs-card>

  </div>
</template>
      