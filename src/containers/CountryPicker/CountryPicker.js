import React, { Component } from 'react';
import classes from './CountryPicker.module.css';

import fetchAllData from '../utility';

class CountryPicker extends Component {
	state = {
		countries : []
	};

	async componentDidMount() {
		const { countries } = await fetchAllData('/countries');
		const filteredCountries = countries.map((country) => country.name);
		filteredCountries.unshift('global');
		this.setState({
			countries : filteredCountries
		});
	}
	render() {
		const countryOptions = this.state.countries.map((country, index) => (
			<option className={classes.countries} key={index} value={country.toLowerCase()}>
				{country}
			</option>
		));

		return (
			<div className={classes.CountryPicker}>
				<select onChange={this.props.changed}>{countryOptions}</select>
			</div>
		);
	}
}
export default CountryPicker;
