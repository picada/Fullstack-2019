import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification !== null) {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

// const mapDispatchToProps = {
//   removeNotification,
//   notificationChange
// }

export default connect(
  mapStateToProps,
  null
)(Notification)
