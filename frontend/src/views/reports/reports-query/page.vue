<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Báo cáo trực page chi tiết</b-card-title>
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
            <span v-if="props.column.label == 'Tương tác'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.reaction
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Chuyển đổi SĐT'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                totalColumns.conversion
              }}</span>
            </span>
            <span v-else-if="props.column.label == 'Tỉ lệ chuyển đổi'">
              <span class="me-2">{{ props.column.label }}:</span>
              <span class="badge bg-success fs-6">{{
                (Number(totalColumns.conversion) / Number(totalColumns.reaction)) *
                  100 +
                "%"
              }}</span>
            </span>
          </template>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'reaction'">
              {{ normalize(props.row.reaction) }}
            </span>
            <span v-else-if="props.column.field === 'conversion'">
              {{ normalize(props.row.conversion) }}
            </span>
            <span v-else-if="props.column.field === 'reactionToConversion'">
              {{
                (Number(props.row.conversion) / Number(props.row.reaction)) *
                  100 +
                "%"
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
        reaction: 0,
        conversion: 0,
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
          label: "Tương tác",
          field: "reaction",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Chuyển đổi SĐT",
          field: "conversion",
          filterOptions: {
            enabled: true,
            placeholder: "Lọc",
          },
        },
        {
          label: "Tỉ lệ chuyển đổi",
          field: "reactionToConversion",
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
      this.totalColumns.reaction = 0;
      this.totalColumns.conversion = 0;
      this.filteredRows.forEach((item) => {
        this.totalColumns.reaction += Number(item.reaction);
        this.totalColumns.conversion += Number(item.conversion);
      });
      this.totalColumns.reaction = this.normalize(this.totalColumns.reaction);
      this.totalColumns.conversion = this.normalize(
        this.totalColumns.conversion
      );
    },
    async getData() {
      await this.$callApi.get("/api/pageReports").then((res) => {
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
        .delete("/api/pageReports/" + id)
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
