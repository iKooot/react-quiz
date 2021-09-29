import React, {Component} from 'react'
import classes from './Drawer.module.sass'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'



class Drawer extends Component {

  clickHandle = () => {
    this.props.onClose()
  }
  
  renderLinks = (linksArr) => {
    return linksArr.map((link, i) => {
      return (
        <li key={i}>
          <NavLink 
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandle}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]

    if(!this.props.isOpen) {
      cls.push(classes.close)
    }

    const links = [
      {to: '/', label: 'List of quiz', exact: true},
    ]

    if(this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create your quiz', exact: false})
      links.push({to: '/logout', label: 'Logout', exact: false})
    } else {
      links.push({to: '/auth', label: 'Autorisation', exact: false})
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {
          this.props.isOpen
            ? <Backdrop onClick={this.props.onClose}/>
            : null
        }
        
      </React.Fragment>
    )
  }
}

export default Drawer