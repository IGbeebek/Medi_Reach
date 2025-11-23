import { useState } from 'react';
import '../Css/login.css';

export default function Login({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	function validate() {
		const e = {};
		if (!email) e.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
		if (!password) e.password = 'Password is required';
		else if (password.length < 6) e.password = 'Password must be at least 6 characters';
		return e;
	}

	async function handleSubmit(ev) {
		ev.preventDefault();
		const e = validate();
		setErrors(e);
		if (Object.keys(e).length) return;
		setLoading(true);
		try {
			// Demo: simulate API call
			await new Promise((r) => setTimeout(r, 800));
			// In real app, call your auth API here
			console.log('Login', { email, remember });
			if (onLogin) onLogin({ email, remember });
			else alert('Logged in (demo)');
		} catch (err) {
			setErrors({ form: 'Login failed. Try again.' });
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="login-page">
			<form className="login-card" onSubmit={handleSubmit} noValidate>
				<h2 className="login-title">Sign in to MediReach</h2>

				{errors.form && <div className="error">{errors.form}</div>}

				<label className="field">
					<span className="label-text">Email</span>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						aria-invalid={errors.email ? 'true' : 'false'}
					/>
					{errors.email && <div className="field-error">{errors.email}</div>}
				</label>

				<label className="field">
					<span className="label-text">Password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						aria-invalid={errors.password ? 'true' : 'false'}
					/>
					{errors.password && <div className="field-error">{errors.password}</div>}
				</label>

				<label className="row">
					<input
						type="checkbox"
						checked={remember}
						onChange={(e) => setRemember(e.target.checked)}
					/>
					<span className="remember-text">Remember me</span>
				</label>

				<button className="btn" type="submit" disabled={loading}>
					{loading ? 'Signing in…' : 'Sign in'}
				</button>

				<div className="aux-links">
					<a href="#">Forgot password?</a>
					<a href="#">Create account</a>
				</div>
			</form>
		</div>
	);
}
