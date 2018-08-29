import React, { Component } from 'react';

import classes from './ToppingControl.css';
import * as ToppingTypes from '../../../../ToppingTypes';

class ToppingControl extends Component {
    state = {toggledOn: this.props.toggled};

    clickHandler = () => {
        this.props.clicked(this.props.amount, this.props.side);
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

export default ToppingControl;