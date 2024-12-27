<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Chi tiết báo cáo sale</b-card-title>
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
            <span v-if="props.column.label == 'Doanh số sale'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.newIncome)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Doanh số cskh'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.oldIncome)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Data sale'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.dataNew)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Data cskh'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.dataOld)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tổng data'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.dataTotal)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Số đơn Sale'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.orderNew)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Số đơn CSKH'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.orderOld)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tổng đơn'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.orderTotal)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tổng doanh số'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.incomeTotal)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Phí ship'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.shipCost)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tổng doanh số sau ship'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.incomeNetTotal)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Trung bình đơn thực tế'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                normalize(totalColumns.incomeNetAvg)
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tỉ lệ chốt'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.conversionRate + "%"
              }}</span>
            </span>
          </template>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'oldIncome'">
              {{ normalize(props.row.oldIncome) }}
            </span>
            <span v-else-if="props.column.field === 'newIncome'">
              {{ normalize(props.row.newIncome) }}
            </span>
            <span v-else-if="props.column.field === 'dataNew'">
              {{ normalize(props.row.dataNew) }}
            </span>
            <span v-else-if="props.column.field === 'dataOld'">
              {{ normalize(props.row.dataOld) }}
            </span>
            <span v-else-if="props.column.field === 'dataTotal'">
              {{
                normalize(Number(props.row.dataNew) + Number(props.row.dataOld))
              }}
            </span>
            <span v-else-if="props.column.field === 'orderNew'">
              {{ normalize(props.row.orderNew) }}
            </span>
            <span v-else-if="props.column.field === 'orderOld'">
              {{ normalize(props.row.orderOld) }}
            </span>
            <span v-else-if="props.column.field === 'orderTotal'">
              {{
                normalize(
                  Number(props.row.orderNew) + Number(props.row.orderOld)
                )
              }}
            </span>
            <span v-else-if="props.column.field === 'incomeTotal'">
              {{
                normalize(
                  Number(props.row.newIncome) + Number(props.row.oldIncome)
                )
              }}
            </span>
            <span v-else-if="props.column.field === 'shipCost'">
              {{
                normalize(
                  (Number(props.row.orderNew) + Number(props.row.orderOld)) *
                    30000
                )
              }}
            </span>
            <span v-else-if="props.column.field === 'incomeNetTotal'">
              {{
                normalize(
                  Number(props.row.newIncome) +
                    Number(props.row.oldIncome) -
                    (Number(props.row.orderNew) + Number(props.row.orderOld)) *
                      30000
                )
              }}
            </span>
            <span v-else-if="props.column.field === 'incomeNetAvg'">
              {{
                normalize(
                  Math.round(
                    (Number(props.row.newIncome) +
                      Number(props.row.oldIncome) -
                      (Number(props.row.orderNew) +
                        Number(props.row.orderOld)) *
                        30000) /
                      (Number(props.row.orderNew) +
                        Number(props.row.orderOld) || 1)
                  )
                )
              }}
            </span>
            <span v-else-if="props.column.field === 'conversionRate'">
              {{
                Math.round(
                  (Number(props.row.orderNew) + Number(props.row.orderOld)) /
                    (Number(props.row.dataNew) + Number(props.row.dataOld) || 1)
                ) + "%"
              }}
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
                    @click="$router.push(`/reports/entry/sale/${props.row.id}`)"
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
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
        newIncome: 0,
        oldIncome: 0,
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
          label: "Vị trí",
          field: "position",
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
          label: "Doanh số sale",
          field: "newIncome",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Doanh số cskh",
          field: "oldIncome",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Data sale",
          field: "dataNew",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Data cskh",
          field: "dataOld",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tổng data",
          field: "dataTotal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Số đơn Sale",
          field: "orderNew",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Số đơn CSKH",
          field: "orderOld",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tổng đơn",
          field: "orderTotal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tổng doanh số",
          field: "incomeTotal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Phí ship",
          field: "shipCost",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tổng doanh số sau ship",
          field: "incomeNetTotal",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Trung bình đơn thực tế",
          field: "incomeNetAvg",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ chốt",
          field: "conversionRate",
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
    await this.getTotal();
  },
  methods: {
    async getTotal() {
      this.totalColumns.newIncome = 0;
      this.totalColumns.oldIncome = 0;
      this.totalColumns.dataNew = 0;
      this.totalColumns.dataOld = 0;
      this.totalColumns.orderNew = 0;
      this.totalColumns.orderOld = 0;
      this.totalColumns.dataTotal = 0;
      this.totalColumns.orderTotal = 0;
      this.totalColumns.incomeTotal = 0;
      this.totalColumns.shipCost = 0;
      this.totalColumns.incomeNetTotal = 0;
      this.totalColumns.incomeNetAvg = 0;
      this.totalColumns.conversionRate = 0;
      this.filteredRows.forEach((item) => {
        this.totalColumns.newIncome += Number(item.newIncome);
        this.totalColumns.oldIncome += Number(item.oldIncome);
        this.totalColumns.dataNew += Number(item.dataNew);
        this.totalColumns.dataOld += Number(item.dataOld);
        this.totalColumns.orderNew += Number(item.orderNew);
        this.totalColumns.orderOld += Number(item.orderOld);
      });
      this.totalColumns.newIncome = this.totalColumns.newIncome;
      this.totalColumns.oldIncome = this.totalColumns.oldIncome;
      this.totalColumns.dataNew = this.totalColumns.dataNew;
      this.totalColumns.dataOld = this.totalColumns.dataOld;
      this.totalColumns.orderNew = this.totalColumns.orderNew;
      this.totalColumns.orderOld = this.totalColumns.orderOld;

      this.totalColumns.dataTotal =
        this.totalColumns.dataNew + this.totalColumns.dataOld;
      this.totalColumns.orderTotal =
        this.totalColumns.orderNew + this.totalColumns.orderOld;
      this.totalColumns.incomeTotal =
        this.totalColumns.newIncome + this.totalColumns.oldIncome;
      this.totalColumns.shipCost =
        (this.totalColumns.orderNew + this.totalColumns.orderOld) * 30000;
      this.totalColumns.incomeNetTotal =
        this.totalColumns.incomeTotal - this.totalColumns.shipCost;
      this.totalColumns.incomeNetAvg = Math.round(
        this.totalColumns.incomeNetTotal / (this.totalColumns.orderTotal || 1)
      );
      this.totalColumns.conversionRate = Math.round(
        this.totalColumns.orderTotal / (this.totalColumns.dataTotal || 1)
      );
    },
    async getData() {
      await this.$callApi.get("/api/saleReports").then((res) => {
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
    async deleteItem(id) {
      await this.$callApi
        .delete("/api/saleReports/" + id)
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
