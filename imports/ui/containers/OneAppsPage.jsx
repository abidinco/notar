import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class OneAppsPage extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="vertical layout center-center">
							<RaisedButton label="Notar" className="mt-1" href="/notar"/>
							<RaisedButton label="Kandex" className="mt-1" href="/kandex" />
						</div>
        )
    }
};

export default OneAppsPage;
