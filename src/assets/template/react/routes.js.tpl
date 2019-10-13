import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";

{{imports}}

export const Routes = (
    <div>
        <div className="menu">
        {{actions}}
        </div>
        <div className="content">
            <Switch>
                {{routes}}
            </Switch>
        </div>
    </div>
);