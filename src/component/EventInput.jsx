import { useState } from "react";

import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import './EmojiPicker.css'



const EventInput = ({onAddEvent}) => {
    const [name, setName] = useState(null)
    const [date, setDate] = useState(null)
    const [emoji, setEmoji] = useState("")
    const [showPicker, setShowPicker] = useState(false)
    const [color, setColor] = useState("#2b2b2b")
    const nav = useNavigate()


    const colors = ["#9ec2e6", "#f28b82", "#fbbc04", "#008A20", "#2c3338",  "#01263a", '#8f71ff', 'red']; 

const handleEmojiClick = (emojiObject) => {
    setEmoji(emojiObject.emoji)
    setShowPicker(false)
}


const handleButton = (e) =>{
    e.preventDefault(); 
    if(name && date ) {
        onAddEvent({ name,  emoji,  date, color});
        nav('/')
    }

}


    return ( 

       <form onSubmit={handleButton}  style={{display: 'flex', flexDirection: 'column', alignItems: 'center',  gap: 40, textAlign: 'center'}}>
        <div >

           <label className="label">
           <p> Välje ett namn:</p>
            <input type="text" value={name} onChange={(e) => setName (e.target.value)} required style={{padding: 10, width: 250, textAlign: 'center', outline: 'none', boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.6)', fontSize: 19, margin: 10 }}  />
           </label> 

        </div>
    
        <div >
            <p>Välje ett emoji</p>
            <div style={{fontSize: 90, padding: 15,   boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' , marginTop: 15 , }}>
        <button
        onClick={()=> setShowPicker((prev) => !prev)}
              type="button"
              style={{
                position: 'relative',
               
                cursor: "pointer",
                border: "none",
        backgroundColor: 'transparent',
        fontSize: "50px",
              }}
            >
              {emoji || "😊"}
            </button>
            </div>
        {showPicker && (
            <div style={{position: 'absolute', top: 100, right: '40%', left: '40%'}}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
        )}
       

        </div>
        <div>
            <label>
              <p>  Datum: </p>
                <input className="input_date" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}  required  style={{padding: 10, width: 250, textAlign: 'center', outline: 'none', boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.6)', fontSize: 19, margin: 15  }}/>
            </label>
        </div>
     <div>
        <p  style={{marginBottom: 15 }}>Välje ett färge för temat</p>
        <div style={{display: 'flex', gap: 10}}>

        
        {colors.map((clr) => (
            <div key={clr}   style={{
                width: "35px",
                height: "35px",
              
                backgroundColor: clr,
                borderRadius: "50%",
                cursor: "pointer",
                border: color === clr ? "3px solid #000" : "1px solid #ccc", 
              }} onClick={() => setColor(clr)}>
                
            </div>
        ))}
        </div>
     
        </div>
        

        <button type="submit"  style={{
          padding: "10px 20px",
          fontSize: "1rem",
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",}} >
            Starta nedräckning 
        </button>

       </form>
     );
}
 
export default EventInput;