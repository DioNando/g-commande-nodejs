const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "client", component: () => import("pages/Client.vue") },
      { path: "client/:id", component: () => import("pages/Client.vue") },
      { path: "produit", component: () => import("pages/Produit.vue") },
      { path: "produit/:id", component: () => import("pages/Produit.vue") },
      { path: "commande", component: () => import("pages/Commande.vue") },
      { path: "commande/:id", component: () => import("pages/Commande.vue") },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
