import index from "../pages/admin/dashboard";
import Edit from "../pages/admin/products/Edit";
import List from "../pages/admin/products/List";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Notice from "../pages/admin/notice/index";

export const mainRoutes=[{
    path: "/login",
    component: Login
},
{
    path: "/404",
    component: PageNotFound
}]

export const adminRoutes=[{
    path: "/admin/dashboard/:id",
    isShow: false,
    title:'项目详情',
    component: index   
},
{
    path: "/admin/products",
    component: List,
    isShow: true,
    title:'项目列表',   
    exact: true
},
{
    path: "/admin/products/edit/:id",
    isShow: false,
    component: Edit
},
{
    path: "/admin/notice", 
    component: Notice,
    isShow: false
}
]