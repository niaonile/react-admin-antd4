import dva from 'dva';
import './index.css';
import { message } from 'antd';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory as createHistory } from 'history';

const ERROR_MSG_DURATION = 3;

// 1. Initialize
const app = dva({
	history: createHistory(),
	onError(e) {
		message.error(e.message, ERROR_MSG_DURATION);
	},
});
 
// 2. Plugins
// app.use({});
 
// 3. Model
app.model(require('./models/global').default);
 
// 4. Router
app.router(require("./App").RouterConfig);
 
// 5. Start
app.start('#root');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
