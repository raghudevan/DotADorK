import React from 'react';

class UsersList extends React.Component {
	render() {
		return (
			<div style={this.props.style}>
				<label>{this.props.label}</label>
				<ul>
				{
					this.props.connectedUsers.map((item, index) => {
						return(
							<li key={index}>
								{item}
							</li>
						);
					})
				}
				</ul>
			</div>
		);
	}
}

export default UsersList;