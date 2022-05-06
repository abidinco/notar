import React from 'react';

import ProfileHeader from '../components/ProfileHeader.jsx';

class OneProfilePage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<ProfileHeader username="seabey" karma="0"/>
			</div>
		)
	}
}

export default OneProfilePage;
