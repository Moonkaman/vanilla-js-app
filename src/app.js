import ViewController from "./ViewController"

import './style.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

const viewController = new ViewController('ViewController', {users: [], currentView: 'UsersListView', editingUser: null})
