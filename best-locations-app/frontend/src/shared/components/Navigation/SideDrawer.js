import React from "react";
import ReactDOM from "react-dom"; //ReactDOM is the default export not {ReactDOM}
import { CSSTransition } from 'react-transition-group'

import './SideDrawer.css'

const SideDrawer = props => {
    const content =  (
        <CSSTransition 
            in={props.show} 
            timeout={200} 
            classNames="slide-in-left" 
            mountOnEnter 
            unmountOnExit
        >
            <aside className="side-drawer">{props.children}</aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
};

// going to create a portal and will display the content where drawer-hook is in the index.html
export default SideDrawer;