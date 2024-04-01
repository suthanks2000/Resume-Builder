let myresume={
    skills:[],
    hobbies:[],
    languages:[],
    personal_details:{

    },
    education:[
            {
                course_name:"",
                ins_name:"",
                percentage:"",
                year:""
            },
            {
                course_name:"",
                ins_name:"",
                percentage:"",
                year:""
            }
           
    ],
    projects:[
        {
            project_name:"",
            project_details:""
        },
        {
            project_name:"",
            project_details:""
        }
    ],
    experience:[
        {
            companay_name:"",
            work_details:"",
            role:"",
            working_year:""
        },
         {
            companay_name:"",
            work_details:"",
            role:"",
            working_year:""
        }
    ]
}
    

// function get(ele,key){
//     // myresume.name=ele.value;
//     myresume[key]=ele.value;
//     preview()
//     // document.getElementById("code").innerHTML=JSON.stringify(myresume)
// }

function get(ele,key,personal_key,index,edu_key){

        if(personal_key){
            myresume[personal_key][key]=ele.value;
        }
        else if(edu_key){
            myresume[key][index][edu_key]=ele.value;
        }
        else{
            myresume[key]=ele.value;
            

        }
        
        preview()
}

function addArr(key,id){
    
    let a=document.getElementById(id).value;
    myresume[key].push(a)
    document.getElementById(id).value=""
    preview()
}



function preview(){
    document.getElementById("code").innerHTML=JSON.stringify(myresume,null,4)
}


// storage a data in local storage in array 

// let resumedata = [];
// function submit(){
//     resumedata.push(myresume);
//     localStorage.setItem("resumes",JSON.stringify(resumedata));
//     document.getElementById("register").reset()    
// }

// function submit(){
//     localStorage.setItem("details",JSON.stringify(myresume))
//     location = "resume.html"
// }

// function save_data(){// save the data in local storage using submit button
//      if(!localStorage.getItem("resume_details")){
//         localStorage.setItem("resume_details",JSON.stringify([]))
//      }
//      let get_data = localStorage.getItem("resume_details");
//      let prase_data =JSON.parse(get_data);
//      let update_data = [...prase_data,myresume];
     
//      localStorage.setItem("resume_details",JSON.stringify(update_data));

//      location = "resume.html"

// }

function listResumes(){ //show the data in local storage this function using
    let update_get_data = localStorage.getItem("resume_details");
    let update_parse_data = JSON.parse(update_get_data);

    let li_empty = '';
    for (const input in update_parse_data) {
        li_empty =li_empty+`<li><a href="view.html?index=${input}">${update_parse_data[input].name}</a></li><button type="button" onclick="delete_name('${input}')">delete</button><a href="edit_resume.html?name=${input}"><button type="button" onclick="edit_name('${input}')">Edit</button></a>`;//add the button after click delet the the index data 

    }
    
    document.getElementById("list").innerHTML = li_empty   
}


