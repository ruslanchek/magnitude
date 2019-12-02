import React from "react";
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppController } from "./controllers/AppController";
import * as serviceWorker from './serviceWorker';

(async () => {
  await AppController.init();
})();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// serviceWorker.register();
