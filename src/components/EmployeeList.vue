<template>
  <div class="EmployeeList">
    <!-- 始め -->
    <div class="container">
      <div>従業員数:{{ employeeCount }}人</div>
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th>名前</th>
              <th>入社日</th>
              <th>扶養人数</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="employee of employees" v-bind:key="employee.id">
              <td>
                <a href="employeeDetail/employee.id">
                  <router-link :to="'/employeeDetail/' + employee.id">
                    {{ employee.name }}</router-link
                  >
                </a>
              </td>
              <td>{{ employee.hireDate }}</td>
              <td>{{ employee.dependentsCount }}人</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 終わり -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "../types/employee";
@Component
export default class EmployeeList extends Vue {
  // 始め
  /**
   *従業員数を取得し返す.
   *@remarks VuexのgetEmployees実行して返す
   *@returns 従業員の総人数
   */
  get employeeCount(): number {
    return this["$store"].getters.getEmployeeCount;
  }

  /**
   * 従業員⼀覧を取得し返す.
   * @remarks VuexのgetEmployeesを返す
   * @returns 従業員一覧
   */
  get employees(): Array<Employee> {
    return this["$store"].getters.getEmployees;
  }

  /**
   * Vuex ストアのアクション経由で従業員⼀覧を取得する.
   * @remarks 最新の情報に更新する
   */
  created(): void {
    this["$store"].dispatch("getEmployeeList");
  }

  // おわり
}
</script>

<style></style>
