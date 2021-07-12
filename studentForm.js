function readData()
{
    var values={};
    values['name']=document.getElementById("name").value;
    values['email']=document.getElementById("email").value;
    values['website']=document.getElementById("website").value;
    values['image']=document.getElementById('url').value;
    //values['gender']=document.querySelector('input[name="gender"]:checked').value;
    var inputGender=document.getElementsByName('gender');
    var inputElements = document.getElementsByName('skills');
    var skillset="No Skills";
    for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
            if (skillset == "No Skills")
                skillset = inputElements[i].value;
            else
                skillset = skillset + "," + inputElements[i].value;
        }        
    }
    var gender="No Gender";
    for(var i=0; inputGender[i]; ++i){
        if(inputGender[i].checked){
            gender=inputGender[i].value;
        }        
    }
    values["gender"]=gender;
    values["skills"] = skillset;
    return values;
}

function onFormSubmit()
{
    var formData=readData();
    var alphaExp = /^[a-zA-Z ]+$/;
    var imagereg=/\.(jpeg|jpg|gif|png)$/;
    //var emailreg = /^\w[a-zA-Z_0-9.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    // by defining type=email for email field there is no need of using this regex for validation
    
    if(formData['name']=='')
    {
        document.getElementById('usererror').innerHTML="Please fill your name!";
        return;
    }
    document.getElementById('usererror').innerHTML="";

    if(!formData['name'].match(alphaExp)){
        
        document.getElementById('usererror').innerText = "Please fill your right name!";
        return
    }
    document.getElementById('usererror').innerHTML="";
    
    if(formData['email']=='')
    {
        document.getElementById('emailerror').innerHTML="The email shouldn't be null";
        return;
    }/*
    document.getElementById('emailerror').innerHTML="";
    

    if(!formData['email'].match(emailreg))
    {
        document.getElementById('emailerror').innerHTML="Please fill your right email";
        return;
    }
    document.getElementById('emailerror').innerHTML="";

    if(formData['email'].indexOf('@')<=0)
    {
        document.getElementById('emailerror').innerHTML="Please fill right email";
        return;
    }
    document.getElementById('emailerror').innerHTML="";

    if((formData['email'].charAt(formData['email'].length-4)=='.') && formData['email'].charAt(formData['email'].length-3)=='.')
    {
        document.getElementById('emailerror').innerHTML="Please fill right email";
        return;
    }*/
        document.getElementById('emailerror').innerHTML="";

    //check duplicate email in local storage

    var getList=JSON.parse(localStorage.getItem('showList') || "[]");
    for(var i=0;i<getList.length;i++)
    {
        if(getList[i]['email']==formData['email'])
        {
            document.getElementById('emailerror').innerHTML="Please fill right email";
            return
        }
    }
        document.getElementById('emailerror').innerHTML="";

    if(formData['website']=="")
    {
        document.getElementById('websiteerror').innerHTML="Please fill right website";
        return;
    }
    document.getElementById('websiteerror').innerHTML="";


    var websitereg=new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i'); 

    if(!formData['website'].match(websitereg) )
    {
        document.getElementById('websiteerror').innerHTML="Please enter your website!";
        return;
    }
        document.getElementById('websiteerror').innerHTML="";

    if(formData['image']=="")
    {
        document.getElementById('urlerror').innerHTML="Please enter your link!";
        return;
    }
    document.getElementById('urlerror').innerHTML="";
    
    if(!formData['image'].match(imagereg))
    {
        document.getElementById('urlerror').innerHTML="Please enter your link!";
        return;
    }
        document.getElementById('urlerror').innerHTML="";

    if(formData['gender']=="No Gender")
    {
        document.getElementById('gender').innerHTML='Please select your gender!';
        return;
    }
    document.getElementById('gender').innerHTML="";


    if(formData['skills']=="No Skills")
    {
        document.getElementById('skills').innerHTML='Please enter your skills!';
        return;
    }
    document.getElementById('skills').innerHTML="";

    //Add values into local storage as multidimensional array
    var showList = JSON.parse(localStorage.getItem('showList') || "[]");
    showList.push(formData); 
    localStorage.setItem("showList", JSON.stringify(showList));

    displayData(formData);
    
}

function getLocalValues()
{
    var getList=JSON.parse(localStorage.getItem('showList') || "[]");
    for(var i=0;i<getList.length;i++)
    {
        displayData(getList[i]);
    }
}

function displayData(data)
{
    var table=document.getElementById('studentList').getElementsByTagName('tbody')[0];
    var row=table.insertRow(0);
    row.setAttribute("id","row");
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    row.style.overflow=scroll;
    if(data.website.includes('https://'))
    {
        data.website=data.website.replace('https://','');
    }
    var values='<p><b>'+data['name']+'</b></p><br>'+'<p>'+data['gender']+'</p><br>'+'<p>'+
    data['email']+'</p><br>'+'<p><a href=https://'+data['website'].substring(4)+' target="_blank"><u>'
    +data['website']+'</u></a></p><br>'+'<p>'+data['skills']+'</p>';

    cell1.innerHTML=values;

    var image='<img src="'+data['image']+'" id="image">';
    cell2.innerHTML=image;
    document.getElementById("studentForm").reset();

}

function resetForm()
{
    document.getElementById("studentForm").reset();
    document.getElementById('usererror').innerHTML="";
    document.getElementById('emailerror').innerHTML="";
    document.getElementById('websiteerror').innerHTML="";
    document.getElementById('urlerror').innerHTML="";
}

