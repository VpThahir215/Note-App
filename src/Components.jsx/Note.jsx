import React from 'react'

function Note({id,text,editHandler,deleteHandle}) {
  return (
    <div className='note'>
        <div className="note-body">{text}</div>
        <div className="note-footer" style={{justifyContent:"flex-end"}}>
             <button className="note_save" onClick={()=> deleteHandle(id)}>Delete</button>
              <button  className="note_save" onClick={()=> editHandler(id,text)}>Edit</button>
        </div>
      
    </div>
  )
}

export default Note
