import React, { Component } from 'react';
import { Card } from '../../components';
import classes from './Cards.module.css';

class Cards extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return this.props !== nextProps;
	}

	render() {
		const cardKeys = [ 'confirmed', 'recovered', 'deaths' ];

		const cards = cardKeys.map((cardItem) => {
			return (
				<Card
					key={cardItem}
					title={cardItem}
					lastUpdate={this.props.lastUpdate}
					data={this.props[cardItem]}
					loading={this.props.loading}
				/>
			);
		});

		return <div className={classes.Cards}>{cards}</div>;
	}
}

export default Cards;
