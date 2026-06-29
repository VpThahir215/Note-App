import React from 'react'

function CreateNotes({inputText,setInput,saveHandler}) {
    const char=100;
    const charLimit=char -inputText.length;
  return (
    <div className='note'>
        <textarea 
        cols={10}
        rows={5}
        placeholder='Type....'
        value={inputText}
        onChange={(e)=> setInput(e.target.value)}
        maxLength={100}
        ></textarea>
        <div className="not_footer">
            <span className="label">{charLimit} Left</span>
            <button onClick={saveHandler} className="note_save">save</button>
        </div>
      
    </div>
  );
}

export default CreateNotes
