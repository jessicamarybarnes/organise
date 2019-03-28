import React from 'react'
import 'bulma'
import axios from 'axios'
import Group from './group'
import CreateGroup from './createGroup'

class Groups extends React.Component {
  constructor() {
    super()

    this.state = {
      groups: []
    }

    this.getAllGroups = this.getAllGroups.bind(this)
  }

  getAllGroups() {
    axios.get('/api/groups', {
    })
      .then(res => this.setState({ groups: res.data }))
  }

  componentDidMount() {
    this.getAllGroups()
  }

  render() {
    if(!this.state.groups) return null
    return(
      <div className="container">
        <div className="section">
          <div className="columns is-multiline">
            <CreateGroup onFetchGroups={this.getAllGroups}/>
            {this.state.groups.map(group =>
              <Group {...group} key={group._id} onFetchGroups={this.getAllGroups} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Groups
