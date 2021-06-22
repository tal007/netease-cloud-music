import React from "react";
import ReactDOM from "react-dom";
import "./variable.less";
import "./index.less";
import App from "./routes/index";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./context";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <AppProviders>
        <App />
      </AppProviders>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
