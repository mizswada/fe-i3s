<script setup>
import { DateTime } from "luxon";
definePageMeta({
  title: "List of Credit Setup",
  middleware: ["auth"],
  requiresAuth: true,
})

const field = [
  "Id",
  "Amount (RM)",
  "Permalink",
  "Start Date",
  "End Date",
  "Status",
  "Action",
]

// function - copy permalink
function copyUrl(permalink) {
	navigator.clipboard.writeText(permalink)
    .then(() => {
      alert("Copied the link: " + permalink);
    })
    .catch((error) => {
      console.error("Copy failed:", error);
    });
}

function displayPopup() {
	alert("Transaction ID not available. Cannot proceed with Receipt. Please make payment first.");
}

const { data: creditList } = await useFetch("/api/creditsetup/listcreditsetup", {
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
		<nuxt-link :to="`/creditsetup/createcreditsetup`">
			  <rs-button>New Credit Setup</rs-button>
		</nuxt-link>


		<rs-table v-if="creditList.data && creditList.data.length > 0"
		  :field="field"
		  :data="creditList.data"
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

		<template v-slot:Amount(RM)="data">
          <p> {{ number_format(data.value.amount) }} </p>
        </template>

		<template v-slot:Permalink="data">
          <p> {{ data.value.permalink }} </p>
		  <button @click="() => copyUrl(data.value.permalink)"><icon class="h-5 w-5 hover:text-rose-500" name="mingcute:copy-2-line"></icon></button>
        </template>

		<template v-slot:StartDate="data">
          <p> {{ DateTime.fromISO(data.value.start_date).toFormat("dd/MM/yyyy") }} </p>
        </template>

		<template v-slot:EndDate="data">
          <p> {{ DateTime.fromISO(data.value.end_date).toFormat("dd/MM/yyyy") }} </p>
        </template>

		<template v-slot:Status="data">
		  <rs-badge variant="success" v-if="data.value.status == '1'">Aktif</rs-badge>
          <rs-badge variant="danger" v-if="data.value.status == '2'">Tidak Aktif</rs-badge>
		  <div v-else></div>
        </template>

		<template v-slot:Action="data">
		<div>
			<nuxt-link :to="`/creditsetup/creditsetupdetails/${data.value.credit_setup_id}`">
			  <rs-button class=" mb-3" size="md">Details</rs-button>
			</nuxt-link>
			<template v-if="data.value.transaction_id">
			<nuxt-link :to="`/creditreceipt?order_id=${data.value.refno}`" target="_blank">
				<rs-button size="md">Receipt</rs-button>
			</nuxt-link>
			</template>
			<template v-else>
				<rs-button size="md" @click="displayPopup">Receipt</rs-button>
			</template>
		</div>

		</template>
		</rs-table>
		<!-- <div v-else>
          <div class="flex justify-center text-primary/40 pt-5">
            <div class="text-center">
              <h5 class="font-semibold">No Credit Setup</h5>
              <span class="text-sm text-gray-500">
                There is no credit yet
              </span>
            </div>
          </div>
        </div> -->
		<div v-else class="">
			<rs-empty-table :field="field"></rs-empty-table>        
		</div>
	  </rs-card>
	</div>
  </template>