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
    <b-card p-5 v-if="this.charts.data.categories.length > 0">
      <BasicBarChart
        :title="charts.title"
        :data="charts.data"
        :key="charts.key"
        :height="500"
      />
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
import BasicBarChart from "@/views/dashboard/BasicBarChart.vue";

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
    BasicBarChart,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      searchData: {
        dateFrom: null,
        dateTo: null,
      },
      charts: {
        title: "Báo cáo sale theo tháng",
        data: {
          series: [
            {
              name: "Doanh số sale",
              data: [],
            },
            {
              name: "Doanh số cskh",
              data: [],
            },
          ],
          categories: [],
        },
        key: 0,
      },
      pageLength: 10,
    };
  },
  async created() {
    this.exportExcelData.columns = this.columns.map((item) => {
      return {
        label: item.label,
        field: item.field,
        width: 30,
      };
    });
    // await this.getData();
  },
  methods: {
    async getData() {
      await this.$callApi
        .post("/api/getReports/getSaleMonth", {
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
          this.charts.data.series[0].data = [];
          this.charts.data.series[1].data = [];
          this.charts.data.categories = [];
          data.forEach((item) => {
            this.charts.data.series[0].data.push(item.newIncome);
            this.charts.data.series[1].data.push(item.oldIncome);
            this.charts.data.categories.push(item.userName);
          });
          this.charts.key += 1;
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
