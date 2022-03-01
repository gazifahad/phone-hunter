// funtion for making enter button to hit search 
document.getElementById('input-field').addEventListener('keyup',(event)=>{
    if(event.keyCode == 13){
        event.preventDefault();
        document.getElementById('button-addon2').click()
    }
})
//   getting the search input 
const search=()=>{
    const input=document.getElementById('input-field');
    const inputValue=input.value;
    // fetching input value and sending it to next function 
    const url=`https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>searchResult(data))
    input.value=''
    
}
// recieve the input data and set next action 
const searchResult=allData=>{
    // error message for no result 
    if(allData.status === false){
        alert('no result found! please type a phone name')
    }
    else{
        // console.log(allData.status)
        const results=allData.data;
        const containerDiv=document.getElementById('container');
        containerDiv.textContent=''
        results.forEach(result=>{
            // console.log(result);
            const colDiv=document.createElement('div');
            colDiv.classList.add('col')
            containerDiv.appendChild(colDiv);
            colDiv.innerHTML=`
            <div id="card-id" class="card">
                    <img src="${result.image}" class="card-img-top container-fluid" id="search-image" alt="no image found">
                    <div class="card-body">
                      <h5 class="card-title">${result.phone_name}</h5>
                      <h5 class="card-title">${result.brand}</h5>
            
                      <button type="button" class="btn btn-outline-secondary"onclick="catchDetails('${result.slug}')">see details</button> 
                     
                      
                    </div>
                  </div>
            `
        })
        }

}
// catch detail link 
const catchDetails=link=>{
    detailUrl=`https://openapi.programming-hero.com/api/phone/${link}`
    fetch(detailUrl)
    .then(res=>res.json())
    .then(data=>showDetails(data))
}
const showDetails=details=>{
    console.log(details)
    const detailCOntainer=document.getElementById('details-container');
    detailCOntainer.textContent=''
    const newDiv=document.createElement('div');
    newDiv.classList.add('card');
    newDiv.style.width='18rem'
    detailCOntainer.appendChild(newDiv);
    newDiv.innerHTML=`
    <div class="card-body">
    <img src="${details.data.image}" class="card-img-top container-fluid" id="search-image" alt="no image found">
    <h5 class="card-title">${details.data.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
    `
}
