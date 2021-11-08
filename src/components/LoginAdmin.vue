<template>
  <div class="loginAdmin">
    <!-- 始め -->
    <div class="container">
      <div class="row login-page">
        <div class="col s12 z-depth-6 card-panel">
          <div class="error">{{ errorMessage }}</div>
          <form class="login-form">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>
                <input
                  class="validate"
                  id="mailAddress"
                  type="email"
                  v-model="mailAddress"
                />
                <label for="mailAddress" data-error="wrong" data-success="right"
                  >メールアドレス</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input id="password" type="password" v-model="password" />
                <label for="password">パスワード</label>
                {{ password }}
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <button
                  type="button"
                  class="btn btn-register waves-effect waves-light col s12"
                  v-on:click="loginAdmin()"
                >
                  ログイン
                </button>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6 m6 l6">
                <p class="margin medium-small">
                  <router-link to="/registerAdmin"
                    >管理者登録はこちら</router-link
                  >
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LoginAdmin extends Vue {
  // 始め
  private errorMessage = ""; //エラー時に表示されるメッセージ
  private mailAddress = ""; //メールアドレス
  private password = ""; //パスワード

  /**
   * 概要︓ログインをする.
   *@remarks
   * 1)axios を使⽤して WebAPI を呼ぶ
   * 2)response 内の data 内の status が
   *  →success ならログイン成功のため、従業員⼀覧画⾯に遷移する
   *  →error ならログイン失敗のため、response 内の data内の message をエラーメッセージとして画⾯に表⽰する
   */
  async loginAdmin(): Promise<void> {
    //1)
    console.log("loginよばれた");
    const response = await axios.post(
      "http://54.203.170.16:8080/ex-emp-api/login",
      {
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );
    //2)
    if (response.data.status === "success") {
      console.log("success::::");
      this["$router"].push("/employeeList");
    } else {
      console.log("error::::");
      this.errorMessage =
        "ログイン出来ませんでした(" + response.data.message + ")";
    }
  }

  // 終わり
}
</script>

<style scoped>
.login-page {
  width: 600px;
}
</style>
