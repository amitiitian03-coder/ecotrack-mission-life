const $=id=>document.getElementById(id);
const defaults={name:"Eco Champion",electricity:5,travel:8,publicTransport:2,meat:1,points:120,done:[1,3]};
let state={...defaults};
try{const saved=JSON.parse(localStorage.getItem("ecotrack-state")||"null");if(saved)state={...state,...saved}}catch(e){}
const challenges=[
{id:1,emoji:"💡",title:"Switch off standby",desc:"Unplug devices and turn off lights when not in use.",points:20},
{id:2,emoji:"🚲",title:"Choose a greener commute",desc:"Walk, cycle or use public transport for one trip.",points:30},
{id:3,emoji:"🚰",title:"Save water today",desc:"Take a shorter shower and close the tap while brushing.",points:20},
{id:4,emoji:"🥗",title:"Try a plant-forward meal",desc:"Choose a meal with more vegetables and less meat.",points:25},
{id:5,emoji:"♻️",title:"Sort your waste",desc:"Separate recyclable materials from general waste.",points:25}
];
function save(){localStorage.setItem("ecotrack-state",JSON.stringify(state))}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2400)}
function calc(){const e=+state.electricity||0,t=+state.travel||0,p=+state.publicTransport||0,m=+state.meat||0;return {electric:e*.4,travel:t*.12,public:p*.04,meals:m*1.5,total:e*.4+t*.12+p*.04+m*1.5}}
function fmt(n){return n.toFixed(2).replace(/\.00$/,"").replace(/(\.\d)0$/,"$1")}
function refresh(){
 const c=calc(),done=state.done.length;
 $("sideName").textContent=state.name;$("pageTitle").innerHTML=`Good evening, ${escapeHtml(state.name)} <span>✦</span>`;
 ["dashCo2","totalCo2"].forEach(id=>$(id).textContent=fmt(c.total));$("dashEnergy").textContent=fmt(+state.electricity||0);$("dashPoints").textContent=state.points;$("dashDone").textContent=done;
 $("electricBarText").textContent=fmt(c.electric)+" kg";$("transportBarText").textContent=fmt(c.travel+c.public)+" kg";$("otherBarText").textContent=fmt(c.meals)+" kg";
 const max=Math.max(c.total,1);$("electricBar").style.width=(c.electric/max*100)+"%";$("transportBar").style.width=((c.travel+c.public)/max*100)+"%";$("otherBar").style.width=(c.meals/max*100)+"%";
 $("resultElectric").textContent=fmt(c.electric)+" kg";$("resultTravel").textContent=fmt(c.travel)+" kg";$("resultPublic").textContent=fmt(c.public)+" kg";$("resultMeals").textContent=fmt(c.meals)+" kg";
 $("footprintMessage").textContent=c.total<3?"Your estimate is relatively low in this demo. Keep building consistent habits!":"Your estimated footprint is "+fmt(c.total)+" kg CO₂e/day. Pick one small change to reduce it.";
 $("communityName").textContent=state.name+" (You)";$("communityDone").textContent=done+" challenges completed";$("communityPoints").textContent=state.points;
 renderMini();renderChallenges();save();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderMini(){$("miniChallenges").innerHTML=challenges.slice(0,3).map(c=>`<div class="mini-task"><button class="task-check ${state.done.includes(c.id)?"done":""}" data-challenge="${c.id}" aria-label="Complete ${c.title}">${state.done.includes(c.id)?"✓":"○"}</button><div class="task-text"><b>${c.title}</b><small>${state.done.includes(c.id)?"Completed — great work!":c.desc}</small></div><span class="points">+${c.points}</span></div>`).join("")}
function renderChallenges(){$("challengeGrid").innerHTML=challenges.map(c=>{const done=state.done.includes(c.id);return `<article class="challenge-card"><div class="challenge-top"><div class="challenge-emoji">${c.emoji}</div><span class="challenge-points">✦ ${c.points} points</span></div><h3>${c.title}</h3><p>${c.desc}</p><button class="primary-btn ${done?"completed":""}" data-challenge="${c.id}" ${done?"disabled":""}>${done?"✓ Completed":"Complete challenge +"}</button></article>`}).join("")}
function go(view){document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===view));document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));const titles={dashboard:"Dashboard",footprint:"Footprint tracker",challenges:"Green challenges",solar:"Solar calculator",community:"Community"};if(view!=="dashboard")$("pageTitle").innerHTML=titles[view]+` <span>✦</span>`;else $("pageTitle").innerHTML=`Good evening, ${escapeHtml(state.name)} <span>✦</span>`;window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
document.addEventListener("click",e=>{const b=e.target.closest("[data-challenge]");if(!b||b.disabled)return;const id=+b.dataset.challenge;if(!state.done.includes(id)){state.done.push(id);state.points+=challenges.find(c=>c.id===id).points;refresh();toast("Challenge complete! Points added 🌱")}});
$("footprintForm").addEventListener("submit",e=>{e.preventDefault();state.electricity=+$("electricity").value;state.travel=+$("travel").value;state.publicTransport=+$("publicTransport").value;state.meat=+$("meat").value;refresh();toast("Your footprint estimate has been updated")});
$("solarForm").addEventListener("submit",e=>{e.preventDefault();const area=Math.max(0,+$("roofArea").value),bill=Math.max(0,+$("bill").value),sun=+$("sunlight").value,kw=area/100*sun,units=kw*4*30,saving=Math.min(bill,units*7);$("solarKw").textContent=kw.toFixed(1);$("solarUnits").textContent=Math.round(units);$("solarSaving").textContent=Math.round(saving).toLocaleString("en-IN");toast("Solar estimate updated")});
$("editProfile").addEventListener("click",()=>{const name=prompt("What name should appear on your dashboard?",state.name);if(name&&name.trim()){state.name=name.trim().slice(0,40);refresh();toast("Profile name updated")}});
$("shareBtn").addEventListener("click",async()=>{const text="Join me in taking greener everyday actions with EcoTrack — Mission LiFE!";try{await navigator.clipboard.writeText(text);toast("Invite copied to clipboard")}catch(e){prompt("Copy this invite:",text)}});
$("electricity").value=state.electricity;$("travel").value=state.travel;$("publicTransport").value=state.publicTransport;$("meat").value=state.meat;
const solarCalc=()=>{const area=+$("roofArea").value||0,bill=+$("bill").value||0,sun=+$("sunlight").value||1,kw=area/100*sun,units=kw*120,saving=Math.min(bill,units*7);$("solarKw").textContent=kw.toFixed(1);$("solarUnits").textContent=Math.round(units);$("solarSaving").textContent=Math.round(saving).toLocaleString("en-IN")};
["roofArea","bill","sunlight"].forEach(id=>$(id).addEventListener("input",solarCalc));
refresh();solarCalc();
