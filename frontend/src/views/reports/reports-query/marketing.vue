<template>
  <div>
    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Báo cáo Marketing theo ngày</b-card-title>
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
              <span v-if="props.column.label == 'Doanh số'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.income
                }}</span>
              </span>
              <span v-else-if="props.column.label == 'Doanh số sau ship'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.incomeNet
                }}</span>
              </span>
              <span v-else-if="props.column.label == 'Số đơn hàng'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.orderCount
                }}</span>
              </span>
              <span v-else-if="props.column.label == 'Phí ship'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.shipCost
                }}</span>
              </span>
              <span v-else-if="props.column.label == 'Mã win'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.win
                }}</span>
              </span>
              <span v-else-if="props.column.label == 'Chi phí ADS'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.ads
                }}</span>
              </span>
              <span v-else-if="props.column.label == 'Tỉ lệ Ads/doanh số'">
                <span class="me-2">{{ props.column.label }}:</span>
                <span class="badge bg-success fs-6">{{
                  totalColumns.adsRate
                }}</span>
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
              <span v-else-if="props.column.field === 'incomeNet'">
                {{ normalize(props.row.incomeNet) }}
              </span>
              <span v-else-if="props.column.field === 'orderCount'">
                {{ normalize(props.row.orderCount) }}
              </span>
              <span v-else-if="props.column.field === 'shipCost'">
                {{ normalize(props.row.shipCost) }}
              </span>
              <span v-else-if="props.column.field === 'ads'">
                {{ normalize(props.row.ads) }}
              </span>
              <span v-else-if="props.column.field === 'adsAlert'">
                <b-badge :variant="statusVariant(props.row.adsAlert)">
                  {{ props.row.adsAlert }}
                </b-badge>
              </span>
              <span
                v-else-if="props.column.field === 'action'"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              >
                <span>
                  <b-dropdown
                    variant="link"
                    toggle-class="text-decoration-none"
                    no-caret
                  >
                    <template v-slot:button-content>
                      <feather-icon
                        icon="MoreVerticalIcon"
                        size="16"
                        class="text-body align-middle mr-25"
                      />
                    </template>
                    <b-dropdown-item
                      @click="
                        $router.push(`/reports/entry/marketing/${props.row.id}`)
                      "
                    >
                      <feather-icon icon="Edit2Icon" class="mr-50" />
                      <span>Sửa</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="deleteItem(props.row.id)">
                      <feather-icon icon="TrashIcon" class="mr-50" />
                      <span>Xóa</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </span>
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
                  <span class="text-nowrap">
                    of {{ props.total }} entries
                  </span>
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
                    @input="
                      (value) => props.pageChanged({ currentPage: value })
                    "
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
  </div>
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
        win: 0,
        ads: 0,
        adsRate: 0,
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
          label: "Họ tên",
          field: "userName",
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
        },
        {
          label: "Doanh số sau ship",
          field: "incomeNet",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
        },
        {
          label: "Số đơn hàng",
          field: "orderCount",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
        },
        {
          label: "Phí ship",
          field: "shipCost",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          sortable: false,
        },
        {
          label: "Mã win",
          field: "win",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Chi phí ADS",
          field: "ads",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ Ads/doanh số",
          field: "adsRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
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
        {
          label: "Thao tác",
          field: "action",
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
    totalPrice() {
      return this.data.reduce((sum, row) => sum + row.income, 0);
    },
    totalQuantity() {
      return this.data.reduce((sum, row) => sum + row.income, 0);
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
    this.getTotal();
  },
  methods: {
    async getTotal() {
      this.totalColumns.income = 0;
      this.totalColumns.win = 0;
      this.totalColumns.ads = 0;
      this.totalColumns.incomeNet = 0;
      this.totalColumns.orderCount = 0;
      this.totalColumns.shipCost = 0;
      this.filteredRows.forEach((item) => {
        this.totalColumns.income += Number(item.income);
        this.totalColumns.win += Number(item.win);
        this.totalColumns.ads += Number(item.ads);
        this.totalColumns.incomeNet += Number(item.incomeNet);
        this.totalColumns.orderCount += Number(item.orderCount);
        this.totalColumns.shipCost += Number(item.shipCost);
      });
      this.totalColumns.adsRate =
        Math.round((this.totalColumns.ads / this.totalColumns.income) * 100) +
        "%";
      this.totalColumns.income = this.normalize(this.totalColumns.income);
      this.totalColumns.ads = this.normalize(this.totalColumns.ads);
      this.totalColumns.incomeNet = this.normalize(this.totalColumns.incomeNet);
      this.totalColumns.orderCount = this.normalize(
        this.totalColumns.orderCount
      );
      this.totalColumns.shipCost = this.normalize(this.totalColumns.shipCost);
    },
    async getData() {
      await this.$callApi.get("/api/getReports/marketing").then((res) => {
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
        this.rows = data.sort((a, b) => b.id - a.id);
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
