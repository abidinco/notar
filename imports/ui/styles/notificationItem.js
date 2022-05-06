// It is unnecessary file, now
// But i cant delete it
// Because i worked on it for hours

export default stylesNotificationItem = {
	NotificationItem: {
		DefaultStyle: {
			backgroundColor: 'rgba(38, 38, 38, .6)',
			boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
			borderTop: 'none',
			borderLeft: '2px solid',
			color: '#f2f2f2',
			fontSize: '14px',
			lineHeight: '1.3em'
		},
		warning: {
			borderLeftColor: 'rgba(241, 196, 15,1.0)'
		},
		success: {
			borderLeftColor: '#39c16c',
			backgroundColor: '#f9f9f9',
			color: '#777'
		},
		error: {
			borderLeftColor: '#ec5840'
		},
		info: {
			borderLeftColor: '#3498db',
			color: '#777',
			backgroundColor: '#f9f9f9'
		}
	},
	Dismiss: {
		DefaultStyle: {
			fontSize: '18px',
			color: 'rgba(126,126,126,0.3)',
			backgroundColor: 'none',
			borderRadius: 'none',
			width: 'auto',
			height: 'auto',
			top: '10px',
			right: '10px'
		}
	},
	Title: {
		warning: {
			color: 'rgba(241, 196, 15,1.0)'
		},
		success: {
			color: '#39c16c'
		},
		error: {
			color: '#ec5840'
		},
		info: {
			color: '#3498db'
		}
	}
}
