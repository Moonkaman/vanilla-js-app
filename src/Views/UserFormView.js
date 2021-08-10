import Component from '../Component'

class UserFormView extends Component {
    constructor(name, initialState) {
        super(name, initialState)

        this.parentElement = null

        if (!this.render) {
            console.warn(`Component ${this.name} has no render method`)
        }
    }

    createFormField(label, type, value, required = false) {
        const newFormFieldContainer = document.createElement('div')
        newFormFieldContainer.classList.add('mb-3')

        const newFormFieldLabel = document.createElement('label')
        newFormFieldLabel.classList.add('form-label')
        newFormFieldLabel.textContent = label
        newFormFieldContainer.appendChild(newFormFieldLabel)

        const br = document.createElement('br')
        newFormFieldContainer.appendChild(br)

        const newFormFieldInput = document.createElement('input')
        newFormFieldInput.setAttribute('required', required)
        newFormFieldInput.classList.add('form-control')
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

        const formCard = document.createElement('div')
        formCard.classList.add('card', 'form-card')
        this.parentElement.appendChild(formCard)

        const formCardBody = document.createElement('div')
        formCardBody.classList.add('card-body')
        formCard.appendChild(formCardBody)

        const formCardTitle = document.createElement('h5')
        formCardTitle.textContent = this.props.user ? `Edit ${this.props.user.name}` : "Create a new user"
        formCardTitle.classList.add('card-title')
        formCardBody.appendChild(formCardTitle)

        const form = document.createElement('form')

        const nameField = this.createFormField('Name:', 'text', this.props.user ? this.props.user.name : "", true)
        form.appendChild(nameField.container)

        const usernameField = this.createFormField('Username:', 'text', this.props.user ? this.props.user.username : "", true)
        form.appendChild(usernameField.container)

        const emailField = this.createFormField('Email:', 'email', this.props.user ? this.props.user.email : "")
        form.appendChild(emailField.container)

        const cancelBtn = document.createElement('button')
        cancelBtn.type = 'button'
        cancelBtn.classList.add('btn', 'btn-danger', 'cancel-btn')
        cancelBtn.textContent = "Cancel"

        cancelBtn.addEventListener('click', e => {
            this.props.back()
        })

        form.appendChild(cancelBtn)

        const submitBtn = document.createElement('button')
        submitBtn.type = 'submit'
        submitBtn.classList.add('btn', 'btn-primary')
        submitBtn.textContent = this.props.user ? "Save changes" : "Add user"
        form.appendChild(submitBtn)

        form.addEventListener('submit', e => {
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

        formCardBody.appendChild(form)

    }

    unmount() {
        if (this.parentElement) {
            this.parentElement.remove()
        }
    }
}

export default UserFormView;