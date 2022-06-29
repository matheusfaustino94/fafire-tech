import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Departament from "./pages/Department";
import Professor from "./pages/Professor";
// import Allocation from "./pages/Allocation";

const routes = [
  {
    path: "/",
    name: "Home",
    visible: false,
    component: Home,
  },
  {
    path: "/courses",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/departament",
    name: "Departament",
    component: Departament,
  },
  {
    path: "/professor",
    name: "Professor",
    component: Professor,
  },
  //   {
  //     path: "/allocations",
  //     name: "Allocations",
  //     component: Allocation,
  //   },
];

const Router = () => (
  <BrowserRouter>
    <Layout routes={routes}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            component={route.component}
            exact
            key={index}
            path={route.path}
          />
        ))}
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Router;
