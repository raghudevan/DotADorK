import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toJS } from 'immutable'
import * as findMatchActions from '../actions/findMatchActions';

class FindMatch extends React.Component{

	onClick = () => {
		this.props.findMatch();
	}

	render() {
		return (
			<div>
				Player Name: <input type="text"/> <br/>
				<button onClick={this.onClick}>Find Match</button>
				Response: {this.props.response}
			</div>
		);
	}
}

/* Component properties */
FindMatch.propTypes = {
	response: React.PropTypes.string.isRequired,
	findMatch: React.PropTypes.func.isRequired
}

/* Maps state to props */
function mapStateToProps(state) {
	return {
		response: state.findMatchState.response
	};
}

/* Maps actions */
function mapDispatchToProps(dispatch) {
	return bindActionCreators(findMatchActions, dispatch);	
}

/* Wires the component with the reducer */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FindMatch);
