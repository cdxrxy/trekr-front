import PropTypes from 'prop-types'
import React from 'react'

const MoveDetailsCard = ({ move }) => {
  return (
    <div className="layout rounded-lg flex flex-col space-y-4">
      <div className="flex space-x-2">
        <div>Fullname: </div>
        <div>
          <span>{move.fullname}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <div>Email: </div>
        <div>
          <span>{move.email}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <div>Phone: </div>
        <div>
          <span>{move.phone}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <div>Starting time: </div>
        <div>
          <span>{move.startDate}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <div>Ending time: </div>
        <div>
          <span>{move.endDate}</span>
        </div>
      </div>
    </div>
  )
}

MoveDetailsCard.propTypes = {
  move: PropTypes.object,
}

export default MoveDetailsCard
