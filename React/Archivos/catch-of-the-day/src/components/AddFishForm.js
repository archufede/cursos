import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component {
	nameRef = React.createRef();
	priceRef = React.createRef();
	statusRef = React.createRef();
	descRef = React.createRef();
	imageRef = React.createRef();

	static propTypes = {
		addFish: PropTypes.func
	};

	createFish = event => {
		//Preventing the submitting
		event.preventDefault();
		//Creating the fish from the form data.
		const fish = {
			name: this.nameRef.current.value,
			price: parseFloat(this.priceRef.current.value),
			status: this.statusRef.current.value,
			desc: this.descRef.current.value,
			image: this.imageRef.current.value
		};
		//Routing to the store
		this.props.addFish(fish);
		//Refreshing the form.
		event.currentTarget.reset();
	};
	render() {
		return (
			<form className="fish-edit" onSubmit={this.createFish}>
				<input
					name="name"
					ref={this.nameRef}
					type="text"
					placeholder="Nombre"
				/>
				<input
					name="price"
					ref={this.priceRef}
					type="text"
					placeholder="Precio"
				/>
				<select name="status" ref={this.statusRef}>
					<option value="available">Fresco</option>
					<option value="unavailable">Agotado</option>
				</select>
				<textarea
					name="desc"
					ref={this.descRef}
					type="text"
					placeholder="Descripción"
				/>
				<input
					name="image"
					ref={this.imageRef}
					type="text"
					placeholder="Imagén"
				/>
				<button type="Submit">+ Agregar Pescado</button>
			</form>
		);
	}
}

export default AddFishForm;
