import React from 'react';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconToc from 'material-ui/svg-icons/action/toc';

import NotarHomepageTile from '../components/NotarHomepageTile';

class NotarHomepage extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="container vertical layout center-center pt-2">
				<div className="horizontal layout">
					<TextField hintText="Sakarya Hukuk Medeni Vize 2016" />
					<IconButton touch={true}>
						<IconSearch className="grey-700-imp"/>
					</IconButton>
				</div>
				<div className="horizontal layout wrap mt-2 center-center">
					<NotarHomepageTile number={2} text="üniversite" />
					<NotarHomepageTile number={3} text="fakülte" />
					<NotarHomepageTile number={22} text="ders" />
					<NotarHomepageTile number={123123} text="doküman" />
				</div>
				<div className="mt-1">
					<RaisedButton href="/notar/notlar" label="HEPSİ" primary={true} icon={<IconToc />} labelPosition="before"/>
				</div>
				<div className="vertical layout center-center">
					<div style={{marginTop: '5em', color: 'rgb(127, 140, 141)'}}>Üniversitelerin, öğrencilerine sağladıkları dokümanlar</div>
					<div className="fs-2" style={{color: 'rgb(127, 140, 141)', fontSize: '4em'}}>notar</div>
				</div>
			</div>
		)
	}
};

export default NotarHomepage;
