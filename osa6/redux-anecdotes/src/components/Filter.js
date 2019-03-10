import React from 'react'
import { connect } from 'react-redux'
import {setFilter} from '../reducers/filterReducer'


const FilterForm = (props) => {

  const handleChange = (event) =>{
     props.setFilter(event.target.value)
  }
  return(
    <form onChange = {handleChange}>
    <div>
      Search <input name = 'filter'/>
    </div>
    </form>
  )
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilterForm = connect(
  null,
  mapDispatchToProps
)(FilterForm)

export default ConnectedFilterForm
