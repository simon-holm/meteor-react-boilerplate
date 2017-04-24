import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const unauthenticatePages = ['/', '/signup'];
const authenticatePages = ['/dashboard'];
const onEnterPublicPage = () => {
	if (Meteor.userId()) {
		browserHistory.replace('/dashboard');
	}
};
const onEnterPrivatePage = () => {
	if (!Meteor.userId()) {
		browserHistory.replace('/');
	}
};

export const onAuthChange = (isAuthenticated) => {
	const pathname = browserHistory.getCurrentLocation().pathname;
	const isUnauthenticatedPage = unauthenticatePages.includes(pathname);
	const isAuthenticatedPage = authenticatePages.includes(pathname);

	if (isAuthenticated && isUnauthenticatedPage) {
		browserHistory.replace("/dashboard");
	}
	if (!isAuthenticated && isAuthenticatedPage) {
		browserHistory.replace("/");
	}
};

export const routes = (
    <Router history={browserHistory}>
		<Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
		<Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
		<Route path="*" component={NotFound}/>
    </Router>
);