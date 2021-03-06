# KanBan styled Dragable Task-Management System
### A react-bootstrap application with beautiful cards and boards with styles hand-crafted from scratch
---

## Get Started

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### The App is configured to look for backend services on port 3002 by default. Fell free to modify it as per your will.
# You will notice couple of errors in UI console. These errors persist due to a peer dependency and in no way will impact the useability of this app.
---
## Backend for this project

Follow this link to my github repo [draggable-task-manager-backend](https://github.com/lakshyads/dragable-task-manager-backend) 

---
## Some features:

- Built entirely out of functional components
- Preferred passing props as children (props.children) whereever possible
- Fully functional drag and drop functionality for task cards
- CRUD functionality for both User-boards as well as Task-Cards

## This app uses following packages

- [Reactstrap](https://www.npmjs.com/package/reactstrap) for stateless Bootstrap components
- [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) for smooth and accurate drag drop functionality
- [Axios](https://www.npmjs.com/package/axios) A promise based HTTP cient
- [react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome) Font Awesome 5 React component using SVG with JS
---
## Screenshots

#### Overview
![Overview](https://github.com/lakshyads/draggable-task-manager-frontend/blob/master/src/assets/img/overview.jpeg)
#### Add User Board
![Add User](https://github.com/lakshyads/draggable-task-manager-frontend/blob/master/src/assets/img/addUser.jpeg)
#### Add Task
![Add Task](https://github.com/lakshyads/draggable-task-manager-frontend/blob/master/src/assets/img/addTask.jpeg)
#### Drag & Drop tasks across boards
![Drag & Drop](https://github.com/lakshyads/draggable-task-manager-frontend/blob/master/src/assets/img/dnd.jpeg)
#### Delete User
![Delete User](https://github.com/lakshyads/draggable-task-manager-frontend/blob/master/src/assets/img/deleteUser.jpeg)

---
## Project structure

├───.vscode
├───public
└───src
    ├───components
    │   ├───CardAddButton
    │   ├───CardDeleteButton
    │   ├───CardStatusBadge
    │   ├───ModalAddEditTask
    │   ├───ModalAddEditUser
    │   ├───Task
    │   └───UserBoard
    ├───hooks
    ├───utils
    └───Views
        ├───App
        └───TaskView

