import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
	static propTypes = {
		history: PropTypes.object
	};

	storeNameInput = React.createRef();

	goToStore = event => {
		//Preventing the submitting
		event.preventDefault();
		//Getting the text from the input.
		const storeName = this.storeNameInput.current.value;
		//Routing to the store
		this.props.history.push(`/store/${storeName}`);
	};
	render() {
		return (
			<form
				action=""
				className="store-selector"
				onSubmit={this.goToStore}
			>
				<h2>Please Enter A Store</h2>
				<input
					type="text"
					required
					placeholder="Store Name"
					defaultValue={getFunName()}
					ref={this.storeNameInput}
				/>
				<button type="submit">Visit Store → </button>
			</form>
		);
	}
}

export default StorePicker;
