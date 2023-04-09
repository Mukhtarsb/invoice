import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/homePage";
import Invoice from "./pages/invoice/invoice";
import NotFound from "./pages/notFound/notFound";
import Login from "./pages/login/login";
import Registration from "./pages/registration/registration";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="invoice">
            <Route index element={<Invoice />} />
            <Route path=":string" element={<Invoice />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
