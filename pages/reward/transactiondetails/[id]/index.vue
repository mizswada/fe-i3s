<script setup>
  import { DateTime } from "luxon";

  definePageMeta({
    title: "Transaction Details",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const paramID = useRoute().params.id;
  const refno = useRoute().query.refno;
  console.log("paramID", paramID)
  // console.log("refno", refno)
  const showModalCenter = ref(false);
  const refNum = ref('');
  const transType = ref('');
  const amount = ref('');
  const status_id = ref('');
  // const selectTrans = ref({
  //   refNum: "",
  //   transType: "",
  //   amount: "",
  //   status_id: ""
  // });

  const field = [
    "Transaction Id",
    "Nric",
    "Full Name",
    "Amount",
    "Status",
    "Action"
	]

  const {data: transdetails} = await useFetch("/api/reward/transactiondetails/transdetails", {
    method: "GET",
    query: {
      reward_id: paramID,
    },
  });

  console.log("transdetails", transdetails)

  const {data: getstatus} = await useFetch("/api/reward/transactiondetails/getstatus", {
    method: "GET",
  });

  const {data: carddetails} = await useFetch("/api/reward/transactiondetails/carddetails", {
    method: "GET",
    query: {
      reward_id: paramID,
    },
  });

  console.log("carddetails", carddetails)
  console.log("statusCode", carddetails.value.statusCode)
  console.log("message", carddetails.value.message)

  const rewardName = carddetails.value.data[0].reward_title;
  console.log("rewardName", rewardName)

  const creditValue = parseFloat(carddetails.value.data[0].amount).toFixed(2);
  const balanceCredit = parseFloat(carddetails.value.data[0].balance_amount).toFixed(2);
  const startDate = carddetails.value.data[0].start_date;
  const endDate = carddetails.value.data[0].end_date;


  const clickTrans = async(refno) => {
    
    try {
      const {data: refdetails} = await useFetch("/api/reward/transactiondetails/refdetails", {
        method: "GET",
        query: {
          reward_id: paramID,
          refno: refno
        },
      });

      console.log("refdetails data:", refdetails);
      console.log("reward_id", paramID);
      console.log("refno", refno);

    if (refdetails) {
      const transData = refdetails.value.data[0];
      console.log("transData", transData);

      if (transData) {
        // Assign the retrieved values to data properties
        refNum.value = transData.reference_number;
        transType.value = transData.transaction_type_id;
        amount.value = parseFloat(transData.amount).toFixed(2);
        status_id.value = transData.status_id;
      } else {
        console.error("No transaction data found.");
      }
    } else {
      console.error("No reference details found.");
    }

      // selectTrans.value = refdetails;
      // console.log("refdetails", selectTrans.value)
      // const transData = selectTrans.value.value.data[0];
      // console.log("selectTrans.value.value.data[0]", transData)
      // console.log("reference_number", selectTrans.value.value.data[0].reference_number)

      // const transData = refdetails.value.data[0];
      // console.log("transData", transData)
      
      // const refNum = transData.reference_number;
      // console.log("reference_number:", refNum);
      // const transType = transData.transaction_type_id;
      // console.log("transType:", transType);
      // const amount = transData.amount;
      // console.log("amount:", amount);
      // const status_id = transData.status_id;
      // console.log("status:", status_id);
    } catch (error) {
      console.log("error", error)
    }
  };

  const {data: getTranstype} = await useFetch("/api/reward/transactiondetails/getTranstype", {
    method: "GET",
  });
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
      <!--- First card : reward name -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="material-symbols:star-rate-rounded"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{rewardName}} </span
            >
            <span class="text-base font-semibold text-gray-500">Reward</span>
          </div>
        </div>
      </rs-card>

      <!--- second card : credit value -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:outline-show-chart"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> RM {{creditValue}}</span>
            <span class="text-base font-semibold text-gray-500"
              >Credit Value</span
            >
          </div>
        </div>
      </rs-card>

      <!--- third card : credit balance -->
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
            <span class="block font-semibold text-xl leading-tight"> RM {{balanceCredit}}</span>
            <span class="text-base font-semibold text-gray-500"
              >Balance Credit</span
            >
          </div>
        </div>
      </rs-card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
      <!--- Forth card : start date -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="dashicons:calendar-alt"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              {{ DateTime.fromISO(startDate).toFormat("dd/MM/yyyy") }} </span>
            <span class="text-base font-semibold text-gray-500">Start Date</span>
          </div>
        </div>
      </rs-card>

      <!--- Fifth card : end date -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="dashicons:calendar-alt"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 
              {{ DateTime.fromISO(endDate).toFormat("dd/MM/yyyy") }}</span>
            <span class="text-base font-semibold text-gray-500"
              >End Date</span
            >
          </div>
        </div>
      </rs-card>
    </div>

    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
    <rs-table v-if="transdetails.data && transdetails.data.length > 0"
        :field="field"
        :data="transdetails.data"
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
      <template v-slot:TransactionId="data">
        <p> {{ data.value.transaction_id }} </p>
      </template>
  
      <template v-slot:Nric="data">
        <p> {{ data.value.nric }} </p>
      </template>

      <template v-slot:FullName="data">
        <p> {{ data.value.full_name }} </p>
      </template>

      <template v-slot:Amount="data">
        <p> {{ data.value.amount }} </p>
      </template>

      <!-- <template v-slot:Status="data">
        <p> {{ data.value.status }} </p>
      </template> -->

      <template v-slot:Status="data">
			<div v-for="val in getstatus.data" :key="val.status_id">
				<div v-if="data.value.status === val.status_id">
					{{ val.status_code }}
				</div>
			</div>
    </template>

      <template v-slot:Action="data">
			<nuxt-link to="">
			  <rs-button class=" mb-3" size="md" @click="showModalCenter = true; clickTrans(data.value.transaction_id); ">Reference</rs-button>
			</nuxt-link>
      
        <!-- <rs-collapse type="card">
          <rs-collapse-item class="text-base" title="Reference Transaction">Collapse Item 1 content</rs-collapse-item>
        </rs-collapse> -->
		  </template>

    </rs-table>

    <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
    </div>

    <!-- MPDAL DETAILS -->
    <rs-modal title="Reference Details" position="center" size="lg" v-model="showModalCenter">
        <template #header> 
          <h4>Reference Transaction Details</h4> 
        </template>

        <template #body> 
          <table class="table-auto">
            <tr>
              <th><p class="text-left">Reference Number </p></th>
              <td>: {{refNum}}</td>
            </tr>
            <tr>
              <th><p class="text-left">Transaction Type </p></th>
              <td> 
                <div v-for="val in getTranstype.data" :key="val.transaction_type_id">
                <div v-if="transType === val.transaction_type_id">: {{ val.transaction_type }}</div>
			          </div></td>
            </tr>
            <tr>
              <th><p class="text-left">Amount </p></th>
              <td>: RM {{amount}}</td>
            </tr>
            <tr>
              <th><p class="text-left">Status </p></th>
              <td>:
                <rs-badge variant="success" v-if="status_id == '200'">Success</rs-badge>
                <rs-badge variant="danger" v-else-if="status_id == '107'">Failed</rs-badge>
                <!-- <div v-for="val in getstatus.data" :key="val.status_id">
                  <rs-badge variant="success" v-if="status_id === val.status_id"> {{val.status_code}}</rs-badge>
			          </div> -->
              </td>
            </tr>
          </table>
        </template>

        <template #footer> 
          <!-- Custom Footer  -->
        </template>
    </rs-modal>

  </rs-card>
  </div>
</template>
      