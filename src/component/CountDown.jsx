import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X} from "phosphor-react";
import useEvents from "../Hooks/useEvents";


const CountDown = ({events}) => {
   const {i} = useParams()
   const [close, setclose] = useState(false)
   const [loading, setLoading] = useState(true)
   const [alertShown, setAlertShown] = useState(false)
   const nav = useNavigate()
 
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
   

   useEffect(() => {
      const calculateTimeLeft = () => {
         const now = new Date();
         const target = new Date(event.date);
         const difference = target - now

         if (difference > 0) {
            setTimeLeft ({
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
               minutes: Math.floor((difference / (1000 * 60)) % 60),
               seconds: Math.floor((difference / 1000) % 60),
            })

         const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
        if (hoursLeft === 24 && !alertShown) {
          alert(`"${event.name}" är 24 timmar bort!`);
          setAlertShown(true); }
         } else {
            setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0})
         } 
setLoading(false)
      }

      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
   }, [event, alertShown])

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
     
   

         <h2>Nedräkning till {event.name}</h2>
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
        Laddar...
      </div>
    ) : (
      timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0  ? (
               <p style={{ color: "#FF0000", fontSize: 40 }}>KLART!</p>
            ) : (
               <p style={{ color: "#FFFFFF", fontSize: 20 }}>
                  {timeLeft.days} dagar, {timeLeft.hours} timmar, {timeLeft.minutes} minuter, {timeLeft.seconds} sekunder
               </p>
            )
    )}
  
    
        </div>
    

        </div>
     );
}
 
export default CountDown;