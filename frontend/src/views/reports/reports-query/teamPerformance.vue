<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Báo cáo hiệu suất team</b-card-title>
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
          :rtl="direction"
          :pagination-options="{
            enabled: true,
            perPage: pageLength,
          }"
        >
          <template slot="table-column" slot-scope="props">
            <span v-if="props.column.label == 'Doanh số mục tiêu'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.income
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Doanh số thực tế'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.incomeReal
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Doanh số trung bình/ngày'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.incomeAverage
              }}</span>
            </span>
            <span
              v-else-if="props.column.label == 'Doanh số trung bình/nhân viên'"
            >
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.incomeAverageToUser
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tỉ lệ hoàn thành'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.completionRate
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Chi phí ads'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.adsReal
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tỉ lệ ads'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.adsRate
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Mã win kế hoạch'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{ totalColumns.win }}</span>
            </span>
            <span v-else-if="props.column.label == 'Mã win thực tế'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.winReal
              }}</span>
            </span>
            <span
              v-else-if="props.column.label == 'Dự báo doanh số cuối tháng'"
            >
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.incomeProjection
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Dự báo tỉ lệ hoàn thành'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.completionProjection
              }}</span>
            </span>
          </template>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'adsRate'">
              {{ props.row.adsRate + "%" }}
            </span>
            <span v-else-if="props.column.field === 'incomeReal'">
              {{ normalize(props.row.incomeReal) }}
            </span>
            <span v-else-if="props.column.field === 'incomeAverageToUser'">
              {{ normalize(props.row.incomeAverageToUser) }}
            </span>
            <span v-else-if="props.column.field === 'completionRate'">
              {{ props.row.completionRate + "%" }}
            </span>
            <span v-else-if="props.column.field === 'completionProjection'">
              {{ props.row.completionProjection + "%" }}
            </span>
            <span v-else-if="props.column.field === 'adsReal'">
              {{ normalize(props.row.adsReal) }}
            </span>
            <span v-else-if="props.column.field === 'income'">
              {{ normalize(props.row.income) }}
            </span>
            <span v-else-if="props.column.field === 'incomeAverage'">
              {{ normalize(props.row.incomeAverage) }}
            </span>
            <span v-else-if="props.column.field === 'incomeProjection'">
              {{ normalize(props.row.incomeProjection) }}
            </span>
            <span v-else-if="props.column.field === 'progressReview'">
              <b-badge :variant="statusVariant(props.row.progressReview)">
                {{ props.row.progressReview }}
              </b-badge>
            </span>
            <span v-else-if="props.column.field === 'feeReview'">
              <b-badge :variant="statusVariant(props.row.feeReview)">
                {{ props.row.feeReview }}
              </b-badge>
            </span>
          </template>
          <!-- pagination -->
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
import {
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
import store from "@/store/index";
import { exportExcel } from "@/views/components/exportExcel/ExportExcel";

export default {
  components: {
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
        incomeReal: 0,
        incomeAverage: 0,
        incomeAverageToUser: 0,
        adsRate: 0,
        completionRate: 0,
        adsReal: 0,
        win: 0,
        winReal: 0,
        incomeProjection: 0,
        completionProjection: 0,
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
          label: "Tháng",
          field: "tern",
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
          label: "Doanh số mục tiêu",
          field: "income",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          tdClass: "font-weight-bold text-danger",
        },
        {
          label: "Doanh số thực tế",
          field: "incomeReal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          tdClass: "font-weight-bold text-success",
        },
        {
          label: "Doanh số trung bình/ngày",
          field: "incomeAverage",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số trung bình/nhân viên",
          field: "incomeAverageToUser",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ hoàn thành",
          field: "completionRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Chi phí ads",
          field: "adsReal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ ads",
          field: "adsRate",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Mã win kế hoạch",
          field: "win",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Mã win thực tế",
          field: "winReal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Dự báo doanh số cuối tháng",
          field: "incomeProjection",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Dự báo tỉ lệ hoàn thành",
          field: "completionProjection",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Đánh giá tiến độ",
          field: "progressReview",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Đánh giá chi phí",
          field: "feeReview",
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
        "Xuất sắc": "light-success",
        "Tiêu chuẩn": "light-info",
        "Chậm tiến độ": "light-danger",
        "Quá ngưỡng": "light-danger",
        /* eslint-enable key-spacing */
      };

      return (status) => statusColor[status];
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true;
        return this.dir;
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false;
      return this.dir;
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
    await this.$callApi.get("/api/getReports/teamPerformance").then((res) => {
      const data = res.data.data.filter((item) => {
        switch (this.userData.role) {
          case "ADMIN":
            return true;
          case "LEADERBRANCH":
            return item.branchId == this.userData.branchId;
          case "LEADER":
            return item.teamId == this.userData.teamId;
          case "USER":
            return item.teamId == this.userData.teamId;
        }
      });
      console.log(data);

      this.rows = data.sort((a, b) => b.id - a.id);
      this.rows = data;
    });
    this.getTotal();
  },
  methods: {
    async getTotal() {
      this.totalColumns.income = 0;
      this.totalColumns.incomeReal = 0;
      this.totalColumns.incomeAverage = 0;
      this.totalColumns.incomeAverageToUser = 0;
      this.totalColumns.adsRate = 0;
      this.totalColumns.completionRate = 0;
      this.totalColumns.adsReal = 0;
      this.totalColumns.win = 0;
      this.totalColumns.winReal = 0;
      this.totalColumns.incomeProjection = 0;
      this.totalColumns.completionProjection = 0;
      this.filteredRows.forEach((item) => {
        this.totalColumns.income += Number(item.income);
        this.totalColumns.incomeReal += Number(item.incomeReal);
        this.totalColumns.incomeAverage += Number(item.incomeAverage);
        this.totalColumns.incomeAverageToUser += Number(
          item.incomeAverageToUser
        );
        this.totalColumns.completionRate += Number(item.completionRate);
        this.totalColumns.adsReal += Number(item.adsReal);
        this.totalColumns.win += Number(item.win);
        this.totalColumns.winReal += Number(item.winReal);
        this.totalColumns.incomeProjection += Number(item.incomeProjection);
        this.totalColumns.completionProjection += Number(
          item.completionProjection
        );
      });
      this.totalColumns.adsRate =
        Math.round(
          (this.totalColumns.adsReal / this.totalColumns.incomeReal) * 100
        ) + "%";
      this.totalColumns.completionRate =
        Math.round(
          (this.totalColumns.incomeReal / this.totalColumns.income) * 100
        ) + "%";
      this.totalColumns.completionProjection =
        Math.round(
          (this.totalColumns.incomeProjection / this.totalColumns.income) * 100
        ) + "%";
      this.totalColumns.income = this.normalize(this.totalColumns.income);
      this.totalColumns.incomeReal = this.normalize(
        this.totalColumns.incomeReal
      );
      this.totalColumns.incomeAverageToUser = this.normalize(this.totalColumns.incomeAverageToUser);
      this.totalColumns.adsReal = this.normalize(this.totalColumns.adsReal);
      this.totalColumns.incomeProjection = this.normalize(
        this.totalColumns.incomeProjection
      );
      this.totalColumns.incomeAverage = this.normalize(
        this.totalColumns.incomeAverage
      );
      this.totalColumns.incomeAverage = this.normalize(
        this.totalColumns.incomeAverageToUser
      );
    },
    exportToExcel() {
      exportExcel(
        "Report.xlsx",
        this.filteredRows,
        this.exportExcelData.columns
      );
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
