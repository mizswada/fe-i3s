<script setup>
import { DateTime } from "luxon";
  definePageMeta({
    title: " List of Request User Account Deletion",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const field = [
    "Name",
    "Roles",
    "Credit Balance (RM)",
    "Request Date",
    "Action"
  ]  

  const { data: listuser } = await useFetch("/api/accountdeletion/listuser", {
    method: "GET",
  });

  const reject = async () => {
    confirm("Reject the request");
  }

  const accept = async () => {

    const userConfirmed = confirm("Are you confirm");
    if (userConfirmed) {
      // try {
      //   const response = await useFetch("/api/accountdeletion/processAccdel", {
      //     method: "GET",
      //   });
      //   console.log("paramID", paramID);
      //   console.log("typ_secret_key", secretKey);
      //   console.log("nric", nric);
      //   console.log("amount", amount);

      //   if (response.data.value.statusCode === 200) {
      //     alert("Success Make Adjustment");
      //     location.reload();
      //   } else {
      //     alert("Failed Make Adjustment");
      //   }
      // } catch (error) {
      //   console.error("Error", error);
      // }
    } else {
      alert("Failed Make Adjustment");
    }
  };
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <!--- DATATABLE  -->
	  <rs-card
		class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
	  >

		<rs-table v-if="listuser.data && listuser.data.length > 0"
		  :field="field"
		  :data="listuser.data"
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

    <template v-slot:Name="data">
          <p> {{ data.value.full_name }} </p>
    </template>

    <template v-slot:Roles="data">
          <p> {{ data.value.user_type }} </p>
    </template>

		<template v-slot:CreditBalance(RM)="data">
          <p> {{ data.value.account_balance }} </p>
    </template>

		<template v-slot:RequestDate="data">
          <p> {{ DateTime.fromISO(data.value.update_at).toFormat("dd/MM/yyyy") }} </p>
    </template>

		<template v-slot:Action="data">
		<div>
      <rs-button class=" mb-3" size="md" @click="accept">Accept</rs-button>
      <rs-button class=" mb-3" size="md" @click="reject">Reject</rs-button>
    </div>
    </template>
		</rs-table>
	  </rs-card>
  </div>
</template>
      