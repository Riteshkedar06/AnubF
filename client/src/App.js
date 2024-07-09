import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
// Pages
import Home from "./pages/Home";
import Ourclient from "./pages/Ourclients";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Material from "./pages/Material";
// Blog
import Blog from "./pages/Blog";
import BlogInfo from "./components/blog/BlogInfo";
// Product
import ShopProducts from "./components/Product/ShopProduct";
import ProductInfo from "./components/Product/ProductsInfo";
import MaterialCompany from "./components/UI/MaterialComapany";
// Admin Import
import Dashboard from "./components/Admin/DashBoard";
import AdminProductForm from "./components/Admin/AdminProductForm";
import AdminProductList from "./components/Admin/AdminProductList";
import AdminProductEditForm from "./components/Admin/AdminProductEditForm";
import AdminInquiries from "./components/Admin/AdminInquires";
import BlogForm from "./components/Admin/Blogform";
import AdminBlogList from "./components/Admin/AdminBlogList";
import AdminBlogEditForm from "./components/Admin/AdminBlogEditForm";
import AdminProductInfo from "./components/Admin/AdminProductInfo";
import AuthProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./components/Auth/Auth";
import AdminDashboard from "./components/Admin/AdminDashBoard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<Auth />} />
        {/* Pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/materials" element={<Material />} />
          <Route path="/material/:companyName" element={<MaterialCompany />} />
          <Route path="/ourclients" element={<Ourclient />} />
          {/* Blogs */}
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogInfo />} />
          {/* Products */}
          <Route path="/products" element={<ShopProducts />} />
          <Route path="/product/:productId" element={<ProductInfo />} />
        </Route>
        {/* Admin */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={AdminDashboard} />}
        >
          <Route index element={<ProtectedRoute element={Dashboard} />} />
          <Route
            path="products"
            element={<ProtectedRoute element={AdminProductList} />}
          />
          <Route
            path="products/create"
            element={<ProtectedRoute element={AdminProductForm} />}
          />
          <Route
            path="product/:productId"
            element={<ProtectedRoute element={AdminProductInfo} />}
          />
          <Route
            path="products/edit/:productId"
            element={<ProtectedRoute element={AdminProductEditForm} />}
          />
          <Route
            path="inquiries"
            element={<ProtectedRoute element={AdminInquiries} />}
          />
          <Route path="blog" element={<ProtectedRoute element={BlogForm} />} />
          <Route
            path="blog/get"
            element={<ProtectedRoute element={AdminBlogList} />}
          />
          <Route
            path="blog/edit/:id"
            element={<ProtectedRoute element={AdminBlogEditForm} />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
