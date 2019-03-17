import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
	static propTypes = {
		details: PropTypes.shape({
			name: PropTypes.string,
			image: PropTypes.string,
			price: PropTypes.number,
			desc: PropTypes.string,
			status: PropTypes.string
		}),
		addToOrder: PropTypes.func
	};

  render() {
		const { name, image, price, desc, status } = this.props.details;
		const isAvailable = status === 'available';
    return (
			<li className="menu-fish">
				<img src={image} alt={name} />
				<h3 className="fish-name">
					{name}
					<span className="price">{formatPrice(price)}</span>
				</h3>
				<p>{desc}</p>
				<button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
					{isAvailable ? 'Add To Order' : 'Sold Out!'}
				</button>
			</li>
    );
  }
}

export default Fish;