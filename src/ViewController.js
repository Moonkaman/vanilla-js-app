import Component from "./Component"
import UserFormView from "./views/UserFormView"
import UsersListView from "./views/UsersListView"

class ViewController extends Component {
    constructor(name, initialState) {
        super(name, initialState)
        this.views = {
            UsersListView: new UsersListView('UsersListView'),
            UserFormView: new UserFormView('UserFormView')
        }

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => this.setState({users: data}))
            .catch(err => console.log(err))
    }

    findUser = (userID) => {
        let user = null

        for (let i = 0; i < this.state.users.length; i++) {
            const user = this.state.users[i]
            if (user.id === userID) {
                return user 
            }
        }

        return null
    }

    createUser = (userData) => {
        this.setState(
            {
                users: [
                    ...this.state.users,
                    {
                        ...userData,
                        id: this.state.users.length + 1
                    }
                ],
                currentView: "UsersListView"
            }
        )

        this.sortUsers(this.state.sortBy)
    }

    addNewUser = () => {
        this.setState({
            currentView: 'UserFormView',
            editingUser: null
        })
    }

    submitUserEdits = (newUserData) => {
        const newUserArray = this.state.users.map(user => {
            if (user.id === newUserData.id) {
                return {
                    ...newUserData
                }
            } else {
                return user
            }
        })

        this.setState({
            users: newUserArray,
            currentView: 'UsersListView'
        })

        this.sortUsers(this.state.sortBy)
    }

    editUser = (userID) => {
        const user = this.findUser(userID)
        if (user) {
            this.setState({
                currentView: 'UserFormView',
                editingUser: user
            })
        } else {
            console.warn(`Couldn't find user with an id of ${userID}`)
        }
    }

    deleteUser = (userID) => {
        const newUserArray = this.state.users.filter(user => {
            if (user.id !== userID) {
                return user
            }
        })

        this.setState({
            users: newUserArray
        })

        this.sortUsers(this.state.sortBy)
    }

    goToHomeView = () => {
        this.setState({
            currentView: 'UsersListView',
            editingUser: null
        })
    }

    sortUsers = (property, filterString) => {
        let newSearchString = ""

        if (filterString) {
            newSearchString = filterString
        } else if (filterString !== "" && this.state.searchString) {
            newSearchString = this.state.searchString
        } else if (filterString === "" && this.state.searchString) {
            newSearchString = ""
        } else {
            newSearchString = ""
        }

        const sortedUsers = this.state.users.filter(user => {
            const lowercaseName = user.name.toLowerCase()
            if (lowercaseName.includes(newSearchString) || newSearchString === "" || !newSearchString) {
                return user
            }
        }).sort((user1, user2) => {
            if (user1[property] < user2[property]) {
                if (this.state.sortDir) {
                    return -1
                } else {
                    return 1
                }
            } else if (user1[property] > user2[property]) {
                if (this.state.sortDir) {
                    return 1
                } else {
                    return -1
                }
            } else {
                return 0
            }
        })

        this.setState({
            sortedUsers: sortedUsers,
            sortBy: property,
            searchString: newSearchString
        })
    }

    toggleSortDir = () => {
        this.setState({
            sortDir: !this.state.sortDir
        })
        this.sortUsers(this.state.sortBy)
    }

    render() {
        if (this.state.sortedUsers) {
            this.views.UsersListView.props.users = this.state.sortedUsers
        } else {
            this.views.UsersListView.props.users = this.state.users
        }
        this.views.UsersListView.props.deleteUser = this.deleteUser
        this.views.UsersListView.props.editUser = this.editUser
        this.views.UsersListView.props.addNewUser = this.addNewUser
        this.views.UsersListView.props.sortUsers = this.sortUsers
        this.views.UsersListView.props.sortBy = this.state.sortBy
        this.views.UsersListView.props.sortDir = this.state.sortDir
        this.views.UsersListView.props.toggleSortDir = this.toggleSortDir
        this.views.UsersListView.props.searchString = this.state.searchString

        this.views.UserFormView.props.back = this.goToHomeView
        this.views.UserFormView.props.user = this.state.editingUser
        this.views.UserFormView.props.submitUserEdits = this.submitUserEdits
        this.views.UserFormView.props.createUser = this.createUser

        const currentView = this.views[this.state.currentView]

        for (const view in this.views) {
            this.views[view].unmount() 
        }

        if (currentView) {
            currentView.render()
        } else {
            console.warn(`View ${this.state.currentView} doesn't exist in this.views`)
        }
    }
}

export default ViewController