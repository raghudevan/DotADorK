import React from 'react';

class PlayerConnect extends React.Component {
	onKeyUp = (e) => {
		if(e.which === 13) {
			onClick();
		}
	}

	onClick = () => {
		this.props.doConnect(this.refs.playername.value)
	}

	render() {
		return (
			<div>
				<input onKeyUp={this.onKeyUp}
				ref="playername" type="text" 
				placeholder="Input your user handle" autoFocus/>
				<button onClick={this.onClick}>
					Connect
				</button>
			</div> 
		);
	}
}

export default PlayerConnect;