import React, { useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { currentUser } from "./api/ServerAuth";
import { LoadingOutlined } from '@ant-design/icons'

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const PrivateUserRoutes = lazy(() => import("./components/routes/PrivateUserRoutes"));
const PrivateAdminRoutes = lazy(() => import("./components/routes/PrivateAdminRoutes"));
const CreateCategory = lazy(() => import("./pages/admin/category/CreateCategory"));
const UpdateCategory = lazy(() => import("./pages/admin/category/UpdateCategory"));
const CreateSubCat = lazy(() => import("./pages/admin/subCategory/CreateSubCat"));
const UpdateSubCat = lazy(() => import("./pages/admin/subCategory/UpdateSubCat"));
const CreateProduct = lazy(() => import("./pages/admin/product/CreateProduct"));
const ViewProducts = lazy(() => import("./pages/admin/product/ViewProducts"));
const UpdateProduct = lazy(() => import("./pages/admin/product/UpdateProduct"));
const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubCategoryHome = lazy(() => import("./pages/subcategory/SubCategoryHome"));
const UpdatePassword = lazy(() => import("./pages/admin/UpdatePassword"));
const AllProductsShop = lazy(() => import("./pages/AllProductsShop"));
const UserCart = lazy(() => import("./pages/UserCart"));
const CartSideDrawer = lazy(() => import("./components/drawer/CartSideDrawer"));
const CartCheckout = lazy(() => import("./pages/CartCheckout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import("./pages/Payment"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className="container col text-center p-5" >
        Mern Ecommerce Loading ... <LoadingOutlined />
      </div>
    } >
      <Header />
      <CartSideDrawer />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />

        <PrivateUserRoutes exact path="/user/history" component={History} />
        <PrivateUserRoutes exact path="/user/password" component={Password} />
        <PrivateUserRoutes exact path="/user/wishlist" component={Wishlist} />

        <PrivateAdminRoutes
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <PrivateAdminRoutes
          exact
          path="/admin/category"
          component={CreateCategory}
        />
        <PrivateAdminRoutes
          exact
          path="/admin/category/:slug"
          component={UpdateCategory}
        />
        <PrivateAdminRoutes
          exact
          path="/admin/subcategory"
          component={CreateSubCat}
        />
        <PrivateAdminRoutes
          exact
          path="/admin/subcategory/:slug"
          component={UpdateSubCat}
        />

        <PrivateAdminRoutes
          exact
          path="/admin/product"
          component={CreateProduct}
        />
        <PrivateAdminRoutes
          exact
          path="/admin/view/products"
          component={ViewProducts}
        />
        <PrivateAdminRoutes
          exact
          path="/admin/update/product/:slug"
          component={UpdateProduct}
        />

        <PrivateAdminRoutes
          exact
          path="/admin/update/password"
          component={UpdatePassword}
        />

        <PrivateAdminRoutes
          exact
          path="/admin/coupons"
          component={CreateCoupon}
        />

        <Route exact path="/view/product/:slug" component={Product} />

        <Route exact path="/category/:slug" component={CategoryHome} />

        <Route exact path="/sub-category/:slug" component={SubCategoryHome} />

        <Route exact path="/all-products/shop" component={AllProductsShop} />

        <Route exact path="/user/cart" component={UserCart} />

        <PrivateUserRoutes
          exact
          path="/user/checkout"
          component={CartCheckout}
        />

        <PrivateUserRoutes
          exact
          path="/payment"
          component={Payment}
        />

      </Switch>
    </Suspense>
  );
};

export default App;
