<script setup>
  import excelJS from 'exceljs';

  definePageMeta({
    title: "Upload Card",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const fields = [
    "Id",
    "CardNumber",
    "UID",
    "Location",
    "Status",
    "Action",
  ]

  const data = ref([]);
  const field = ref([]);

  const data1 = [
    // {
    //   id: 1,
    //   fullname: "Student 1",
    //   nric: 1200,
    //   walletNo: 340,
    //   status: "Active",
    //   action: "",
    // },
    // {
    //   id: 2,
    //   fullname: "Student 2",
    //   nric: 1200,
    //   walletNo: 340,
    //   status: "Active",
    //   action: "",
    // },
    // {
    //   id: 3,
    //   fullname: "Student 3",
    //   nric: 1200,
    //   walletNo: 340,
    //   status: "Active",
    //   action: "",
    // },
  ]

  const form = ref({
    card_doc: "",
  });

  const uploadFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const buffer = e.target.result;
      const workbook = new excelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const rows = [];
      const headers = [];

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const rowData = [];
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          rowData.push(cell.value !== null ? cell.value : '');
          if (rowNumber === 1) {
            headers.push(cell.value !== null ? cell.value : '' );
          }
        });
        if (rowNumber > 1) {
          rows.push(rowData);
        }
      });

      data.value = rows;
      field.value = headers;
    };
  };

</script>
<template>
  <div>
    <LayoutsBreadcrumb />
  </div>
  
  <!-- UPLOAD DOC -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >

    <div class="p-5">
      <FormKit
        type="form"
        :action="false"
        @submit="submit"
        :incomplete-message="false"
        id="myForm"
      >
        <FormKit 
          type="file"
          label="Documents"
          accept=".xlsx,.csv"
          validation="required|length:0,200"
          v-model="form.card_doc"
          @change="uploadFileChange" 
        >
          <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Documents <span class="text-danger">*</span></label>
          </template>
        </FormKit>
      </FormKit>
    </div>
    
  </rs-card>

  <!--- DATATABLE  -->
  <rs-card
    class="flex-wrap justify-between p-5 bg-white text-black rounded-md flex-col"
  >
    <template #header>
      <div class="flex">List of Card</div>
    </template>

    <!-- TABLE LIST -->
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
    </rs-table>
    <div v-else class="">
      <rs-empty-table :field="fields"></rs-empty-table>        
    </div>
  </rs-card>
</template>
      