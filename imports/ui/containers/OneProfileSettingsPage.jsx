import React from 'react';
import ProfileHeader from '../components/ProfileHeader.jsx';

class OneProfileSettingsPage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<ProfileHeader username="seabey" karma="0"/>
				<div className="vertical layout center-center">
					<div className="section-title w-lines mt-1">
						<span>Profil Resmi</span>
					</div>
					<div style={{maxWidth: 300}} className="mt-1">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</div>
			</div>
		)
	}
};

export default OneProfileSettingsPage;
