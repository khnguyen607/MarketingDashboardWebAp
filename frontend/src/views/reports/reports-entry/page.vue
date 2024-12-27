<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Nhập báo cáo trực page</b-card-title>
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
            <b-form-group label="Ngày báo cáo" label-for="mc-date">
              <b-form-input
                required
                v-model="dataForm.date"
                id="mc-date"
                type="date"
                placeholder="Ngày báo cáo"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Tương tác" label-for="mc-reaction">
              <div class="form-label-group">
                <b-form-input
                  required
                  v-model="dataForm.reaction"
                  id="mc-reaction"
                  type="number"
                  placeholder="Tương tác"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Chuyển đổi" label-for="mc-conversion">
              <div class="form-label-group">
                <b-form-input
                  required
                  v-model="dataForm.conversion"
                  id="mc-conversion"
                  type="number"
                  placeholder="Chuyển đổi"
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
        reaction: null,
        conversion: null,
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
      },
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
            "/api/pageReports/" + this.edit,
            this.dataForm
          );
        } else {
          await this.$callApi.post("/api/pageReports", this.dataForm);
          this.dataForm = {
            userId: JSON.parse(localStorage.getItem("userData")).id,
            position: JSON.parse(localStorage.getItem("userData")).position,
            teamId: JSON.parse(localStorage.getItem("userData")).teamId,
            branchId: JSON.parse(localStorage.getItem("userData")).branchId,
            date: new Date().toISOString().split("T")[0],
            reaction: null,
            conversion: null,
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
        // Kiểm tra mã lỗi
        let message = "Đã xảy ra lỗi không xác định.";
        if (error.response) {
          if (error.response.status === 409) {
            message = "Dữ liệu đã tồn tại. Vui lòng kiểm tra lại.";
          } else if (error.response.status === 400) {
            message = "Dữ liệu không hợp lệ. Vui lòng nhập lại.";
          } else if (error.response.status === 500) {
            message = "Lỗi máy chủ. Vui lòng thử lại sau.";
          }
        } else {
          message = "Không thể kết nối đến máy chủ.";
        }
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: `Lỗi`,
            icon: "AlertCircleIcon",
            variant: "danger",
            text: message,
          },
        });
      }
    },
    async getData() {
      const id = this.$route.params.id;
      if (id) {
        this.edit = id;
        await this.$callApi.get("/api/pageReports/" + id).then((res) => {
          const data = res.data.data;
          const date = new Date(data.date);
          date.setDate(date.getDate() + 1);
          data.date = date.toISOString().split("T")[0];
          this.dataForm = data;
        });
      }
    },
  },
};
</script>
