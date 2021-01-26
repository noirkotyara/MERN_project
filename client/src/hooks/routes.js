import React from 'react';
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import AuthPage from './../components/AuthPage';
import DetailsPage from './../components/DetailsPage';
import LinksPage from './../components/LinksPage';
import CreatePage from './../components/CreatePage';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/create' exact><CreatePage /></Route>
                <Route path='/links' exact> <LinksPage /></Route>
                <Route path='/details/:id'><DetailsPage /></Route>
                <Redirect to='/create'><CreatePage /></Redirect>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path='/' exact><AuthPage /></Route>
                <Redirect to='/'><AuthPage /></Redirect>
            </Switch>
        )
    }
}
