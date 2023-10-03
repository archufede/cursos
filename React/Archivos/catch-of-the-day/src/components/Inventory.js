import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
	static propTypes = {
		fishes: PropTypes.object,
		updateFish: PropTypes.func,
		deleteFish: PropTypes.func,
		loadSampleFishes: PropTypes.func
	};

	state = {
		uid: null,
		owner: null
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.authHandler({ user });
			}
		});
	}

	authHandler = async authData => {
		//Looking store if in the firebase database
		const store = await base.fetch(this.props.storeId, { context: this });
		//Claiming if there is no owner
		if (!store.owner) {
			//Saving as my own
			await base.post(`${this.props.storeId}/owner`, {
				data: authData.user.uid
			});
		}
		//Setting the state of the inventory component
		this.setState({
			uid: authData.user.uid,
			owner: store.owner || authData.user.uid
		});
	};

	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler);
	};

	logout = async () => {
		await firebase.auth().signOut();
		this.setState({ uid: null });
	};

	render() {
		const logout = <button onClick={this.logout}>Cerrar sesión</button>;
		//Cheking if logged.
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}

		//Cheking if the owner of the store.
		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>Vos no sos el dueño</p>
					{logout}
				</div>
			);
		}

		//Rendering the inventory.
		return (
			<div className="Inventory">
				<h2>Inventario</h2>
				{logout}
				{Object.keys(this.props.fishes).map(key => (
					<EditFishForm
						key={key}
						index={key}
						fish={this.props.fishes[key]}
						updateFish={this.props.updateFish}
						deleteFish={this.props.deleteFish}
					/>
				))}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSampleFishes}>
					Cargar pescados de muestra
				</button>
			</div>
		);
	}
}

export default Inventory;
