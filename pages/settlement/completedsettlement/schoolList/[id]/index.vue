<script setup>
  definePageMeta({
    title: "List of School",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const paymentDate = useRoute().params.id;
	console.log("paymentDate", paymentDate)

  const field = [
	"School Name",
	"Total Amount (RM)",
	"Total Transaction",
  "Action"
	]

  const {data: getSchoolList} = await useFetch("/api/settlement/completedSettlement/getSchoolList", {
    method: "GET",
    query: {
      payment_date: paymentDate,
    },
  });
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
    <rs-table v-if="getSchoolList.data && getSchoolList.data.length > 0"
        :field="field"
        :data="getSchoolList.data"
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
      <template v-slot:SchoolName="data">
        <p> {{ data.value.school_name }} </p>
      </template>
  
      <template v-slot:TotalAmount(RM)="data">
        <p> {{ data.value.sum }} </p>
      </template>

      <template v-slot:TotalTransaction="data">
        <p> {{ data.value.count }} </p>
      </template>

      <template v-slot:Action="data">
			<nuxt-link :to="`/settlement/completedsettlement/${data.value.payment_date}?param=${data.value.school_id}`">
			  <rs-button class=" mb-3" size="md">Details</rs-button>
			</nuxt-link>
		  </template>

      <!-- <template v-slot:Action="data">
      <nuxt-link :to="{
        name: '/settlement/pendingsettlement/', // Replace with the actual name of your route
        params: {
          payment_date: data.value.payment_date,
          school_id: data.value.school_id
        }
      }">
        <rs-button class="mb-3" size="md">Details</rs-button>
      </nuxt-link>
    </template> -->

  
    </rs-table>
  </rs-card>
  </div>
  </template>
  
      