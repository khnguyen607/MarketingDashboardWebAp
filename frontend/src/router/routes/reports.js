export default [
  {
    path: "/reports/entry/marketing",
    name: "reports-entry-marketing",
    component: () => import("@/views/reports/reports-entry/marketing.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/marketing/:id",
    name: "reports-entry-marketing-edit",
    component: () => import("@/views/reports/reports-entry/marketing.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/month",
    name: "reports-entry-month",
    component: () => import("@/views/reports/reports-entry/month.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/month/:id",
    name: "reports-entry-month-edit",
    component: () => import("@/views/reports/reports-entry/month.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/sale",
    name: "reports-entry-sale",
    component: () => import("@/views/reports/reports-entry/sale.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/sale/:id",
    name: "reports-entry-sale-edit",
    component: () => import("@/views/reports/reports-entry/sale.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/income",
    name: "reports-entry-income",
    component: () => import("@/views/reports/reports-entry/income.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/income/:id",
    name: "reports-entry-income-edit",
    component: () => import("@/views/reports/reports-entry/income.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/bonus",
    name: "reports-entry-bonus",
    component: () => import("@/views/reports/reports-entry/bonus.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/bonus/:id",
    name: "reports-entry-bonus-edit",
    component: () => import("@/views/reports/reports-entry/bonus.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/saleTarget",
    name: "reports-entry-sale-target",
    component: () => import("@/views/reports/reports-entry/saleTarget.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/saleTarget/:id",
    name: "reports-entry-sale-target-edit",
    component: () => import("@/views/reports/reports-entry/saleTarget.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/page",
    name: "reports-entry-page",
    component: () => import("@/views/reports/reports-entry/page.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/entry/page/:id",
    name: "reports-entry-page-edit",
    component: () => import("@/views/reports/reports-entry/page.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },

  {
    path: "/reports/query/marketing",
    name: "reports-query-marketing",
    component: () => import("@/views/reports/reports-query/marketing.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/marketingTeam",
    name: "reports-query-marketing-team",
    component: () => import("@/views/reports/reports-query/marketingTeam.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/marketingMonth",
    name: "reports-query-user-performance",
    component: () =>
      import("@/views/reports/reports-query/marketingMonth.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/marketingTeamMonth",
    name: "reports-query-team-performance",
    component: () =>
      import("@/views/reports/reports-query/marketingTeamMonth.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userReview",
    name: "reports-query-user-review",
    component: () => import("@/views/reports/reports-query/userReview.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userPromotion",
    name: "reports-query-user-promotion",
    component: () => import("@/views/reports/reports-query/userPromotion.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userElite",
    name: "reports-query-user-elite",
    component: () => import("@/views/reports/reports-query/userElite.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/sale",
    name: "reports-query-sale",
    component: () => import("@/views/reports/reports-query/sale.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/bonus",
    name: "reports-query-bonus",
    component: () => import("@/views/reports/reports-query/bonus.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/bonusMonth",
    name: "reports-query-bonus-month",
    component: () => import("@/views/reports/reports-query/bonusMonth.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/saleDetail",
    name: "reports-query-sale-detail",
    component: () => import("@/views/reports/reports-query/saleDetail.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/saleMonth",
    name: "reports-query-sale-month",
    component: () => import("@/views/reports/reports-query/saleMonth.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/incomeRealDetail",
    name: "reports-query-income-real-detail",
    component: () =>
      import("@/views/reports/reports-query/incomeRealDetail.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/userRank",
    name: "reports-query-user-rank",
    component: () => import("@/views/reports/reports-query/userRank.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
  {
    path: "/reports/query/page",
    name: "reports-query-page",
    component: () => import("@/views/reports/reports-query/page.vue"),
    meta: {
      resource: "ACL",
      action: "read",
    },
  },
];
