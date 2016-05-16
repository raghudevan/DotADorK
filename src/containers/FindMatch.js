import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toJS } from 'immutable'
import * as findMatchActions from '../actions/findMatchActions';
import io from 'socket.io-client';

class FindMatch extends Component {

	doConnect = () => {
		if(this.refs.playername.value !== "") {
			let uri = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
			this.socket = io(uri, { query: { name: this.refs.playername.value } });
			this.socket.on('state', (chatState) => {
				console.log('got state');
				this.props.setChat(chatState);
				if(this.props.userName === "") {
					// this is bad - should not broadcast back to owner sometimes
					this.props.setSocket(this.socket, this.refs.playername.value);
				}
			});
		} else {
			//notify?
		}
	}

	sendMessage = () => {
		this.props.sendMessage(this.refs.message.value, this.props.userName);
		this.refs.message.value = "";
	}

	render() {
		console.log('isConnected?', this.props.isConnected);
		return (
			<div>
				{
					!this.props.isConnected ? 
					<div>
						Player Name: <input ref="playername" type="text"/> <br/>
						<button onClick={this.doConnect}>Connect</button>
					</div> :
					<div>
						<div style={{float: "left"}}>
							Currently in chat:
							<ul>
							{
								this.props.usersConnected.map((item, index) => {
									return(
										<li key={index}>
											{item}
										</li>
									);
								})
							}
							</ul>
						</div>
						<div style={{marginLeft: "150px"}} ref="chat-div">
							Connected as: {this.props.userName}
							<ul>
								{
									this.props.chat.map((item, index) => {
										return(
											<li key={index}>
												{item.userName}: {item.message}
											</li>
										);
									})
								}
							</ul>
							<textarea ref="message"/>
							<button onClick={this.sendMessage}>Send</button>
						</div>
					</div>
				}
			</div>
		);
	}
}

/* Component properties */
FindMatch.propTypes = {
	findMatch: React.PropTypes.func.isRequired,
	setChat: React.PropTypes.func.isRequired
}

/* Maps state to props */
function mapStateToProps(state) {
	return {
		isConnected: state.findMatchState.isConnected,
		userName: state.findMatchState.userName,
		chat: state.chatState.chat,
		usersConnected: state.chatState.usersConnected
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
