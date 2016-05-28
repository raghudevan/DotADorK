import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import * as findMatchActions from '../actions/findMatchActions';
import PlayerConnect from '../components/PlayerConnect';
import UsersList from '../components/UsersList';
import { baseURL } from '../utils/api'; 

class FindMatch extends Component {

	componentDidMount = () => {
		this.props.getConnectedUsers();
	}

	componentDidUpdate = () => {
		if(this.refs.chat) {
			this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
		}
	}

	onKeyUp = (e) => {
		if(e.which === 13 && !e.shiftKey) {
			this.sendMessage();
		}
	}

	doConnect = (playername) => {
		if(playername !== "") {
			console.log("playername: "+playername);
			baseURL.then(url => {
				this.socket = io(url, { query: { name: playername } });
				this.socket.on('state', (chatState) => {
					console.log('got state');
					this.props.setChat(chatState);
					if(this.props.userName === "") {
						this.props.setSocket(this.socket, playername );
					}
				});
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
		return (
			<div>
				{
					!this.props.isConnected ? 
					<div>
						<PlayerConnect doConnect={this.doConnect}/>
						<UsersList label="Currently chatting:"
 						 connectedUsers={this.props.connectedUsers}/>
					</div> :
					<div>
						<UsersList label="Currently in chat:" 
						style={{float: "left"}} 
						connectedUsers={this.props.connectedUsers}/>
						<div style={{marginLeft: "150px"}} ref="chat-div">
							Connected as: {this.props.userName}
							<ul ref="chat"
							style={{minHeight: "200px", maxHeight: "200px", 
							overflow: "auto", overflowX: "hidden", overflowY: "hidden",
							width: "400px"}}>
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
							<textarea style={{width: "400px", resize: "none"}}
							autoFocus
							onKeyUp={this.onKeyUp} ref="message"
							placeholder="Say something!"/>
						</div>
					</div>
				}
			</div>
		);
	}
}

/* Component properties */
FindMatch.propTypes = {
	isConnected: React.PropTypes.bool.isRequired,
	userName: React.PropTypes.string.isRequired,
	chat: React.PropTypes.array.isRequired,
	connectedUsers: React.PropTypes.array.isRequired,
	findMatch: React.PropTypes.func.isRequired,
	setChat: React.PropTypes.func.isRequired
}

/* Maps state to props */
function mapStateToProps(state) {
	return {
		isConnected: state.findMatchState.isConnected,
		userName: state.findMatchState.userName,
		chat: state.chatState.chat,
		connectedUsers: state.chatState.connectedUsers
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
