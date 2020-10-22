import React from 'react';
import { Line } from 'react-chartjs-2';
import classes from './Chart.module.css';
import cx from 'classnames';

const chart = (props) => {
	const chartLegend = {
		display  : true,
		position : 'top',
		labels   : {
			fontColor : 'rgba(0, 80, 112, 0.664)',
			fontSize  : 15
		}
	};

	const chartData = {
		labels   : props.details.map(({ reportDate }) => reportDate),
		datasets : [ props.dataset ]
	};

	const classArray = [ classes.Chart ];
	if (props.classType === 'Confirmed') {
		classArray.push(classes.Confirmed);
	} else {
		classArray.push(classes.Death);
	}

	return (
		<div className={classArray.join(' ')}>
			<Line legend={chartLegend} data={chartData} />
		</div>
	);
};
export default chart;
