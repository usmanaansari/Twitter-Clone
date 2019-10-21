import React, {Component} from 'react'

class CreateUserForm extends Component{ 
    constructor(){
        super()
        this.state ={
            username: "",
            password: "",
            email: "",
            verify: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        const createUserForm = event.target;

    }
}
