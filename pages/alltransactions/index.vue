<script setup>
import { DateTime } from "luxon";
  definePageMeta({
    title: "All Transactions",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Reference Number",
    "Transaction Type",
    "Amount (RM)",
    "Username",
    "Date",
    "Status",
    "Flag",
    "School Name",
    "Action"
  ]  

  const { data: listAlltransaction } = await useFetch("/api/alltransaction/listAlltransaction", {
    method: "GET",
  });

  const { data: getSchoolid } = await useFetch("/api/alltransaction/schoolid/getSchoolid", {
    method: "GET",
  });

  const {data: statuslists} = await useFetch("/api/alltransaction/status/getStatus", {
    method: "GET",
  });

  const {data: transactiontype} = await useFetch("/api/alltransaction/transactiontype/getTransactiontype", {
    method: "GET",
  });

  function number_format(value) {
    return parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
</script>


<template>
	<div>
	  <LayoutsBreadcrumb />

	  <!--- DATATABLE  -->
	  <rs-card
		class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
	  >

		<rs-table v-if="listAlltransaction.data && listAlltransaction.data.length > 0"
		  :field="field"
		  :data="listAlltransaction.data"
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

    <template v-slot:ReferenceNumber="data">
          <p> {{ data.value.reference_number }} </p>
    </template>

    <!-- <template v-slot:TransactionType="data">
          <p> {{ data.value.transaction_type_id }} </p>
    </template> -->

    <template v-slot:TransactionType="data">
			<div v-for="val in transactiontype.data" :key="val.status_id">
				<div v-if="data.value.transaction_type_id === val.transaction_type_id">
					{{ val.transaction_type }}
				</div>
			</div>
    </template>

		<template v-slot:Amount(RM)="data">
          <p> {{ number_format(data.value.amount) }} </p>
    </template>

		<template v-slot:Username="data">
          <p> {{ data.value.create_by }} </p>
    </template>

		<template v-slot:Date="data">
          <p> {{ DateTime.fromISO(data.value.create_at).toFormat("dd/MM/yyyy") }} </p>
    </template>

		<!-- <template v-slot:Status="data">
		  <rs-badge variant="danger" v-if="data.value.status_id == '101'">Pending</rs-badge>
      <rs-badge variant="success" v-if="data.value.status_id == '200'">Success</rs-badge>
		  <div v-else></div>
    </template> -->

    <template v-slot:Status="data">
			<div v-for="val in statuslists.data" :key="val.status_id">
				<div v-if="data.value.status_id === val.status_id">
					{{ val.status_code }}
				</div>
			</div>
    </template>

    <template v-slot:Flag="data">
      <div v-if="data.value.typ_flag === null || data.value.typ_flag === undefined">-</div>
      <div v-else>{{ data.value.typ_flag }}</div>
    </template>

    <template v-slot:SchoolName="data">
        <div v-for="val in getSchoolid.data" :key="val.reference_number">
				<div v-if="data.value.reference_number === val.reference_number">
					{{ val.school_name }}
				</div>
        <!-- <div v-else-if="val.merchant_id === null || val.merchant_id === undefined">-</div> -->
			</div>
    </template>

		<template v-slot:Action="data">
		<div>
			<nuxt-link :to="`/alltransactions/alltransactionsDetails/${data.value.transaction_id}`">
			  <rs-button class=" mb-3" size="md">Details</rs-button>
			</nuxt-link>
   </div>
		</template>
		</rs-table>
    <div v-else class="">
      <rs-empty-table :field="field"></rs-empty-table>        
    </div>
	  </rs-card>
	</div>
</template>
      