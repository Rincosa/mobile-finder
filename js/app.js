const loadPhones= async(searchText, dataLimit) =>{
    const url= `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res= await fetch(url);
    const data= await res.json();
    displayPhones(data.data, dataLimit);
}


const displayPhones= (phones, dataLimit)=>{
    const phonesContainer= document.getElementById('phones-container');
    phonesContainer.textContent='';
    const showAll= document.getElementById('show-all');
    if(dataLimit && phones.length>3){
      phones= phones.slice(0,20);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    }
    

    const notFoundDiv= document.getElementById('not-found');
    if(phones.length===0){
      const notFoundDiv= document.getElementById('not-found');
      notFoundDiv.classList.remove('d-none');
    }
    else{
      notFoundDiv.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv= document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`<div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
          </p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
          data-bs-target="#exampleModal">Show Details</button>
        </div>
      </div>`;
      phonesContainer.appendChild(phoneDiv);
    });

    toggleSpinner(false);
    
}

const processSearch= (dataLimit) =>{
  toggleSpinner(true);
  const searchField= document.getElementById('search-field');
  const searchText=searchField.value;
  loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(20);
})

document.getElementById('search-field').addEventListener('keypress',function(e){

  if(e.key=== 'Enter'){
    processSearch(20);
  }
});

const toggleSpinner= isLoading=> {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})

const loadPhoneDetails= async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res= await fetch(url);
  const data= await res.json();
  displayPhoneDetails(data.data);
}

const displayPhoneDetails= phoneData=>{
  const modalTitle= document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText= phoneData.name;
  const phoneDetails= document.getElementById('phone-details');
  phoneDetails.innerHTML=`<p>Release Date: ${phoneData.releaseDate ? phoneData.releaseDate : 'no release date found'}</p>
  <p>Storage: ${phoneData.mainFeatures ? phoneData.mainFeatures.storage : 'No storage found'}</p>
  <p>Others: ${phoneData.others ? phoneData.others.Bluetooth : 'No Bluetooth found'}</p>
  `;
}
