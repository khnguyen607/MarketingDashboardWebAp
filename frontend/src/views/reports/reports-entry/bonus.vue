<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Nhập báo cáo thưởng phạt</b-card-title>
    </b-card-header>
    <b-card-body>
      <b-form @submit.prevent>
        <b-row>
          <b-col md="6">
            <b-form-group label="Họ và tên" label-for="mc-name">
              <b-form-select
                v-model="dataForm.userId"
                :options="options.user"
                id="mc-name"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Vị trí" label-for="mc-position">
              <b-form-select
                v-model="dataForm.position"
                id="mc-position"
                :options="options.position"
                placeholder="Vị trí"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Team" label-for="mc-team">
              <b-form-select
                v-model="dataForm.teamId"
                id="mc-team"
                :options="options.team"
                placeholder="Team"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Chi nhánh" label-for="mc-branch">
              <b-form-select
                v-model="dataForm.branchId"
                id="mc-branch"
                :options="options.branch"
                placeholder="Chi nhánh"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Ngày ra quyết định" label-for="mc-date">
              <b-form-input
                v-model="dataForm.date"
                id="mc-date"
                type="date"
                placeholder="Ngày ra quyết định"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Kỳ áp dụng" label-for="mc-tern">
              <b-form-input
                v-model="dataForm.tern"
                id="mc-tern"
                type="month"
                placeholder="Kỳ áp dụng"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Mã quyết định/ biên bản" label-for="mc-record">
              <b-form-input
                v-model="dataForm.record"
                id="mc-record"
                type="text"
                placeholder="Mã quyết định/ biên bản"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Nội dung" label-for="mc-content">
              <b-form-input
                v-model="dataForm.content"
                id="mc-content"
                type="text"
                placeholder="Nội dung"
              />
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Văn bản tham chiếu"
              label-for="mc-document-reference"
            >
              <b-form-input
                v-model="dataForm.documentReference"
                id="mc-document-reference"
                type="text"
                placeholder="Văn bản tham chiếu"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Số tiền" label-for="mc-value">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.value"
                  id="mc-value"
                  type="number"
                  placeholder="Số tiền"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Phân loại" label-for="mc-type">
              <div class="form-label-group">
                <b-form-select
                  v-model="dataForm.type"
                  id="mc-type"
                  :options="options.type"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Trạng thái" label-for="mc-status">
              <div class="form-label-group">
                <b-form-select
                  v-model="dataForm.status"
                  id="mc-status"
                  :options="options.status"
                />
              </div>
            </b-form-group>
          </b-col>
          <!-- submit and reset -->
          <b-col md="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click="onSubmit"
            >
              Gửi
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import {
  BCardBody,
  BCardTitle,
  BCardHeader,
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BFormSelect,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCardBody,
    BCardTitle,
    BCardHeader,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    BFormSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")),
      dataForm: {
        userId: JSON.parse(localStorage.getItem("userData")).id,
        position: JSON.parse(localStorage.getItem("userData")).position,
        teamId: JSON.parse(localStorage.getItem("userData")).teamId,
        branchId: JSON.parse(localStorage.getItem("userData")).branchId,
        date: new Date().toISOString().split("T")[0],
        tern: null,
        record: null,
        content: null,
        documentReference: null,
        value: null,
        type: null,
        status: null,
      },
      options: {
        position: [
          { text: "MKT Học việc", value: "MKT Học việc" },
          { text: "MKT Thử việc", value: "MKT Thử việc" },
          { text: "Marketing", value: "Marketing" },
          { text: "Sale", value: "Sale" },
          { text: "CTV", value: "CTV" },
          { text: "CSKH", value: "CSKH" },
          { text: "Leader tập sự", value: "Leader tập sự" },
          { text: "Leader MKT", value: "Leader MKT" },
          { text: "Leader Sale", value: "Leader Sale" },
          { text: "Giám đốc", value: "Giám đốc" },
        ],
        user: [],
        team: [],
        branch: [],
        type: [
          { text: "Tiền thưởng", value: "bonus" },
          { text: "Tiền phạt", value: "penalty" },
        ],
        status: [
          { text: "Chờ xử lý", value: "1" },
          { text: "Đang xử lý", value: "2" },
          { text: "Đã xử lý", value: "3" },
          { text: "Hủy", value: "4" },
        ],
      },
      edit: null,
    };
  },
  async created() {
    this.$callApi.get("/api/users").then((res) => {
      this.options.user = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });

    this.$callApi.get("/api/teams").then((res) => {
      this.options.team = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });

    this.$callApi.get("/api/branches").then((res) => {
      this.options.branch = res.data.data.map((item) => {
        return { value: item.id, text: item.name };
      });
    });
    this.getData();
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put(
            "/api/bonusReports/" + this.edit,
            this.dataForm
          );
        } else {
          await this.$callApi.post("/api/bonusReports", this.dataForm);
          this.dataForm = {
            userId: JSON.parse(localStorage.getItem("userData")).id,
            position: JSON.parse(localStorage.getItem("userData")).position,
            department: null,
            date: new Date().toISOString().split("T")[0],
            tern: null,
            record: null,
            content: null,
            documentReference: null,
            bonus: null,
            penalty: null,
          };
        }
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Thành công`,
            icon: "CheckIcon",
            variant: "success",
          },
        });
      } catch (error) {
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
      }
    },
    async getData() {
      const id = this.$route.params.id;
      if (id) {
        this.edit = id;
        await this.$callApi.get("/api/bonusReports/" + id).then((res) => {
          const data = res.data.data;
          const date = new Date(data.tern);
          date.setMonth(date.getMonth() + 1);
          data.tern = date.toISOString().slice(0, 7);
          data.date = data.date.split("T")[0];
          this.dataForm = data;
        });
      }
    },
  },
};
</script>
