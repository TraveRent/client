import { Route, Switch } from "react-router-dom";
import { 
  HomePage,
  LoginPage,
  RegisterPage,
  SelectUserProfilePage,
  DashboardVendorPage,
  AddUnitPage,
  ResultPage,
  EditUnitPage   
} from "./pages";
import { Navbar } from "./components";

export default function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/profile">
          <SelectUserProfilePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/result">
          <ResultPage />
        </Route>
        <Route path="/dashboard">
          <DashboardVendorPage />
        </Route>
        <Route path="/unit/add">
          <AddUnitPage />
        </Route>
        <Route path="/unit/edit/:id">
          <EditUnitPage />
        </Route>
      </Switch>
    </>
  );
}
