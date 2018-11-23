import "bootstrap/scss/bootstrap-reboot.scss";
import "bootstrap/scss/bootstrap-grid.scss";
import "./application.css";
import "../assets/styles/footer.sass";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from '../components/Layout/index.js';

ReactDOM.render(<App />, document.getElementById('app'))