function edit_resume(){// edit function using a localstorage 
    let parms = new URLSearchParams(document.location.search);
    let index = parms.get("name");

  let edit_data = localStorage.getItem("resume_details")
  let edit_prase_data = JSON.parse(edit_data)

  document.getElementById("edit_name").value=edit_prase_data[index].name
  document.getElementById("edit_contact").value=edit_prase_data[index].contact

  let empty_skills=""//skills add on the edit page using dinamic method
  for (const each_skills of edit_prase_data[index].skills) {
    empty_skills=empty_skills+`<input type="text" value="${each_skills}" class="data_skills">`
  }
  document.getElementById("input_skills").innerHTML=empty_skills

  let empty_hobbies=""//HOBBIES add on the edit page using dinamic method
  for (const each_hobbies of edit_prase_data[index].hobbies) {
    empty_hobbies=empty_hobbies+`hobbies:<input type="text" value="${each_hobbies}" class="data_hobbies">`
  }
  document.getElementById("input_hobbies").innerHTML=empty_hobbies

  let empty_languages=""//LANGUAGES add on the edit page using dinamic method
  for (const each_languages of edit_prase_data[index].languages) {
    empty_languages=empty_languages+`languages:<input type="text" value="${each_languages}" class="data_languages">`
  }
  document.getElementById("input_languages").innerHTML=empty_languages


  let prase_education=edit_prase_data[index].education
  let empty_education=""//education add on the edit page using dinamic method
  for (const each in prase_education) {
    empty_education=empty_education+`<tr>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'course_name','education')" value="${prase_education[each].course_name}"></td>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'ins_name','education')" value="${prase_education[each].ins_name}"></td>
    <td><input type="number" onkeyup="multi_edit_resume(this,${each},'percentage','education')" value="${prase_education[each].percentage}"></td>
    <td><input type="number" onkeyup="multi_edit_resume(this,${each},'year','education')" value="${prase_education[each].year}"></td>
</tr>`
  }
  document.getElementById("education_table").innerHTML=empty_education

  let prase_projects=edit_prase_data[index].projects
  let empty_projects=""//education add on the edit page using dinamic method
  for (const each in prase_projects) {
    empty_projects=empty_projects+`<tr>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'project_name','projects')" value="${prase_projects[each].project_name}"></td>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'project_details','projects')" value="${prase_projects[each].project_details}"></td>
</tr>`
  }
  document.getElementById("edit_projects").innerHTML=empty_projects

  let prase_experience=edit_prase_data[index].experience
  let empty_experience=""//education add on the edit page using dinamic method
  for (const each in prase_experience) {
    empty_experience=empty_experience+`<tr>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'companay_name','experience')" value="${prase_experience[each].companay_name}"></td>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'work_details','experience')" value="${prase_experience[each].work_details}"></td>
    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'role','experience')" value="${prase_experience[each].role}"></td>
    <td><input type="number" onkeyup="multi_edit_resume(this,${each},'working_year','experience')" value="${prase_experience[each].working_year}"></td>
</tr>`
  }
  document.getElementById("edit_experience").innerHTML=empty_experience
 
}
// function side_add(id){
    
//         let parms = new URLSearchParams(document.location.search);
//         let index = parms.get("name");

//         let edit_data = localStorage.getItem("resume_details");
//         let edit_prase_data = JSON.parse(edit_data);
    
//         if(id=="input_skills"){
//             // Create a new input element skills
//         let create_add = document.createElement("input");
//         create_add.setAttribute('type', 'text');
//         create_add.setAttribute('class', 'data_skills'); // Add a class for easier selection
//         create_add.setAttribute('placeholder', 'enter the skills'); 
//          // Append the input element to the specified container
//         document.getElementById("input_skills").appendChild(create_add);
//          // Update the skills array in the local storage with the current input value
//         edit_prase_data[index].skills.push(create_add.value);
//         }
//         else if(id=="input_hobbies"){
//             // Create a new input element hobbies
//         let create_add = document.createElement("input");
//         create_add.setAttribute('type', 'text');
//         create_add.setAttribute('class', 'data_hobbies'); // Add a class for easier selection 

//         // Append the input element to the specified container
//         document.getElementById("input_hobbies").appendChild(create_add);

//         // Update the hobbies array in the local storage with the current input value
//         edit_prase_data[index].hobbies.push(create_add.value);
//         }

//         else if(id=="input_languages"){
//         // Create a new input element languages
//         let create_add = document.createElement("input");
//         create_add.setAttribute('type', 'text');
//         create_add.setAttribute('class', 'data_languages'); // Add a class for easier selection 

//         // Append the input element to the specified container
//         document.getElementById("input_languages").appendChild(create_add);

//         // Update the languages array in the local storage with the current input value
//         edit_prase_data[index].languages.push(create_add.value);
//         }

