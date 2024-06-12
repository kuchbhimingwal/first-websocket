import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setScoket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [input, setInput] = useState("")
  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () =>{
      console.log('connected');
      setScoket(socket)
    }
    socket.onmessage = (message)=>{
      console.log('recieved message', message.data);
      setLatestMessage(message.data)
    }

    return ()=>{
      socket.close()
    }
  },[])
  if(!socket){
    return <div>
      loading ......
    </div>
  }
  return (
    <>
    <input type="text" onChange={(e)=>{setInput(e.target.value)}} />
    <button onClick={()=>{ socket.send(input)}}>Send</button>
    <div>latest message:</div>
    {latestMessage}
    </>
  )
}

export default App
