//Select input fields to extract values from them later
const candyInput = document.querySelector('#candyname')
const descInput = document.querySelector('#description')
const priceInput = document.querySelector('#price')
const quantInput = document.querySelector('#quantity')
const addBtn = document.querySelector('#submit-btn')
const candyList = document.querySelector('#candy-list')

//Add event listeners
document.addEventListener('DOMContentLoaded', getCandyList)
addBtn.addEventListener('click', addCandy)

//Functions
async function getCandyList() {
    try {
        const response = await axios.get("https://crudcrud.com/api/e380b8d2c117459b907faeb2b35a10ec/candyList")

        for(let i = 0; i < response.data.length; i++) {
            showCandies(response.data[i])
        }
    } catch (error) {
        console.log(error)
    }
}

async function addCandy(event) {
    event.preventDefault()

    //Extract values from input fields
    const candy = candyInput.value
    const desc = descInput.value
    const price = priceInput.value
    const quantity = quantInput.value
    
    //Create object of candy data to be stored on crudcrud
    const candyObj = {
        candy,
        desc,
        price,
        quantity
    }

    saveToCrudCrud(candyObj)
}

function showCandies(candyObj) {
    //Create candy list div
    const candyListDiv = document.createElement('div')
    candyListDiv.classList.add('candy-list-item')
    candyListDiv.setAttribute('id', candyObj._id)

    //Create list item for candy and price
    const candyLi = document.createElement('li')
    candyLi.classList.add('candyli')
    candyLi.innerText = candyObj.candy
    
    const descLi = document.createElement('li')
    descLi.classList.add('descli')
    descLi.innerText = candyObj.desc

    const priceLi = document.createElement('li')
    priceLi.classList.add('priceli')
    priceLi.innerText = candyObj.price

    const quantLi = document.createElement('li')
    quantLi.classList.add('quantli')
    quantLi.innerText = candyObj.quantity    

    //Append above list items to the candy list div
    candyListDiv.appendChild(candyLi)
    candyListDiv.appendChild(descLi)
    candyListDiv.appendChild(priceLi)
    candyListDiv.appendChild(quantLi)


    //Create buy1 Button
    const buy1Button = document.createElement("button")
    buy1Button.innerText = 'Buy 1'
    buy1Button.classList.add("buy1-btn")
    candyListDiv.appendChild(buy1Button)

    //Create buy2 Button
    const buy2Button = document.createElement("button")
    buy2Button.innerText = 'Buy 2'
    buy2Button.classList.add("buy2-btn")
    candyListDiv.appendChild(buy2Button)

    //Create buy3 Button
    const buy3Button = document.createElement("button")
    buy3Button.innerText = 'Buy 3'
    buy3Button.classList.add("buy3-btn")
    candyListDiv.appendChild(buy3Button)

    //Add event listener to buy1, buy2 and buy3 buttons
    buy1Button.addEventListener('click', (event) => {
        updateQuantity(event, candyObj)
    })
    buy2Button.addEventListener('click', (event) => {
        updateQuantity(event, candyObj)
    })
    buy3Button.addEventListener('click', (event) => {
        updateQuantity(event, candyObj)
    })

    //Append the candyListDiv to ul with id = candy-list i.e. candyList
    candyList.appendChild(candyListDiv)

    //Clear the input fields of form
    candyInput.value = ""
    descInput.value = ""
    priceInput.value = ""
    quantInput.value = ""
}

async function saveToCrudCrud(candyObj) {
        try {
            const response = await axios.post("https://crudcrud.com/api/e380b8d2c117459b907faeb2b35a10ec/candyList", candyObj)

            showCandies(response.data)
        } catch (error) {
            console.log(error)
        }
}

async function updateQuantity(event, candyObj) {
    const btn = event.target
    const id = candyObj._id
    const quantity = candyObj.quantity
    let updatedCandyObj
    

    if(btn.classList.contains("buy1-btn")) {
        const updatedQuantity = quantity - 1
        updatedCandyObj = {...candyObj, quantity : updatedQuantity}
    }
    else if(btn.classList.contains("buy2-btn")) {
        const updatedQuantity = quantity - 2
        updatedCandyObj = {...candyObj, quantity : updatedQuantity}
    }
    else {
        const updatedQuantity = quantity - 3
        updatedCandyObj = {...candyObj, quantity : updatedQuantity}
    }

    //Delete _id property from updatedQuantityObj
    delete updatedCandyObj._id

    try {
        await axios.put(`https://crudcrud.com/api/e380b8d2c117459b907faeb2b35a10ec/candyList/${id}`, updatedCandyObj)

        location.reload()
    } catch (error) {
        console.log(error)
    }
}