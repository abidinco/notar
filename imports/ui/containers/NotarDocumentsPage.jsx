import React from 'react';
import Paper from 'material-ui/Paper';
import update from 'react-addons-update';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import IconFilterList from 'material-ui/svg-icons/content/filter-list';

import NotarDocumentsListItem from '../components/NotarDocumentsListItem';

let universities = ["Sakarya", "ODTÜ"],
		faculties = ["Bilgisayar", "Hukuk"],
		type = ["Vize", "Final", "Pratik", "Quiz"];

class NotarDocumentsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggledUniversities: [],
			toggledFaculties: [],
			toggledTypes: []
		}
	}
	handleToggleClick(event) {
		let target = event.currentTarget,
				targetText = event.currentTarget.textContent || event.currentTarget.innerText;

		if(target.classList.contains('toggled')) {
			target.classList.remove('toggled');
			if(target.classList.contains('uni')) {
				let thatIndex = this.state.toggledUniversities.indexOf(targetText);
				this.setState({
					toggledUniversities: update(this.state.toggledUniversities, {$splice: [[thatIndex, 1]]})
				});
			} else if(target.classList.contains('fac')) {
				let thatIndex = this.state.toggledFaculties.indexOf(targetText);
				this.setState({
					toggledFaculties: update(this.state.toggledFaculties, {$splice: [[thatIndex, 1]]})
				});
			} else if(target.classList.contains('type')) {
				let thatIndex = this.state.toggledTypes.indexOf(targetText);
				this.setState({
					toggledTypes: update(this.state.toggledTypes, {$splice: [[thatIndex, 1]]})
				});
			}
		} else {
			target.classList.add('toggled');
			if(target.classList.contains('uni')) {
				let newState = update(this.state.toggledUniversities, {$push: [targetText]});
				this.setState({
					toggledUniversities: newState
				});
			} else if(target.classList.contains('fac')) {
				let newState = update(this.state.toggledFaculties, {$push: [targetText]});
				this.setState({
					toggledFaculties: newState
				});
			} else if(target.classList.contains('type')) {
				let newState = update(this.state.toggledTypes, {$push: [targetText]});
				this.setState({
					toggledTypes: newState
				});
			}
		}
	}
	render() {
		return(
			<div className="container vertical layout">
				<div className="vertical layout notar-docs-filter-section">
					<div className="horizontal layout center">
						<AutoComplete hintText="Bölüm" filter={AutoComplete.caseInsensitiveFilter} dataSource={faculties} />
						<div className="notar-documents-page-toggle fac" onClick={this.handleToggleClick.bind(this)}>Hukuk</div>
						<div className="notar-documents-page-toggle fac" onClick={this.handleToggleClick.bind(this)}>PC</div>
					</div>
					<div className="horizontal layout center">
						<AutoComplete errorText="Birden fazla üniversite için virgül kullanın" errorStyle={{color: 'grey'}} hintText="Üniversite" filter={AutoComplete.caseInsensitiveFilter} dataSource={universities} />
						<div className="notar-documents-page-toggle uni" onClick={this.handleToggleClick.bind(this)}>Sakarya</div>
						<div className="notar-documents-page-toggle uni" onClick={this.handleToggleClick.bind(this)}>ODTÜ</div>
						<div className="notar-documents-page-toggle uni" onClick={this.handleToggleClick.bind(this)}>123123123</div>
						<div className="notar-documents-page-toggle uni" onClick={this.handleToggleClick.bind(this)}>asdfasdf</div>
					</div>
					<div className="horizontal layout center">
						<div className="notar-documents-page-toggle type" onClick={this.handleToggleClick.bind(this)}>Vize</div>
						<div className="notar-documents-page-toggle type" onClick={this.handleToggleClick.bind(this)}>Final</div>
						<div className="notar-documents-page-toggle type" onClick={this.handleToggleClick.bind(this)}>Pratik</div>
						<div className="notar-documents-page-toggle type" onClick={this.handleToggleClick.bind(this)}>Quiz</div>
					</div>
					<div className="mt-1 horizontal layout center">
						<RaisedButton label="FİLTRELE" icon={<IconFilterList />} primary={true}/>
						<div>{this.state.toggledFaculties}</div>
						<div>{this.state.toggledUniversities}</div>
					</div>
				</div>
				<NotarDocumentsListItem question file owner="serdar"
																university="Sakarya" faculty="Hukuk" lesson="Medeni" year="2014" type="Vize"
																commentCount="124" ago="2s"/>
				<NotarDocumentsListItem question file owner="ynssrn"
																university="Sakarya" faculty="Hukuk" lesson="Medeni" year="2014" type="Vize"
																commentCount="124" ago="2s"/>
			</div>
		)
	}
}

export default NotarDocumentsPage;
