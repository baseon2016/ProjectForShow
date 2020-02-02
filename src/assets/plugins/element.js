import Vue from "vue";
import {
  Dialog,
  Loading,
  MessageBox,
  Message,
  Notification,
  Pagination,
  FormItem,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Card,
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Tabs,
  TabPane
} from "element-ui";
// import "./assets/element-variables.scss";
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Loading.directive);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Card);
Vue.use(Button);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
