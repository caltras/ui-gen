import * as React from "react";
import { Route, Switch } from "react-router-dom";

import UserCreate from '../user/create.page';
import UserUpdate from '../user/update.page';
import UserList from '../user/list.page';
import EventCreate from '../event/create.page';
import EventUpdate from '../event/update.page';
import EventList from '../event/list.page';

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