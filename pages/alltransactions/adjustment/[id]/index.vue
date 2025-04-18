<script setup>
  definePageMeta({
    title: "Adjustment",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const paramID = useRoute().params.id;
  const secretKey = useRoute().query.typ_secret_key;
  const nric = useRoute().query.nric;
  const amount = useRoute().query.amount;

  console.log("paramID", paramID);

  const form = ref({
    transaction_id: "",
    reference_number: "",
    transaction_type_id: "",
    amount: "",
    create_by: "",
    create_at: "",
    status_id: "",
    typ_flag: "",
});

// Function to show the confirmation dialog
// const showConfirmationDialog = () => {
//   // confirm("Confirm?")
//   // Show a confirmation dialog to the user
//   if (confirm("Confirm?")) {
//       // If the user confirms, call the `submit` function to hit the API
//       submit(secretKey, nric, amount);
//     }
// };

const { data: getMerchantname } = await useFetch("/api/alltransaction/schoolid/getSchoolid", {
    method: "GET",
});

console.log("getMerchantname", getMerchantname)

const { data: getUserDetails } = await useFetch("/api/alltransaction/getUserDetails", {
  method: "GET",
    query: {
      transaction_id: paramID,
      typ_secret_key: secretKey,
      nric: nric,
      amount: amount
    },
});
console.log("getUserDetails", getUserDetails);
console.log("paramID", paramID);
console.log("typ_secret_key", secretKey);
console.log("nric", nric);
console.log("amount", amount);

const { data } = await useFetch("/api/alltransaction/getAlltransaction", {
    method: "GET",
    query: {
      transaction_id: paramID,
    },
  });
  console.log("data getAlltransaction", data)
  console.log("paramID", paramID);

  if (data.value.statusCode == 200) {
    form.value.transaction_id = paramID;
    form.value.reference_number = data.value.data.reference_number;
    form.value.transaction_type_id = data.value.data.transaction_type_id;
    form.value.amount = data.value.data.amount;
    form.value.create_by = data.value.data.create_by;
    form.value.create_at = data.value.data.create_at;
    form.value.status_id = data.value.data.status_id;
    form.value.typ_flag = data.value.data.typ_flag;
    // form.value.status = data.value.data.status;
  } else {
	("Tiada details transaction dengan ID ini")
}

const submit = async (secretKey, nric, amount) => {
  // if (form.value.create_by == "" || form.value.amount == "") {
  //   return;
  // }
  // try {
  //   const { data } = await useFetch("/api/alltransaction/transferToOthers", {
  //     method: "GET",
  //     query: {
  //       transaction_id: paramID,
  //       typ_secret_key: secretKey,
  //       nric: nric,
  //       amount: amount
  //     }
  //   });

  //   console.log("paramID", paramID);
  //   console.log("typ_secret_key", secretKey);
  //   console.log("nric", nric);
  //   console.log("amount", amount);

  //   if (data.value.statusCode == 200) {
  //     alert("Success");
  //   } else {
  //     alert("Failed");
  //   }

  //   console.log("Adjustment success!", data);
  // } catch(error) {
  //   console.log("error", error)
  //   return;
  // }

const userConfirmed = confirm("Are you confirm");
  if (userConfirmed) {
    try {
      const response = await useFetch("/api/alltransaction/transferToOthers", {
        method: "GET",
        query: {
          transaction_id: paramID,
          typ_secret_key: secretKey,
          nric: nric,
          amount: amount
        },
      });
      console.log("paramID", paramID);
      console.log("typ_secret_key", secretKey);
      console.log("nric", nric);
      console.log("amount", amount);

      if (response.data.value.statusCode === 200) {
        alert("Success Make Adjustment");
        location.reload();
      } else {
        alert("Failed Make Adjustment");
      }
    } catch (error) {
      console.error("Error", error);
    }
  } else {
    alert("Failed Make Adjustment");
  }
};

</script>


<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >

  <div>
		<FormKit v-model="form.create_by" type="textarea" label="Transfer From" disabled/>
		<FormKit v-model="form.amount" type="textarea"  label="Amount (RM)" disabled/>
    <div v-for="val in getMerchantname.data" :key="val.reference_number">
      <FormKit v-if="form.reference_number === val.reference_number" type="textarea" label="Merchant Name" :value="val.company_name" disabled/>
    </div>
    <div v-for="val in getUserDetails.data">
      <rs-button @click="submit(val.typ_secret_key, val.merchant_nric, val.amount)">Confirm</rs-button>
    </div>
    <!-- <rs-button @click="submit(val.typ_secret_key, val.nric, val.amount)">Confirm</rs-button> -->
  </div>
  </rs-card>
  </div>
</template>
      