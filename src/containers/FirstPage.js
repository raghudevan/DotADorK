import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toJS } from 'immutable'
import * as firstPageActions from '../actions/firstPageActions';

class FirstPage extends Component {
	
	onChange = (e) => {
		this.props.setText(this.refs.inputval.value);
	}

	render() {
		return (
			<div>
				Input Text: {this.props.text} <br/>
				<input ref="inputval" type="text" placeholder="say something"
				 onChange={this.onChange}/>
			</div>
		);
	}
}

/* Component properties */
FirstPage.propTypes = {
	text: React.PropTypes.string.isRequired,
	setText: React.PropTypes.func.isRequired
}

/* Maps state to props */
function mapStateToProps(state) {
	return {
		text: state.firstPageState.text
	};
}

/* Maps actions */
function mapDispatchToProps(dispatch) {
	return bindActionCreators(firstPageActions, dispatch);
}

/* Wires the component with the reducer */
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FirstPage);
