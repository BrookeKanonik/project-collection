import React from 'react'

import {Link} from 'react-router-dom'
// need to make the header clickable, so we are importing link from rrd

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import './MainNavigation.css'

// inside the first button will be the hamburger menu 

const MainNavigation = props => {
    return (
    <React.Fragment>
    <SideDrawer>
        <nav className='main-navigation__drawer-nav'>
            <NavLinks />
        </nav>
    </SideDrawer>
    <MainHeader>
        <button className='main-navigation__menu-btn'>
            <span />
            <span/>
            <span/>
        </button>
        <h1 className='main-navigation__title'>
            <Link to='/'>Your Places</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
            <NavLinks />
        </nav>
    </MainHeader>
    </React.Fragment>
    )
}

// everything in MainHeader goes to where MainHeader is with the props.children tag

export default MainNavigation; 