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
        console.log(allData.status)
        const results=allData.data;
        const containerDiv=document.getElementById('container');
        containerDiv.textContent=''
        results.forEach(result=>{
            const colDiv=document.createElement('div');
            containerDiv.appendChild(colDiv);
            colDiv.innerHTML=`
            <div class="card">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                  </div>
            `
        })
        }

   
// for(const result of results){

// }
}