import React from 'react'
import classes from './Loader.module.sass'

const Loader = props => {
  return (
    <div className={classes.Center}>
      <div className={classes.Loader}>
        <div/><div/><div/><div/>
      </div>
    </div>
  )
}

export default Loader
