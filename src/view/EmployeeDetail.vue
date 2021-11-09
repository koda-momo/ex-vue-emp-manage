<template>
  <div clas="EmployeeDetail">
    <!-- 始め -->
    <div class="container">
      <div class="row">
        <form>
          <fieldset>
            <legend>従業員情報</legend>
            <table>
              <tr>
                <th nowrap>従業員名</th>
                <td>
                  <span>{{ currentEmployee.name }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>写真</th>
                <td>
                  <img :src="currentEmployeeImage" />
                </td>
              </tr>
              <tr>
                <th nowrap>性別</th>
                <td>
                  <span>{{ currentEmployee.gender }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>入社日</th>
                <td>
                  <span>{{ currentEmployee.hireDate }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>メールアドレス</th>
                <td>
                  <span>{{ currentEmployee.mailAddress }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>郵便番号</th>
                <td>
                  <span>{{ currentEmployee.zipCode }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>住所</th>
                <td>
                  <span>{{ currentEmployee.address }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>電話番号</th>
                <td>
                  <span>{{ currentEmployee.telephone }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>給料</th>
                <td>
                  <span>{{ currentEmployee.salary }}円</span>
                </td>
              </tr>
              <tr>
                <th nowrap>特性</th>
                <td>
                  <span>{{ currentEmployee.characteristics }}</span>
                </td>
              </tr>
              <tr>
                <th nowrap>扶養人数</th>
                <td>
                  <div class="input-field col s12">
                    <div class="error">{{ errorMessage }}</div>
                    <input
                      id="dependentsCount"
                      type="text"
                      class="validate"
                      required
                      v-model="currentDependentsCount"
                    />
                    <label for="dependentsCount2">扶養人数</label>
                  </div>
                </td>
              </tr>
            </table>

            <button
              type="button"
              class="btn btn-register waves-effect waves-light"
              v-on:click="update()"
            >
              更新
            </button>
          </fieldset>
        </form>
      </div>
    </div>

    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "../types/employee";
import axios from "axios";
@Component
export default class EmployeeDetail extends Vue {
  // 始め
  private currentEmployee!: Employee;
  private errorMessage = "";
  private currentEmployeeImage = "";
  private currentDependentsCount = 0;

  /**
 *Vuex ストアの Getter 経由で受け取ったリクエストパラメータの ID から１件の従業員情報を取得する.
 @remarks
 *1)現在表示している従業員情報のidをnumberに変換して取得する
 *2)VuexストアのGetter,getEmployeeByIdメソッド(引数：先程取得したid)→戻り値をcurrentEmployeeに代入
 *3)現在の従業員情報の画像ファイル名をcurrentEmployeeImageに代入
 *4)現在の従業員情報の扶養人数をcurrentDependentsCountに代入
 */
  created(): void {
    //1)
    const employeeId = parseInt(this["$route"].params.id);
    console.log(employeeId);
    //2)
    this.currentEmployee = this["$store"].getters.getEmployeeById(employeeId);
    //3)
    this.currentEmployeeImage =
      "http://153.127.48.168:8080/ex-emp-api/img/" + this.currentEmployee.image;
    //4)
    this.currentDependentsCount = this.currentEmployee.dependentsCount;
  }

  /**
   * 概要︓扶養⼈数を更新する.
   * @remarks
   *1)axios を使⽤してWebAPIから 情報を取得する
   *2)response 内の data 内の status が
   *  →success なら、扶養⼈数を更新成功のため、従業員⼀覧画⾯に遷移する
   *  →error ならログイン失敗のため、response 内の data内の message をエラーメッセージとして画⾯に表⽰する
   */
  async update(): Promise<void> {
    //1)
    const response = await axios.post(
      "http://153.127.48.168:8080/ex-emp-api/employee/update",
      {
        id: this.currentEmployee.id,
        dependentsCount: this.currentDependentsCount,
      }
    );
    //2)
    if (response.data.status === "success") {
      this["$router"].push("/employeeList");
    } else {
      this.errorMessage = "更新出来ませんでした(" + response.data.message + ")";
    }
  }
  //   終わり
}
</script>

<style></style>
