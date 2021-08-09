class UserFormView extends Component {
    constructor(name, initialState) {
        super(name, initialState)

        this.parentElement = null

        if (!this.render) {
            console.warn(`Component ${this.name} has no render method`)
        }
    }

    createFormField(label, type, value) {
        const newFormFieldContainer = document.createElement('div')

        const newFormFieldLabel = document.createElement('label')
        newFormFieldLabel.textContent = label
        newFormFieldContainer.appendChild(newFormFieldLabel)

        const br = document.createElement('br')
        newFormFieldContainer.appendChild(br)

        const newFormFieldInput = document.createElement('input')
        newFormFieldInput.type = type
        if (value) {
            newFormFieldInput.value = value
        }
        newFormFieldContainer.appendChild(newFormFieldInput)

        return {container: newFormFieldContainer, input: newFormFieldInput}
    }

    render() {
        if (this.state.hidden) return;

        if (this.parentElement) {
            this.parentElement.remove()
        }

        this.parentElement = document.createElement('div')
        document.body.appendChild(this.parentElement)

        const backBtn = document.createElement('a')
        backBtn.textContent = '<< Back'
        backBtn.addEventListener('click', e => {
            this.props.back()
        })
        backBtn.classList.add('form-back-btn')

        this.parentElement.appendChild(backBtn)

        const form = document.createElement('form')

        const nameField = this.createFormField('Name:', 'text', this.props.user ? this.props.user.name : "")
        form.appendChild(nameField.container)

        const usernameField = this.createFormField('Username:', 'text', this.props.user ? this.props.user.username : "")
        form.appendChild(usernameField.container)

        const emailField = this.createFormField('Email:', 'email', this.props.user ? this.props.user.email : "")
        form.appendChild(emailField.container)

        const submitBtn = document.createElement('button')
        submitBtn.textContent = this.props.user ? "Save changes" : "Add user"
        form.appendChild(submitBtn)

        submitBtn.addEventListener('click', e => {
            e.preventDefault()
            if (this.props.user) {
                const newUserData = {
                    ...this.props.user,
                    name: nameField.input.value,
                    username: usernameField.input.value,
                    email: emailField.input.value
                }
                this.props.submitUserEdits(newUserData)
            } else {
                const newUserData = {
                    name: nameField.input.value,
                    username: usernameField.input.value,
                    email: emailField.input.value
                }
                this.props.createUser(newUserData)
            }
        })

        this.parentElement.appendChild(form)

    }

    unmount() {
        if (this.parentElement) {
            this.parentElement.remove()
        }
    }
}