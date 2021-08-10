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

        userEditBtn.addEventListener('click', e => {
            this.props.editUser(user.id)
        })

        buttonGroup.appendChild(userEditBtn)

        const deleteIcon = document.createElement('i')
        deleteIcon.classList.add('fas', 'fa-trash')

        const editIcon = document.createElement('i')
        editIcon.classList.add('fas', 'fa-user-edit')

        userEditBtn.appendChild(editIcon)
        userDeleteBtn.appendChild(deleteIcon)

        buttonGroup.append(userDeleteBtn)  

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

        const title = document.createElement('h4')
        title.textContent = "All Users"
        title.classList.add('card-title')
        cardBody.appendChild(title)

        const filterContainer = document.createElement('div')
        filterContainer.classList.add('filter-cont')
        cardBody.appendChild(filterContainer)

        const addNewUserBtn = document.createElement('button')
        addNewUserBtn.classList.add('btn', 'btn-success')
        addNewUserBtn.textContent = 'Add new user'
        addNewUserBtn.addEventListener('click', e => {
            this.props.addNewUser()
        })
        filterContainer.appendChild(addNewUserBtn)

        const filterOptionsContainer = document.createElement('div')
        filterOptionsContainer.classList.add('filter-options-cont')
        filterContainer.appendChild(filterOptionsContainer)

        const filterDirectionBtn = document.createElement('button')
        filterDirectionBtn.classList.add('btn', 'btn-light')
        filterOptionsContainer.appendChild(filterDirectionBtn)
        filterDirectionBtn.addEventListener('click', e => {
            this.props.toggleSortDir()
        })

        const filterIcon = document.createElement('i')
        filterIcon.classList.add('fas', this.props.sortDir ? 'fa-sort-amount-down-alt' : 'fa-sort-amount-up')
        filterDirectionBtn.appendChild(filterIcon)

        const filterBySelect = document.createElement('select')
        filterBySelect.classList.add('form-select')
        filterOptionsContainer.appendChild(filterBySelect)

        filterBySelect.addEventListener('change', e => {
            this.props.sortUsers(e.target.value)
        })

        const filterByIDOption = document.createElement('option')
        filterByIDOption.textContent = 'ID'
        filterByIDOption.value = 'id'
        filterBySelect.appendChild(filterByIDOption)

        const filterByNameOption = document.createElement('option')
        filterByNameOption.textContent = 'Name'
        filterByNameOption.value = 'name'
        filterBySelect.appendChild(filterByNameOption)

        const filterByUserNameOption = document.createElement('option')
        filterByUserNameOption.textContent = 'Username'
        filterByUserNameOption.value = 'username'
        filterBySelect.appendChild(filterByUserNameOption)

        const filterByEmailOption = document.createElement('option')
        filterByEmailOption.textContent = 'Email'
        filterByEmailOption.value = 'email'
        filterBySelect.appendChild(filterByEmailOption)

        const filterOptions = [
            filterByIDOption,
            filterByNameOption,
            filterByUserNameOption,
            filterByEmailOption
        ]

        for (let i = 0; i < filterOptions.length; i++) {
            if (this.props.sortBy == filterOptions[i].value) {
                filterOptions[i].selected = 'selected'
                break
            }
        }

        const nameSearchInput = document.createElement('input')
        nameSearchInput.value = (this.props.searchString && this.props.searchString !== "") ? this.props.searchString : ""
        nameSearchInput.placeholder = 'Search by name'
        nameSearchInput.type = "text"
        nameSearchInput.classList.add('form-control')
        cardBody.appendChild(nameSearchInput)

        if (this.props.searchString) {
            nameSearchInput.focus()
        }

        nameSearchInput.addEventListener('input', e => {
            
            this.props.sortUsers(this.props.sortBy, e.target.value)
        })

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