import { useEffect, useState } from "react";

const useEvents = () => {
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem("events");
        return storedEvents ? JSON.parse(storedEvents) : [];
      });


      useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
      }, [events]);
    
      useEffect(() => {
        const calculateTimeLeft = () => {
          const now = new Date();
    
          setEvents((prevEvents) =>
            prevEvents.map((event) => {
              const target = new Date(event.date);
              const difference = target - now;
    
              if (difference > 0) {
                return {
                  ...event,
                  timeLeft: {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                  },
                  isCompleted: false,
                };
              } else {
                return {
                  ...event,
                  timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
                  isCompleted: true,
                };
              }
            })
          );
        };
    
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
      }, []);







  
  const addEvent = (newEvent) => {
    
  setEvents([...events, {...newEvent, timeLeft: {days: 0, hours: 0, minutes: 0, seconds: 0}, isCompleted: false}]);
  }



  const deletEvent = (indexToDelet) => {
    setEvents(events.filter((_, i) => i !== indexToDelet))
  }
  return{events, addEvent, deletEvent,  }
}

export default useEvents;
