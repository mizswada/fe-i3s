<script setup>
import { DateTime } from "luxon";
  definePageMeta({
    title: "All Transaction Details",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const formatDate = (dateString) => {
    // return new Date(dateString).toISOString().slice(0, 16);
    return DateTime.fromISO(dateString).toFormat("dd/MM/yyyy");
  };
  const paramID = useRoute().params.id;

  const form = ref({
    transaction_id: "",
    reference_number: "",
    transaction_type_id: "",
    amount: "",
    create_by: "",
    create_at: "",
    status_id: "",
    typ_flag: "",
    update_at: ""
});

const { data } = await useFetch("/api/alltransaction/getAlltransaction", {
  method: "GET",
	query: {
		transaction_id: paramID,
	},
  });
console.log("data", data)
console.log("paramID", paramID)

if (data.value.statusCode == 200) {
  form.value.transaction_id = paramID;
	form.value.reference_number = data.value.data.reference_number;
	form.value.transaction_type_id = data.value.data.transaction_type_id;
	form.value.amount = data.value.data.amount;
	form.value.create_by = data.value.data.create_by;
	form.value.create_at = formatDate(data.value.data.create_at);
	form.value.status_id = data.value.data.status_id;
  form.value.update_at = formatDate(data.value.data.update_at);
	form.value.typ_flag = data.value.data.typ_flag;
} else{
	("Tiada details transaction dengan ID ini")
}

// console.log("form.transaction_type_id", form.value.transaction_type_id)

const { data: getSchoolid } = await useFetch("/api/alltransaction/schoolid/getSchoolid", {
    method: "GET",
  });

const {data: statuslists} = await useFetch("/api/alltransaction/status/getStatus", {
    method: "GET",
  });

  const {data: transactiontype} = await useFetch("/api/alltransaction/transactiontype/getTransactiontype", {
    method: "GET",
  });
</script>


<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >

	<!-- <FormKit type="form" :action="false" @submit="submit" :incomplete-message="false"> -->
  <div>
		<FormKit v-model="form.reference_number" type="textarea" label="Reference Number" disabled/>
    <div v-for="val in transactiontype.data" :key="val.transaction_type_id">
      <FormKit v-if="form.transaction_type_id === val.transaction_type_id" type="textarea" label="Transaction Type" :value="val.transaction_type" disabled/>
    </div>
		<FormKit v-model="form.amount" type="textarea"  label="Amount (RM)" disabled/>
		<FormKit v-model="form.create_by" type="textarea"  label="Username" disabled/>
		<FormKit v-model="form.create_at" type="textarea"  label="Date" disabled/>
    <div v-for="val in statuslists.data" :key="val.status_id">
      <FormKit v-if="form.status_id === val.status_id" type="textarea" label="Status" :value="val.status_code" disabled/>
    </div>
    <FormKit v-model="form.typ_flag" type="textarea" label="Flag" disabled/>
    <div v-for="val in getSchoolid.data" :key="val.reference_number">
      <FormKit v-if="form.reference_number === val.reference_number" type="textarea" label="School Name" :value="val.school_name" disabled/>
    </div>
    <FormKit v-model="form.update_at" type="textarea" label="Updated Date" disabled/>
    <div v-for="val in getSchoolid.data" :key="val.reference_number">
      <FormKit v-if="form.reference_number === val.reference_number" type="textarea" label="Merchant Name" :value="val.company_name" disabled/>
    </div>
    <div v-if="!form.typ_flag">
    <nuxt-link :to="`/alltransactions/adjustment/${paramID}`">
      <rs-button>Adjustment</rs-button>
		</nuxt-link>
    </div>
  </div>
  </rs-card>
  </div>
</template>
      