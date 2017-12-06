import React, { Component } from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps,)(App);
