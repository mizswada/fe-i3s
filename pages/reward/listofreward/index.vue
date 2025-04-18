<script setup>
  import { DateTime } from "luxon";

  definePageMeta({
    title: "List of Reward",
    middleware: ["auth"],
    requiresAuth: true,
  })

  const changedata = ref(false)
  const field = [
    "Id",
    "Reward Type",
    "Reward Value",
    "Start Date",
    "End Date",
    "Status",
    "Action",
  ]

  
  const {data: rewardData} = await useFetch("/api/reward/listreward", {
    method: "GET",
  });

  console.log("rewardData", rewardData)

  const formatDate = (dateTimeString) => {
    // Convert the dateTimeString to a Date object
    const dateTime = DateTime.fromISO(dateTimeString, { zone: 'utc' });
    console.log("dateTime", dateTime)
    console.log("dateTimeString", dateTimeString)
    
    // Extract the components of the date and time
    const year = dateTime.year;
    const month = String(dateTime.month).padStart(2, '0');
    const day = String(dateTime.day).padStart(2, '0');
    const hours = String(dateTime.hour).padStart(2, '0');
    const minutes = String(dateTime.minute).padStart(2, '0');
    const seconds = String(dateTime.second).padStart(2, '0');
    
    // Construct the formatted date-time string
    const formattedDateTime = `${day}/${month}/${year}`;
    console.log("formattedDateTime", formattedDateTime)
    
    return formattedDateTime;
  };
  
  

</script>
<template>
  <div>
    <LayoutsBreadcrumb />

    <!--- DATATABLE  -->
    <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
    >
      <!-- BUTTON CREATE REWARD -->
      <nuxt-link :to="`/reward/createreward`">
        <rs-button class="mx-5">
          <Icon name="mdi:plus"></Icon>
          Create Reward
        </rs-button>
      </nuxt-link>

      <!-- TABLE LIST REWARD -->
      <rs-table v-if="rewardData.data && rewardData.data.length > 0" 
        :field="field"
        :data="rewardData.data"
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
        <template v-slot:RewardType="data" >
          <p class="">
            {{ data.value.reward_type }}
          </p>
        </template>

        <template v-slot:RewardValue="data">
          <p class="">
            {{ data.value.reward_value }}
          </p>
        </template>

        <template v-slot:StartDate="data">
          <p class="" >
            {{ formatDate(data.value.start_date) }}
          </p>
        </template>

        <template v-slot:EndDate="data">
          <p class="">
            {{ formatDate(data.value.end_date) }}
          </p>
        </template>

        <template v-slot:Status="data">
          <rs-badge variant="success" v-if="data.value.status == '1'">Aktif</rs-badge>
          <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
        </template>

        <template v-slot:Action="data">
          <div class="grid gap-y-2">
            <nuxt-link :to="`/reward/rewarddetails/${data.value.reward_id}`">
              <rs-button >Details</rs-button>
            </nuxt-link>
            <nuxt-link :to="`/reward/transactiondetails/${data.value.reward_id}`">
              <rs-button >Transaction</rs-button>
            </nuxt-link>
          </div>
        </template>
      </rs-table>
      <div v-else class="">
        <rs-empty-table :field="field"></rs-empty-table>        
      </div>
    </rs-card>
  </div>
</template>
