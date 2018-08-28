import React, { Component } from 'react';

import classes from './BuildControl.css';
import * as ToppingTypes from '../../../../ToppingTypes';

class BuildControl extends Component {
    state = {toggledOn: this.props.toggled};

    clickHandler = () => {
        //console.log('bctog ', this.props.toggled)
        this.props.clicked(this.props.amount, this.props.side, this.props.toggled);
        this.setState({toggledOn: !this.state.toggledOn});
    }
    
    render () {
        const baseClass = this.props.amount === ToppingTypes.Regular ? classes[this.props.side] :
            classes.Extra
        const toggledClass = this.props.toggled ? [baseClass, classes.ToggledOn].join(' ') : baseClass;
        return (
            <button
                className={toggledClass}

                onClick={this.clickHandler}>
                {this.props.label}
            </button>
        );
    }
};

export default BuildControl;