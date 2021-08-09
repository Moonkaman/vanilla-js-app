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
    }

    goToHomeView = () => {
        this.setState({
            currentView: 'UsersListView',
            editingUser: null
        })
    }

    render() {
        this.views.UsersListView.props.users = this.state.users
        this.views.UsersListView.props.deleteUser = this.deleteUser
        this.views.UsersListView.props.editUser = this.editUser
        this.views.UsersListView.props.addNewUser = this.addNewUser

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