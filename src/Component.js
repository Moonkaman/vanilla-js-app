class Component {
    constructor(name, initialState = {}) {
        this.state = initialState
        this.name = name
        this.props = {}
    }

    compareState(oldState, currentState) {
        return JSON.stringify(oldState) === JSON.stringify(currentState)
    }

    stateUpdated(oldState) {
        const equal = this.compareState(oldState, this.state)

        if (equal) {
            console.log("No changes")
        } else if (!equal) {
            if (this.render) {
                this.render()
            } else {
                console.warn(`Component ${this.name} has no render method`)
            }
        }
    }

    setState(newState) {
        if (typeof newState !== 'object') {
            console.warn('setState requires an object to be passed in')
            return
        }

        this.oldState = {
            ...this.state
        }

        this.state = {
            ...this.state,
            ...newState
        }

        this.stateUpdated(this.oldState)
    }
}

export default Component