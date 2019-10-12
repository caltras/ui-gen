import * as React from "react";
import { Route, Switch, Link } from "react-router-dom";

{{imports}}

export const Routes = (
    <div>
        <div class="menu">
        {{actions}}
        </div>
        <div class="content">
            <Switch>
                {{routes}}
            </Switch>
        </div>
    </div>
);