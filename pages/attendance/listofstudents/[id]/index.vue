<script setup>
  import { DateTime } from "luxon";

  definePageMeta({
    title: "Attendance Students",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const changedata = ref(false)
  const field = [
    "Id", 
    "StudentName",
    "IC",
    "Class",
    "AttendanceStatus",
  ]
  // const data = [
  //   {
  //     id: 1,
  //     fullname: "LILY KHALEDA",
  //     nric: 1200,
  //     class_name: "1BESTARI",
  //     attedStatus: "Hadir",
  //   },
  //   {
  //     id: 2,
  //     fullname: "KHAIREEN NAJWA",
  //     nric: 1200,
  //     class_name: "1BESTARI",
  //     attedStatus: "Hadir",
  //   },
  //   {
  //     id: 3,
  //     fullname: "AIMAN MUZZAMIL",
  //     nric: 1200,
  //     class_name: "1BESTARI",
  //     attedStatus: "Hadir",
  //   },
  // ]

  const date = useRoute().params.id;
  const session = useRoute().query.session;
  const schoolId = useRoute().query.school_id;
  console.log(date);

  const {data: listStudentsData} = await useFetch("/api/attendance/listofstudents", {
    method: "GET",
    query: {
      entry_date: date,
      session_code: session,
      school_id: schoolId,
    },
  });
  console.log("data:",listStudentsData.value.data);

  const selectedDate = listStudentsData.value.data.entry_date;
  console.log("selected date:",selectedDate);

  const selectedSession = listStudentsData.value.data.session_code;
  console.log("selected date:",selectedSession);

  const schoolname = listStudentsData.value.data.school_name;
  console.log("school name:",schoolname);

  const totalstudent = listStudentsData.value.data.total_students;
  console.log("total student:",totalstudent);

  const present = listStudentsData.value.data.total_students_present;
  console.log("total present:",present);

  const absent = listStudentsData.value.data.total_students_absent;
  console.log("total absent:",absent);
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <!--- CARD ROW 1  -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
      <!--- First card : to show today's date -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:baseline-calendar-today"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ DateTime.fromISO(selectedDate).toFormat("dd/MM/yyyy") }} </span>
            <span class="text-base font-semibold text-gray-500">Selected date</span>
          </div>
        </div>
      </rs-card>
      
      <!--- Second card : to show sesi -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:baseline-calendar-today"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ selectedSession }} </span>
            <span class="text-base font-semibold text-gray-500">Session</span>
          </div>
        </div>
      </rs-card>

      <!--- Third card : to show school's name -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-3">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:sharp-person"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> {{ schoolname }} </span>
            <span class="text-base font-semibold text-gray-500">School</span>
          </div>
        </div>
      </rs-card>
    </div>

    <!--- CARD ROW 2  -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
      <!--- 2nd card : to show total students -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:outline-show-chart"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> {{ totalstudent }}</span>
            <span class="text-base font-semibold text-gray-500">Total Students</span>
          </div>
        </div>
      </rs-card>

      <!--- 3rd card : to show total present -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon
              class="text-primary"
              name="ic:sharp-person"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> {{ present }}</span>
            <span class="text-base font-semibold text-gray-500">Total Present</span>
          </div>
        </div>
      </rs-card>

      <!--- 4th card : to show total absence -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:sharp-person"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> {{ absent }}</span>
            <span class="text-base font-semibold text-gray-500">Total Absent</span>
          </div>
        </div>
      </rs-card>
    </div>

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <rs-table v-if="listStudentsData.data.student_list && listStudentsData.data.student_list.length > 0"
        :field="field"
        :data="listStudentsData.data.student_list"
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

        <template v-slot:Id="data">
          <p>
            {{ data.value.student_id }}
          </p>
        </template>

        <template v-slot:StudentName="data">
          <p>
            {{ data.value.full_name }}
          </p>
        </template>

        <template v-slot:IC="data">
          <p>
            {{ data.value.nric }}
          </p>
        </template>

        <template v-slot:Class="data">
          <p>
            {{ data.value.class_name }}
          </p>
        </template>

        <template v-slot:AttendanceStatus="data">
          <p>
            {{ data.value.attendance }}
          </p>
        </template>
      </rs-table>
      
      <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
      </div>
      
    </rs-card>
  </div>
</template>
      