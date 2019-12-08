import React from 'react'

//Handles the Filter form (actual filtering is handled in "PersonsData.js")
const Filter = (props) => (
    <form>
        <div>Filter with name: <input value={props.filter} onChange={props.handleFilter}/></div>
    </form>
)


export default Filter
