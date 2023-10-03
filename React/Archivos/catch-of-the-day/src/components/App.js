import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	};

	componentDidMount() {
		const { params } = this.props.match;
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		});
	}

	componentDidUpdate() {
		localStorage.setItem(
			this.props.match.params.storeId,
			JSON.stringify(this.state.order)
		);
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = fish => {
		//Taking copy of the existing state.
		const fishes = { ...this.state.fishes };
		//Adding new fish to fishes.
		fishes[`fish${Date.now()}`] = fish;
		//Setting the new state.
		this.setState({
			fishes
		});
	};

	updateFish = (key, updatedFish) => {
		//Taking copy of the existing state.
		const fishes = { ...this.state.fishes };
		//Updating the fish.
		fishes[key] = updatedFish;
		//Setting the new state
		this.setState({
			fishes
		});
	};

	deleteFish = key => {
		//Taking copy of the existing state.
		const fishes = { ...this.state.fishes };
		//Updating the state.
		fishes[key] = null;
		//Setting the new state
		this.setState({
			fishes
		});
	};

	loadSampleFishes = () => {
		this.setState({ fishes: sampleFishes });
		console.log("Cargando pescados");
	};

	addToOrder = key => {
		//Taking copy of the existing state.
		const order = { ...this.state.order };
		//Adding or updating to the order.
		order[key] = order[key] + 1 || 1;
		//Setting the new state.
		this.setState({ order });
	};

	deleteFromOrder = key => {
		//Taking copy of the existing state.
		const order = { ...this.state.order };
		//Adding or updating to the order.
		delete order[key];
		//Setting the new state.
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Archufede" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					deleteFromOrder={this.deleteFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
