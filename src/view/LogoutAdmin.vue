<template>
  <div class="Logout">
    <!-- 始め -->
    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class LogoutAdmin extends Vue {
  // 始め

  /**
   *概要︓ログアウトをする.
   * @remarks
   *1)axios を使⽤してWebAPIから 情報を取得する
   *2)ログイン画⾯に遷移する
   */
  async created(): Promise<void> {
    console.log("created");

    const response = await axios.get(
      "http://153.127.48.168:8080/ex-emp-api/logout"
    );
    this["$router"].push("/loginAdmin");
    console.log(response);
    console.log(response.data.status);
  }

  // 終わり
}
</script>

<style></style>
