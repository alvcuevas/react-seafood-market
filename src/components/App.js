import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../data/fishes';
import base from '../base';

class App extends Component {

	state = {
		fishes: {},
		order: {}
	};

	static propTypes = {
		match: PropTypes.object
	};

	componentDidMount() {
		const { params } = this.props.match;

		// check localStorage
		const localStorageRef = localStorage.getItem(params.storeId);
		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}

		// sync del state con firebase
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});
	}

	componentDidUpdate() {
		// sync con localStorage cada vez que haya un cambio
		const storeName = this.props.match.params.storeId;
		const order = JSON.stringify(this.state.order);
		localStorage.setItem(storeName, order);
	}

	componentWillUnmount () {
		// no-sync con firebase al salir del componente App
		base.removeBinding(this.ref);
	}

	addFish = (fish) => {
		const fishes = {...this.state.fishes}; // 1. copy the global state
		fishes[`fish${Date.now()}`] = fish; // 2. add new item received
		this.setState({ fishes: fishes }); // 3. update global state
	};

	updateFish = (key, updatedFish) => {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes: fishes });
	};

	deleteFish = (key) => {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes: fishes });
	}

	loadSamplesFishes = () => {
		this.setState({ fishes: sampleFishes });
	};

	addToOrder = (key) => {
		const order = {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({ order: order });
	}

	removeFromOrder = (key) => {
		const order = {...this.state.order};
		delete order[key];
		this.setState({ order: order });
	}

	render() { 
		return (
			<div className="seafood-market">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{ Object.keys(this.state.fishes).map(key => (
							<Fish
								key={key}
								index={key}
								details={this.state.fishes[key]}
								addToOrder={this.addToOrder}
							/>
						)) }
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					removeFromOrder={this.removeFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSamplesFishes={this.loadSamplesFishes}
					fishes={this.state.fishes}
				/>
			</div>
		);
	}
}

export default App;
