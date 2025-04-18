<script setup>
  import { DateTime } from "luxon";

  definePageMeta({
    title: "Attendance Schools",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const changedata = ref(false)
  const field = [
    "Id",
    "School",
    "TotalStudent",
    "TotalStudentPresent",
    "TotalStudentAbsent",
    "EmailStatus",
    "Action",
  ]
  // const data = [
  //   {
  //     id: 1,
  //     school: "SMK Seksyen 7, Shah Alam",
  //     total: 1200,
  //     totalPresent: 40,
  //     totalAbsencce: 2,
  //     emailstatus: "Active",
  //     action: "",
  //   },
  //   {
  //     id: 2,
  //     school: "SMK Bandar Putera, Bangi",
  //     total: 2000,
  //     totalPresent: 40,
  //     totalAbsencce: 2,
  //     emailstatus: "Active",
  //     action: "",
  //   },
  //   {
  //     id: 3,
  //     school: "SMK Saujana Impian",
  //     total: 900,
  //     totalPresent: 40,
  //     totalAbsencce: 2,
  //     emailstatus: "Active",
  //     action: "",
  //   },
  // ]

  const entryDate = useRoute().params.id;
  const session = useRoute().query.session;
  const schoolId = useRoute().query.school_id;

  console.log("entryDate", entryDate);
  console.log("sesi", session);
  console.log("schoolId", schoolId);

  const {data: listSchoolsData} = await useFetch("/api/attendance/listofschools", {
    method: "GET",
    query: {
      entry_date: entryDate,
      session_code: session,
    },
  });

  const selectedDate = ref("-");
  const selectedSession = ref("-");
  
  console.log("listSchoolsData length:", listSchoolsData.value.data.length);

  if(listSchoolsData.value.data.length > 0) {
    selectedDate.value = DateTime.fromISO(listSchoolsData.value.data[0].entry_date).toFormat("dd/MM/yyyy");
    console.log("date:", selectedDate.value);

    selectedSession.value = listSchoolsData.value.data[0].session_code;
    console.log("sesi:", selectedSession.value);
  }
  console.log("param:", entryDate);
  console.log("data:", listSchoolsData.value.data);

  const generate = async (schoolId, session) => {
    try {
      const { data } = await useFetch("/api/attendance/generateExcel", {
        method: "GET",
        query: {
          entry_date: entryDate,
          school_id: schoolId,
          session_code: session
      },
    });
    console.log("entryDate", entryDate)
    console.log("session", session)
    console.log("schoolId", schoolId)

    if (data.value.statusCode == 200) {
      alert("Success");
    } else {
      alert("Failed");
    }

    console.log("Excel generated:", data);
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
  };

  const sendEmail = async (schoolId, session) => {
    try {
      const { data } = await useFetch("/api/attendance/sendEmail", {
        method: "GET",
        query: {
          entry_date: entryDate,
          school_id: schoolId,
          session_code: session
      },
    });
    console.log("entryDate", entryDate)
    console.log("session", session)
    console.log("schoolId", schoolId)

    if (data.value.statusCode == 200) {
      alert("Success");
    } else {
      alert("Failed");
    }

    console.log("Email sent:", data);
    } catch (error) {
      console.error("Error send email:", error);
    }
  };

</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
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
              {{ selectedDate }} </span>
            <span class="text-base font-semibold text-gray-500">Selected date</span>
          </div>
        </div>
      </rs-card>
      <!--- Second card : to show session -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:baseline-calendar-today"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ selectedSession }} </span
            >
            <span class="text-base font-semibold text-gray-500">Session</span>
          </div>
        </div>
      </rs-card>
    </div>

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <rs-table v-if="listSchoolsData.data && listSchoolsData.data.length > 0"
        :field="field"
        :data="listSchoolsData.data"
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
            {{ data.value.school_id }}
          </p>
        </template>

        <template v-slot:School="data">
          <p>
            {{ data.value.school_name }}
          </p>
        </template>

        <template v-slot:TotalStudent="data">
          <p>
            {{ data.value.total_students }}
          </p>
        </template>

        <template v-slot:TotalStudentPresent="data">
          <p>
            {{ data.value.total_present_students }}
          </p>
        </template>

        <template v-slot:TotalStudentAbsent="data">
          <p>
            {{ data.value.total_absent_students }}
          </p>
        </template>

        <template v-slot:EmailStatus="data">
          <!-- <rs-badge variant="success">Success</rs-badge> -->
          <!-- <rs-badge>comming soon</rs-badge> -->
          <p> - </p>
        </template>

        <template v-slot:Action="data">
          <div class="grid gap-y-4">
            <nuxt-link :to="`/attendance/listofstudents/${data.value.entry_date}?&session=${data.value.session_code}&school_id=${data.value.school_id}`">
              <rs-button>List of Students</rs-button>
            </nuxt-link>
            <rs-button class="" @click="generate(data.value.school_id, data.value.session_code)">Generate Excel</rs-button>
            <rs-button class="" @click="sendEmail(data.value.school_id, data.value.session_code)">Send Email</rs-button>
          </div>
          
        </template>
      </rs-table>
      
      <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
      </div>

    </rs-card>
  </div>
</template>
      