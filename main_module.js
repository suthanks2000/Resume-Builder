    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
    import { getFirestore,addDoc,collection,getDocs,doc,query,where,deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCgvV_ZTidnUDUcSEOKbOQpeocqHlvlOyM",
      authDomain: "resume-builder-project-cb6ca.firebaseapp.com",
      projectId: "resume-builder-project-cb6ca",
      storageBucket: "resume-builder-project-cb6ca.appspot.com",
      messagingSenderId: "726622035139",
      appId: "1:726622035139:web:5b843b927e93be35885676"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

// ******************************************login page function*************************************** 
async function login(){  
  await  getDocs(collection(db, 'registerData')).then(loginPage => {
        
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        if (email == '' && password == '') {
            alert('please fill all fields')
            return
        }
        let userData = false
        loginPage.forEach((each) => {
            let myresume = each.data()
            if (email == myresume.Email && password == myresume.Password) {
                userData = {
                    Name: myresume.Name,
                    id: each.id,
                    Email: myresume.Email
                }
                alert('login Successfull')
                localStorage.setItem('userData', JSON.stringify(userData))
                location =  "resume_list.html"
                userData = true
            }
        })
        if(!userData){
            alert('Incorrect password or email')
        }
    
     
})
}
window.login=login// login funciton in consider by universel 

// ******************************************register page function*************************************** 

async function  register(){
    var names = document.getElementById('name').value;
    var emails = document.getElementById('email').value;
    var passwords = document.getElementById('password').value

    if(names == ' ' || emails == " " || passwords==''){
        alert('Please fill all fields')
    }
    
    else{
         await addDoc(collection(db, "registerData"),{
        Name : names,
        Email : emails,
        Password : passwords

    })
    alert('Registration successfull')
    
    location = "index.html"
    }
}
window.register=register// register function in consider by universel 

// ******************************************create resume page function*************************************** 

async function submit_function(){
    let data= localStorage.getItem("userData")
    let prase_data=JSON.parse(data)

      await addDoc(collection(db, "resumes"), {...myresume,userId:prase_data.id})

      location = "resume_list.html"

    //   // IF localstorage have no data back to login page
    //   if(!localStorage.getItem('userData')){
    //     location = "index.html"
    // }
}

window.submit_function=submit_function// submit in create resume page function in consider by universel 

function logout(){
    localStorage.removeItem('userData')
    location="index.html"
}
window.logout=logout// logout this function all pages use in consider by universel 

// ******************************************resume list function*************************************** 

function getResumes(){
    let data= localStorage.getItem("userData")
    let prase_data=JSON.parse(data)

    getDocs(query(collection(db,'resumes'),where('userId','==',prase_data.id))).then(docSnap =>{
    let renderHtml = ''
    docSnap.forEach((each)=>{
        let eachResume = each.data()
    
        renderHtml = renderHtml + `<li><a href="template.html?resumeId=${each.id}"> 
    ${eachResume.name}</a><button type='button' onclick="deleteResume('${each.id}')">Delete</button>
    <a href='edit_rsume.html?resumeId=${each.id}'><button>Edit</button></a></li>`
    })
    document.getElementById('list').innerHTML = renderHtml
})
}
window.getResumes=getResumes// getResumes this function resume_list page use in consider by universel 

// ******************************************resume list page delete funciton function***************************************
function deleteResume(resumeId){
    deleteDoc(doc(db,"resumes",resumeId))
    getResumes()// all the before using function
}
    window.deleteResume = deleteResume// delete  this function resume_list  pages use in consider by universel

// ******************************************create resume button in resume list page function***************************************
function create_resume(){
    
  location="create_resume.html"
}  
window.create_resume=create_resume // cr this function all pages use in consider by universel 

// ******************************************edit page  function***************************************
async function edit_resume(){
    let params = new URLSearchParams(document.location.search);
    let id = params.get("resumeId")

//  getDocs(query(collection(db,"resumes"),where("resumes","==",id))).then(snapshot =>{
//     snapshot.forEach(each=>{
//         console.log(each.data());
//         let datas = each.data()
//                  myresume=datas
//             document.getElementById("edit_name").value=datas.name
//     })
       

    
//  })
 

    getDocs(collection(db,"resumes")).then(editpage=>{
        editpage.forEach((each)=>{
            if(id==each.id){
                let datas = each.data()
                myresume=datas
                document.getElementById("edit_name").value=myresume.name
                document.getElementById("edit_contact").value=myresume.contact
                document.getElementById("edit_title").value=myresume.title

                document.getElementById('edit_dateofbirth').value=myresume.personal_details.date_of_birth

                document.getElementById('edit_age').value=myresume.personal_details.age
                document.getElementById('edit_email').value=myresume.personal_details.email
                // document.getElementById('editDeclaration').value=myresume.Declaration
                document.getElementById('edit_fathername').value=myresume.personal_details.father_name
                document.getElementById('edit_mothername').value=myresume.personal_details.mother_name
                document.getElementById('edit_place').value=myresume.personal_details.place

            // to get skill

                let empty_skills=""//skills add on the edit page using dinamic method
                for (const each_skills of myresume.skills) {
                    empty_skills=empty_skills+`<input type="text" value="${each_skills}" class="data_skills">`
                }
                document.getElementById("input_skills").innerHTML=empty_skills

                let empty_hobbies=""//HOBBIES add on the edit page using dinamic method
                for (const each_hobbies of myresume.hobbies) {
                    empty_hobbies=empty_hobbies+`hobbies:<input type="text" value="${each_hobbies}" class="data_hobbies">`
                }
                document.getElementById("input_hobbies").innerHTML=empty_hobbies

                let empty_languages=""//LANGUAGES add on the edit page using dinamic method
                for (const each_languages of myresume.languages) {
                    empty_languages=empty_languages+`languages:<input type="text" value="${each_languages}" class="data_languages">`
                }
                document.getElementById("input_languages").innerHTML=empty_languages


                let prase_education=myresume.education
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

                let prase_projects=myresume.projects
                let empty_projects=""//education add on the edit page using dinamic method
                for (const each in prase_projects) {
                    empty_projects=empty_projects+`<tr>
                    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'project_name','projects')" value="${prase_projects[each].project_name}"></td>
                    <td><input type="text" onkeyup="multi_edit_resume(this,${each},'project_details','projects')" value="${prase_projects[each].project_details}"></td>
                </tr>`
                }
                document.getElementById("edit_projects").innerHTML=empty_projects

                let prase_experience=myresume.experience
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
        })
    })
 }
window.edit_resume=edit_resume

function side_add(id){
    if(id == 'input_skills'){
        let addSkill = document.getElementById('input_skills')
        let addNewSkill = document.createElement('input');
        addNewSkill.setAttribute('placeholder','Enter New Skill')
        addNewSkill.setAttribute('class','data_skills')
        addNewSkill.setAttribute('type','text')
        addSkill.appendChild(addNewSkill)
    }
    else if(id == 'input_languages'){
        
        let addLanguage = document.getElementById('input_languages')
        let addNewLanguage = document.createElement('input');
        addNewLanguage.setAttribute('placeholder','Enter New Language')
        addNewLanguage.setAttribute('class','data_languages')
        addNewLanguage.setAttribute('type','text')
        addLanguage.appendChild(addNewLanguage)
    
    }
    else if (id == 'input_hobbies'){
        let addHobby = document.getElementById('input_hobbies')
        let addNewHobby = document.createElement('input');
        addNewHobby.setAttribute('placeholder','Enter New hobby')
        addNewHobby.setAttribute('class','data_hobbies')
        addNewHobby.setAttribute('type','text')
        addHobby.appendChild(addNewHobby)

    }
    else if(id=="education_table"){
        let education_length=myresume.education.length
        let t_body_id=document.getElementById("education_table") 
        let add_education=`<tr>
        <td><input type="text" placeholder="enter the course name" onkeyup="multi_edit_resume(this,${education_length},'course_name','education')"></td>
        <td><input type="text" placeholder="enter the ins name"  onkeyup="multi_edit_resume(this,${education_length},'ins_name','education')" ></td>
        <td><input type="number" placeholder="enter the percentage"  onkeyup="multi_edit_resume(this,${education_length},'percentage','education')"></td>
        <td><input type="number" placeholder="enter the course year"  onkeyup="multi_edit_resume(this,${education_length},'year','education')" ></td>
    </tr>`
    myresume.education[education_length]={
        course_name:"",
        ins_name:"",
        percentage:"",
        year:""
    }
    t_body_id.insertAdjacentHTML('beforeend',add_education)

    
    }

    else if(id=="edit_projects"){
        let projects_length=myresume.projects.length
        let t_body_id=document.getElementById("edit_projects")
        let add_projects=`<tr>
        <td><input type="text" placeholder="enter the project name" onkeyup="multi_edit_resume(this,${projects_length},'project_name','projects')" ></td>
        <td><input type="text" placeholder="enter the project details" onkeyup="multi_edit_resume(this,${projects_length},'project_details','projects')" ></td>
    </tr>`
    myresume.projects[projects_length]={
        project_name:"",
        project_details:""
    }
    document.getElementById("edit_projects").insertAdjacentHTML('beforeend',add_projects)

    
    }

    else if(id="edit_experience"){
        let experience_length=myresume.experience.length
        let t_body_id=document.getElementById("edit_experience")
        let add_experience=`<tr>
        <td><input type="text" onkeyup="multi_edit_resume(this,${experience_length},'companay_name','experience')"></td>
        <td><input type="text" onkeyup="multi_edit_resume(this,${experience_length},'work_details','experience')"></td>
        <td><input type="text" onkeyup="multi_edit_resume(this,${experience_length},'role','experience')"></td>
        <td><input type="number" onkeyup="multi_edit_resume(this,${experience_length},'working_year','experience')"></td>
    </tr>`
    myresume.experience[experience_length]={
        companay_name:"",
        work_details:"",
        role:"",
        working_year:""
    }
    document.getElementById("edit_experience").insertAdjacentHTML('beforeend',add_experience)

    
    }
}
window.side_add=side_add

async function update_data(){
    let params = new URLSearchParams(document.location.search);
    let id = params.get("resumeId")

    let update_input_name= document.getElementById("edit_name").value;
    let update_input_contact= document.getElementById("edit_contact").value;
    let update_input_title= document.getElementById("edit_title").value;

    let update_input_fatername= document.getElementById("edit_fathername").value;
    let update_input_mothername= document.getElementById("edit_mothername").value;
    let update_input_dateofbirth= document.getElementById("edit_dateofbirth").value;
    let update_input_email= document.getElementById("edit_email").value;
    let update_input_place= document.getElementById("edit_place").value;
    let update_input_age= document.getElementById("edit_age").value;




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
let updateData = {
        name : update_input_name,
        title: update_input_title,
        
        contact : update_input_contact,
        personal_details:{
            fathername : update_input_fatername,
            mothername : update_input_mothername,
            age : update_input_age,
            email :update_input_email,
            place:update_input_place,
            date_of_birth:update_input_dateofbirth

        },
        skills : edit_skills,
        hobbies : edit_hobbies,
        languages : edit_languages,
        education:myresume.education
        // projects:myresume.projects
}

await updateDoc(doc(db,"resumes",id),updateData)
     
    location = "resume_list.html"

}
window.update_data=update_data 