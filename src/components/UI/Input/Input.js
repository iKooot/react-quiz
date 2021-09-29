import React from 'react'
import classes from './Input.module.sass'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

// function isValid({valid, touched, shoulValidate}) {
//   return valid && shoulValidate && touched
// }

const Input = props => {
  const inputType = props.type || 'text'
  const cls= [classes.Input]
  const htmlFor = `${inputType}-${Math.random()}`

  if(isInvalid(props)) {
    cls.push(classes.invalid)
  }

  // if(isValid(props)) {
  //   cls.push(classes.valid)
  // }

  return (
    <div className={cls.join(' ')}>
      <label 
        htmlFor={htmlFor}
      >
        {props.label}
      </label>
      <input 
        type={inputType} 
        id={htmlFor} 
        value={props.value} 
        onChange={props.onChange}
      />
      {
        isInvalid(props) && <span>{props.errorMessage || 'Enter valid value'}</span>
      }
      {/* {
        isValid(props) && <span>{props.successMessage || 'Done!'}</span>
      } */}
    </div>
  )
}

export default Input
