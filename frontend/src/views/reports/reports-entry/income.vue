<template>
  <b-card p-5>
    <b-card-header class="d-flex justify-content-between align-items-center">
      <b-card-title>Nhập báo cáo doanh thu thực</b-card-title>
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
            <b-form-group label="Team" label-for="mc-teamId">
              <b-form-select
                v-model="dataForm.teamId"
                id="mc-teamId"
                :options="options.team"
                placeholder="Team"
                :disabled="userData.role !== 'ADMIN' ? true : false"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Chi nhánh" label-for="mc-branchId">
              <b-form-select
                v-model="dataForm.branchId"
                id="mc-branchId"
                :options="options.branch"
                placeholder="Chi nhánh"
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
            <b-form-group label="Kỳ báo cáo" label-for="mc-tern">
              <b-form-input
                v-model="dataForm.tern"
                id="mc-tern"
                type="month"
                placeholder="Kỳ báo cáo"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Doanh số thực" label-for="mc-income">
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.income"
                  id="mc-income"
                  type="number"
                  placeholder="Doanh số thực"
                />
              </div>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Tỉ lệ chi phí ads/ doanh thu thực"
              label-for="mc-adsRate"
            >
              <div class="form-label-group">
                <b-form-input
                  v-model="dataForm.adsRate"
                  id="mc-adsRate"
                  type="number"
                  placeholder="Tỉ lệ chi phí ads/ doanh thu thực"
                />
              </div>
            </b-form-group>
          </b-col>

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
        adsRate: null,
        tern: null,
        income: null,
      },
      options: {
        position: [],
        team: [],
        branch: [],
        user: [],
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
    
    this.$callApi.get("/api/positions").then((res) => {
      this.options.position = res.data.data.map((item) => {
        return { value: item.name, text: item.name };
      });
    });
    this.getData();
  },
  methods: {
    async onSubmit() {
      try {
        if (this.edit) {
          await this.$callApi.put(
            "/api/incomeReports/" + this.edit,
            this.dataForm
          );
        } else {
          await this.$callApi.post("/api/incomeReports", this.dataForm);
          this.dataForm = {
            userId: JSON.parse(localStorage.getItem("userData")).id,
            position: JSON.parse(localStorage.getItem("userData")).position,
            teamId: JSON.parse(localStorage.getItem("userData")).teamId,
            branchId: JSON.parse(localStorage.getItem("userData")).branchId,
            adsRate: null,
            tern: null,
            income: null,
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
        await this.$callApi.get("/api/incomeReports/" + id).then((res) => {
          const data = res.data.data;
          const date = new Date(data.tern);
          date.setMonth(date.getMonth() + 1);
          data.tern = date.toISOString().slice(0, 7);
          this.dataForm = data;
        });
      }
    },
  },
};
</script>
