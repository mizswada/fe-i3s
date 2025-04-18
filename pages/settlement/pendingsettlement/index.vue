<script setup>
import { DateTime } from "luxon";

definePageMeta({
	title: "Pending Settlement",
	middleware: ["auth"],
	requiresAuth: true,
});

const field = [
"Payment Date",
"Amount (RM)",
"Total Transaction",
"Action",
]

const { data: pendingsettlement } = await useFetch("/api/settlement/pendingsettlement", {
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
	<rs-card
		class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
	  >
	<rs-table v-if="pendingsettlement.data && pendingsettlement.data.length > 0"
		  :field="field"
		  :data="pendingsettlement.data"
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
			<p>{{ DateTime.fromISO(data.value.payment_date).toFormat("dd/MM/yyyy") }}</p>
        </template>

		<template v-slot:Amount="data">
			<p> {{ number_format(data.value.net_amount) }} </p>
        </template>

		<template v-slot:TotalTransaction="data">
			<p> {{ data.value.report_id }} </p>
        </template>

		<template v-slot:Action="data">
			<nuxt-link :to="`/settlement/pendingsettlement/schoolList/${data.value.payment_date}`">
			  <rs-button class=" mb-3" size="md">Details</rs-button>
			</nuxt-link>
		</template>

	</rs-table>
	<div v-else>
        <p>No pending settlements available.</p>
    </div>
</rs-card>
</div>
</template>