//         else if(id=="education_table"){
//             let education_length=edit_prase_data[index].education.length
//             let t_body_id=document.getElementById("education_table").innerHTML
//             let add_education=`<tr>
//             <td><input type="text" placeholder="enter the course name" onkeyup="multi_edit_resume(this,${education_length},'course_name','education')"></td>
//             <td><input type="text" placeholder="enter the ins name"  onkeyup="multi_edit_resume(this,${education_length},'ins_name','education')" ></td>
//             <td><input type="number" placeholder="enter the percentage"  onkeyup="multi_edit_resume(this,${education_length},'percentage','education')"></td>
//             <td><input type="number" placeholder="enter the course year"  onkeyup="multi_edit_resume(this,${education_length},'year','education')" ></td>
//         </tr>`
//         document.getElementById("education_table").innerHTML=t_body_id+add_education

//         edit_prase_data[index].education[education_length]={
//             course_name:"",
//             ins_name:"",
//             percentage:"",
//             year:""
//         }
//         }

//         else if(id=="edit_projects"){
//             let projects_length=edit_prase_data[index].projects.length
//             let t_body_id=document.getElementById("edit_projects").innerHTML
//             let add_projects=`<tr>
//             <td><input type="text" placeholder="enter the project name" onkeyup="multi_edit_resume(this,${projects_length},'project_name','projects')" ></td>
//             <td><input type="text" placeholder="enter the project details" onkeyup="multi_edit_resume(this,${projects_length},'project_details','projects')" ></td>
//         </tr>`

//         document.getElementById("edit_projects").innerHTML=t_body_id+add_projects

//         edit_prase_data[index].projects[projects_length]={
//             project_name:"",
//             project_details:""
//         }
//         }

//         else if(id="edit_experience"){
//             let experience_length=edit_prase_data[index].experience.length
//             let t_body_id=document.getElementById("edit_experience").innerHTML
//             let add_experience=`<tr>
//             <td><input type="text" onkeyup="multi_edit_resume(this,${experience_length},'companay_name','experience')"></td>
//             <td><input type="text" onkeyup="multi_edit_resume(this,${experience_length},'work_details','experience')"></td>
//             <td><input type="text" onkeyup="multi_edit_resume(this,${experience_length},'role','experience')"></td>
//             <td><input type="number" onkeyup="multi_edit_resume(this,${experience_length},'working_year','experience')"></td>
//         </tr>`

//         document.getElementById("edit_experience").innerHTML=t_body_id+add_experience

//         edit_prase_data[index].experience[experience_length]={
//             companay_name:"",
//             work_details:"",
//             role:"",
//             working_year:""
//         }
//         }
//         localStorage.setItem("resume_details", JSON.stringify(edit_prase_data));

// }




function multi_edit_resume(element,data_index,key_word,praent_key){// education,project details,experiance update function
    // let parms = new URLSearchParams(document.location.search);
    // let index = parms.get("name");

    // let edit_data = localStorage.getItem("resume_details")
    // let edit_prase_data = JSON.parse(edit_data)

    
        myresume[praent_key][data_index][key_word]=element.value;
        // myresume is golbal empty object 
    
    
    
    
    // localStorage.setItem("resume_details",JSON.stringify(edit_prase_data))

}

function update_data(){// update the ALL data usiing a URLSearchParams
    let parms = new URLSearchParams(document.location.search);
    let index = parms.get("name");

    let update_edit_data = localStorage.getItem("resume_details")
    let update_edit_prase_data = JSON.parse(update_edit_data)
    
    let update_input_name= document.getElementById("edit_name").value;
    let update_input_contact= document.getElementById("edit_contact").value;
    let update_skills=document.getElementsByClassName("data_skills");// skillls add dynamic method 
    let update_hobbies=document.getElementsByClassName("data_hobbies");//hobbies add on dynamic method
    let update_languages=document.getElementsByClassName("data_languages");//languages add on dynamic method

    let edit_skills=[]
    let edit_hobbies=[]
    let edit_languages=[]
    for (const each of update_skills) {//skills 
        edit_skills.push(each.value)
    }
    
    for (const each of update_hobbies) {// hobbies
        edit_hobbies.push(each.value)
    }

    for (const each of update_languages) {
        edit_languages.push(each.value)
    }

    update_edit_prase_data[index].name=update_input_name
    update_edit_prase_data[index].contact=update_input_contact
    update_edit_prase_data[index].skills=edit_skills
    update_edit_prase_data[index].hobbies=edit_hobbies
    update_edit_prase_data[index].languages=edit_languages


    localStorage.setItem("resume_details",JSON.stringify(update_edit_prase_data))
    location="resume.html"
}

