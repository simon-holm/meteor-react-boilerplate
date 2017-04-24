import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: "",
		};
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();

		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();

		if (password.length < 6) {
			return this.setState({error: 'Password must be atleast 6 characters'});
		}

		Accounts.createUser({email, password}, (err) => {
			if (err) {
				this.setState({error: err.reason});
			} else {
				this.setState({error: ""});
			}
		});
	}
	
	render() {
		return (
			<div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" noValidate/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create Account</button>
                    </form>

                    <br/>

                    <Link to="/">Have an account?</Link>
                </div>
			</div>
		);
	}
}