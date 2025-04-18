<script setup>
definePageMeta({
  title: "Credit Setup Details",
  middleware: ["auth"],
  requiresAuth: true,
})

const { $swal } = useNuxtApp();

const ownercat = ["HQ", "School"]
const category2 = ["Club", "Merchant"]
const userlist = ["User 1", "User 2", "User 3"]
// const statuslist = ["Active", "Inactive"]
const selectedCategory = ref(false);

const paramID = useRoute().params.id;

// Method to format the date
// const formatDate = (dateString) => {
//   return new Date(dateString).toISOString().slice(0, 16);
// };

const formatDate = (dateString) => {
  // Convert the dateString to a Date object
  const date = new Date(dateString);
  
  // Extract the components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
  const day = String(date.getDate()).padStart(2, '0');
  
  // Construct the formatted date string
  const formattedDate = `${year}-${month}-${day}`;
  
  return formattedDate;
};

console.log("dateString", formatDate)

const form = ref({
	title: "",
	description: "",
	amount: "",
	start_date: "",
	end_date: "",
	remarks: "",
	status: "",
});

const { data } = await useFetch("/api/creditsetup/getcreditsetup", {
    method: "GET",
    query: {
      credit_setup_id: paramID,
    },
  });
console.log("data", data)
console.log("paramID", paramID)

console.log("formatDate(data.value.data.start_date)", formatDate(data.value.data.start_date))

if (data.value.statusCode == 200) {
	form.value.title = data.value.data.title;
	form.value.description = data.value.data.description;
	form.value.amount = data.value.data.amount;
	form.value.start_date = formatDate(data.value.data.start_date);
	form.value.end_date = formatDate(data.value.data.end_date);
	form.value.remarks = data.value.data.remarks;
	form.value.permalink = data.value.data.permalink;
	form.value.status = data.value.data.status;
} else{
	("Tiada credit setup dengan ID ini")
}

console.log("form.value.title", form.value.title)

const submit = async () => {
    if (form.value.title == "" || form.value.description == "") {
      return;
    }

    try {
      const { data } = await useFetch("/api/creditsetup/editcreditsetup", {
        method: "POST",
        body: {
          credit_setup_id: paramID,
          title: form.value.title,
          description: form.value.description,
          amount: form.value.amount,
          start_date: form.value.start_date,
          end_date: form.value.end_date,
          remarks: form.value.remarks,
          status: form.value.status,
        },
      });

      if (data.value.statusCode == 200) {
        // alert("Success");
        $swal.fire({
          title: "Success",
          text: "Successful Update Credit.",
          icon: "success",
        });
        // window.location.href = '/creditsetup/listcreditsetup';
        navigateTo("/creditsetup/listcreditsetup");
      } else {
        // alert("Failed");
        $swal.fire({
          title: "Error",
          text: "Failed to Create Credit!",
          icon: "error",
        });
      }
    }
      catch(error) {
		console.log("error", error)
        return;
    }
  };

  const {data: statuslists} = await useFetch("/api/status/list", {
    method: "GET",
  });
</script>

<template>
  <div>
    <LayoutsBreadcrumb />


    <!---1st card : credit bill-->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <template #header>
        <div class="flex">Credit Bill</div>
      </template>

	  <FormKit v-model="form.permalink" type="text" disabled/>
    </rs-card>


    <!---2nd card : credit owner-->
    <!-- <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <template #header>
        <div class="flex">Credit Owner</div>
      </template>

      <FormKit type="radio" label="Category" :options="ownercat" v-model="selectedCategory"/>

	  <div v-if="selectedCategory === 'HQ'">
      <FormKit
        type="select"
        label="HQ User"
        :options="userlist"
        help="this only appear when user choose HQ as the category"
      />
	</div>

	<div v-if="selectedCategory === 'School'">
      <FormKit
        type="select"
        label="Category 2"
        :options="category2"
        help="this only appear when user choose School as the category"
      />
      <FormKit
        type="select"
        label="PIC ID"
        :options="userlist"
        help="this only appear when user choose School as the category"
      />
	</div>
    </rs-card> -->

    <!---3rd card : credit details-->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >

	<FormKit type="form" :action="false" @submit="submit" :incomplete-message="true">
		<FormKit v-model="form.title" type="text" label="Credit Title" validation="required" validation-visibility="dirty" class="w-48">
		<template #label>
			<label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Credit Title <span class="text-danger">*</span></label>
		</template>
	    </FormKit>
		<FormKit v-model="form.description" type="textarea" label="Credit Description" rows="2"/>
		<FormKit v-model="form.amount" label="Credit Value (RM)" readonly/>
		<FormKit v-model="form.start_date" type="date" :value="date" label="Start Date" readonly/>
		<FormKit v-model="form.end_date" type="date" :value="date" label="End Date" readonly/>
		<FormKit v-model="form.remarks" type="textarea" rows="3" label="Remarks" />
		<FormKit v-model="form.status" type="select" label="Status">
			<option v-for="option in statuslists.data" :key="option.status_id" :value="option.status_id">
			{{ option.status_code }}
			</option>
		</FormKit>
	</FormKit>
    </rs-card>
  </div>
</template>
