import { Switch, Route } from "react-router-dom";

/* Pages */
import NotFound from "@/pages/NotFound";
import List from "@/pages/List";
import Groups from "@/pages/Groups";

function RoutesPages() {
    return (
        <Switch>
            <Route exact path={`/${APP_PREFIX}`} component={List} />
            <Route exact path={`/${APP_PREFIX}/list`} component={List} />
            <Route exact path={`/${APP_PREFIX}/groups`} component={Groups} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default RoutesPages;
