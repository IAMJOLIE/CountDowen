import { useEffect, useState } from "react";

const useEvents = () => {
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem("events");
        return storedEvents ? JSON.parse(storedEvents) : [];
      });


      useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
      }, [events]);
    
 


  
  const addEvent = (newEvent) => {
    
  setEvents([...events, newEvent]);
  }



  const deletEvent = (indexToDelet) => {
    setEvents(events.filter((_, i) => i !== indexToDelet))
  }
  return{events, addEvent, deletEvent,  }
}

export default useEvents;
