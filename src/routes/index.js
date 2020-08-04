import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import LogIn from '../pages/LogIn';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashbord';
import Cars from '../pages/Cars';
import Rentals from '../pages/Rentals';
import Car from '../pages/Car';
import Rental from '../pages/Rental';
export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={LogIn} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/cars" component={Cars} isPrivate />
      <Route path="/rentals" component={Rentals} isPrivate />
      <Route path='/car/:car_id' component={Car}  isPrivate/>
      <Route path='/rental/:rental_id' component={Rental}  isPrivate/>
      <Route component={Home} />
    </Switch>
  );
}