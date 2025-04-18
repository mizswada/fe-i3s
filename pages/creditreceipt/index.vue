<script setup>

import { DateTime } from "luxon"

definePageMeta({
	title: "Credit Receipt",
	layout: "empty",
  middleware: ["auth"],
  requiresAuth: true,
});

const statusId = useRoute().query.status_id;
const billcode = useRoute().query.billcode;
const orderId = useRoute().query.order_id;
const msg = useRoute().query.msg;
const transactionId = useRoute().query.transaction_id;
const fpxId = useRoute().query.fpx_transaction_id;
const paymentAmount = useRoute().query.amount;
const paramID = useRoute().params.id;

const currentDate = DateTime.now();
const datetime = currentDate.toFormat("yyyy-MM-dd HH:mm:ss")

const form = ref({
	total_amount: "",
	title: "",
	transaction_id: "",
	fpx_transaction_id: ""
});

const { data } = await useFetch("/api/toyyibpay/getpaymentdetails", {
    method: "GET",
    query: {
      refno: orderId,
	},
  });
console.log("orderId", orderId)
console.log("data", data)

if(data.value.statusCode == 200){
	form.value.total_amount = data.value.data.total_amount;
	form.value.title = data.value.data.title;
	form.value.transaction_id = data.value.data.transaction_id;
	form.value.fpx_transaction_id = data.value.data.fpx_transaction_id;
} else {
	alert("failed get bill data");
}

console.log("amount", form.value.total_amount)
console.log("title", form.value.title)

//// Generate the Resit Number
//function generateResitNumber() {
//	const currentDate = moment().format("YYMMDDHms");
//	const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number

//	const autoNumber = `{currentDate}${randomDigits}`;
//	return autoNumber;
//}

</script>

<template>
    <div class="p-10 bg-white">
	  <!-- <h5 class="text-center text-blue text-4xl">i3S</h5> -->
      <div class="flex flex-auto gap-3 justify-center items-center">
        <img
          class="h-14 block"
          src="@/assets/img/logo/i3s_logo.png"
          alt=""
        />
      </div>
      <h5 class="text-center text-blue-800 font-bold mt-5">Payment Success!</h5>
      <h5 class="text-center font-bold mt-5 text-green-600">
        2022022316581256567878
      </h5>
      <h6 class="text-gray-400 font-medium text-center mt-2">Receipt Number</h6>
      <hr class="border-t-2 border-gray-200 my-8" />
      <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>Transaction No</div>
        <div class="text-blue-800 font-bold">{{ form.transaction_id }}</div>
	  </h5>
      <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>FPX No</div>
        <div class="text-blue-800 font-bold">{{ form.fpx_transaction_id }}</div>
	  </h5>
      <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>Reference No</div>
        <div class="text-green-600 font-bold">{{ orderId }}</div>
      </h5>
	  <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>Total Payment</div>
        <div class="text-green-600 font-bold">RM {{ form.total_amount }}</div>
      </h5>
	  <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>Payment For</div>
        <div class="text-blue-800 font-bold">{{ form.title }}</div>
      </h5>
      <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>Date & Time</div>
        <div class="text-blue-800 font-bold">{{ datetime }}</div>
      </h5>
      <h5 class="text-blue-500 font-normal flex justify-between mb-3">
        <div>Payment Method</div>
        <div class="text-blue-800 font-bold">Online Banking</div>
      </h5>
      <hr class="border-t-2 border-gray-200 my-8" />
      <div class="mt-50 mb-10 flex justify-around">
        <rs-button class="font-bold text-md rounded-3xl" variant="info">
          <Icon name="material-symbols:download"></Icon>Download
          Receipt</rs-button>
        <rs-button class="font-bold text-md rounded-3xl" variant="info">
          <Icon name="material-symbols:share"></Icon>Share Receipt</rs-button>
      </div>
    </div>
  <!--</div>-->
</template>

