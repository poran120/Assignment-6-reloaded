// Phone search API = https://openapi.programming-hero.com/api/phones?search=${searchText}

// Phone details url = https://openapi.programming-hero.com/api/phone/${id}


const loadPhones = (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';


    //display show mobiles only 20
    phones = phones.slice(0, 12)

    //no phone founds
    const noPhones = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
         <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque magni repellendus dolorem in? Odit, soluta.</p>
                </div>
                <button onclick="loadPhonesDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Show Details
            </button>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    })
}

document.getElementById('button-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchText.value = '';
    loadPhones(searchText)
})


const loadPhonesDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadPhoneDetails(data.data))
}

const displayLoadPhoneDetails = phone => {
    console.log(phone)

    const displayModal = document.getElementById('exampleModalLabel')
    displayModal.innerText = phone.name;
    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <img class="p-5" src="${phone.image}" alt="">
    <p>Storage: ${phone.mainFeatures.chipSet}</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>ReleaseDate: ${phone.releaseDate ? phone.releaseDate : 'No releaseDate found'}</p>
    `;
}
// loadPhonesDetails()
// loadPhones()