import React, {useState} from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap'
import ConvoBot from './ConvoBot';
import './navbar.css'
import { useAuth } from "../contexts/AuthContext"
import { useSelector } from "react-redux";
import {  useTranslation } from 'react-i18next'
function Navigation() {
    const [value, setValue] = useState({value:"jap"})
    const { logout } = useAuth()
    const {t, i18n} = useTranslation();
    const  {currentUser}  = useAuth()
    const signout = ()=> {
        logout()
        currentUser = null
    }
    

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

    const handleChange = (event) => {
        console.log("selected val is ", event.target);
        console.log("selected val is ", event.target.href);
        console.log("selected val is ", event.target.name);
        let newlang = event.target.name;
        setValue(() => ({ value: event.target.name }));
        console.log("state value is", newlang);
        i18n.changeLanguage(newlang);
      };
    
    return (
        <div>
            <div className="row">
                    <div className="col" style={{padding: 0, margin: 0, backgroundColor : "rgb(59, 58, 58)"}}>

                            <Navbar  bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/">{t('Circuit Benders')}</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav" title="collapse"  className="justify-content-end">
                                    <Nav className="ml-auto">
                                    <Nav.Link href="/" >{t('Home')}</Nav.Link>
                                    <Nav.Link href="/login" onClick={signout}>{currentUser ? t('Logout') : t('login')}</Nav.Link>
                                    <Nav.Link href="/about">{t('About Us')}</Nav.Link>
                                    <Nav.Link href="/update-profile" >{t('Profile')}</Nav.Link>
                                    {/* <Nav.Link href="/donate" style = {{pointerEvents: currentUser ? 'auto' : 'none'}}>{t('Donate')}</Nav.Link> */}
                                    <NavDropdown title={t('Product')} id="basic-nav-dropdown" href="/product">
                                    <NavDropdown.Item  href = '/product' name="en">{t('Electronics')}</NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i><span className="cartlogo_badge" style={{ padding:(getCartCount() !== 0)? '10px': '0px'  }}>{(getCartCount() !== 0) ? getCartCount() : ''}</span></Nav.Link>
                                    <NavDropdown title={t('Language')} id="basic-nav-dropdown">
                                        <NavDropdown.Item onClick={handleChange} href = '/' name="en">{t('English')}</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleChange}  href = '/' name="jap">{t('Japanese')}</NavDropdown.Item>
                                        {/* <NavDropdown.Item href="#action/3.3">IOT Boards</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">ESP 8266</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Nodemcu</NavDropdown.Item> */}
                                    </NavDropdown>
                                    </Nav>
                                    {/* <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    </Form> */}
                                </Navbar.Collapse>
                            </Navbar>
                            <br /> 
                    </div>
                </div>
                <div style={{ display: 'flex', zIndex: 1, justifyContent: 'center',position: 'fixed', bottom: '30px', right: '30px' }}>
                <ConvoBot/>
                </div>      
        </div>
    )
}

export default Navigation

