<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Báo cáo Marketing team theo ngày</b-card-title>
      <div>
        <b-button variant="primary" class="btn-icon mx-2" @click="getTotal">
          <feather-icon icon="BarChartIcon" />
        </b-button>
        <b-button variant="success" class="btn-icon" @click="exportToExcel">
          <feather-icon icon="DownloadIcon" />
        </b-button>
      </div>
    </b-card-header>
    <b-card-body>
      <div>
        <!-- table -->
        <vue-good-table
          ref="goodTableRef"
          :columns="columns"
          :rows="rows"
          :pagination-options="{
            enabled: true,
            perPage: pageLength,
          }"
        >
          <template slot="table-column" slot-scope="props">
            <span v-if="columns.find((x) => x.label == props.column.label).sum">
              <span class="me-2">{{ props.column.label }}</span>
              <span class="badge bg-success fs-6">
                {{ normalize(totalColumns[props.column.field] || 0) }}
              </span>
            </span>
            <span v-else-if="props.column.field == 'adsRate'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">
                {{
                  Math.round((totalColumns.ads / totalColumns.incomeNet) * 100)
                }}%
              </span>
            </span>
          </template>
          <template slot="table-row" slot-scope="props">
            <!-- Column: Status -->
            <span v-if="props.column.field === 'adsRate'">
              {{ props.row.adsRate + "%" }}
            </span>
            <span v-else-if="props.column.field === 'income'">
              {{ normalize(props.row.income) }}
            </span>
            <span v-else-if="props.column.field === 'ads'">
              {{ normalize(props.row.ads) }}
            </span>
            <span v-else-if="props.column.field === 'adsAlert'">
              <b-badge :variant="statusVariant(props.row.adsAlert)">
                {{ props.row.adsAlert }}
              </b-badge>
            </span>
          </template>
          <template slot="pagination-bottom" slot-scope="props">
            <div class="d-flex justify-content-between flex-wrap">
              <div class="d-flex align-items-center mb-0 mt-1">
                <span class="text-nowrap"> Showing 1 to </span>
                <b-form-select
                  v-model="pageLength"
                  :options="['10', '20', '50']"
                  class="mx-1"
                  @input="
                    (value) => props.perPageChanged({ currentPerPage: value })
                  "
                />
                <span class="text-nowrap"> of {{ props.total }} entries </span>
              </div>
              <div>
                <b-pagination
                  :value="1"
                  :total-rows="props.total"
                  :per-page="pageLength"
                  first-number
                  last-number
                  align="right"
                  prev-class="prev-item"
                  next-class="next-item"
                  class="mt-1 mb-0"
                  @input="(value) => props.pageChanged({ currentPage: value })"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </div>
            </div>
          </template>
        </vue-good-table>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BRow,
  BCol,
  BCard,
  BCardBody,
  BCardTitle,
  BCardHeader,
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import { exportExcel } from "@/views/components/exportExcel/ExportExcel";

export default {
  components: {
    BRow,
    BCol,
    VueGoodTable,
    BCard,
    BCardBody,
    BCardTitle,
    BCardHeader,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
  },
  data() {
    return {
      totalColumns: {
        income: 0,
      },
      exportExcelData: {
        columns: [],
        rows: [],
      },
      userData: JSON.parse(localStorage.getItem("userData")),
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: "Ngày báo cáo",
          field: "date",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Team",
          field: "teamName",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Chi nhánh",
          field: "branchName",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số",
          field: "income",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
          formatFn: (value) => {
            return new Intl.NumberFormat("vi-VN").format(value);
          },
          sum: true,
        },
        {
          label: "Doanh số sau ship",
          field: "incomeNet",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
          formatFn: (value) => {
            return new Intl.NumberFormat("vi-VN").format(value);
          },
          sum: true,
        },
        {
          label: "Số đơn hàng",
          field: "orderCount",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
          formatFn: (value) => {
            return new Intl.NumberFormat("vi-VN").format(value);
          },
          sum: true,
        },
        {
          label: "Phí ship",
          field: "shipCost",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
          formatFn: (value) => {
            return new Intl.NumberFormat("vi-VN").format(value);
          },
          sum: true,
        },
        {
          label: "Mã win",
          field: "win",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          formatFn: (value) => {
            return new Intl.NumberFormat("vi-VN").format(value);
          },
          sum: true,
        },
        {
          label: "Chi phí ADS",
          field: "ads",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          formatFn: (value) => {
            return new Intl.NumberFormat("vi-VN").format(value);
          },
          sum: true,
        },
        {
          label: "Tỉ lệ ads",
          field: "adsRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          formatFn: (value) => {
            return value + "%";
          },
        },
        {
          label: "Cảnh báo tỉ lệ ads",
          field: "adsAlert",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
      ],
      rows: [],
    };
  },
  computed: {
    filteredRows() {
      // Lấy tất cả các hàng đang hiển thị (sau tìm kiếm và phân trang)
      const table = this.$refs.goodTableRef;
      return table ? table.filteredRows[0].children : [];
    },
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        "Tiêu chuẩn": "light-success",
        "Quá ngưỡng": "light-danger",
        /* eslint-enable key-spacing */
      };
      return (status) => statusColor[status];
    },
  },
  async created() {
    this.exportExcelData.columns = this.columns.map((item) => {
      return {
        label: item.label,
        field: item.field,
        width: 30,
      };
    });
    await this.getData();
    this.initTotal();
  },
  methods: {
    async initTotal() {
      this.columns.forEach((item) => {
        if (item.sum) {
          this.totalColumns[item.field] = 0;
        }
      });
      this.getTotal();
    },
    async getTotal() {
      // Danh sách các cột cần tính tổng
      const keys = Object.keys(this.totalColumns);

      // Reset giá trị tổng
      keys.forEach((key) => {
        this.totalColumns[key] = 0;
      });

      // Tính tổng cho từng thuộc tính
      this.filteredRows.forEach((item) => {
        keys.forEach((key) => {
          this.totalColumns[key] += Number(item[key]) || 0;
        });
      });
    },
    async getData() {
      await this.$callApi.get("/api/getReports/marketingTeam").then((res) => {
        const data = res.data.data.filter((item) => {
          switch (this.userData.role) {
            case "ADMIN":
              return true;
            case "LEADERBRANCH":
              return item.branchId == this.userData.branchId;
            case "LEADER":
              return item.teamId == this.userData.teamId;
            case "USER":
              return item.userId == this.userData.id;
          }
        });
        this.rows = data.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"));
          const dateB = new Date(b.date.split("/").reverse().join("-"));
          return dateB - dateA;
        });
        this.rows = data;
      });
    },
    exportToExcel() {
      exportExcel(
        this.$XLSX,
        "Report.xlsx",
        this.filteredRows,
        this.exportExcelData.columns
      );
    },
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/marketingReports/" + id)
        .then(async () => {
          await this.getData();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Xóa thành công`,
              icon: "CheckIcon",
              variant: "success",
            },
          });
        })
        .catch(() => {
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: `Lỗi`,
              icon: "AlertCircleIcon",
              variant: "danger",
              text: error,
            },
          });
        });
    },
    normalize(data) {
      return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
