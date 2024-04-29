const ul=document.querySelector('ul');
document.querySelector('#srch-btn').addEventListener('click',search)

function search(){
    const value = document.querySelector('#date').value;
    ul.innerHTML="";
    if(value){
        axios.get(`http://localhost:4000/getdate/${value}`)
        .then(result=>{
            if(result.data[0].length>0){
                result.data[0].forEach(element => {
                    const li=document.createElement('li');
                    const status=element.present===1?"Present":"X";
                    li.textContent=`${element.id}  ${element.name}  ${status}`
                    ul.appendChild(li);
                });
            }
            else{
                ul.innerHTML="";
                addElements(value);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
}


function submitData(event,records,date){
    event.preventDefault();
    const arr=[];
    
    let check=false;
    for(let i=0;i<records.length;i++){
        const clas=`radio${records[i].id}`;
        const radioclass=document.querySelectorAll(`.${clas}`);
        check=false;
        for(let j=0;j<radioclass.length;j++){
            if(radioclass[j].checked===true){
                const str= `${records[i].id}_${j===0?'true':'false'}`;
                arr.push(str);
                check=true;
                continue;
            }

        }
        if (!check)break;
    }
    if(check){
        axios.post(`http://localhost:4000/postattendance`,{date:date,data:arr})
        .then(result=>{
            console.log(result);
            if(result.data=='Success'){
                search();
            }
            else{
                alert("Something Wrong with Database")
            }
        })
      
    }
    else{
        alert("Choose All Buttons");
        
    }
    
}

function addElements(date){
    axios.get(`http://localhost:4000/getstudent`)
    .then(result=>{
        if(result.data[0].length>0){
            const form =document.createElement('form');

             form.onsubmit=(event)=>{
                submitData(event,result.data[0],date)
             }
            ul.appendChild(form);

            result.data[0].forEach(element=>{
                const li= document.createElement('li');
                const html=`${element.id}  ${element.name} <label for="True">Present</label>
                <input type="radio" name='radio_${element.id}' value="true" class="radio${element.id}"/>
                <label for="False">Absent</label>
                <input type="radio" name="radio_${element.id}" value="false" class="radio${element.id}"/><br>`;
                li.innerHTML=html;
                form.appendChild(li);
               
            }
            

            )
            const button=document.createElement('button');
            button.textContent="Submit Attendance";
            button.type='submit';
            form.appendChild(button);
            
        }
    })
    .catch(err=>console.log(err))

}

document.querySelector('#fetch-btn').addEventListener('click',()=>{
    axios.get("http://localhost:4000/getreport")
    .then(result=>{
       displayReport(result.data);
    })
    .catch(err=>console.log(err))
})


function displayReport(data){
    ul.innerHTML="";
    data.forEach(element=>{
        const li=document.createElement('li');
        li.textContent=`${element.id} - ${element.name} - ${element.days} - ${element.percent} %`;
        ul.appendChild(li);
    })

}