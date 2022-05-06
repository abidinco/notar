import React from 'react';
import CountUp from 'react-countup';

let styles = {
	wrapper: {
		padding: '.5em 2em'
	},
	number: {
		fontSize: '2em',
		color: 'rgb(149, 165, 166)'
	},
	text: {
		fontSize: '1em',
		color: 'rgb(189, 195, 199)'
	}
}

class NotarHomepageTile extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return(
			<div className="vertical layout center-center" style={styles.wrapper}>
				<CountUp style={styles.number} start={0} end={this.props.number} duration={3} useEasing={true}/>
				<div style={styles.text}>{this.props.text}</div>
			</div>
		)
	}
}

export default NotarHomepageTile;
