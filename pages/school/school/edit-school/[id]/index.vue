<script setup>

definePageMeta({
  title: "Edit School",
  middleware: ["auth"],
  requiresAuth: true,
});

const form = ref({
  schoolName: "",
  code: "",
  type: "",
  address: "",
  postcode: "",
  city: "",
  state: "",
  country: "",
  principleName: "",
  contactNo: "",
  faxNo: "",
  email: "",
  websiteURL: "",
  resultURL: "",
  status: "",
})

const statusDropdown = ref([
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
]);

</script>

<template>
  <div>
    <div class="flex justify-between">
    <h4 class="mb-4 uppercase"></h4>
    </div>

    <FormKit type="form" :actions="false" :incomplete-message="true" @submit="submitForm">
      <section>
        <rs-card class="p-5">
          <div class="flex justify-between items-center mb-5">
              <div>
              <h5 class="font-semibold">Edit School</h5>
              <span class="text-sm text-gray-500">
                  Information about the school
              </span>
              </div>
          </div>

          <FormKit
            v-model="form.schoolName"
            type="text"
            label="School Name"
            validation="required|length:0,200"          
          />

          <div class="flex flex-row justify-between">
            <div class="basis-1/2 mr-5">
              <FormKit
                v-model="form.code"
                type="text"
                label="Code"
                validation="required|length:0,200"
                disabled
              />
            </div>
            <div class="basis-1/2">
              <FormKit
                v-model="form.type"
                type="text"
                label="Type"
                validation="required|length:0,200" 
              />
            </div>
          </div>

          <FormKit
            v-model="form.address"
            type="textarea"
            label="Address"
            rows="3"
            validation="required|length:0,200"            
          />

          <div class="flex flex-row justify-between">
            <div class="basis-1/2 mr-5">
              <FormKit
                v-model="form.postcode"
                type="text"
                label="Postcode"
                validation="required|length:0,200"           
              />
            </div>
            <div class="basis-1/2">
              <FormKit
                v-model="form.city"
                type="text"
                label="City"
                validation="required|length:0,200"  
              />
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <div class="basis-1/2 mr-5">
              <FormKit
                v-model="form.state"
                type="text"
                label="State"
                validation="required|length:0,200"  
              />
            </div>
            <div class="basis-1/2">
              <FormKit
                v-model="form.country"
                type="text"
                label="Country"
                validation="required|length:0,200"            
              />
            </div>
          </div>

          <FormKit
            v-model="form.principleName"
            type="text"
            label="Principle Name"
            validation="required|length:0,200"        
          />

          <div class="flex flex-row justify-between">
            <div class="basis-1/3 mr-5">
              <FormKit
                v-model="form.contactNo"
                type="text"
                label="Contact No"
                validation="required|length:0,200"     
              />
            </div>
            <div class="basis-1/3 mr-5">
              <FormKit
                v-model="form.faxNo"
                type="text"
                label="Fax No"
                validation="required|length:0,200"   
              />
            </div>
            <div class="basis-1/3">
              <FormKit
                v-model="form.email"
                type="email"
                label="Email"
                validation="required|length:0,200"   
              />
            </div>
          </div>        

          <FormKit
            v-model="form.websiteURL"
            type="text"
            label="Website URL"
            validation="required|length:0,200"  
          />

          <FormKit
            v-model="form.resultURL"
            type="text"
            label="Result URL"
            validation="required|length:0,200"   
          />

          <FormKit
            v-model="form.status"
            type="select"
            :options="statusDropdown"
            label="Status"
            validation="required|length:0,200" 
          />
        </rs-card>

      </section>
      <rs-button btn-type="submit" class="w-full" :disabled="processing">
        {{ processing ? "Saving..." : "Save" }}
      </rs-button>
    </FormKit>
  </div>
</template>
