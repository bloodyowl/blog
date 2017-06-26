import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createApp } from '@phenomic/preset-react-app/lib/client';
import BlogPost from './components/BlogPost'

import "./default.css";
import './node_modules/highlight.js/styles/atelier-forest-light.css'
import Html from "./Html";
import Home from "./components/Home";

const routes = () =>
    <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="*" component={BlogPost} collection="posts" />
    </Router>;

export default createApp(routes, Html);

if (module.hot) {
    module.hot.accept(() => renderApp(routes));
}

// kill previous website ServiceWorker
if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) registration.unregister();
    });
}