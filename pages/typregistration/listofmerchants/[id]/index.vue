<script setup>
  import { DateTime } from "luxon";
  definePageMeta({
    title: "List of Merchants",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const changedata = ref(false)
  const field = [
    "Id", 
    "CompanyName",
    "FullName", 
    "ICNumber",
    "RegisteredDate",
    "SecretKey",
    "Status",
    "RegisterStatus", 
    "Action"
  ]
  
  // const data = [
  //   {
  //     id: 1,
  //     fullname: "LILY KHALEDA",
  //     nric: 1200,
  //     date: 12/9/2023,
  //     secretkey: 123456789,
  //     status: 1,
  //     regStatus: "Register",
  //   },
  //   {
  //     id: 2,
  //     fullname: "KHAIREEN NAJWA",
  //     nric: 1200,
  //     date: 12/9/2023,
  //     secretkey: 123456789,
  //     status: 1,
  //     regStatus: "Register",
  //   },
  //   {
  //     id: 3,
  //     fullname: "AIMAN MUZZAMIL",
  //     nric: 1200,
  //     date: 12/9/2023,
  //     secretkey: 123456789,
  //     status: 1,
  //     regStatus: "Register",
  //   },
  // ]
  const paramID = useRoute().params.id;
  console.log(paramID);

  const showModalCenter = ref(false);
  const selectUser = ref({});
  const creditlimit = ref(0);

  const {data: merchantsData} = await useFetch("/api/listofusers/listofmerchants", {
    method: "GET",
    query: {
      school_id: paramID,
    },
  });
  console.log(merchantsData.value.data);

  const schoolname = merchantsData.value.data.school_name;
  console.log("school name:",schoolname);

  const totalmerchants = merchantsData.value.data.total_merchants;
  console.log("total merchants:",totalmerchants);

  const registered = merchantsData.value.data.total_register_typ;
  console.log("total register:",registered);

  const unregistered = merchantsData.value.data.total_unregister_typ;
  console.log("total unregister:",unregistered);

  // Define the clickUser function
  const clickUser = async(data) => {
    selectUser.value = data;
    console.log("clickuser:", selectUser.value);
    const typsecretkey = data.value.typ_secret_key;
    
    const detailsData = await useFetch("/api/listofusers/getusertypwalletbalance", {
      method: "GET",
      query: {
        userSecretKey: typsecretkey,
      },
    });

    console.log("details data:", detailsData.data.value.data);

    creditlimit.value = detailsData.data.value.data.creditLimit;
    console.log("credit limit:", creditlimit.value);
  };
  
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
      <!--- First card : to show school's name -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:sharp-person"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{schoolname}} </span
            >
            <span class="text-base font-semibold text-gray-500">School</span>
          </div>
        </div>
      </rs-card>

      <!--- second card : to show user's total register -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:outline-show-chart"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> {{totalmerchants}}</span>
            <span class="text-base font-semibold text-gray-500"
              >Total Merchants</span
            >
          </div>
        </div>
      </rs-card>

      <!--- THIRD card : to show user's credit balance -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon
              class="text-primary"
              name="ic:baseline-account-balance-wallet"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> {{unregistered}}</span>
            <span class="text-base font-semibold text-gray-500"
              >Unregisterd Merchants in toyyibPay</span
            >
          </div>
        </div>
      </rs-card>
    </div>

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <rs-table v-if="merchantsData.data.infoMerchants && merchantsData.data.infoMerchants.length > 0"
        :field="field"
        :data="merchantsData.data.infoMerchants"
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
          <p class="">
            {{ data.value.profile_id }}
          </p>
        </template>

        <template v-slot:CompanyName="data">
          <p class="">
            {{ data.value.company_name }}
          </p>
        </template>

        <template v-slot:FullName="data">
          <p class="">
            {{ data.value.full_name }}
          </p>
        </template>

        <template v-slot:ICNumber="data">
          <p class="">
            {{ data.value.nric }}
          </p>
        </template>

        <template v-slot:RegisteredDate="data">
          <p class="">
            {{ DateTime.fromISO(data.value.create_at).toFormat("dd/MM/yyyy") }}
          </p>
        </template>

        <template v-slot:SecretKey="data">
          <p class="">
            {{ data.value.typ_secret_key }}
          </p>
        </template>

        <template v-slot:Status="data">
          <rs-badge variant="success" v-if="data.value.status_id == '1'">Aktif</rs-badge>
          <rs-badge variant="danger" v-else-if="data.value.status_id == '2'">Tidak Aktif</rs-badge>
        </template>

        <template v-slot:RegisterStatus="data">
          <rs-badge variant="success" v-if="data.value.typ_secret_key !== null && data.value.typ_secret_key !== ''">Registered</rs-badge>
          <rs-badge variant="danger" v-else>Not Registered</rs-badge>
        </template>

        <template v-slot:Action="data">
          <nuxt-link to="">
            <rs-button @click="showModalCenter = true; clickUser(data);">Details</rs-button>
          </nuxt-link>
        </template>
      </rs-table>
      
      <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
      </div>


      <!-- MPDAL DETAILS -->
      <rs-modal title="Merchant Details" position="center" size="lg" v-model="showModalCenter">
        <template #header> 
          <h4>Merchant Details</h4>
        </template>

        <template #body>
          <table class="table-auto">
            <tr>
              <th><p class="text-left">Company Name</p></th>
              <td>: {{selectUser.value.company_name}}</td>
            </tr>
            <tr>
              <th><p class="text-left">Name</p></th>
              <td>: {{selectUser.value.full_name}}</td>
            </tr>
            <tr>
              <th><p class="text-left">IC Number</p></th>
              <td>: {{selectUser.value.nric}}</td>
            </tr>
            <tr>
              <th><p class="text-left">Registered Date</p></th>
              <td>: {{ DateTime.fromISO(selectUser.value.create_at).toFormat("dd/MM/yyyy") }}</td>
            </tr>
            <tr>
              <th><p class="text-left">Status</p></th>
              <td>: 
                <rs-badge variant="success" v-if="selectUser.value.status_id == '1'">Aktif</rs-badge>
                <rs-badge variant="danger" v-else-if="selectUser.value.status_id == '2'">Tidak Aktif</rs-badge>
              </td>
            </tr>
            <tr>
              <th><p class="text-left">Toyyibpay registration status</p></th>
              <td>: 
                <rs-badge variant="success" v-if="selectUser.value.typ_secret_key !== null && selectUser.value.typ_secret_key !== ''">Registered</rs-badge>
                <rs-badge variant="danger" v-else>Not Registered</rs-badge>
              </td>
            </tr>
          </table>
        </template>

        <template #footer> 
          <!-- Custom Footer -->
        </template>
        
      </rs-modal>

      <!-- <rs-button @click="registerStudent = true">Register User</rs-button>
      <rs-modal
        title="Registration Confirmation"
        v-model="registerStudent"
        :ok-callback="clickOk"
      >
        5 students will be registered in toyyibPay.
      </rs-modal> -->
    </rs-card>

  </div>
</template>
      