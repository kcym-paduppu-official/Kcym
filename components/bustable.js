"use client"

import {useState,useEffect} from "react"

const busCategories={

kasaragod:[

{time:"5:15 AM",bus:"KSRTC",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"6:30 AM",bus:"SHUKRIYA",route:"ശങ്കരംപാടി - പടുപ്പ് - കാസർഗോഡ്"},
{time:"7:10 AM",bus:"AVE MARIYA",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"8:00 AM",bus:"SHUKRIYA",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"8:45 AM",bus:"SRIYA",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"9:05 AM",bus:"MOOKAMBIKA",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"9:30 AM",bus:"AKSHAYA",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"11:25 AM",bus:"KSRTC",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"12:20 PM",bus:"SHUKRIYA",route:"ബോവിക്കാനം - കാസർഗോഡ്"},
{time:"1:10 PM",bus:"SUJEETHA",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"4:10 PM",bus:"KSRTC",route:"പൊയിനാച്ചി - കാസർഗോഡ്"},
{time:"5:15 PM",bus:"MUNEER",route:"പൊയിനാച്ചി - കാസർഗോഡ്"}

],

kanhangad:[

{time:"4:30 AM",bus:"KSRTC",route:"ചുള്ളിക്കര - കാഞ്ഞങ്ങാട്"},
{time:"6:18 AM",bus:"AKSHAYA",route:"ചുള്ളിക്കര - കാഞ്ഞങ്ങാട്"},
{time:"7:35 AM",bus:"AKSHAYA",route:"പൊയിനാച്ചി - കാഞ്ഞങ്ങാട്"},
{time:"10:10 AM",bus:"SREE KRISHNA",route:"പൊയിനാച്ചി - കാഞ്ഞങ്ങാട്"},
{time:"10:30 AM",bus:"COUSINS",route:"മാലക്കല്ല് - കാഞ്ഞങ്ങാട്"},
{time:"11:50 AM",bus:"DIVYARAJ",route:"പൊയിനാച്ചി - കാഞ്ഞങ്ങാട്"},
{time:"3:25 PM",bus:"KSRTC",route:"സുള്ള്യ - കാഞ്ഞങ്ങാട്"},
{time:"3:55 PM",bus:"SREE KRISHNA",route:"പൊയിനാച്ചി - കാഞ്ഞങ്ങാട്"},
{time:"4:40 PM",bus:"CHIKKU",route:"പൊയിനാച്ചി - കാഞ്ഞങ്ങാട്"}

],

longRoutes:[

{time:"6:10 AM",bus:"KSRTC",route:"മാലക്കല്ല് - മാനന്തവാടി"},
{time:"7:18 AM",bus:"ST MARYS",route:"മാലക്കല്ല് - ഇരിട്ടി"},
{time:"5:10 PM",bus:"ANJANEYA",route:"വെള്ളരിക്കുണ്ട് - കൊന്നക്കാട്"},
{time:"6:15 PM",bus:"KSRTC",route:"അങ്കമാലി - പാലാ"},
{time:"6:30 PM",bus:"AMEYAZZ",route:"ബന്തടുക്ക - പാലാ"}

],

otherRoutes:[

{time:"5:35 PM",bus:"SHUKRIYA",route:"ബന്തടുക്ക - ശങ്കരംപാടി"},
{time:"6:05 PM",bus:"SRIYA",route:"ബന്തടുക്ക - കരിവേടകം"},
{time:"6:10 PM",bus:"SHUKRIYA",route:"ബന്തടുക്ക - കരിവേടകം"},
{time:"7:10 PM",bus:"AKSHAYA",route:"ബന്തടുക്ക - കുറ്റിക്കോൽ"},
{time:"7:25 PM",bus:"SHUKRIYA",route:"ബന്തടുക്ക - കരിവേടകം"}

]

}

const allBuses=[
...busCategories.kasaragod,
...busCategories.kanhangad,
...busCategories.longRoutes,
...busCategories.otherRoutes
]

export default function BusTable(){

const [search,setSearch]=useState("")
const [currentTime,setCurrentTime]=useState(new Date())
const [nextBus,setNextBus]=useState(null)
const [countdown,setCountdown]=useState("")

useEffect(()=>{

const timer=setInterval(()=>{

const now=new Date()
setCurrentTime(now)

const upcoming=allBuses.find(bus=>{

const busTime=new Date(`1970/01/01 ${bus.time}`)
return busTime.getHours()*60+busTime.getMinutes()>
now.getHours()*60+now.getMinutes()

})

setNextBus(upcoming)

if(upcoming){

const busDate=new Date(`1970/01/01 ${upcoming.time}`)

const busMinutes=busDate.getHours()*60+busDate.getMinutes()
const nowMinutes=now.getHours()*60+now.getMinutes()

const diff=busMinutes-nowMinutes

setCountdown(diff+" min")

}

},1000)

return()=>clearInterval(timer)

},[])

return(

<div>

<div className="clock">

Current Time : {currentTime.toLocaleTimeString()}

</div>

<input
className="search"
placeholder="Search bus or route..."
onChange={(e)=>setSearch(e.target.value)}
/>

{nextBus &&(

<div className="nextBus">

🚌 Next Bus : {nextBus.time} | {nextBus.bus}  
⏳ Arriving in : {countdown}

</div>

)}

<div className="tableWrapper">

<table>

<thead>

<tr>
<th>Time</th>
<th>Bus</th>
<th>Route</th>
</tr>

</thead>

<tbody>

<tr><td colSpan="3"><b>കാസർഗോഡ് റൂട്ടുകൾ</b></td></tr>
{busCategories.kasaragod.map((bus,i)=>(

<tr key={i}>
<td>{bus.time}</td>
<td>{bus.bus}</td>
<td>{bus.route}</td>
</tr>

))}

<tr><td colSpan="3"><b>കാഞ്ഞങ്ങാട് റൂട്ടുകൾ</b></td></tr>
{busCategories.kanhangad.map((bus,i)=>(

<tr key={i}>
<td>{bus.time}</td>
<td>{bus.bus}</td>
<td>{bus.route}</td>
</tr>

))}

<tr><td colSpan="3"><b>ദീർഘദൂര റൂട്ടുകൾ</b></td></tr>
{busCategories.longRoutes.map((bus,i)=>(

<tr key={i}>
<td>{bus.time}</td>
<td>{bus.bus}</td>
<td>{bus.route}</td>
</tr>

))}

<tr><td colSpan="3"><b>ഇതര റൂട്ടുകൾ</b></td></tr>
{busCategories.otherRoutes.map((bus,i)=>(

<tr key={i}>
<td>{bus.time}</td>
<td>{bus.bus}</td>
<td>{bus.route}</td>
</tr>

))}

</tbody>

</table>

</div>

</div>

)

  }
