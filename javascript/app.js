// funtion for making enter button to hit search 

document.getElementById('input-field').addEventListener('keyup',(event)=>{
    if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById('button-addon2').click()
    }
})
// function for spinner visibility 
const spinnerVisibility=styles=>{
    document.getElementById('spinner').style.display=styles;
}
const phoneDetailsVisibility=styles=>{
    document.getElementById('details-container').style.visibility=styles;
    document.getElementById('container').style.visibility=styles;
}


//   getting the search input 
const search=()=>{
    
    spinnerVisibility('block');
    phoneDetailsVisibility('hidden')
    const input=document.getElementById('input-field');
    const inputValue=input.value;
    const inputValueSmall=inputValue.toLowerCase();
    console.log(inputValueSmall);
    // fetching input value and sending it to next function 
    const url=`https://openapi.programming-hero.com/api/phones?search=${inputValueSmall}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>searchResult(data))
    input.value=''
    
}
// recieve the input data and set next action 
const searchResult=allData=>{
    
    

    // error message for no result 
    if(allData.status === false){
        spinnerVisibility('none')
        alert('no result found! please type a phone name')
       
    }
    else{
        // console.log(allData.status)
        const results=allData.data;
        const containerDiv=document.getElementById('container');
        containerDiv.textContent=''
        const detailCOntainer=document.getElementById('details-container');
        detailCOntainer.textContent=''
        const resultsSliced=results.slice(0,20);
        resultsSliced.forEach(result=>{
            // console.log(result);
            const colDiv=document.createElement('div');
            colDiv.classList.add('col')
            containerDiv.appendChild(colDiv);
            colDiv.innerHTML=`
            <div id="card-id" class="card">
                    <img src="${result.image}" class="card-img-top container-fluid" id="search-image" alt="no image found">
                    <div class="card-body text-center">
                      <h5 class="card-title">${result.phone_name}</h5>
                      <h5 class="card-title">${result.brand}</h5>
            
                      <button type="button" class="btn btn-outline-secondary"onclick="catchDetails('${result.slug}')">see details</button> 
                     
                      
                    </div>
                  </div>
            `
        })
        spinnerVisibility('none')
        phoneDetailsVisibility('visible')
        
        }

}
// catch detail link 
const catchDetails=link=>{
    detailUrl=`https://openapi.programming-hero.com/api/phone/${link}`
    fetch(detailUrl)
    .then(res=>res.json())
    .then(data=>showDetails(data))
}
// set detailed information 
const showDetails=details=>{
    console.log(details)
    const detailCOntainer=document.getElementById('details-container');
    detailCOntainer.textContent=''
    const newDiv=document.createElement('div');
    newDiv.classList.add('card');
    newDiv.style.width='18rem'
    detailCOntainer.appendChild(newDiv);
    newDiv.innerHTML=`
    <div id='phone-features'class="card-body">
    <img src="${details.data.image}" class="card-img-top container-fluid" id="search-image" alt="no image found">
    <h5 class="card-title">${details.data.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${details.data.releaseDate ? details.data.releaseDate:"no release date found"} </h6>
    <small>cheapset: ${details.data.mainFeatures.chipSet}</small>
    <small>display size: ${details.data.mainFeatures.displaySize}</small><br>
    <small>Memory: ${details.data.mainFeatures.memory}</small><br>
    <small>Bluetooth: ${details.data.others?.Bluetooth ? details.data.others.Bluetooth : "not available" } </small><br>
    <small>GPS: ${details.data.others?.GPS ? details.data.others.GPS : "not available"}  </small><br>
    <small>NFC: ${details.data.others?.NFC ? details.data.others.NFC : "not available"} </small><br>
    <small>Radio: ${details.data.others?.Radio ? details.data.others.Radio : "not available"} </small><br>
    <small>USB: ${details.data.others?.USB ? details.data.others.USB : "not available"} </small><br>
    <small>WLAN: ${details.data.others?.WLAN ? details.data.others.WLAN : "not available"} </small><br>
    <small>sensors: ${details.data.mainFeatures.sensors[0] +','+ details.data.mainFeatures.sensors[1]+','+ details.data.mainFeatures.sensors[2]+','+ details.data.mainFeatures.sensors[3]+','+details.data.mainFeatures.sensors[4]+','+ details.data.mainFeatures.sensors[5]}</small><br>

  </div>
    `
}
