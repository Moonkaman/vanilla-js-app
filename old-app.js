let state = {
    users: []
}

let screenElements = {
    listDiv: null
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => updateState('users', data))
    .catch(err => console.log(err))

window.setTimeout(_ => {


    updateState('users', [
        ...state.users,
        {
            name: "booger"
        }
    ])
}, 5000)

function updateState(property, value) {
    const oldState = {
        ...state
    }

    state = {
        ...state,
        [property]: value
    }

    stateUpdated(oldState)
}

function displayNames(arr) {
    let scrollPos = 0
    if (screenElements.listDiv) {
        scrollPos = screenElements.listDiv.scrollTop
        screenElements.listDiv.remove()
    }

    let nameList = document.createElement('div')

    
    
    nameList.className = "user-list-cont"
    document.body.appendChild(nameList)

    // nameList.addEventListener('scroll', e => {
    //     console.log(nameList.scrollTop)
    // })

    screenElements.listDiv = nameList

    arr.forEach(user => {
        const textNode = document.createElement('div')
        textNode.textContent = user.name
        textNode.className = 'user-item'
        nameList.appendChild(textNode)
    });

    console.log(nameList.clientHeight)
    nameList.scrollTop = scrollPos
}

function compareObjects(obj1, obj2) {
    const obj1Stringified = JSON.stringify(obj1)
    const obj2Stringified = JSON.stringify(obj2)

    console.log(obj1Stringified === obj2Stringified)

    return obj1Stringified === obj2Stringified
}

function stateUpdated(oldState) {
    const equal = compareObjects(oldState, state)

    if (equal) {
        console.log("No changes")
    } else if (!equal && oldState.users.length > 0) {
        displayNames(state.users)
    } else {
        displayNames(state.users)
    }
}