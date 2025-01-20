import { useNavigate } from "react-router-dom";
import { X} from "phosphor-react";

const StartPage = ({events, deletEvent}) => {
    const nav = useNavigate()
    return ( 
        <div style={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', gap:  50, justifyContent: 'space-between', height: '100%' , margin: 'auto', marginTop: 100}}>
       <div>
          <h1 style={{color: '#FFFFFF' , margin: 40}}>Nedräckningar</h1>
            <p  style={{fontSize: {md: 20, xs: 12, margin: 10}}}>Låt oss hjälpa dig att hålla koll på tiden tills det ögonblick du ser fram emot!</p>
            </div>
       
       
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20}}>

        
         {events.map((event, i) => (
           <div key={i}  className="events-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10}} >
           
           <div className="event-box" onClick={() => nav(`/countdown/${i}`)} style={{backgroundColor: event.color, width: '100%', display: 'flex', alignItems: 'center',  textAlign: 'center',  padding: 10,  cursor: "pointer",  boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.8)'}}>
         
           
           <div style={{ marginRight: "20px", fontSize:40, padding: 10,   boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'   }}>{event.emoji || "🗒"}</div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 5}}>
           <p  style={{ fontSize: 20, color: '#ffffff' }}>  {event.name} </p>
           
          
           {event.isCompleted ? (
            <p>COMPLETED!</p>
           ) : (
            <p  style={{ fontSize: 18, color: '#ffffff' }}>  {event.timeLeft.days} dagar, {event.timeLeft.hours} timmar,{" "}
            {event.timeLeft.minutes} minuter
             </p>

           )}
           </div>
            </div >
           
        
         <div>
           <button  onClick={() => deletEvent(i)} style={{backgroundColor: event.color, outline: 'none', border: 'none', color: '#FFFFFF',  cursor: "pointer", boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 26, paddingBottom: 26, paddingLeft: 5, paddingRight: 5}} >
           <X size={32} /> 


           </button>
           </div>
           </div>
         ))}
         </div>
         <button onClick={() => nav('/new-event')}  style={{
          padding: "10px 20px",
          fontSize: "20px",
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
                + Skapa ny Nedräckning
            </button>
        </div>
     );
}
 
export default StartPage;