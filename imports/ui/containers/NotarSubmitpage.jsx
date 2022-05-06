import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {Step, Stepper, StepLabel,} from 'material-ui/Stepper';
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper';
import NotarSubmitQuestion from '../components/NotarSubmitQuestion';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {createContainer} from 'meteor/react-meteor-data';

import is from 'is_js';
import {Bert} from 'meteor/themeteorchef:bert';
import update from 'react-addons-update';
import ReactDOM from 'react-dom';

const universities = ['Sakarya', 'ODTÜ', 'Boğaziçi'],
			faculties = ['Hukuk', 'Bilgisayar'],
			classes = ['Medeni', 'Algoritma'],
			types = ['Vize', 'Final'];

class NotarSubmitpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepperFinished: false,
			stepperStepIndex: 1,
			docQuestions: 1,
			metaUniversity: null,
			metaFaculty: null,
			metaClass: null,
			metaType: null,
			metaYear: null,
			filesCount: 0
		};
		const MetaUniversity = MetaFaculty = MetaClass = MetaType = MetaYear = InputFile = null;
	}
	handleStepperNext() {
		const {stepperStepIndex} = this.state;
		if(stepperStepIndex === 0) {
			// If empty fields, dont go next
			let metaUniversityControl = MetaUniversity.state.searchText,
					metaFacultyControl = MetaFaculty.state.searchText,
					metaClassControl = MetaClass.state.searchText,
					metaTypeControl = MetaType.state.searchText,
					metaYearControl = MetaYear.input.value;
			setTimeout(() => {
				if(!is.any.empty(metaUniversityControl, metaFacultyControl, metaClassControl, metaTypeControl, metaYearControl)) {
						this.setState({
							stepperStepIndex: stepperStepIndex + 1,
							stepperFinished: stepperStepIndex >= 2,
							metaUniversity: metaUniversityControl,
							metaFaculty: metaFacultyControl,
							metaClass: metaClassControl,
							metaType: metaTypeControl,
							metaYear: metaYearControl,
							files: []
						});
				} else {
					Bert.alert('Boş alanlar var, bu bilgileri istiyoruz', 'danger', 'growl-top-right');
				}
			}, 50);
		} else if(stepperStepIndex === 1) {
			// Things are really messed up here
			// I choose the dirty way to
			// Get input values from <NotarSubmitQuestion> element
			// ### CENSORED AREA
			let notarSubmitQuestions = ReactDOM.findDOMNode(this).querySelectorAll('.notarSubmitQuestionPaper');

			notarSubmitQuestions.forEach((question, index) => {
				if(question.firstElementChild.firstElementChild.children[0].children[0].checked) {
					// If test question
					let questionValue = question.lastElementChild.firstElementChild.children[2].firstElementChild.value,
							optionsLength = question.lastChild.children[1].children.length - 1;
					console.log((index + 1) + ". soru (Test): " + questionValue);
					for(let k=0;k<optionsLength;k++) {
						console.log("Option: " + question.lastChild.children[1].children[k].children[1].firstElementChild.value);
					}

				} else if((!question.firstElementChild.firstElementChild.children[0].children[0].checked)) {
					// Else if classic question
					let questionValue = question.lastElementChild.lastElementChild.children[2].children[0].value;
					console.log((index + 1) + ". soru (Klasik): " + questionValue);
				}
			});
			/*
			this.setState({
				stepperStepIndex: stepperStepIndex + 1,
				stepperFinished: stepperStepIndex >= 2
			})
			*/
		} else if(stepperStepIndex === 2) {
			this.setState({
				stepperStepIndex: stepperStepIndex + 1,
				stepperFinished: stepperStepIndex >= 2
			})
		}
	}
	handleStepperPrev() {
		const {stepperStepIndex} = this.state;
		if(stepperStepIndex > 0) {
			this.setState({
				stepperStepIndex: stepperStepIndex - 1,
			});
		}
	}
	handleFileUpload() {
		let inputFileControl = InputFile.files.length;
		this.setState({
			filesCount: inputFileControl
		});
	}
	handleQuestionAdd() {
		this.setState({docQuestions: this.state.docQuestions+1});
	}
	handleQuestionRemove() {
		(this.state.docQuestions < 2) ? null : this.setState({docQuestions: this.state.docQuestions-1});
	}
	handleRequestDelete() {
		console.log('Delete');
	}
	render() {
		const {stepperFinished, stepperStepIndex} = this.state;
		const questions = this.state.docQuestions,
					questionsCount = [];
		const styles = {
			uploadButton: {
				verticalAlign: 'middle',
			},
			uploadInput: {
				cursor: 'pointer',
				position: 'absolute',
				top: 0,
				bottom: 0,
				right: 0,
				left: 0,
				width: '100%',
				opacity: 0,
			},
		};
		for(let i=0;i<questions;i++) {
			questionsCount.push(1);
		}

		return (
			<div>
				<div className="container" style={{marginTop: '3em'}}>
					<Stepper activeStep={stepperStepIndex}>
						<Step>
							<StepLabel>Üst bilgileri</StepLabel>
						</Step>
						<Step>
							<StepLabel>Dosya Yükle / Sorular</StepLabel>
						</Step>
						<Step>
							<StepLabel>Yetkiler</StepLabel>
						</Step>
					</Stepper>

					{stepperFinished ? (
					<div className="flex vertical layout center-center">
						<DoneIcon style={{color: 'rgb(0, 188, 212)', width: 50, height: 50, marginBottom: '.67em'}}/>
						<FlatButton label="Yayında, göz at" backgroundColor="#ecf0f1" />
					</div>
					) : (
					<div style={{marginTop: 12, marginBottom: '3em'}} className="vertical layout center-center">
						<div className="horizontal layout center">
							<FlatButton label="GERİ"
													disabled={stepperStepIndex === 0}
													onTouchTap={this.handleStepperPrev.bind(this)}
													style={{marginRight: 12, display: 'none'}} />
							<RaisedButton label={stepperStepIndex === 2 ? 'BİTİR' : 'İLERİ'}
														primary={true}
														onTouchTap={this.handleStepperNext.bind(this)} />
						</div>
						{stepperStepIndex === 1 ? (
							<div className="vertical layout center-center mt-1 grey-700">
								<div className="horizontal layout center-center">
										<img src={"/universityLogos/" + this.state.metaUniversity + ".png"} />
										<span className="ml-0-3">{this.state.metaUniversity}</span>
										<span className="ml-0-3">{this.state.metaFaculty}</span>
										<span className="ml-0-3">{this.state.metaClass}</span>
										<span className="ml-0-3">{this.state.metaType}</span>
										<span className="ml-0-3">{this.state.metaYear}</span>
								</div>
								<div className="horizontal layout center mt-1" style={{lineHeight: '2em', textAlign: 'center'}}>
									Bu doküman için dosya yükleyin veya soru ekleyin.
									<br />
									Dosya yüklemeden, soru eklemeden doküman oluşturamazsınız.
									<br />
									Yaptıklarınız, son aşamaya kadar kaydedilmeyecektir.
								</div>
							</div>
						) : (
							<span></span>
						)}
					</div>
					)}

					{stepperStepIndex == 0 ? (
					<div className="vertical layout flex center-center container">
						<div className="section-title w-lines mb-1 grey-500"><span>Doküman üst bilgileri</span></div>
						<div className="horizontal layout center-center flex wrap around-justified" style={{marginBottom: '5em'}}>
							<AutoComplete id="meta-university"
														filter={AutoComplete.caseInsensitiveFilter}
														dataSource={universities}
														ref={(input) => MetaUniversity = input}
														floatingLabelText="Üniversite"/>
							<AutoComplete id="meta-faculty"
														filter={AutoComplete.caseInsensitiveFilter}
														dataSource={faculties}
														ref={(input) => MetaFaculty = input}
														floatingLabelText="Bölüm"/>
							<AutoComplete id="meta-class"
														filter={AutoComplete.caseInsensitiveFilter}
														dataSource={classes}
														ref={(input) => MetaClass = input}
														floatingLabelText="Ders"/>
							<AutoComplete id="meta-type"
														filter={AutoComplete.caseInsensitiveFilter}
														dataSource={types}
														openOnFocus={true}
														ref={(input) => MetaType = input}
														floatingLabelText="Tür"/>
							<TextField type="number"
													ref={(input) => MetaYear = input}
													floatingLabelText="Yıl"/>
						</div>
					</div>
				) : (
				<span></span>
				)}

				{stepperStepIndex == 1 ? (
				<div className="vertical layout center-center flex" style={{marginBottom: '6.5em'}}>
					<div className="section-title w-lines mb-1 grey-500"><span>Dosya</span></div>
					<RaisedButton label="Dosya Seç" labelPosition="before" style={styles.uploadButton} containerElement="label">
						<input type="file" onChange={this.handleFileUpload.bind(this)} style={styles.uploadInput} ref={(input) => InputFile = input} multiple/>
					</RaisedButton>
					{this.state.filesCount > 0 ? (
						<div className="mt-1">
							{this.state.filesCount} dosya seçili
						</div>
					) : (
						<span></span>
					)}
					<div style={{marginBottom: '.5em'}} className="mt-2 grey-700">Resim, metin, slayt olabilir</div>
					<div style={{fontSize: '.7em', color: '#7f8c8d'}}>png, jpg, jpeg, doc, docx, txt, ppt, pptx</div>
					<div className="mt-1 mb-1 grey-700">Birden fazla dosya ekleyebilirsin, dosya başı max. 15 mb</div>
					<div className="section-title w-lines mt-2 grey-500"><span>Sorular</span></div>

					{questionsCount.map((question, index) =>
						// Notar Submit Question Component
						<NotarSubmitQuestion questionNumber={index+1} key={index+1} />
					)}

					<div className="horizontal layout justified" style={{marginTop: '1em'}}>

						{this.state.docQuestions > 1 ? (
						<FlatButton onClick={this.handleQuestionRemove.bind(this)}
												icon={<DeleteIcon />}
												style={{color: '#7f8c8d', marginRight: '5em'}} />
						) : (
						<span></span>
						)}

						<RaisedButton onClick={this.handleQuestionAdd.bind(this)} label="SORU EKLE" />
					</div>
				</div>
				) : (
				<span></span>
				)}

				{stepperStepIndex == 2 ? (
					<div className="vertical layout flex center-center">
						<div className="section-title w-lines mb-1 grey-500"><span>Editörler</span></div>
						<div className="horizontal layout wrap">
							<Chip onRequestDelete={this.handleRequestDelete.bind(this)}>
							<Avatar src="/pp.jpg" />
							seabey
							</Chip>
						</div>
						<div className="horizontal layout center-justified center-center">
							<TextField floatingLabelText="Editör Ata" hintText="Kullanıcı Adı" />
							<RaisedButton label="Ata" />
						</div>
						<div className="section-title w-lines mb-2 mt-2 grey-500"><span>Ayarlar</span></div>
						<div className="horizontal layout center-center" style={{minWidth: 200}}>
							<Toggle label="Taslak olarak kaydet" />
						</div>
					</div>
				) : (
					<span></span>
				)}
			</div>
		</div>
		)
	}
};

export default NotarSubmitpageContainer = createContainer(({params}) => {
	return {
		currentUser: Meteor.user() || false,
	};
}, NotarSubmitpage);
