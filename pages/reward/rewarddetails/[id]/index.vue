<script setup>
  import { DateTime } from "luxon"

  definePageMeta({
    title: "Reward Details",
    middleware: ["auth"],
    requiresAuth: true,
  });

  const { $swal } = useNuxtApp();
  
  const dt = DateTime.now();
  const time = dt.toFormat("HH:mm");
  const datetime = dt.toFormat("yyyy-MM-dd'T'HH:mm");

  const field = [
    "Id",
    "Reward",
    "School",
    "Receiver Type",
    "Group 1",
    "Status",
    "Action",
  ]

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

  // const receivertype = [
  //   { label: "Class", value: "Class" },
  //   { label: "Club", value: "Club" },
  //   { label: "User Groups", value: "User Groups" },
  // ]

  const cronjob_cycle = [
    {label:"None", value:"None"},
    {label:"Sunday", value:"Sunday"},
    {label:"Monday", value:"Monday"},
    {label:"Tuesday", value:"Tuesday"},
    {label:"Wednesday", value:"Wednesday"},
    {label:"Thursday", value:"Thursday"},
    {label:"Friday", value:"Friday"},
    {label:"Saturday", value:"Saturday"},  
  ]

  const cronjobtype = [
    { label: "Time", value: "time" },
    { label: "Frequency", value: "frequency" },
  ]

  const frequencytype = [
    { label: "Hour", value: "Hour" },
    { label: "Minute", value: "Minute" },
  ]

  const paramID = useRoute().params.id;
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
    days: [
      "None",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    cronjob_cycle: [
      {label:"None", value:"None"},
      {label:"Sunday", value:"Sunday"},
      {label:"Monday", value:"Monday"},
      {label:"Tuesday", value:"Tuesday"},
      {label:"Wednesday", value:" Wednesday"},
      {label:"Thursday", value:"Thursday"},
      {label:"Friday", value:"Friday"},
      {label:"Saturday", value:"Saturday"}
    ],
    cyclesString: "",
    cronjob_cycle: [],
    cronjob_time: "",
    cronjob_type: "",
    cronjob_frequency_value: "",
    cronjob_frequency_type: "",
    cronjob_end_date: "",
    receiver_category: "",
  });

  const paramIDReceiver = useRoute().params.id1;
  const form1 = ref({
    reward_id: paramID,
    school_id: "",
    receiver_type: "",
    select_receiver_type: [],
    group_id_1: [],
    selectedClass: [],
    selectedClub: [],
    selectedUserGroup: [],
    //group_id_2: [],
    status: "",
    group1: "",
    //group2:""
  });
  
  const listusers = ref([]);
  const listSchoolClass=ref([]);
  const listSchoolClub=ref([]);

  const selectData = ref({
    reward_receiver_id: paramIDReceiver,
    reward_id: "",
    school_id: "",
    receiver_type: "",
    group_id_1: "",
    //group_id_2: [],
    status: "",
  });

  // const form2 = ref({
  //   reward_receiver_id: paramIDReceiver,
  //   reward_id: "",
  //   school_id: "",
  //   receiver_type: "",
  //   select_receiver_type: [],
  //   group_id_1: [],
  //   selectedClass: [],
  //   selectedClub: [],
  //   selectedUserGroup: [],
  //   classList: [],
  //   clubList: [],
  //   groupList: [],
  //   //group_id_2: [],
  //   status: "",
  //   group1: "",
  //   //group2:""
  // });

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
  function cancelSchool(){
    document.getElementById('myschool').style.display ='none';
    //document.getElementById('editschool').style.display ='none';
  }
  function cancelEditSchool(){
    //document.getElementById('myschool').style.display ='none';
    document.getElementById('editschool').style.display ='none';
  }
  function receiverSchool(){
    document.getElementById('myschool').style.display = 'block';
    // var x = document.getElementById("myschool");
    // if (x.style.display === "none") {
    //   x.style.display = "block";
    // } else {
    //   x.style.display = "none";
    // }
  }
  function editSchool(){
    document.getElementById('editschool').style.display = 'block';
    // var x = document.getElementById("myschool");
    // if (x.style.display === "none") {
    //   x.style.display = "block";
    // } else {
    //   x.style.display = "none";
    // }
  }
  // Function Receiver Type: Class
  const showClass = () => {
    //Get the checkbox
    var checkBox = document.getElementById("class");
    //Get the output text
    var item = document.getElementById("selectClass");

    //If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

    //document.getElementById('selectClass').style.display = 'block';
    // document.getElementById('selectClub').style.display = 'none';
    // document.getElementById('selectUserGroup').style.display = 'none';
  }
  // Function Receiver Type: Club
  const showClub = () => {
    // Get the checkbox
    var checkBox = document.getElementById("club");
    // Get the output text
    var item = document.getElementById("selectClub");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

    // document.getElementById('selectClass').style.display = 'none';
    // document.getElementById('selectClub').style.display = 'block';
    // document.getElementById('selectUserGroup').style.display = 'none';
  }
  // Function Receiver Type: User Group
  const showUserGroup = () => {
    // Get the checkbox
    var checkBox = document.getElementById("userGroup");
    // Get the output text
    var item = document.getElementById("selectUserGroup");

    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

    // document.getElementById('selectClass').style.display = 'none';
    // document.getElementById('selectClub').style.display = 'none';
    // document.getElementById('selectUserGroup').style.display = 'block';
  }

  const {data: statuslists} = await useFetch("/api/status/list", {
    method: "GET",
  });

  const {data: programDetails} = await useFetch("/api/creditsetup/listcreditsetup", {
    method: "GET",
  });
  
  const {data: schoollists} = await useFetch("/api/rewardreceiver/listlookupschool", {
    method: "GET",
  });
  console.log("school list:", schoollists.value);

  const usergrouplists = await useFetch("/api/rewardreceiver/listlookupusergroup", {
    method: "GET",
  });
  const users = usergrouplists.data.value;
 
  if(users?.statusCode == 200) {
    users.data.map((val) => {
      listusers.value.push({
        label: val.user_role,
        value: val.user_role_id,
      });
    });
  }
  console.log("selectedUserGroup:", listusers.value);
  
  const {data: rewardreceiverData} = await useFetch("/api/rewardreceiver/listrewardreceiver", {
    method: "GET",
    query: {
      reward_id: form1.value.reward_id,
    },
  });
  
  
  // const formatDate = (dateString) => {
  //   return new Date(dateString).toISOString().slice(0,16);
  // };

  // const formatDate = (dateString) => {
  //   // Convert the dateString to a Date object
  //   const date = new Date(dateString);
    
  //   // Extract the components of the date
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
  //   const day = String(date.getDate()).padStart(2, '0');
    
  //   // Construct the formatted date string
  //   const formattedDate = `${year}-${month}-${day}`;
    
  //   return formattedDate;
  // };

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
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log("formattedDateTime", formattedDateTime)
    
    return formattedDateTime;
  };

 
  const formatTime = (timeString) => {
    return new Date(timeString).toISOString().slice(11,16);
  };


  const {data} = await useFetch("/api/reward/getreward", {
    method: "GET",
    query: {
      reward_id: paramID,
    },
  });
  
  if(data.value.statusCode == 200){
    form.value.reward_title = data.value.data.reward_title;
    form.value.reward_description = data.value.data.reward_description;
    form.value.reward_type = data.value.data.reward_type;
    form.value.reward_value = data.value.data.reward_value;
    form.value.program_type = data.value.data.program_type;
    form.value.program_reference_id = data.value.data.program_reference_id;
    form.value.reward_cycle = data.value.data.reward_cycle;
    form.value.apply_to = data.value.data.apply_to;
    form.value.start_date = formatDate(data.value.data.start_date);
    form.value.end_date = formatDate(data.value.data.end_date);
    form.value.min_value = data.value.data.min_value;
    form.value.max_value = data.value.data.max_value;
    form.value.cap_value = data.value.data.cap_value;
    form.value.limit_per_user = data.value.data.limit_per_user;
    form.value.status = data.value.data.status;
    form.value.cronjob_cycle = data.value.data.cronjob_cycle.split(','); 
    form.value.cronjob_type = data.value.data.cronjob_type;
    form.value.cronjob_time = formatTime(data.value.data.cronjob_time);
    form.value.cronjob_frequency_value = data.value.data.cronjob_frequency_value;
    form.value.cronjob_frequency_type = data.value.data.cronjob_frequency_type;
    form.value.cronjob_end_date = formatDate(data.value.data.cronjob_end_date);
    form.value.receiver_category = data.value.data.receiver_category;

    //console.log(form.value.cronjob_cycle);

  }else{
    alert("Tiada Reward dengan ID ini");
  }

  // const fetchData = async () => {
  //   try{
  //     const {data} = await useFetch("/api/reward/getreward", {
  //       method: "GET",
  //       query: {
  //         reward_id: paramID,
  //       },
  //     });
      
  //     if(data.value.statusCode == 200){
  //       form.value.reward_title = data.value.data.reward_title;
  //       form.value.reward_description = data.value.data.reward_description;
  //       form.value.reward_type = data.value.data.reward_type;
  //       form.value.reward_value = data.value.data.reward_value;
  //       form.value.program_type = data.value.data.program_type;
  //       form.value.program_reference_id = data.value.data.program_reference_id;
  //       form.value.reward_cycle = data.value.data.reward_cycle;
  //       form.value.apply_to = data.value.data.apply_to;
  //       form.value.start_date = formatDate(data.value.data.start_date);
  //       form.value.end_date = formatDate(data.value.data.end_date);
  //       form.value.min_value = data.value.data.min_value;
	// 		  form.value.max_value = data.value.data.max_value;
  //       form.value.cap_value = data.value.data.cap_value;
  //       form.value.status = data.value.data.status;
  //       form.value.cronjob_cycle = data.value.data.cronjob_cycle.split(','); 
  //       form.value.cronjob_time = formatTime(data.value.data.cronjob_time);
  //       form.value.cronjob_end_date = formatDate(data.value.data.cronjob_end_date);
  //       form.value.receiver_category = data.value.data.receiver_category;

  //       console.log(form.value.cronjob_cycle);

  //     }else{
  //       alert("Tiada Reward dengan ID ini");
  //     }
  //   }catch (error){
  //     console.error('Error fetching data:', error);
  //   }
  // };

  
  const submit = async() => {
    //alert(form.value.cronjob_time);
    if (form.value.cronjob_cycle.length === 1) {
      // Display the selected brands
      form.value.cyclesString = form.value.cronjob_cycle.toString();
      console.log(form.value.cyclesString);
    } else if (form.value.cronjob_cycle.length > 1) {
      form.value.cyclesString = form.value.cronjob_cycle.join(",");
      console.log(form.value.cyclesString);
    } else {
      console.log("No day selected.");
    }

    if(form.value.reward_title == "" || form.value.reward_description == ""){
      return;
    }
    try{
      const {data} = await useFetch("/api/reward/editreward", {
        method: "POST",
        body: {
          reward_id: paramID,
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
      //console.log(data.value.cronjob_end_date);
      //console.log(data.value.cronjob_time);
      if(data.value.statusCode == 200){
        // alert("Success");
        $swal.fire({
          title: "Success",
          text: "Successful Update Reward.",
          icon: "success",
        });
        navigateTo("/reward/listofreward");
      }else{
        // alert("Failed");
        $swal.fire({
          title: "Error",
          text: "Failed to Update Reward!",
          icon: "error",
        });
      }
    }
    catch(error){
      return;
    }
  };

  

  const submitReceiver = async () => {

    if (form1.value.reward_id == "" || form1.value.school_id == "") {
      return;
    }

    const classList = ref([]);
    const clubList = ref([]);
    const groupList = ref([]);

    form1.value.selectedClass.forEach((val1) =>
    {
      classList.value.push(val1.value);
     
    });

    form1.value.selectedClub.forEach((val2) =>
    {
      clubList.value.push(val2.value)
    });

    form1.value.selectedUserGroup.forEach((val3) =>
    {
      groupList.value.push(val3.value)
    });

    // console.log('classList:', classList.value);
    // console.log('clubList:', clubList.value);
    // console.log('groupList:', groupList.value);
    
    // Ensure that selectedClass is an array
    const selectedClassArray = Array.isArray(classList.value)
      ? classList.value
      : [classList.value];
    //console.log('class array:', selectedClassArray);

    const selectedClubArray = Array.isArray(clubList.value)
      ? clubList.value
      : [clubList.value];
    //console.log('club array:', selectedClubArray);
    
    const selectedGroupArray = Array.isArray(groupList.value)
      ? groupList.value
      : [groupList.value];
    //console.log('group array:', selectedGroupArray);

    try {
      
      const { data } = await useFetch("/api/rewardreceiver/addrewardreceiver", {
        method: "POST",
        body: {
			    reward_id: form1.value.reward_id,
          school_id: form1.value.school_id,
          //receiver_type: form.value.reward_type,
          //group_id_1: form1.value.group1,
          //group_id_2: form1.value.group_id_2,
          selectedClass: selectedClassArray, 
          selectedClub: selectedClubArray, 
          selectedUserGroup: selectedGroupArray, 
          status: form1.value.status,
        },
      });

      //console.log("data receiver:", data.value);

      if (data.value.statusCode == 200) {
        alert("Success add School");
        location.reload();
        //window.location.href = `/reward/rewarddetails/${data.value.reward_id}`;
      } else {
        alert("Failed add School");
      }
    }
      catch(error) {
		  console.log("error", error)
        return;
    }
  };

  
  // const fetchDataReceiver = async () => {
  //   try{
  //     const {data} = await useFetch("/api/rewardreceiver/getrewardreceiver", {
  //       method: "GET",
  //       query: {
  //         reward_receiver_id: paramIDReceiver,
  //       },
  //     });
  //     console.log("Get id reward receiver:",data.value.data.reward_receiver_id);
  //     console.log("Get reward receiver:",data.value.data);

  //     if(data.value.statusCode == 200){
  //       form2.value.reward_id = data.value.data.reward_id;
  //       form2.value.school_id = data.value.data.school_id;
  //       form2.value.receiver_type = data.value.data.receiver_type;
  //       form2.value.group_id_1 = data.value.data.group_id_1;
  //       //form1.value.group_id_2 = data.value.data.group_id_2;
  //       //form2.value.selectedClass = data.value.data.selectedClass;
  //       //form2.value.selectedClub = data.value.data.selectedClub;
  //       //form2.value.selectedUserGroup = data.value.data.selectedUserGroup;

  //       form2.value.status = data.value.data.status;
  //     }else{
  //       alert("Tiada Reward Receiver dengan ID ini");
  //     }
  //   }catch (error){
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const editReceiver = async() => {

    if (selectData.value.reward_id == "" || selectData.value.school_id == "") {
      return;
    }
	  console.log("submit", selectData.value)

    try {
      const { data } = await useFetch("/api/rewardreceiver/editrewardreceiver", {
        method: "POST",
        body: {
          reward_receiver_id: selectData.value.reward_receiver_id,
			    reward_id: selectData.value.reward_id,
          school_id: selectData.value.school_id,
          receiver_type: selectData.value.reward_type,
          group_id_1: selectData.value.group_id_1,
          //group_id_2: form1.value.group_id_2,
          // selectedClass: form1.value.selectedClass,
          // selectedClub: form1.value.selectedClub,
          // selectedUserGroup: form1.value.selectedUserGroup,
          status: selectData.value.status,
        },
      }); 
      if (data.value.statusCode == 200) {
        alert("Success edit School");
        location.reload();
        //window.location.href = `/reward/rewarddetails/${data.value.reward_id}`;
      } else {
        alert("Failed edit School");
      }
    }
      catch(error) {
		  console.log("error", error)
        return;
    }
  };

  const removeReceiver = async(data) => {

    const userConfirmed = confirm(
      "Are you sure you want to REMOVE this school?\n" + 
      data.value.tbl_school.school_name
    );

    if (userConfirmed) {
      try {
        const response = await useFetch("/api/rewardreceiver/removerewardreceiver", {
          method: "POST",
          query: {
            reward_receiver_id: data.value.reward_receiver_id,
          },
        });

        if (response.data.value.statusCode === 200) {
          alert("Success Remove School");
          location.reload();
        } else {
          alert("Failed Remove School");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      alert("Failed Remove School");
    }
  };

  
  const changeSchool = async() => {
    //alert('masuk');
    
    //class
    listSchoolClass.value = ref([]);
    const  classlists = await useFetch("/api/rewardreceiver/listlookupclass", {
      method: "GET",
      query: {
        school_id: form1.value.school_id,
      },
    });
    
    listSchoolClass.value = [];

    if (classlists.data.value?.statusCode >= 200 && classlists.data.value?.statusCode < 300) {
    // console.log("Successful fetch of class data");
    // console.log("Class data length:", classlists.data.value.data.length);
    // console.log("Class data:", classlists.data.value.data);

      for (let i = 0; i < classlists.data.value.data.length; i++) {
        const val = classlists.data.value.data[i];
        //console.log("Class data:", i, val);

        listSchoolClass.value.push({
          label: val.class_name,
          value: val.class_id,
          
        });
      }
    } else {
      // Handle other status codes or errors
      console.error('Failed to fetch classes. Status code:', classlists.data.value?.statusCode);
    }
    

    //club
    listSchoolClub.value = ref([]);
    const clublists = await useFetch("/api/rewardreceiver/listlookupclub", {
      method: "GET",
      query: {
        school_id: form1.value.school_id,
      },
    });

    listSchoolClub.value = [];

    if (clublists.data.value?.statusCode >= 200 && clublists.data.value?.statusCode < 300) {
    // console.log("Successful fetch of club data");
    // console.log("Club data length:", clublists.data.value.data.length);
    // console.log("Club data:", clublists.data.value.data);

      for (let i = 0; i < clublists.data.value.data.length; i++) {
        const val = clublists.data.value.data[i];
        //console.log("Club data:", i, val);

        listSchoolClub.value.push({
          value: val.club_id,
          label: val.club_name,
        });
      }
    } else {
      // Handle other status codes or errors
      console.error('Failed to fetch clubs. Status code:', clublists.data.value?.statusCode);
    }
    
    
  }

  // Define the clickUser function
  const clickData = (data) => {
    //console.log("selected edit data:", data.value);
    
    selectData.value = data.value;
    //console.log("click data:", selectData.value);
    //console.log("selectData reward receiver id:", selectData.value.reward_receiver_id);
  };
  
  // onMounted(() => {
  //   fetchData();
  //   //fetchDataReceiver();
  // });
  
</script>
<template>
  <div>
    <LayoutsBreadcrumb />
    <!---1st card : reward owner-->
    <!-- <rs-card
      class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
      <template #header>
        <div class="flex">Reward Owner</div>
      </template>

      <rs-fieldset label="Category">
        <FormKit type="radio" label="HQ" name="ownercat" id="hq" @click="OwnerCatHQ()" />
        <FormKit type="radio" label="School" name="ownercat" id="school" @click="OwnerCatSch()"/>
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
            v-model="form.reward_title"
          />

          <FormKit 
            type="textarea" 
            label="Description" 
            v-model="form.reward_description"
          />

          <FormKit
            type="radio"
            label="Reward Type"
            help="What type of reward you want to set?"
            :options="rewardtype"
            v-model="form.reward_type"
          />

          <FormKit 
            type="text" 
            label="Value" 
            v-model="form.reward_value"
          />

          <div v-if="form.reward_type === 'Percentage'">
            <FormKit 
              type="text" 
              label="Cap Value" 
              v-model="form.cap_value"
            />
          </div>

          <rs-fieldset label="Budget Setting">
            <FormKit 
              type="select" 
              label="Program" 
              :options="programlists" 
              v-model="form.program_type"
            />

            <FormKit
              type="select"
              label="Program Details"
              v-model="form.program_reference_id"
            >
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
            :options="applytolist" 
            v-model="form.apply_to"
          />

          <FormKit 
            type="datetime-local" 
            label="Start Date" 
            :value="startDate" 
            v-model="form.start_date"
          />

          <FormKit 
            type="datetime-local" 
            label="End Date" 
            :value="endDate" 
            v-model="form.end_date"
          />
          
          <FormKit 
            type="select" 
            label="Status" 
            v-model="form.status"
          >
            <option v-for="option in statuslists.data" :key="option.status_id" :value="option.status_id">{{ option.status_code }}</option>
          </FormKit>

      </rs-card>

      <!---3rd card : receiver-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
        >
        <template #header>
          <div class="flex">Receiver</div>
        </template>

        <FormKit
          type="radio"
          label="Category"
          :options="category"
          v-model="form.receiver_category"
        />

      </rs-card>

      <!---3.1 card : receiver table - School-->
      <rs-card v-if="form.receiver_category === 'School'"
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
      >
        <template #header>
          <div class="flex">List School</div>
        </template>

        <rs-table v-if="rewardreceiverData.data && rewardreceiverData.data.length > 0"
          :field="field"
          :data="rewardreceiverData.data"
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
          <template v-slot:id="data">
            <p class="" >
              {{ data.value.reward_receiver_id }}
            </p>
          </template>

          <template v-slot:Reward="data">
            <p class="" >
              {{ data.value.reward_id }}
            </p>
          </template>

          <template v-slot:School="data">
            <p class="" >
              {{ data.value.tbl_school.school_name }}
            </p>
          </template>

          <template v-slot:ReceiverType="data">
            <p class="" >
              {{ data.value.receiver_type }}
            </p>
          </template> 

          <template v-slot:Group1="data">
            <p class="" >
              {{ data.value.group_id_1 }}
            </p>
          </template> 

          <template v-slot:Status="data">
            <rs-badge variant="success" v-if="data.value.status == '1'">Aktif</rs-badge>
            <rs-badge variant="danger" v-else>Tidak Aktif</rs-badge>
          </template>

          <template v-slot:Action="data">
            <div class="flex gap-2" >
              <rs-button @click.prevent="editSchool(); clickData(data);">Edit</rs-button>
              <rs-button @click.prevent="removeReceiver(data)">Remove</rs-button>
            </div>
            <!-- <div class="" v-else>v-if="data.value.receiver_type == 'user group'"
              <rs-button @click="removeReceiver(data)">Remove</rs-button>
            </div> -->
          </template>
        </rs-table>
        <div v-else class="">
          <rs-empty-table :field="field"></rs-empty-table>        
        </div>
        
        <br>

        <!-- BUTTON CREATE SCHOOL -->
        <rs-button class="mx-5" @click.prevent="receiverSchool()">
          Add School
        </rs-button>
        <br>

      </rs-card>

      <!---3.2 card : receiver - Add School-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col" 
        id="myschool" hidden
        >
        <template #header>
          <div class="flex">Add School</div>
        </template>

        <rs-button size="sm" class="float-right" @click.prevent="cancelSchool()" variant="danger">
          Cancel
        </rs-button>
        <br><br>

        <FormKit 
          type="form" 
          :action="false" 
          @submit="submitReceiver" 
          :incomplete-message="false"
        >
          <div class="space-y-6">
            
            <FormKit 
              type="number" 
              label="Reward ID" 
              v-model="form1.reward_id" 
              readonly
            />

            <FormKit 
              type="select" 
              label="School" 
              v-model="form1.school_id"
              @change="changeSchool()"
            >
            <option v-for="option in schoollists.data" :key="option.school_id" :value="option.school_id">{{ option.school_name }}</option>
            </FormKit>
              
            <!--Select : Class-->
            <div v-if="listSchoolClass.length > 0" class="formkit-wrapper" id="selectClass">
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger"
                for="input_15"
              >Class</label>

              <p>{{ listSchoolClass.length }} class found</p> 
              <v-select 
                name="class_name" 
                :options="listSchoolClass" 
                multiple 
                v-model="form1.selectedClass"
              ></v-select>
              

            </div>
            <div v-else-if="listSchoolClass.length == 0" class="formkit-wrapper" id="selectClass">
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger"
                for="input_15"
              >Class</label>
              
              <FormKit 
                type="text" 
                value="0 class found" 
                readonly
              />
            </div>
              
            <!--Select : Club-->
            <div v-if="listSchoolClub.length > 0" class="formkit-wrapper" id="selectClub">
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger"
                for="input_15"
              >Club</label>

              <p>{{ listSchoolClub.length }} club found</p> 
              <v-select 
                name="club_name" 
                :options="listSchoolClub" 
                multiple 
                v-model="form1.selectedClub"
              ></v-select>

            </div>
            <div v-else-if="listSchoolClub.length == 0" class="formkit-wrapper" id="selectClub">
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger"
                for="input_15"
              >Club</label>

              <FormKit 
                type="text" 
                value="0 club found" 
                readonly
              />
            </div>

            <!--Select : user groups-->
            <div class="formkit-wrapper" id="selectUserGroup">
              <label
                class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500 dark:formkit-invalid:text-danger"
                for="input_15"
              >User Group</label>

              <v-select 
                name="user_role" 
                :options="listusers" 
                multiple 
                v-model="form1.selectedUserGroup"
              >
              </v-select>
            </div> 
              
            <FormKit 
              type="select" 
              label="Status" 
              v-model="form1.status"
            >
            <option v-for="option in statuslists.data" :key="option.status_id" :value="option.status_id">{{ option.status_code }}</option>
            </FormKit>

            <br>
          </div>
        </FormKit>
      </rs-card>
      
      <!---3.3 card : receiver - Edit School-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col" 
        id="editschool" hidden
        >
        <template #header>
          <div class="flex">Edit School</div>
        </template>

        <rs-button size="sm" class="float-right" @click.prevent="cancelEditSchool()" variant="danger">
          Cancel
        </rs-button>
        <br><br>
        
        <FormKit 
          type="form" 
          :action="false" 
          @submit="editReceiver" 
          :incomplete-message="false"
        >
          <div class="space-y-6">
            
            <FormKit 
              type="number" 
              label="Reward ID" 
              v-model="selectData.reward_id" 
              readonly
            />
            
            <FormKit 
              type="select" 
              label="School"  
              v-model="selectData.school_id"
            >
            <option v-for="option in schoollists.data" :key="option.school_id" :value="option.school_id">{{ option.school_name }}</option>
            </FormKit>
              
            <FormKit 
              type="text" 
              label="Receiver Type" 
              v-model="selectData.receiver_type" 
              readonly
            />
            
            <div v-if="selectData.receiver_type === 'class'" id="selectClass">

              <!-- <FormKit 
                type="select"
                name="class_name"
                v-model="selectData.group_id_1"
                :options="listSchoolClass" 
              /> -->

              <FormKit 
                type="text" 
                label="Class" 
                v-model="selectData.group_id_1" 
                readonly
              />
              
            </div>

            <div v-else-if="selectData.receiver_type === 'club'" id="selectClub">
              
              <!-- <FormKit 
                type="select"
                name="club_name"
                v-model="selectData.group_id_1"
                :options="listSchoolClub" 
              /> -->

              <FormKit 
                type="text" 
                label="Club" 
                v-model="selectData.group_id_1" 
                readonly
              />
              
            </div>

            <div v-else-if="selectData.receiver_type === 'user group'" id="selectUserGroup">

              <FormKit 
                type="select"
                name="user_role"
                label="User Group"
                v-model="selectData.group_id_1"
                :options="listusers" 
              />
              
            </div>

            <FormKit 
              type="select" 
              label="Status"  
              v-model="selectData.status"
            >
            <option v-for="option in statuslists.data" :key="option.status_id" :value="option.status_id">{{ option.status_code }}</option>
            </FormKit>
            <br>

          </div>
        </FormKit>
        
      </rs-card>

      <!---4th card : cronjob setting-->
      <rs-card
        class="flex-wrap justify-between p-10 bg-white text-black rounded-md flex-col"
        >
        <template #header>
          <div class="flex">Cronjob Setting</div>
        </template>

        <FormKit
          type="checkbox"
          label="Cronjob Cycle"
          help="Select days"
          :options="cronjob_cycle"
          v-model="form.cronjob_cycle" 
        />

        <FormKit
          type="radio"
          label="Cronjob Type"
          help="What type of cronjob you want to set?"
          :options="cronjobtype"
          v-model="form.cronjob_type"
        />

        <div v-if="form.cronjob_type === 'time'">
          <FormKit 
            type="time" 
            :value="time" 
            label="Cronjob Time" 
            v-model="form.cronjob_time"
          />
        </div>
        
        <div v-if="form.cronjob_type === 'frequency'">
          <FormKit 
            type="number" 
            label="Frequency Value" 
            v-model="form.cronjob_frequency_value"
          />

          <FormKit
            type="radio"
            label="Frequency Type"
            help="What type of frequency you want to set?"
            :options="frequencytype"
            v-model="form.cronjob_frequency_type"
          />
        </div>

        <FormKit
          type="datetime-local"
          label="Cronjob End Date"
          :value="cronjobEndDate"
          v-model="form.cronjob_end_date"
        />

      </rs-card>
      
    </FormKit>

  </div>
</template>
      