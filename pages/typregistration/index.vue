<script setup>
  definePageMeta({
    title: "List of Schools",
    middleware: ["auth"],
    requiresAuth: true,
  })

  const changedata = ref(false)
  const field = [
    "Id",
    "School",
    "Total Student",
    "Registered Students",
    "Unregistered Students",
    "Action",
  ]
  // const data = [
  //   {
  //     id: 1,
  //     school: "SMK Seksyen 7, Shah Alam",
  //     total: 1200,
  //     unregsiter: 340,
  //     status: "Active",
  //     action: "",
  //   },
  //   {
  //     id: 2,
  //     school: "SMK Bandar Putera, Bangi",
  //     total: 2000,
  //     unregsiter: 1120,
  //     status: "Active",
  //     action: "",
  //   },
  //   {
  //     id: 3,
  //     school: "SMK Saujana Impian",
  //     total: 900,
  //     unregsiter: 440,
  //     status: "Active",
  //     action: "",
  //   },
  // ]

  const {data: listSchoolData} = await useFetch("/api/listofusers/listofschools", {
    method: "GET",
  });
  console.log("list school:", listSchoolData.value.data);
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <rs-table v-if="listSchoolData.data && listSchoolData.data.length > 0"
        :field="field"
        :data="listSchoolData.data"
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
      <template v-slot:id="data" >
          <p class="">
            {{ data.value.school_id }}
          </p>
        </template>

        <template v-slot:school="data" >
          <p class="">
            {{ data.value.school_name }}
          </p>
        </template>

        <template v-slot:totalStudent="data" >
          <p class="">
            {{ data.value.total_students }}
          </p>
        </template>

        <template v-slot:registeredStudents="data" >
          <p class="">
            {{ data.value.total_register_typ }}
          </p>
        </template>

        <template v-slot:unregisteredStudents="data" >
          <p class="">
            {{ data.value.total_unregister_typ }}
          </p>
        </template>

        <template v-slot:Action="data">
          <nuxt-link :to="`/typregistration/listofroles/${data.value.school_id}`">
            <rs-button>List of Roles</rs-button>
          </nuxt-link>
        </template>

      </rs-table>
      <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
      </div>
    </rs-card>
  </div>
</template>
