import React from 'react';
import classes from './Card.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

const Card = (props) => {
	const textToDisplay = {
		confirmed : {
			text  : 'Number of people Infected',
			class : classes.Confirmed
		},
		recovered : {
			text  : 'Number of people Recovered',
			class : classes.Recovered
		},
		deaths    : {
			text  : 'Number of people Died',
			class : classes.Death
		}
	};
	return (
		<div className={cx(classes.Card, textToDisplay[props.title.toLowerCase()].class)}>
			<h2>{props.title}</h2>
			<p>
				{!props.loading ? (
					<CountUp start={0} end={props.data.value} duration={2.5} separator=',' />
				) : (
					<span style={{ color: 'red' }}>Loading...</span>
				)}
			</p>
			<small className={classes.LastUpdate}>
				Last Updated : <span>{new Date(props.lastUpdate).toDateString()}</span>
			</small>
			<p className={classes.footerText}>{textToDisplay[props.title.toLowerCase()].text}</p>
		</div>
	);
};
export default Card;
