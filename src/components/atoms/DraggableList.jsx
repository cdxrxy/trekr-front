import PropTypes from 'prop-types'
import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { useDispatch } from 'react-redux'

import { setPickupAddressList } from '../reducers/bookingComposeReducer'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const QuoteItem = styled.div`
  width: 100%;
  border: 1px solid grey;
  padding: 8px;
  border-radius: 0.3rem;
  border-color: rgba(0, 0, 21, 0.2);
  position: relative;
`

const StyledTrashIcon = styled(CIcon)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`

function ListItem({ item, index, onDelete }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.content}
          <StyledTrashIcon icon={cilTrash} onClick={() => onDelete(item.id)} />
        </QuoteItem>
      )}
    </Draggable>
  )
}

function FullList({ list, onDelete }) {
  return list.map((item, index) => (
    <ListItem item={item} index={index} key={item.id} onDelete={onDelete} />
  ))
}

const DraggableList = ({ list, onDelete }) => {
  const dispatch = useDispatch()
  const [draggableList, setDraggableList] = useState({ list })

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const list = reorder(draggableList.list, result.source.index, result.destination.index)

    setDraggableList({ list })
  }

  useEffect(() => {
    setDraggableList({ list })
  }, [list])

  useEffect(() => {
    dispatch(setPickupAddressList(...draggableList.list))
  }, [dispatch, draggableList])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <FullList list={draggableList.list} onDelete={onDelete} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

DraggableList.propTypes = {
  list: PropTypes.array,
  onDelete: PropTypes.func,
}

FullList.propTypes = {
  list: PropTypes.array,
  onDelete: PropTypes.func,
}

ListItem.propTypes = {
  item: PropTypes.string,
  index: PropTypes.number,
  onDelete: PropTypes.func,
}

export default DraggableList
