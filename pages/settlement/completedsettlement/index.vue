<script setup>
import { DateTime } from "luxon";
	definePageMeta({
		title: "Completed Settlement",
		middleware: ["auth"],
    	requiresAuth: true,
	});

	const field = [
	"Payment Date",
	"Amount (RM)",
	"Total Transaction",
	"Action",
	]

	const { data: completedsettlement } = await useFetch("/api/settlement/completedsettlement", {
		method: "GET",
	});

</script>

<template>
<div>
	<LayoutsBreadcrumb />
	<rs-card
		class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
	  >
	<rs-table
		  v-if="completedsettlement.data && completedsettlement.data.length > 0"
		  :field="field"
		  :data="completedsettlement.data"
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
		<template v-slot:PaymentDate="data">
			<p> {{ DateTime.fromISO(data.value.payment_date).toFormat("dd/MM/yyyy") }} </p>
        </template>

		<template v-slot:Amount="data">
			<p> {{ data.value.net_amount }} </p>
        </template>

		<template v-slot:TotalTransaction="data">
			<p> {{ data.value.report_id }} </p>
        </template>

		<template v-slot:Action="data">
			<nuxt-link :to="`/settlement/completedsettlement/schoolList/${data.value.payment_date}`">
			  <rs-button class=" mb-3" size="md">Details</rs-button>
			</nuxt-link>
		</template>

	</rs-table>
	<div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
    </div>
</rs-card>
</div>
</template>
