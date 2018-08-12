import React, { Component } from 'react';

import classes from './BuildControl.css';

class BuildControl extends Component {
    state = {
        toggled: this.props.toggled
    }
    toggle = (event) => {
        /* this.setState( prevState => {
            return { toggled: !prevState.toggled} });
        
        console.log('button toggle',this.state.toggled); */
        this.props.clicked(event, this.props.name,  this.props.side,  this.props.amount, this.props.toggled);
       
        
    }
    render() {
        const label = this.props.amount === "EXTRA" ? "Extra" : null;
        const thisClass = classes[this.props.class]
        let currClass = this.props.toggled ? [thisClass, classes.ToggledOn].join(' ')   : thisClass;
        console.log('button toggle ', this.props.toggled, 'currclass ', currClass);
        return (
            <button
                className={currClass}

                onClick={(event) => this.toggle(event)}>
                {label}
            </button>
        );
    }    
  

};

export default BuildControl;