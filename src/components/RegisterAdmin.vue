<template>
  <div id="RegisterAdmin">
    <!-- 始め -->
    <div class="container">
      <div class="row register-page">
        <div class="error">{{ errorMessage }}</div>
        <form class="col s12" id="reg-form">
          <div class="row">
            <div class="input-field col s6">
              <input
                id="last_name"
                type="text"
                class="validate"
                required
                v-model="lastName"
              />
              <label for="last_name">姓</label>
            </div>
            <div class="input-field col s6">
              <input
                id="first_name"
                type="text"
                class="validate"
                required
                v-model="firstName"
              />
              <label for="first_name">名</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                required
                v-model="mailAddress"
              />
              <label for="email">メールアドレス</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                minlength="8"
                required
                v-mode-="password"
              />
              <label for="password">パスワード</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <button
                type="button"
                class="btn btn-large btn-register waves-effect waves-light"
                v-onclick:click="registerAdmin()"
              >
                登録
                <i class="material-icons right">done</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class RegisterAdmin extends Vue {
  // 始め

  private errorMessage = "";
  private lastName = "";
  private firstName = "";
  private mailAddress = "";
  private password = "";

  /**
   * 概要︓管理者情報を登録する.
   * @remarks
   * 1)axios を使⽤して WebAPI を呼ぶ
   * 2)response 内の data 内の statusが
   *  →success なら、登録成功のため、ログイン画⾯に遷移する
   *  →error なら、登録失敗のため、response 内の data 内のmessage をエラーメッセージとして画⾯に表⽰する。
   */
  async registerAdmin(): Promise<void> {
    //1)
    const response = await axios.post(
      "http://54.203.170.16:8080/ex-emp-api/insert",
      {
        name: this.lastName + " " + this.firstName,
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );
    console.dir("response:" + JSON.stringify(response));
    //2)
    if (response.data.status == "success") {
      this["$router"].push("/loginAdmin");
    } else if (response.data.status == "error") {
      this.errorMessage = response.data.message;
    }
  }

  // 終わり
}
</script>

<style scoped>
.register-page {
  width: 600px;
}
</style>
