import React, {useState} from 'react'
import Logo from "../Assets/Logo.svg"
import {BsCart2} from 'react-icons/bs'
import {HiOutlineBars3} from 'react-icons/hi2'
import {
  Box, 
  Drawer, 
  List,
  ListItemIcon,
  ListItem, 
  ListItemButton, 
  ListItemText
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import CommentRoundedIcon from '@mui/icons-material/CommentRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false)//openMenu is used in order to make sure the navbar is responsive. setting the initial variable to false as it does not need to currently be open
  const menuOptions = [
    {
      text: 'Home',
      icon: <HomeIcon/> //can reference images taken from libraries with the syntax as well     
    },
    {
      text: 'About',
      icon: <InfoIcon/>      
    },
    {
      text: 'Testimonials',
      icon: <CommentRoundedIcon/>      
    },
    {
      text: 'Contact',
      icon: <PhoneRoundedIcon/>      
    },
    {
      text: 'Cart',
      icon: <ShoppingCartRoundedIcon/>      
    },

  ]
  return (
    <nav>
      <div className= "nav-logo-container">
        <img src={Logo} alt ="" />
      </div>
      <div className='navbar-links-container'>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="">Testimonials</a>
        <a href="">Contact</a>
        <a href="">
          <BsCart2 className='navbar-cart-icon'/>
        </a>
        <button className='primary-button'>Book Now!</button>
      </div>
      <div className='navbar-menu-container'>
        <HiOutlineBars3 onClick={() => setOpenMenu(true)}/> 

      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='right'>
        <Box
          sx={{width:250}}
          role='presentation'
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>
      
    </nav>
  )
}

export default Navbar

//get assets from github repo