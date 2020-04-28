const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      { path: "/about", component: () => import("pages/About.vue") },
      { path: "/:id", component: () => import("pages/Project.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push(<any>{
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
