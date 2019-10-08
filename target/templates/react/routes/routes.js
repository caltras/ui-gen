import * as React from "react";
import { Route, Switch } from "react-router-dom";

import UserCreate from '../user/user.create';
import UserUpdate from '../user/user.update';
import UserList from '../user/user.list';
import EventCreate from '../event/event.create';
import EventUpdate from '../event/event.update';
import EventList from '../event/event.list';

export const Routes = (
    <Switch>
        <Route exact={true} path="/user/create" component={UserCreate}/>
        <Route exact={true} path="/user/update" component={UserUpdate}/>
        <Route exact={true} path="/user/list" component={UserList}/>
        <Route exact={true} path="/event/create" component={EventCreate}/>
        <Route exact={true} path="/event/update" component={EventUpdate}/>
        <Route exact={true} path="/event/list" component={EventList}/>
    </Switch>
);