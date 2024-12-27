export default [
  {
    header: "Quản lý báo cáo",
    action: "read",
    resource: "ACL",
  },
  {
    title: "Nhập báo cáo",
    icon: "CheckSquareIcon",
    children: [
      {
        title: "1.1 Marketing theo ngày",
        route: "reports-entry-marketing",
        action: "read",
        resource: "ACL",
      },
      {
        title: "1.2 Mục tiêu tháng",
        route: "reports-entry-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "1.3 Sale",
        route: "reports-entry-sale",
        action: "read",
        resource: "ACL",
      },
      {
        title: "1.4 Doanh thu thực",
        route: "reports-entry-income",
        action: "read",
        resource: "ACL",
      },
      {
        title: "1.5 Thưởng phạt",
        route: "reports-entry-bonus",
        action: "read",
        resource: "ACL",
      },
    ],
  },
  {
    title: "Tra cứu báo cáo",
    icon: "SearchIcon",
    children: [
      {
        title: "2.1 Marketing theo ngày",
        route: "reports-query-marketing",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.2 Marketing team theo ngày",
        route: "reports-query-marketing-team",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.3 Hiệu suất nhân viên",
        route: "reports-query-user-performance",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.4 Hiệu suất team",
        route: "reports-query-team-performance",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.5 Đánh giá nhân viên",
        route: "reports-query-user-review",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.6 Thăng tiến/tăng lương",
        route: "reports-query-user-promotion",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.7 Hội viên Elite Club",
        route: "reports-query-user-elite",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.8 Sale theo tháng",
        route: "reports-query-sale",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.9 Thưởng phạt",
        route: "reports-query-bonus",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.10 Tổng hợp thưởng phạt",
        route: "reports-query-bonus-month",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.11 Sale theo ngày",
        route: "reports-query-sale-detail",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.12 Doanh thu thực",
        route: "reports-query-income-real-detail",
        action: "read",
        resource: "ACL",
      },
      {
        title: "2.13 Bảng xếp hạng",
        route: "reports-query-user-rank",
        action: "read",
        resource: "ACL",
      },
    ],
  },
];
