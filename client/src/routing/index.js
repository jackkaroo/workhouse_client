import { Route, Switch } from "react-router-dom";

import Home from "../containers/Home"
import Auth from "../containers/Auth"
import WorkerCabinet from "../containers/WorkerCabinet"
import OwnerCabinet from "../containers/OwnerCabinet"

export default function () {
  return (

      <Switch>
        <Route path="/worker">
          <WorkerCabinet/>
        </Route>
        <Route path="/owner">
          <OwnerCabinet/>
        </Route>
        <Route path="/houses">
          <Home/>
        </Route>
        <Route path="/">
          <Auth/>
        </Route>
      </Switch>

  );
}
