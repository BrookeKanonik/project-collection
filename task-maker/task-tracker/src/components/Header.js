import PropTypes from 'prop-types'


const Header = ({ title }) => {
  return (
    <header>
      <h1 style= {headingStyle}>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string //can addd .isRequired if needed after
}

const headingStyle = {
    color: 'red', 
    backgroundColor: 'black'
}

export default Header
