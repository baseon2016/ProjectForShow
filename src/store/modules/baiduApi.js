import axios from "axios";
const baiduApi = {
  state: {
    access_token:
      "21.8f9a743981a364b4302c1efc22023434.2592000.1576198022.1443708768-17751399",
    site_id: "14111122",
    method: "trend/time/a",
    metrics: "pv_count,trans_count",
    start_date: "20191105",
    target: 2,
    gran: "week"
  },
  actions: {
    baiduApi({ state }) {
      const {
        access_token,
        site_id,
        method,
        metrics,
        start_date,
        target,
        gran
      } = state;
      const now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      year = year.toString();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      const end_date = year + month + day;
      axios
        .post(
          `https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=${access_token}&site_id=${site_id}&method=${method}&metrics=${metrics}&start_date=${start_date}&end_date=${end_date}&gran=${gran}&target=${target}
          `
        )
        .then(res => {
          console.log(res);
        });
    }
  }
};
export default baiduApi;
