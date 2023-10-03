import React from "react";
import PropTypes from "prop-types";

const Login = props => (
	<nav className="login">
		<h2>Login del Inventorio</h2>
		<p>Inicie sesión para manejar el inventario de su tienda.</p>
		<button
			className="facebook"
			onClick={() => props.authenticate("Facebook")}
		>
			Iniciar sesión con Facebook
		</button>
	</nav>
);

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};

export default Login;
