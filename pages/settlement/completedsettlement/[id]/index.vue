<script setup>
import { DateTime } from "luxon";
	definePageMeta({
		title: "Completed Settlement",
		middleware: ["auth"],
    	requiresAuth: true,
	});

	const date = useRoute().params.id;
	console.log("date", date)
    const schoolId = useRoute().query.param;
	console.log("schoolId", schoolId)


	const field = [
	"Merchant Name",
	"Amount (RM)",
	"Reference Number",
	"Status",
	"Payment Date"
	]


	const { data: detailsCompletedsettlement } = await useFetch("/api/settlement/detailsCompletedsettlement", {
    method: "GET",
	query: {
		payment_date: date,
		school_id: schoolId,
	},
  });

  console.log("detailsCompletedsettlement", detailsCompletedsettlement)

  const {data: statuslists} = await useFetch("/api/settlement/status/getStatus", {
    method: "GET",
  });
</script>

<template>
<div>
	<LayoutsBreadcrumb />
	<rs-card
		class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
	  >
	<rs-table v-if="detailsCompletedsettlement.data && detailsCompletedsettlement.data.length > 0"
		  :field="field"
		  :data="detailsCompletedsettlement.data"
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
		<template v-slot:MerchantName="data">
			<p> {{ data.value.company_name }} </p>
        </template>

		<template v-slot:Amount="data">
			<p> {{ data.value.net_amount }} </p>
        </template>

		<template v-slot:ReferenceNumber="data">
			<p> {{ data.value.reference_number }} </p>
        </template>

		<template v-slot:Status="data">
			<div v-for="val in statuslists.data" :key="val.status_id">
				<div v-if="data.value.status_id === 2 && val.status_id === 2">
					{{ val.status }}
				</div>
			</div>
        </template>

		<template v-slot:PaymentDate="data">
			<p> {{ DateTime.fromISO(data.value.payment_date).toFormat("dd/MM/yyyy") }} </p>
        </template>

	</rs-table>

	<div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
    </div>
</rs-card>
</div>
</template>
