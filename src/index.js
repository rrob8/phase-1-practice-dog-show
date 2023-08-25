document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/dogs`)
    .then(response=> response.json())
    .then(data=> {
        dogTable(data)
    })

})



const tableBody = document.getElementById('table-body')
const dogFormGroup = document.getElementById('dog-form')
const dogInput = dogFormGroup[0]
const breedInput = dogFormGroup[1]
const sexInput = dogFormGroup[2]
const dogFormBtn = dogFormGroup[3]
dogFormBtn.addEventListener('click',(e) =>{
    e.preventDefault()
    submitEditDog ()
})



function dogTable (data) {
    

    data.forEach(dog=> {
        const dogRow = document.createElement('tr')
        dogRow.id = dog.id
        

        //name
        const dogName = document.createElement('td')
        dogName.className = 'table-name'
        dogName.textContent = dog.name
        dogRow.appendChild(dogName)
        //breed
        const dogBreed = document.createElement('td')
        dogBreed.textContent = dog.breed 
        dogRow.appendChild(dogBreed)

        //sex
        const dogSex = document.createElement('td')
        dogSex.textContent = dog.sex 
        dogRow.appendChild(dogSex)

        //button
        const dogButton = document.createElement('button')
        dogButton.textContent = 'Edit'  
        dogButton.addEventListener('click', (event) =>{
            event.preventDefault()
         editDog(dog)
    })
        dogRow.appendChild(dogButton)

        tableBody.appendChild(dogRow)
    })
}

function editDog(dog) {
    console.log(`${dog.name} is about to be edited`)
    dogInput.value = dog.name
    breedInput.value = dog.breed
    sexInput.value = dog.sex
    dogInput.id = dog.id
}

function submitEditDog() {
// grab the new value from the form
console.log(dogInput.value, breedInput.value, sexInput.value)
currentDog = dogInput.id
tableBody.innerHTML =''
//make a patch request
fetch(`http://localhost:3000/dogs/${currentDog}`,{
    method:"PATCH",
    headers: {
        "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify({
        "name": dogInput.value,
        "breed": breedInput.value,
        "sex": sexInput.value
})
})
.then(response => response.json())
.then(data => {
    fetch(`http://localhost:3000/dogs`)
    .then(response=> response.json())
    .then(data=> {
        dogTable(data)
    })

})








}