import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CookiesProvider } from "react-cookie";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import { ThemeProvider } from "styled-components";
import { theme } from "./style/constants";
import "./App.css";
import "./index.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./layout/CLayout";
import { ConfigProvider } from "antd";
import Home from "./pages/Home";
import Profile from "./pages/auth/Profile";
import Order from "./pages/order/Order";
import PrivateRoutes from "./components/PrivateRoutes";
import Login from "./pages/auth/Login";
import Restaurant from "./pages/restaurant/Restaurant";
import Products from "./pages/restaurant/ProductsList";
import Orders from "./pages/order/Orders";
import Register from "./pages/auth/Register";
import CategoriesList from "./pages/restaurant/CategoriesList";
import CategoryDetail from "./pages/restaurant/CategoryDetail";
import ProductPage from "./pages/restaurant/ProductPage";
import NewProductPage from "./pages/restaurant/NewProductPage";
import Address from "./pages/restaurant/Address";

function App() {
  return (
    <ErrorBoundary>
      <CookiesProvider>
        <ConfigProvider theme={{ hashed: false }}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route element={<PrivateRoutes />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/orders">
                          <Route index={true} element={<Orders />} />
                          <Route path=":id" element={<Order />} />
                        </Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/restaurant" element={<Restaurant />} />
                        <Route path="/address" element={<Address />} />

                        <Route path="/categories">
                          <Route index={true} element={<CategoriesList />} />
                          <Route path=":id" element={<CategoryDetail />} />
                        </Route>

                        <Route path="/products">
                          <Route index={true} element={<Products />} />
                          <Route path=":id" element={<ProductPage />} />
                          <Route path="new" element={<NewProductPage />} />
                        </Route>
                      </Route>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </Layout>
                </BrowserRouter>
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </ConfigProvider>
      </CookiesProvider>
    </ErrorBoundary>
  );
}

export default App;
