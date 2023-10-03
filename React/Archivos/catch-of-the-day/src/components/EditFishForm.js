import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
	static propTypes = {
		fish: PropTypes.shape({
			image: PropTypes.string,
			name: PropTypes.string,
			desc: PropTypes.string,
			status: PropTypes.string,
			price: PropTypes.number
		}),
		index: PropTypes.string,
		updateFish: PropTypes.func
	};

	handleChange = event => {
		//Updating the fish.
		//Copying the fish.
		const updatedFish = {
			...this.props.fish,
			[event.currentTarget.name]: event.currentTarget.value
		};
		//Updating the fish.
		this.props.updateFish(this.props.index, updatedFish);
	};
	render() {
		return (
			<div className="fish-edit">
				<input
					name="name"
					onChange={this.handleChange}
					value={this.props.fish.name}
					type="text"
					placeholder="Nombre"
				/>
				<input
					name="price"
					onChange={this.handleChange}
					value={this.props.fish.price}
					type="text"
					placeholder="Precio"
				/>
				<select
					name="status"
					onChange={this.handleChange}
					value={this.props.fish.status}
				>
					<option value="available">Fresco</option>
					<option value="unavailable">Agotado</option>
				</select>
				<textarea
					name="desc"
					onChange={this.handleChange}
					value={this.props.fish.desc}
					type="text"
					placeholder="Descripción"
				/>
				<input
					name="image"
					onChange={this.handleChange}
					value={this.props.fish.image}
					type="text"
					placeholder="Imagén"
				/>
				<button onClick={() => this.props.deleteFish(this.props.index)}>
					Eliminar Pescado
				</button>
			</div>
		);
	}
}

export default EditFishForm;
