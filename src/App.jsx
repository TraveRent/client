import { Route, Switch } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, DashboardVendorPage, AddUnitPage } from "./pages";
import { Navbar } from "./components";

export default function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/dashboard">
          <DashboardVendorPage />
        </Route>
        <Route path="/unit/add">
          <AddUnitPage />
        </Route>
      </Switch>
    </>
  );
}