function delete_name(n_delete){//delete funciton if click the delete button this function is work
    let updateresumes=[]
    let a= localStorage.getItem("resume_details")
    let data_update = JSON.parse(a)

    for (const each in data_update) {
        if(each!=n_delete){
            updateresumes.push(data_update[each])
        }

    }
    
    localStorage.setItem("resume_details",JSON.stringify(updateresumes))
    location = "resume.html "
    
}


function view(){// go to the view page using URLSearchParams after click the herf
    let parms = new URLSearchParams(document.location.search);
    let index = parms.get("index");

    let update_get_data = localStorage.getItem("resume_details");
    let update_parse_data = JSON.parse(update_get_data);

    document.getElementById("one").innerHTML =`Name:${update_parse_data[index].name}`;
    
    // personal details view funciton
    document.getElementById("father_name_view").innerHTML =`father name:${update_parse_data[index].personal_details.father_name}`;
    document.getElementById("mother_name_view").innerHTML =`mother name:${update_parse_data[index].personal_details.mother_name}`;
    document.getElementById("age_view").innerHTML =`age:${update_parse_data[index].personal_details.age_view}`;
    document.getElementById("date_of_birth_view").innerHTML =`date of birth:${update_parse_data[index].personal_details.date_of_birth}`;
    document.getElementById("place_view").innerHTML =`place:${update_parse_data[index].personal_details.place}`;
    document.getElementById("email_view").innerHTML =`email:${update_parse_data[index].personal_details.email}`;



    let skills_table = ''
    for (const each of update_parse_data[index].skills) {// show the array in object show the html 
            skills_table = skills_table+`<tr>
            <td>${each}</td>
        </tr>`   
    }
    document.getElementById("taableskills").innerHTML = skills_table


    let edu_table = ''
    for (const each of update_parse_data[index].education) {// show the array in object show the html 
            edu_table = edu_table+`<tr>
            <td>${each.course_name}</td>
            <td>${each.ins_name}</td>
            <td>${each.percentage}</td>
            <td>${each.year}</td>
        </tr>`   
    }
    document.getElementById("taableducaion").innerHTML = edu_table


    let project_table = ''
    for (const each of update_parse_data[index].projects) {// show the array in object show the html 
            project_table = project_table+`<tr>
            <td>${each.project_name}</td>
            <td>${each.project_details}</td>
            
        </tr>`   
    }
    document.getElementById("projecttable").innerHTML = project_table

    let experience_table = ''
    for (const each of update_parse_data[index].experience) {// show the array in object show the html 
            experience_table = experience_table+`<tr>
            <td>${each.companay_name}</td>
            <td>${each.work_details}</td>
            <td>${each.role}</td>
            <td>${each.working_year}</td>
            
            </tr>`   
    }
    document.getElementById("taableexperience").innerHTML = experience_table
    
    document.getElementById("update_declaration").innerHTML = update_parse_data[index].declaration

}


// function check(){ 
//     let get= localStorage.getItem("details")
//     let show_data= JSON.parse(get)
//     show= document.createElement("h4")
//     show.innerHTML = `Name :${show_data.name}`;
//     let div_var = document.getElementById("res")
//     div_var.append(show)
//     alert("ssss")
// }