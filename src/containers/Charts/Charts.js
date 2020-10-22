import React, { Component } from 'react';
import Chart from '../../components/Chart/Chart';
import fetchAllData from '../utility';

import classes from './Charts.module.css';

class Charts extends Component {
	state = {
		details : [],
		loading : true
	};

	async componentDidMount() {
		const dailyData = await fetchAllData('/daily');

		const details = dailyData.map(({ confirmed, deaths, reportDate }) => {
			return {
				confirmed,
				deaths,
				reportDate
			};
		});

		this.setState(
			{
				details : details
			},
			() => this.createDataSet()
		);
	}

	createDataSet = () => {
		const confirmedDataset = {
			label           : 'Confirmed',
			fill            : true,
			backgroundColor : 'rgba(0  ,0 ,255 , 0.3)',
			borderColor     : 'rgba(0, 0, 255)',
			data            : this.state.details.map(({ confirmed }) => confirmed.total)
		};

		const deathDataset = {
			label           : 'Deaths',
			data            : this.state.details.map(({ deaths }) => deaths.total),
			fill            : true,
			backgroundColor : 'rgba(255  , 0,0 , 0.3)',
			borderColor     : 'rgb(255 , 0,  0)'
		};

		this.setState({
			confirmedDataset,
			deathDataset,
			loading          : false
		});
	};

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				{!this.state.loading ? (
					<div className={classes.Charts}>
						<Chart
							details={this.state.details}
							classType='Confirmed'
							dataset={this.state.confirmedDataset}
						/>
						<Chart
							details={this.state.details}
							className='Death'
							dataset={this.state.deathDataset}
						/>
					</div>
				) : (
					<h3>Loading...</h3>
				)}
			</div>
		);
	}
}

export default Charts;
