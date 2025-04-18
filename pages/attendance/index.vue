<script setup>
  import { DateTime } from "luxon";

  definePageMeta({
    title: "Attendance Date",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const changedata = ref(false)
  const field = [
    //"Day",
    "Date",
    "Sesion",
    "Action",
  ]
  // const data = [
  //   {
  //     id: 1,
  //     date: "11/9/2023",
  //     action: "",
  //   },
  //   {
  //     id: 2,
  //     date: "12/9/2023",
  //     action: "",
  //   },
  //   {
  //     id: 3,
  //     date: "13/9/2023",
  //     action: "",
  //   },
  // ]
  
  const {data: listDateData} = await useFetch("/api/attendance/attendancedate", {
    method: "GET",
  });

  


</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <rs-table 
        :field="field"
        :data="listDateData.data"
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

        <template v-slot:Date="data">
          <p>
            {{ DateTime.fromISO(data.value.distinct_date).toFormat("dd/MM/yyyy") }}
          </p>
        </template>

        <template v-slot:Session="data">
          <p>
            {{ data.value.session_code }}
          </p>
        </template>

        <template v-slot:Action="data">
          <nuxt-link :to="`/attendance/listofschools/${data.value.distinct_date}?session=${data.value.session_code}`">
            <rs-button>Details</rs-button>
          </nuxt-link>
        </template>
      </rs-table>
      
    </rs-card>
  </div>
</template>
      