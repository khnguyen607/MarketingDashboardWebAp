<template>
  <div>
    <b-card p-5>
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Tra cứu khoảng thời gian</b-card-title>
      </b-card-header>
      <b-card-body>
        <b-row>
          <b-col md="6">
            <b-form-group label="Từ ngày" label-for="mc-date-from">
              <b-form-datepicker
                v-model="searchData.dateFrom"
                id="mc-date-from"
                placeholder="Chọn từ ngày"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Đến ngày" label-for="mc-date-to">
              <b-form-datepicker
                v-model="searchData.dateTo"
                id="mc-date-to"
                placeholder="Đến ngày"
              />
            </b-form-group>
          </b-col>
          <!-- submit and reset -->
          <b-col class="d-flex justify-content-center">
            <b-button
              type="submit"
              variant="primary"
              class="mr-1"
              @click="getData"
            >
              Tra cứu
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card p-5 v-if="rows.length > 0">
      <b-card-header class="d-flex justify-content-between align-items-center">
        <b-card-title>Báo cáo thăng tiến/tăng lương</b-card-title>
        <b-button variant="success" class="btn-icon" @click="exportToExcel">
          <feather-icon icon="DownloadIcon" />
        </b-button>
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
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field === 'income'">
                {{ normalize(Number(props.row.income)) }}
              </span>
              <span v-else-if="props.column.field === 'incomeAvg'">
                {{ normalize(Number(props.row.income)) }}
              </span>
              <span v-else-if="props.column.field === 'adsTotal'">
                {{ normalize(Number(props.row.income)) }}
              </span>
              <span v-else-if="props.column.field === 'adsRate'">
                {{ props.row.adsRate + "%" }}
              </span>
              <span v-else-if="props.column.field === 'review'">
                <b-badge :variant="statusVariant(props.row.review)">
                  {{ props.row.review }}
                </b-badge>
              </span>
              <span v-else-if="props.column.field === 'condition'">
                <span>Doanh số >= 400.000.000 ₫, Tỉ lệ ads <=40% </span>
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
  BFormDatepicker,
  BRow,
  BCol,
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
    BFormDatepicker,
    BRow,
    BCol,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        dateFrom: null,
        dateTo: null,
      },
      exportExcelData: {
        columns: [],
        rows: [],
      },
      pageLength: 10,
      dir: false,
      columns: [
        {
          label: "Họ tên",
          field: "userName",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
          tdClass: "text-nowrap",
        },
        {
          label: "Tổng doanh số của năm",
          field: "income",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số trung bình/tháng",
          field: "incomeAvg",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tổng chi phí ads",
          field: "adsTotal",
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
          label: "Điều kiện tăng lương/Thăng tiến",
          field: "review",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Điều kiện",
          field: "condition",
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
        Đạt: "light-success",
        "Không đạt": "light-danger",
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
    await this.getData();
  },
  methods: {
    async getData() {
      await this.$callApi
        .post("/api/getReports/GetUserPromotion", {
          dateFrom: this.searchData.dateFrom,
          dateTo: this.searchData.dateTo,
        })
        .then((res) => {
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
