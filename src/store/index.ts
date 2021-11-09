import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "../types/employee";
import axios from "axios";

Vue.use(Vuex);

/**
 *Vuex ストア設定ファイル(今回は従業員情報を持たせる).
 *
 *@remarks
 *従業員⼀覧情報を持たせる
 *外部 WebAPI からの従業員情報取得
 */
export default new Vuex.Store({
  strict: true,
  state: {
    totalEmployeeCount: 0,
    employees: new Array<Employee>(),
  }, // end state
  actions: {
    /**
     * 概要︓従業員⼀覧情報を WebAPI から取得して mutation を呼び出す.
     * @remarks
     *1)axios を使⽤してWebAPI を呼ぶ。
     *2)取得した response データの中の data を取り出して payload 変数に格納する。
     *3)showEmployeeList という名前のミューテーションを呼び出す。
     *
     * @param context-ミューテーションを経由するために設定している引数
     */
    async getEmployeeList(context) {
      //1)
      const response = await axios.get(
        "http://153.127.48.168:8080/ex-emp-api/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));
      //2)
      const payload = response.data;
      //3)
      context.commit("showEmployeeList", payload);
    },
  }, // end actions

  mutations: {
    /**
     * 概要：従業員⼀覧情報を作成して state に格納する.
     *
     * @remarks
     *1)payload(元データ)：payloadのtotalEmployeeCountをstateのtotalEmployeeCountに代⼊する
     *2)元データを回して、自分で作成した配列employeesに情報をpush
     *
     * @param state- stateの変数を利用するために設定している引数
     * @param payload- (astionから受け取っている、元データを格納している引数)(JSON形式の従業員情報)
     */
    showEmployeeList(state, payload) {
      console.log("totalEmployeeCount:" + payload.totalEmployeeCount);
      //1)
      state.totalEmployeeCount = payload.totalEmployeeCount;
      //2)
      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
      console.log("employees:" + state.employees);
    },
  }, // end mutations
  getters: {
    /**
     * 概要︓従業員数を返す.
     *
     * @param state -stateの変数を利用するために設定している引数
     * @returns state 内の従業員⼀覧の件数を返す
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },

    /**
     * 概要︓従業員⼀覧を返す.
     *
     * @param state -stateの変数を利用するために設定している引数
     * @returns state 内の従業員⼀覧を返す
     */
    getEmployees(state) {
      return state.employees;
    },

    /**
     * 概要︓ID から従業員を検索し返す.
     *
     * @param state -stateの変数を利用するために設定している引数
     * @returns 渡されたIDで絞り込んだ Employeeオブジェクトを1件返す
     */
    getEmployeeById(state) {
      return (id: number) => {
        const array = [];
        for (const employee of state.employees) {
          if (employee.id == id) {
            array.push(employee);
          }
        }
        return array[0];
      };
    },
  }, // end getters
  modules: {}, // end modules
});
