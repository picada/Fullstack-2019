import React from 'react'
import PropTypes from 'prop-types'

const LoginForm= ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        Käyttäjätunnus
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Salasana
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Kirjaudu</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
