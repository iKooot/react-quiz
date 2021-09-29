import React, {Component} from 'react'
import classes from './Auth.module.sass'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from 'axios'
import {connect} from "react-redux";
import {auth} from '../../store/actions/auth'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'You entered wrong email adress',
        successMessage: 'Done!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'You entered wrong password',
        successMessage: 'Done!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      },
    }
  }

  loginHandler = () => {
    this.props.auth(
        this.state.formControls.email.value,
        this.state.formControls.password.value,
        true)
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true,
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNWefwl39LV64I_MCGoLw3CX9v7xqi8P0', authData)
    //   console.log(response)
    // } catch (e) {
    //   console.log(e);
    // }
  }

  registerHandler = () => {
    this.props.auth(
        this.state.formControls.email.value,
        this.state.formControls.password.value,
        false)
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true,
    // }
    // try {
    //   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNWefwl39LV64I_MCGoLw3CX9v7xqi8P0', authData)
    //
    //   console.log(response);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  submitHandler = e => {
    e.preventDefault()
  }

  onChangeHandler = (e, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = e.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach( name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({formControls, isFormValid})
  }

  validateControl(value, validation) {
    
    if(!validation) {
      return true
    }
    
    let isValid = true
    
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    
    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }
    
    return isValid
  }

  renderInputs() {
    const inputs = Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          successMessage={control.successMessage}
          shouldValidate={!!control.validation}
          onChange={ e => {
            this.onChangeHandler(e, controlName)
          }}
        />
      )
    })

    return inputs
  }

  render() {
    return(
      <div className={classes.Auth}>
        <div>
          <h1>Autorisation</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {
              this.renderInputs()
            }

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Log in
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return{
//
//   }
// }

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)

