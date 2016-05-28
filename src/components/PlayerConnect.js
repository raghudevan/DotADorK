import React from 'react';

const PlayerConnect = (props) => {
	return (
		<div>
			<input onKeyUp={onKeyUp.bind(null, props.doConnect)}
			type="text" placeholder="Input your user handle" autoFocus/>
			<button onClick={props.doConnect}>Connect</button>
		</div> 
	);
}

function onKeyUp(doConnect, e) {
	if(e.which === 13) {
		doConnect(e.currentTarget.value);
	}
}

export default PlayerConnect;