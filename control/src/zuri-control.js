import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import Root from './root.component'
import axios from 'axios'
import Centrifuge from 'centrifuge'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null
  }
})

const currentWorkspace = localStorage.getItem('currentWorkspace')
let token = sessionStorage.getItem('token')

export const GetUserInfo = async () => {
  let user = JSON.parse(sessionStorage.getItem('user'))

  if ((user && token) !== null) {
    try {
      const response = await axios.get(
        `https://api.zuri.chat/organizations/${currentWorkspace}/members/?query=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      let userData = { currentWorkspace, token, ...response.data.data }
      // console.log('getuserinfo', response.data.data)
      console.log(userData)
      return userData
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('YOU ARE NOT LOGGED IN, PLEASE LOG IN')
  }
}

export const GetWorkspaceUser = async identifier => {
  if (!identifier) return new Error('No workspace user identifier provided')

  // User identifier should be email address
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!identifier.match(emailRegex))
    throw Error('Workspace user identifier must be a valid email address.')

  const token = sessionStorage.getItem('token')

  try {
    const response = await axios.get(
      `https://api.zuri.chat/organizations/${currentWorkspace}/members/?query=${identifier}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.data.data) {
      return response.data.data[0]
    } else {
      throw Error('No users matching identifier found in workspace')
    }
  } catch (error) {
    throw Error(error)
  }
}

export const GetWorkspaceUsers = async () => {
  try {
    const res = await axios.get(
      `https://api.zuri.chat/organizations/${currentWorkspace}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    let user = res.data.data
    let workSpaceUsersData = { totalUsers: user.length, ...user.slice(0, 100) }
    // console.log(user.slice(0, 100))
    console.log(workSpaceUsersData)
    return workSpaceUsersData
  } catch (err) {
    console.log(err)
  }

  // localStorage.setItem('WorkspaceUsers', JSON.stringify(res.data.data))
}

// Setup Centrifugo Route
const centrifuge = new Centrifuge(
  'wss://realtime.zuri.chat/connection/websocket'
)

centrifuge.connect()
centrifuge.on('connect', function (connectCtx) {
  console.log('connected', connectCtx)
})

export const SubscribeToChannel = (plugin_id, callback) => {
  centrifuge.subscribe(plugin_id, ctx => {
    callback(ctx)
  })
}

export const { bootstrap, mount, unmount } = lifecycles
