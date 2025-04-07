import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
