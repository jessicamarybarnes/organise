import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'

class Users extends React.Component {
  constructor() {
    super()

    this.state = {
      user: {},
      pending: [],
      accepted: []
    }
  }

  componentDidMount() {
    axios
      .get(`/api/users/${Auth.getPayload().sub}`, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(user => this.setState({ user }))
    axios
      .post('/api/users/pending', this.state.user, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(pendingUsers => this.setState({ pendingUsers }))
    axios
      .post('/api/users/accepted', this.state.user, {
        headers: {Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(acceptedUsers => this.setState({ acceptedUsers }))
  }

  render() {
    const user = this.state.user.data
    const pending = this.state.pending.data
    const accepted = this.state.accepted.data
    return(
      <div>My Profile
        {user &&
          <div>
            <div>
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    {user.username}
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <p>{user.email}</p>
                  </div>
                </div>
                <footer className="card-footer">
                </footer>
              </div>
            </div>
          </div>}
        <hr/><h1>Pending</h1><hr/>
        {pending && pending.map(pendingUser => {
          <div>
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  {pendingUser.username}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{pendingUser.email}</p>
                </div>
              </div>
              <footer className="card-footer">
              </footer>
            </div>
          </div>
        })}
        <hr/><h1>Friends</h1><hr/>
        {accepted && accepted.map(friend => {
          <div>
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  {friend.username}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{friend.email}</p>
                </div>
              </div>
              <footer className="card-footer">
              </footer>
            </div>
          </div>
        })}

      </div>
    )
  }
}

export default Users
