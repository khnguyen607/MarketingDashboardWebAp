export default [
  {
    header: "Nhập báo cáo",
    action: "read",
    resource: "ACL",
  },
  {
    title: "1.Marketing",
    icon: "Edit2Icon",
    children: [
      {
        title: "1.1 Mục tiêu tháng",
        route: "reports-entry-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "1.2 Báo cáo ngày",
        route: "reports-entry-marketing",
        action: "read",
        resource: "ACL",
      },
      {
        title: "1.3 Doanh thu thực",
        route: "reports-entry-income",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "2.Sale-CSKH",
    icon: "Edit2Icon",
    children: [
      {
        title: "2.1 Mục tiêu tháng",
        route: "reports-entry-sale-target",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.2 Báo cáo ngày",
        route: "reports-entry-sale",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "3.Trực page",
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
    title: "4.Tra cứu Marketing",
    icon: "SearchIcon",
    children: [
      {
        title: "4.1 Nhân viên chi tiết",
        route: "reports-query-marketing",
        action: "read",
        resource: "ACL",
      },
      {
        title: "4.2 Team chi tiết",
        route: "reports-query-marketing-team",
        action: "read",
        resource: "ACL",
      },
      {
        title: "4.3 Hiệu suất nhân viên",
        route: "reports-query-user-performance",
        action: "read",
        resource: "ACL",
      },
      {
        title: "4.4 Hiệu suất team",
        route: "reports-query-team-performance",
        action: "read",
        resource: "ACL",
      },
      {
        title: "4.5 Doanh thu thực",
        route: "reports-query-income-real-detail",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "5.Tra cứu Sale-CSKH",
    icon: "SearchIcon",
    children: [
      {
        title: "5.1 Nhân viên chi tiết",
        route: "reports-query-sale",
        action: "read",
        resource: "ACL",
      },
      {
        title: "5.2 Team chi tiết",
        route: "reports-query-sale-team",
        action: "read",
        resource: "ACL",
      },
      {
        title: "5.3 Hiệu suất nhân viên",
        route: "reports-query-sale-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "5.4 Hiệu suất team",
        route: "reports-query-sale-team-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "5.5 Tổng hợp tháng",
        route: "reports-query-sale-review",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "6.Tra cứu trực page",
    icon: "SearchIcon",
    route: "reports-query-page",
    action: "read",
    resource: "ACL",
  },

  {
    header: "Đánh giá thi đua",
    action: "read",
    resource: "ACL",
  },
  {
    title: "7.Thưởng phạt",
    icon: "BarChart2Icon",
    children: [
      {
        title: "7.1 Thưởng phạt",
        icon: "Edit2Icon",
        route: "reports-entry-bonus",
        action: "read",
        resource: "ACL",
      },
      {
        title: "7.2 Tra cứu thưởng phạt",
        icon: "SearchIcon",
        route: "reports-query-bonus",
        action: "read",
        resource: "ACL",
      },
      {
        title: "7.3 Tổng hợp thưởng phạt",
        route: "reports-query-bonus-month",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "8.Xếp hạng-Thi đua",
    icon: "BarChart2Icon",
    children: [
      {
        title: "8.1 Đánh giá Marketing",
        route: "reports-query-user-review",
        action: "read",
        resource: "ACL",
      },
      {
        title: "8.2 Thăng tiến Marketing",
        route: "reports-query-user-promotion",
        action: "read",
        resource: "ACL",
      },
      {
        title: "8.3 Hội viên Elite Club",
        route: "reports-query-user-elite",
        action: "read",
        resource: "ACL",
      },
      {
        title: "8.4 Bảng xếp hạng MKT",
        route: "reports-query-user-rank",
        action: "read",
        resource: "ACL",
      },
    ],
  },
];
