<script setup>
  import { DateTime } from "luxon"

  definePageMeta({
    title: "Create Reward",
    middleware: ["auth"],
    requiresAuth: true,
  })

  const { $swal } = useNuxtApp();

  const dt = DateTime.now()
  const date = dt.toISODate()
  const datetime = dt.toFormat("yyyy-MM-dd'T'HH:mm")
  const month = dt.toFormat("yyyy-MM")
  const time = dt.toFormat("HH:mm")
  const week = dt.toFormat("yyyy-'W'kk")

  const ownercat = ["HQ", "School"]
  const category2 = ["Club", "Merchant"]
  const userlist = ["User 1", "User 2", "User 3"]
  
  const rewardtype = [
    { label: "RM", value: "RM" },
    { label: "%", value: "Percentage" },
  ]

  const applytolist = [
    { label: "Select apply to", value: "" },
    { label: "Topup", value: "Topup" },
    { label: "Online Transaction", value: "Online Transaction"},
    { label: "Terminal Payment", value: "Terminal Payment"},
  ]

  const programlists = [
    { label: "Select Program", value: "" },
    { label: "Credit", value: "Credit" },
    { label: "Voucher", value: "Voucher", attrs:{ disabled: true }},
    { label: "Produk", value: "Produk", attrs:{ disabled: true }},
  ]

  const category = [
    { label: "Open", value: "Open" },
    { label: "School", value: "School" },
  ]

  const cronjobdays = [
    "None",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const cronjobtype = [
    { label: "Time", value: "time" },
    { label: "Frequency", value: "frequency" },
  ]

  const frequencytype = [
    { label: "Hour", value: "Hour" },
    { label: "Minute", value: "Minute" },
  ]
  
  const form = ref({
    reward_title: "",
    reward_description: "",
    reward_type: "",
    reward_value: "",
    program_type: "",
    program_reference_id: "",
    reward_cycle: "",
    apply_to: "",
    start_date: "",
    end_date: "",
    min_value: "",
		max_value: "",
    cap_value: "",
    limit_per_user: "",
    status: "",
    cronjob_cycle: [],
    cyclesString: "",
    cronjob_type: "",
    cronjob_time: "",
    cronjob_frequency_value: "",
    cronjob_frequency_type: "",
    cronjob_end_date: "",
    receiver_category: "",
  });

  function OwnerCatHQ(){
    document.getElementById('hqUser').style.display = 'block';
    document.getElementById('cat2').style.display = 'none';
    document.getElementById('picID').style.display = 'none';
  }
  function OwnerCatSch(){
    document.getElementById('hqUser').style.display = 'none';
    document.getElementById('cat2').style.display = 'block';
    document.getElementById('picID').style.display = 'block';
  }

  const {data: statuslists} = await useFetch("/api/status/list", {
    method: "GET",
  });

  const {data: programDetails} = await useFetch("/api/creditsetup/listcreditsetup", {
    method: "GET",
  });


  const submit = async () => {
    
    if (form.value.cronjob_cycle.length === 1) {
      // Display the selected brands
      form.value.cyclesString = form.value.cronjob_cycle.toString();
      console.log(form.value.cyclesString);
    } else if (form.value.cronjob_cycle.length > 1) {
      form.value.cyclesString = form.value.cronjob_cycle.join(",");
      console.log(form.value.cyclesString);
    }else {
      console.log("No day selected.");
    }

    if (form.value.reward_title == "" || form.value.reward_description == "") {
      return;
    }
	  console.log("submit", submit);

    try {
      const { data } = await useFetch("/api/reward/addreward", {
        method: "POST",
        body: {
			    reward_title: form.value.reward_title,
          reward_description: form.value.reward_description,
          reward_type: form.value.reward_type,
          reward_value: form.value.reward_value,
          program_type: form.value.program_type,
          program_reference_id: form.value.program_reference_id,
          reward_cycle: form.value.reward_cycle,
          apply_to: form.value.apply_to,
          start_date: form.value.start_date,
          end_date: form.value.end_date,
          min_value: form.value.min_value,
			    max_value: form.value.max_value,
          cap_value: form.value.cap_value,
          limit_per_user: form.value.limit_per_user,
          status: form.value.status,
          cronjob_cycle: form.value.cyclesString,
          cronjob_type: form.value.cronjob_type,
          cronjob_time: form.value.cronjob_time,
          cronjob_frequency_value: form.value.cronjob_frequency_value,
          cronjob_frequency_type: form.value.cronjob_frequency_type,
          cronjob_end_date: form.value.cronjob_end_date,
          receiver_category: form.value.receiver_category,
        },
      });

      if (data.value.statusCode == 200) {
        // alert("Success");
        // alert('Reset Schedule');
        $swal.fire({
          title: "Success",
          text: "Successful Create Reward.",
          icon: "success",
        });
        // window.location.href = '/reward/listofreward';
        navigateTo("/reward/listofreward");
      } else {
        // alert("Failed");
        $swal.fire({
          title: "Error",
          text: "Failed to Create Reward!",
          icon: "error",
        });
      }
    }
      catch(error) {
		console.log("error", error)
        return;
    }
  };

  
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

      <!---1st card : reward owner*-->
      <!-- <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
        <template #header>
          <div class="flex">Reward Owner*</div>
        </template>

        <rs-fieldset label="Category">
          <FormKit 
            type="radio" 
            label="HQ" 
            name="ownercat" 
            id="hq" 
            @click="OwnerCatHQ()" 
          />
          <FormKit 
            type="radio" 
            label="School" 
            name="ownercat" 
            id="school"
            @click="OwnerCatSch()" 
          />
        </rs-fieldset>
        <br>

        <div class="hidden" id="hqUser">
          <FormKit 
            type="select" 
            label="HQ User" 
            :options="userlist" 
            help="this only appear when user choose HQ as the category"
          />
        </div>

        <div class="hidden" id="cat2">
          <FormKit 
            type="select" 
            label="Category 2" 
            class="hidden"
            :options="category2" 
            help="this only appear when user choose School as the category"
          />
        </div>

        <div class="hidden" id="picID">
          <FormKit 
            type="select" 
            label="PIC ID" 
            class="hidden"
            :options="userlist" 
            help="this only appear when user choose School as the category"
          />
        </div>

      </rs-card> -->

    <FormKit
      type="form"
      :action="false"
      @submit="submit"
      :incomplete-message="false"
      id="myForm"
    >
      <!---2nd card : details-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
        <template #header>
          <div class="flex">Details</div>
        </template>

        <FormKit 
          type="text" 
          label="Reward Title"
          validation="required|length:0,200"
          v-model="form.reward_title"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Reward Title <span class="text-danger">*</span></label>
        </template>
        </FormKit>

        <FormKit 
          type="textarea" 
          label="Description" 
          validation="required|length:0,200"
          v-model="form.reward_description"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Description <span class="text-danger">*</span></label>
        </template>
        </FormKit>

        <FormKit
          type="radio"
          label="Reward Type *"
          validation="required"
          help="What type of reward you want to set?"
          :options="rewardtype"
          v-model="form.reward_type"
        />

        <FormKit 
          type="text" 
          label="Value" 
          validation="required"
          v-model="form.reward_value"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Value <span class="text-danger">*</span></label>
        </template>
        </FormKit>

        <div v-if="form.reward_type === 'Percentage'">
          <FormKit 
            type="text" 
            label="Cap Value (RM)" 
            validation="required"
            v-model="form.cap_value"
          >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Cap Value (RM) <span class="text-danger">*</span></label>
          </template>
          </FormKit>
        </div>

        <rs-fieldset label="Budget Setting">
          
          <FormKit 
            type="select" 
            label="Program" 
            validation="required"
            :options="programlists" 
            v-model="form.program_type"
          >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Program <span class="text-danger">*</span></label>
          </template>
          </FormKit>

          <FormKit
            type="select"
            label="Program Details"
            :options="programDetails"
            v-model="form.program_reference_id"
          >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Program Details <span class="text-danger">*</span></label>
          </template>
          <option v-for="option in programDetails.data" :key="option.credit_setup_id" :value="option.credit_setup_id">{{ option.title }}</option>
          </FormKit>

        </rs-fieldset><br>

        <FormKit 
          type="text" 
          label="Minimum Value (RM)" 
          v-model="form.min_value"
        />

        <FormKit 
          type="text" 
          label="Maximum Value (RM)" 
          v-model="form.max_value"
        />

        <FormKit 
          type="text" 
          label="Limit per User (RM)" 
          v-model="form.limit_per_user"
        />

        <FormKit
          type="text"
          label="Cycle"
          help="Number of cycle to be applied for every user"
          v-model="form.reward_cycle"
        />

        <FormKit 
          type="select" 
          label="Apply To" 
          validation="required"
          :options="applytolist" 
          v-model="form.apply_to"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Apply To <span class="text-danger">*</span></label>
        </template>
        </FormKit>

        <!-- <FormKit 
          type="date" 
          :value="startDate" 
          label="Start Date" 
          validation="required"
          v-model="form.start_date"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Start Date <span class="text-danger">*</span></label>
        </template>
        </FormKit>

        <FormKit 
          type="date" 
          :value="endDate" 
          label="End Date" 
          validation="required"
          v-model="form.end_date"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">End Date <span class="text-danger">*</span></label>
        </template>
        </FormKit> -->

        <FormKit 
          type="datetime-local" 
          :value="startDate" 
          label="Start Date" 
          validation="required"
          v-model="form.start_date"
        >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Start Date <span class="text-danger">*</span></label>
          </template>
          </FormKit>

          <FormKit 
            type="datetime-local" 
            :value="endDate" 
            label="End Date" 
            validation="required"
            v-model="form.end_date"
          >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">End Date <span class="text-danger">*</span></label>
          </template>
        </FormKit>

        <FormKit 
          type="select" 
          label="Status"   
          v-model="form.status" 
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Status <span class="text-danger">*</span></label>
        </template>
        <option v-for="option in statuslists.data" :key="option.status_id" :value="option.status_id">{{ option.status_code }}</option>
        </FormKit>

      </rs-card>
    

      <!---3rd card : receiver-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
        <template #header>
          <div class="flex">Receiver <span class="text-danger">*</span></div>
        </template>

        <FormKit
          type="radio"
          label="Category *"
          :options="category"
          v-model="form.receiver_category"
          validation="required"
        />

      </rs-card>

      <!---4th card : cronjob setting-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
        <template #header>
          <div class="flex">Cronjob Setting <span class="text-danger">*</span></div>
        </template>

        <FormKit
          type="checkbox"
          label="Cronjob Cycle *"
          help="Select days"
          :options="cronjobdays"
          v-model="form.cronjob_cycle"
          name="days"
          validation="required"
        />

        <FormKit
          type="radio"
          label="Cronjob Type *"
          help="What type of cronjob you want to set?"
          :options="cronjobtype"
          v-model="form.cronjob_type"
          validation="required"
        />

        <div v-if="form.cronjob_type === 'time'">
          <FormKit 
            type="time" 
            :value="time" 
            label="Cronjob Time *" 
            v-model="form.cronjob_time"
            validation="required"
          >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Cronjob Time <span class="text-danger">*</span></label>
          </template>
          </FormKit>
        </div>
        
        <div v-if="form.cronjob_type === 'frequency'">
          <FormKit 
            type="number" 
            label="Frequency Value" 
            v-model="form.cronjob_frequency_value"
            validation="required"
          >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Frequency Value <span class="text-danger">*</span></label>
          </template>
          </FormKit>

          <FormKit
            type="radio"
            label="Frequency Type *"
            help="What type of frequency you want to set?"
            :options="frequencytype"
            v-model="form.cronjob_frequency_type"
            validation="required"
          />
        </div>
        
        <FormKit
          type="datetime-local"
          :value="cronjobEndDate"
          label="Cronjob End Date"
          v-model="form.cronjob_end_date"
          validation="required"
        >
        <template #label>
          <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">Cronjob End Date <span class="text-danger">*</span></label>
        </template>
        </FormKit>
          
      </rs-card>
    </FormKit>
   
  </div>
</template>
