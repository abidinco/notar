import React from 'react';
import Avatar from 'material-ui/Avatar';

class LogoOne extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
    /*
        <div className="vertical layout center-center">
            {this.props.withAnchor
                ? <a href="/"><Avatar src="/images/logo-stock.png" backgroundColor="transparent" style={{
                        borderRadius: '0',
                        width: this.props.width,
                        height: this.props.height
                    }}/></a>
                : <Avatar src="/images/logo-stock.png" backgroundColor="transparent" style={{
                    borderRadius: '0',
                    width: this.props.width,
                    height: this.props.height
                }}/>}
            {this.props.withBrand
                ? <div style={{
                        marginTop: 10,
                        color: '#888',
                        fontSize: '.9em'
                    }}>one experiment</div>
                : <span></span>}
        </div>
        */ <div className = "vertical layout center-center"> {
        this.props.withAnchor
            ? <a href="/" className="sheandy" style={{textDecoration: 'none', fontSize: '2.13em', color: 'rgb(0, 188, 212)'}}>one</a>
            : <div className="sheandy" style={{fontSize: '2.13em'}}>one</div>
    }
    {
        this.props.withBrand
            ? <div style={{
                    marginTop: 10,
                    color: '#888',
                    fontSize: '.7em'
                }}>
                    one experiment
                </div>
            : <span></span>
    } < /div>
		)
	}
}

LogoOne.defaultProps = {
    withAnchor: false,
    withBrand: false
};

export default LogoOne;
