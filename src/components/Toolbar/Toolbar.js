import React from 'react';
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div></div>
            <div className="toolbar__logo"><a href="/">Dataiku Dev Challenge</a></div>
            <div className="toolbar_navigation-items">
                <ul>
                    <li><a href="#project">Project</a></li>
                    <li><a href="#calcul">Calcul</a></li>
                    <li><a href ="#algorithm">Algorithm</a></li>
                    <li><a href ="#functobjects">Functions and Objects</a></li>
                    <li><a href ="#about">About</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
);

export default toolbar;