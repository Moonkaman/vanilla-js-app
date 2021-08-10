import Component from "../Component"

class UsersListView extends Component {
    constructor(name, initialState) {
        super(name, initialState)

        this.parentElement = null

        if (!this.render) {
            console.warn(`Component ${this.name} has no render method`)
        }
    }

    createUserListItem(user) {
        const newUserItem = document.createElement('tr')
        // newUserItem.className = "user-item"

        const id = document.createElement('td')
        id.textContent = user.id
        newUserItem.appendChild(id)

        const name = document.createElement('td')
        name.textContent = user.name
        newUserItem.appendChild(name)

        const userName = document.createElement('td')
        userName.textContent = user.username
        newUserItem.appendChild(userName)

        const email = document.createElement('td')
        email.textContent = user.email
        newUserItem.appendChild(email)

        const actions = document.createElement('td')
        newUserItem.appendChild(actions)

        const buttonGroup = document.createElement('div')
        buttonGroup.classList.add('btn-group', 'user-button-group')
        actions.appendChild(buttonGroup)

        const userDeleteBtn = document.createElement('button')
        userDeleteBtn.classList.add('btn', 'btn-danger')

        userDeleteBtn.addEventListener('click', e => {
            this.props.deleteUser(user.id)
        })

        const userEditBtn = document.createElement('button')
        userEditBtn.classList.add('btn', 'btn-primary')
        userEditBtn.textContent = "Edit"

        userEditBtn.addEventListener('click', e => {
            this.props.editUser(user.id)
        })

        buttonGroup.appendChild(userEditBtn)

        const deleteIcon = document.createElement('i')
        deleteIcon.classList.add('fas', 'fa-trash')

        userDeleteBtn.appendChild(deleteIcon)

        buttonGroup.append(userDeleteBtn)

        // const userInfoBtn = document.createElement('button')
        // userInfoBtn.textContent = 'info'
        // userInfoBtn.dataset.bsToggle = 'collapse'
        // userInfoBtn.dataset.bsTarget = '#user-info' + user.id
        // newUserItem.appendChild(userInfoBtn)


        const userInfoContainer = document.createElement('div')
        userInfoContainer.id = 'user-info' + user.id
        userInfoContainer.classList.add('collapse')
        newUserItem.appendChild(userInfoContainer)

        const testH1 = document.createElement('h1')
        testH1.textContent = "this is just a test"
        userInfoContainer.appendChild(testH1)
        

        return newUserItem
    }

    render() {
        if (this.props.hidden) return

        if (this.parentElement) {
            this.parentElement.remove()
        }

        this.parentElement = document.createElement('div')
        this.parentElement.classList.add('card', 'user-list-table')
        document.body.appendChild(this.parentElement)

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body', 'user-list-table')
        this.parentElement.appendChild(cardBody)


        const addNewUserBtn = document.createElement('button')
        addNewUserBtn.classList.add('btn', 'btn-success')
        addNewUserBtn.textContent = 'Add new user'
        addNewUserBtn.addEventListener('click', e => {
            this.props.addNewUser()
        })
        cardBody.appendChild(addNewUserBtn)

        const userListContainer = document.createElement('table')
        userListContainer.classList.add('table', 'table-striped')
        cardBody.appendChild(userListContainer)

        const userListContainerHead = document.createElement('thead')
        userListContainer.append(userListContainerHead)

        const userListContainerHeadTr = document.createElement('tr')
        userListContainerHead.appendChild(userListContainerHeadTr)

        const userListContainerHeadThID = document.createElement('th')
        userListContainerHeadThID.textContent = "ID"
        userListContainerHeadTr.appendChild(userListContainerHeadThID)

        const userListContainerHeadThName = document.createElement('th')
        userListContainerHeadThName.textContent = "Name"
        userListContainerHeadTr.appendChild(userListContainerHeadThName)

        const userListContainerHeadThUserName = document.createElement('th')
        userListContainerHeadThUserName.textContent = "Username"
        userListContainerHeadTr.appendChild(userListContainerHeadThUserName)

        const userListContainerHeadThEmail = document.createElement('th')
        userListContainerHeadThEmail.textContent = "Email"
        userListContainerHeadTr.appendChild(userListContainerHeadThEmail)

        const userListContainerHeadThActions = document.createElement('th')
        userListContainerHeadThActions.textContent = ""
        userListContainerHeadTr.appendChild(userListContainerHeadThActions)

        const userListContainerBody = document.createElement('tbody')
        userListContainer.appendChild(userListContainerBody)        

        this.props.users.forEach(user => {
            userListContainerBody.appendChild(this.createUserListItem(user))
        })

        
    }

    unmount() {
        if (this.parentElement) {
            this.parentElement.remove()
        }
    }
}

export default UsersListView