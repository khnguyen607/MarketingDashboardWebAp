export default [
  {
    header: "Nhập báo cáo",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Marketing",
    icon: "Edit2Icon",
    children: [
      {
        title: "Mục tiêu tháng",
        route: "reports-entry-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Báo cáo ngày",
        route: "reports-entry-marketing",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Doanh thu thực",
        route: "reports-entry-income",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "Sale-CSKH",
    icon: "Edit2Icon",
    children: [
      {
        title: "Mục tiêu tháng",
        route: "reports-entry-sale-target",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Báo cáo ngày",
        route: "reports-entry-sale",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "Trực page",
    icon: "Edit2Icon",
    route: "reports-entry-page",
    action: "read",
    resource: "ACL",
  },
  {
    header: "Khai thác báo cáo",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Tra cứu Marketing",
    icon: "SearchIcon",
    children: [
      {
        title: "Nhân viên chi tiết",
        route: "reports-query-marketing",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Team chi tiết",
        route: "reports-query-marketing-team",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Hiệu suất nhân viên",
        route: "reports-query-user-performance",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Hiệu suất team",
        route: "reports-query-team-performance",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Doanh thu thực",
        route: "reports-query-income-real-detail",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "Tra cứu Sale-CSKH",
    icon: "SearchIcon",
    children: [
      {
        title: "Mục tiêu tháng",
        route: "reports-query-sale-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Chi tiết ngày",
        route: "reports-query-sale-detail",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Tổng hợp tháng",
        route: "reports-query-sale",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "Tra cứu trực page",
    icon: "SearchIcon",
    route: "reports-query-page",
    action: "read",
    resource: "ACL",
  },
  {
    header: "Thưởng phạt",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Thưởng phạt",
    icon: "Edit2Icon",
    route: "reports-entry-bonus",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Tra cứu thưởng phạt",
    icon: "SearchIcon",
    route: "reports-query-bonus",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Tổng hợp thưởng phạt",
    route: "reports-query-bonus-month",
    action: "read",
    resource: "ACL",
  },
  {
    header: "Đánh giá thi đua",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Xếp hạng-Thi đua",
    icon: "BarChart2Icon",
    children: [
      {
        title: "Đánh giá Marketing",
        route: "reports-query-user-review",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Thăng tiến Marketing",
        route: "reports-query-user-promotion",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Hội viên Elite Club",
        route: "reports-query-user-elite",
        action: "read",
        resource: "ACL",
      },
      {
        title: "Bảng xếp hạng MKT",
        route: "reports-query-user-rank",
        action: "read",
        resource: "ACL",
      },
    ],
  },

  {
    header: "Trung tâm hỗ trợ",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Hỗ trợ",
    href: "https://forms.gle/NKjFFcon6x3j8D6L7",
    icon: "LifeBuoyIcon",
    action: "read",
    resource: "ACL",
  },
];
