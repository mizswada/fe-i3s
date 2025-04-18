<script setup>
definePageMeta({
  title: "Create Credit Setup",
  middleware: ["auth"],
  requiresAuth: true,
})

const { $swal } = useNuxtApp();

const ownercat = ["HQ", "School"]
const category2 = ["Club", "Merchant"]
const userlist = ["User 1", "User 2", "User 3"]
//const statuslist = ["Active", "Inactive"]
//const statuslist = {
//	1 : "Active",
//	2 : "Inactive"
//};
const selectedCategory = ref(false);

const form = ref({
	title: "",
	description: "",
	amount: "",
	start_date: "",
	end_date: "",
	//category_1: "",
	//owner_id_1: "",
	//category_2: "",
	//owner_id_2: "",
	remarks: "",
	status: "",
	//permalink: "",
	//create_date: "",
	//create_by: "",
	//refno: "",
});

const addCredit = async() => {
    if (form.value.title == "" || form.value.amount == "" || form.value.start_date == "" || form.value.end_date == "" || form.value.status == "") {
      $swal.fire({
        title: "Error",
        text: "Please fill in all form provided",
        icon: "error",
      });
      return;
    }

    try {
      const { data } = await useFetch("/api/creditsetup/createcreditsetup", {
        method: "POST",
        body: {
          title: form.value.title,
          description: form.value.description,
          amount: form.value.amount,
          start_date: form.value.start_date,
          end_date: form.value.end_date,
          //category_1: form.value.category_1,
          //owner_id_1: form.value.owner_id_1,
          //category_2: form.value.category_2,
          //owner_id_2: form.value.owner_id_2,
          remarks: form.value.remarks,
          status: form.value.status,
          //permalink: form.value.permalink,
          //create_date: form.value.create_date,
          //create_by: form.value.create_by,
          //refno: form.value.refno,
        },
      });

      if (data.value.statusCode == 200) {
        // alert("Success");
        $swal.fire({
          title: "Success",
          text: "Successful Create Credit.",
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

    <!---1st card : credit owner-->
    <!-- <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <template #header>
        <div class="flex">Credit Owner</div>
      </template>

      <FormKit
	  type="radio"
	  label="Category"
	  :options="ownercat"
	  v-model="selectedCategory"
	  />

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

    <!---2nd card : credit details-->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >

    <FormKit type="form" :action="false" @submit="addCredit" :incomplete-message="true">
      <section>
        <FormKit v-model="form.title" type="text" label="Credit Title" validation="required|length:0,200" class="w-48">
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Credit Title <span class="text-danger">*</span></label>
        </template>
        </FormKit>
        <FormKit v-model="form.description" type="textarea" label="Credit Description" validation="required|length:0,200" class="w-48">
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Credit Description <span class="text-danger">*</span></label>
          </template>
        </FormKit>
        <FormKit v-model="form.amount" label="Credit Value (RM)" validation="required" class="w-48">
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Credit Value (RM) <span class="text-danger">*</span></label>
        </template>
        </FormKit>
        <FormKit v-model="form.start_date" type="date" :value="startdate" label="Start Date" />
        <FormKit v-model="form.end_date" type="date" :value="enddate" label="End Date" />
        <FormKit v-model="form.remarks" type="textarea" rows="3" label="Remarks" />
        <FormKit v-model="form.status" type="select" name="status_code" label="Status" validation="required">
          <option v-for="option in statuslists.data" :key="option.status_id" :value="option.status_id">
          {{ option.status_code }}
          </option>
        </FormKit>
      </section>
      <!-- <rs-button btn-type="submit" class="w-full" :disabled="processing">
        {{ processing ? "Saving..." : "Save" }}
      </rs-button> -->
    </FormKit>
    </rs-card>
  </div>
</template>
