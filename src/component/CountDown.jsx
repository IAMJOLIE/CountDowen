import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X} from "phosphor-react";
import useEvents from "../Hooks/useEvents";


const CountDown = ({events}) => {
   const {i} = useParams()
   const [close, setclose] = useState(false)
   const [loading, setLoading] = useState(true)

   const nav = useNavigate()

   useEffect(() => {
      // Simulera laddning
      const loadingTimer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Justera tiden efter behov
  
      return () => clearTimeout(loadingTimer); // Rensa timer
    }, []);
 
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   })

   const event = events[i]
   const closeCountDown = () => {
      setclose(true);
      nav("/")
     
   }
   

   const formatDate = (isoString) => {
      const date = new Date(isoString);
      return date.toLocaleString("sv-SE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    useEffect(() => {
      if (timeLeft === 1 && !alert) {
         alert(`${event.name} är 24 timmar kvar` );
        
      }
    })

   
    return ( 
<div style={{backgroundColor: event.color, height: '100%', width: '100vw', }}>
<button onClick={closeCountDown} style={{backgroundColor: 'transparent', border: 'none', cursor: "pointer", position: 'absolute', top: 100, left: '20%' }}> 
      <X size={32} /> 
       </button>
        <div style={{backgroundColor: event.color, height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 30}}>
     
   

         <h2>Countdown to {event.name}</h2>
           <p style={{ fontSize: 20, fontWeight: 6, color: "black" }}>
        {formatDate(event.date)}
      </p>
      <div style={{fontSize: 80, padding: 10,   boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> {event.emoji || "🗒"}</div>
      <p> {event.days}</p>

      {loading ? (

      
    
      <div
        style={{
          
         
          backgroundColor: event.color,
          color: "#FFFFFF",
          fontSize: 20,
        }}
      >
        Loading...
      </div>
    ) : (
      <div>
      {event.isCompleted ? (
         <p>COMPLETED!</p>
        ) : (
         <p  style={{ fontSize: 20, color: '#ffffff' }}> {event.timeLeft.days} days, {event.timeLeft.hours} hours,{" "}
         {event.timeLeft.minutes} minutes, {event.timeLeft.seconds} seconds

          </p>

        )}
        </div>
    )}
  
    
        </div>
    

        </div>
     );
}
 
export default CountDown;