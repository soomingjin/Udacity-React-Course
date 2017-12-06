import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from '../actions';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        Hello World
      </div>
    );
  }
}

// map redux state to the compoonent's props
function mapStateToProps (calendar) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return {
    calendar: dayOrder.map((day) => ({
      day,
      meal: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
        ? calendar[day][meal]
        : null

        return meals;
      },{})
    }))
  }
}

// May not be that useful, only optimises code writing I guess..
function mapDispatchToProps (dispatch){
  return {
    selectRecipe: (data) => dispatch(addRecipe(data)),
    remove: (data) => dispatch(removeFromCalendar(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
