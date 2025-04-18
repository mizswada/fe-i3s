<script setup>
import { DateTime } from "luxon";
	definePageMeta({
		title: "Pending Settlement",
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

	const { data: detailsPendingsettlement } = await useFetch("/api/settlement/detailsPendingsettlement", {
    method: "GET",
	query: {
		payment_date: date,
		school_id: schoolId,
	},
  });

  const {data: statuslists} = await useFetch("/api/settlement/status/getStatus", {
    method: "GET",
  });

  console.log("detailsPendingsettlement", detailsPendingsettlement)

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
	<rs-card
		class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
	  >
	<rs-table v-if="detailsPendingsettlement.data && detailsPendingsettlement.data.length > 0"
		  :field="field"
		  :data="detailsPendingsettlement.data"
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

		<template v-slot:Amount(RM)="data">
			<p> {{ number_format(data.value.net_amount) }} </p>
        </template>

		<template v-slot:ReferenceNumber="data">
			<p> {{ data.value.reference_number }} </p>
        </template>

		<template v-slot:Status="data">
			<div v-for="val in statuslists.data" :key="val.status_id">
				<div v-if="data.value.status_id === 1 && val.status_id === 1">
					{{ val.status }}
				</div>
			</div>
        </template>

		<template v-slot:PaymentDate="data">
			<p> {{ DateTime.fromISO(data.value.payment_date).toFormat("dd/MM/yyyy") }} </p>
        </template>

	</rs-table>
</rs-card>
</div>
</template>
