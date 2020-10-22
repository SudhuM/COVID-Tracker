import React, { Component } from 'react';
import './App.css';
import { Cards, Charts, CountryPicker } from './containers';
import fetchAllData from './containers/utility';

class App extends Component {
	state = {
		confirmed               : {},
		recovered               : {},
		deaths                  : {},
		lastUpdate              : '',
		loading                 : true,
		currentCountrySelection : 'global'
	};

	async componentDidMount() {
		const { confirmed, deaths, recovered, lastUpdate } = await fetchAllData('/');
		console.log(this.state.currentSelection);
		this.setState({
			confirmed,
			recovered,
			deaths,
			lastUpdate,
			currentCountrySelection : 'global',
			loading                 : false
		});
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevState.currentCountrySelection !== this.state.currentCountrySelection) {
			let url = `/countries/${this.state.currentCountrySelection}`;
			if (this.state.currentCountrySelection === 'global') {
				url = '/';
			}
			const { confirmed, deaths, recovered, lastUpdate } = await fetchAllData(url);
			this.setState({
				confirmed,
				recovered,
				deaths,
				lastUpdate,
				loading    : false
			});
		}
	}

	filterByCountryHandler = (e) => {
		const countrySelected = e.target.value;
		this.setState({
			currentCountrySelection : countrySelected,
			loading                 : true
		});
	};

	render() {
		const styles = {
			Header : {
				color         : '#3c3c3c',
				textAlign     : 'center',
				letterSpacing : '2px'
			},
			Span   : {
				color : 'teal'
			}
		};
		return (
			<div className='App'>
				<h2 style={styles.Header}>
					COVID <span style={styles.Span}>19</span> TRACKER
				</h2>
				<CountryPicker changed={this.filterByCountryHandler} />
				<Cards {...this.state} />
				<Charts filteredCountry={this.state.currentCountrySelection} />
			</div>
		);
	}
}
export default App;
