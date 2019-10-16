import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "../pages/page.not.found";
import Welcome from "../pages/welcome";

{{imports}}

export const Routes = (
    <div>
        <div className="menu">
        {{actions}}
        </div>
        <div className="content">
            <Switch>
                <Route exact={true} path="/" component={Welcome} />
                {{routes}}
                <Route path="*" component={NotFound} />
            </Switch>
        </div>
    </div>
);