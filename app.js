
const REGISTER_URL = "https://docs.google.com/forms/d/e/1FAIpQLSehMK2BRo-c7ApW1UpkfYBuAHIg1azyu5XtTMMCSb_aaMPcrw/viewform";
const CAMPAIGN_CAPTION = "I support the JCTC Cybercrime Awareness Campaign. Cybercrime is a crime. Know the Conduct. Know the Consequences. Don't Fall Victim. Don't Perpetrate. #SayNoToCybercrime #JCTC";

const conducts = [
  {icon:"↯",title:"Unauthorised Access / Hacking",what:"Accessing a computer, account, device or system without permission.",example:"Someone obtains another person's login credentials and enters the account without consent.",why:"It can expose private data, enable fraud and compromise other connected accounts.",action:"Secure affected accounts, preserve access alerts and report suspected unauthorised access."},
  {icon:"ID",title:"Identity Theft & Impersonation",what:"Using another person's identity, images, credentials or details to deceive others.",example:"A fake social-media account copies a person's photo and asks their contacts for money.",why:"It can cause financial loss, reputational harm and further victimisation.",action:"Verify identities independently, preserve the fake profile URL and report impersonation."},
  {icon:"@",title:"Phishing & Credential Theft",what:"Messages or websites designed to trick people into revealing passwords, OTPs or financial details.",example:"A fake bank message says your account will be blocked unless you click a link and confirm your OTP.",why:"One credential can give criminals access to money, email and other accounts.",action:"Do not use the supplied link. Verify through the organisation's official channel."},
  {icon:"₦",title:"Electronic Payment / Card Fraud",what:"Using payment credentials, cards or digital payment systems dishonestly or without authority.",example:"Someone uses another person's card details to purchase goods online.",why:"Victims may lose money and face additional account compromise.",action:"Contact the financial institution quickly and preserve transaction alerts and receipts."},
  {icon:"POS",title:"ATM / POS Manipulation",what:"Tampering with, misusing or deceptively exploiting payment terminals or cash-access systems.",example:"A device or deceptive process captures card or account information during a transaction.",why:"It can compromise accounts and enable unauthorised transactions.",action:"Stop the transaction, notify the provider and preserve receipts, terminal details and alerts."},
  {icon:"!",title:"Cyberstalking & Online Threats",what:"Persistent threatening, harassing or harmful online conduct directed at another person.",example:"Repeated threatening messages are sent across multiple accounts after the victim blocks the sender.",why:"It can create fear, distress and serious safety risks.",action:"Preserve messages, usernames, dates and links before blocking or reporting."},
  {icon:"SW",title:"Malicious Software Distribution",what:"Creating, sending or deploying software intended to damage, disrupt, spy on or gain unauthorised access.",example:"A file disguised as an invoice installs software that steals credentials.",why:"Malware can compromise devices, networks and sensitive information.",action:"Disconnect affected devices where appropriate and seek qualified technical assistance."},
  {icon:"WWW",title:"Cybersquatting",what:"Bad-faith use or registration of domain names or digital identities that exploit another person's or organisation's identity.",example:"A lookalike web address is created to mislead visitors into believing it belongs to a trusted organisation.",why:"It can facilitate impersonation, phishing and reputational harm.",action:"Check domains carefully and preserve the exact web address and screenshots."},
  {icon:"FX",title:"Computer-Related Fraud & Forgery",what:"Using computers or digital systems to deceive, manipulate information or obtain an unlawful benefit.",example:"A payment instruction or digital document is altered to redirect funds.",why:"Digital manipulation can make fraudulent instructions appear legitimate.",action:"Verify sensitive instructions independently and preserve the original communication."},
  {icon:"18+",title:"Online Exploitation & Criminal Use of Platforms",what:"Using digital platforms to groom, coerce, exploit, blackmail or facilitate other criminal conduct.",example:"A person builds trust online, obtains private content and later threatens the victim.",why:"The harm can be financial, emotional, reputational and physical.",action:"Do not comply with threats. Preserve evidence, seek support and report appropriately."}
];

const scenarios = [
  {q:"A person obtains someone else's card details and uses them to buy goods online.",opts:["Likely criminal conduct","Not a crime"],answer:0,exp:"Using another person's payment details without authority may constitute criminal conduct. Preserve transaction details and report through appropriate channels."},
  {q:"Someone creates a fake social-media identity, builds a relationship with a victim and later asks for money.",opts:["Likely criminal conduct","Not a crime"],answer:0,exp:"Impersonation combined with deception for financial gain is a major warning sign of fraud. Verify identities independently."},
  {q:"An employee receives an email appearing to be from a senior executive requesting urgent payment to a new bank account.",opts:["Pay quickly","Verify through another official channel"],answer:1,exp:"This is a common Business Email Compromise pattern. Independently verify changed or urgent payment instructions."},
  {q:"A person threatens to distribute another person's private images unless money is paid.",opts:["Pay to make it stop","Preserve evidence and report"],answer:1,exp:"Threats involving private content can be serious criminal conduct. Paying does not guarantee the threats will stop."},
  {q:"A fake customer-care account requests your OTP to 'reverse' a transaction.",opts:["Share the OTP","Do not share it; verify the account"],answer:1,exp:"Legitimate support channels should not need your OTP. Do not disclose authentication codes."},
  {q:"A friend messages from a new account saying they urgently need money.",opts:["Send a small amount","Call the friend using a known number"],answer:1,exp:"Verify identity through a trusted channel before acting on urgent requests."},
  {q:"An investment platform guarantees extremely high returns and requires a crypto deposit before you can withdraw profits.",opts:["Deposit more to unlock the funds","Stop and verify independently"],answer:1,exp:"Guaranteed returns and extra-payment demands are common scam indicators. Do not chase losses."},
  {q:"A stranger sends you an unexpected attachment labelled 'invoice.pdf.exe'.",opts:["Open it to check","Do not open it"],answer:1,exp:"Unexpected executable files can contain malware. Verify the sender and the file through a separate channel."},
  {q:"Someone repeatedly sends threatening messages after being asked to stop.",opts:["Preserve the messages and seek help","Delete everything immediately"],answer:0,exp:"Preserve evidence before blocking or deleting so investigators can understand what happened."},
  {q:"A payment beneficiary account suddenly changes by email just before a major transfer.",opts:["Verify the change using a known contact method","Trust the email because it looks genuine"],answer:0,exp:"Independent verification can prevent BEC and invoice-redirection fraud."}
];

function node(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}

function renderConducts(){
  const grid=document.getElementById("conductGrid");
  conducts.forEach(c=>{
    const card=node("article","conduct-card");
    const top=node("div","conduct-top");
    top.append(node("div","conduct-icon",c.icon));
    const t=node("div");t.append(node("h3","",c.title),node("p","",c.what));top.append(t);card.append(top);
    const ex=node("p","example");ex.innerHTML="<strong>Example:</strong> "+c.example;
    const why=node("p");why.innerHTML="<strong>Why it matters:</strong> "+c.why;
    const act=node("p");act.innerHTML="<strong>What to do:</strong> "+c.action;
    const a=node("div","conduct-actions");
    const dl=node("button","mini-btn","Download awareness card");dl.type="button";dl.onclick=()=>downloadConductCard(c);
    const sh=node("button","mini-btn","Share");sh.type="button";sh.onclick=()=>shareText(`${c.title}: ${c.what} ${c.action} #SayNoToCybercrime #JCTC`);
    a.append(dl,sh);card.append(ex,why,act,a);grid.append(card);
  });
}

let qpos=0;
function renderQuiz(){
  const s=scenarios[qpos];
  document.getElementById("quizIndex").textContent=`Scenario ${qpos+1} of ${scenarios.length}`;
  document.getElementById("quizQuestion").textContent=s.q;
  const box=document.getElementById("quizOptions"), exp=document.getElementById("quizExplanation");
  box.innerHTML="";exp.hidden=true;exp.textContent="";
  s.opts.forEach((o,i)=>{
    const b=node("button","quiz-option",`${String.fromCharCode(65+i)}. ${o}`);b.type="button";
    b.onclick=()=>{exp.hidden=false;exp.innerHTML=`<strong>${i===s.answer?"Good choice.":"Consider this:"}</strong> ${s.exp}`;[...box.children].forEach(x=>x.disabled=true)};
    box.append(b);
  });
}

function shareText(text){
  if(navigator.share) navigator.share({title:"JCTC Cybercrime Awareness Campaign",text,url:location.href}).catch(()=>{});
  else {navigator.clipboard?.writeText(text+"\n"+location.href);alert("Campaign text copied to your clipboard.")}
}

function setupEventState(){
  const now=new Date(), day1=new Date("2026-10-20T07:30:00+01:00"), day2=new Date("2026-10-21T08:00:00+01:00"), end=new Date("2026-10-22T00:00:00+01:00");
  const state=document.getElementById("eventState"), cd=document.getElementById("countdown"), regs=document.querySelectorAll(".day2-register");
  if(now<day1){
    state.textContent="Campaign begins 20 October 2026";
    const tick=()=>{const ms=day1-new Date();if(ms<=0){location.reload();return}const days=Math.floor(ms/86400000),hrs=Math.floor((ms%86400000)/3600000),mins=Math.floor((ms%3600000)/60000);cd.textContent=`${days} days • ${hrs} hours • ${mins} minutes to Day 1`};tick();setInterval(tick,60000);
  } else if(now<day2){state.textContent="HAPPENING TODAY — DAY 1";cd.textContent="Cybercrime Awareness Walk"}
  else if(now<end){state.textContent="HAPPENING TODAY — DAY 2";cd.textContent="National Consultation on the Cybercrime Legal Framework"}
  else {state.textContent="2026 CAMPAIGN COMPLETED";cd.textContent="View campaign highlights and retained awareness resources.";regs.forEach(a=>{a.textContent="View Campaign Highlights";a.removeAttribute("target");a.href="#resources"})}
}

function setupUI(){
  const mb=document.getElementById("menuBtn"),nav=document.getElementById("mainNav");
  mb.onclick=()=>{const o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",String(o))};
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
  document.getElementById("nextScenario").onclick=()=>{qpos=(qpos+1)%scenarios.length;renderQuiz()};
  document.getElementById("day1DetailsBtn").onclick=()=>{const t=document.getElementById("day1More");t.hidden=!t.hidden;document.getElementById("day1DetailsBtn").textContent=t.hidden?"View Day 1 Details":"Hide Day 1 Details"};
  document.getElementById("shareWalkBtn").onclick=()=>shareText("I'm supporting the JCTC Cybercrime Awareness Walk on 20 October 2026. Say No to Cybercrime. Don't Fall Victim. Don't Perpetrate.");
  document.querySelectorAll(".frame-choice").forEach(a=>a.onclick=()=>setTimeout(()=>{document.getElementById("frameType").value=a.dataset.frame;drawFrame()},40));
}

function loadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=src})}
const canvas=document.getElementById("frameCanvas"),ctx=canvas?.getContext("2d");let userPhoto=null,logoImage=null;
function rr(c,x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=4;c.stroke()}}
function setCanvasSize(){const s=document.getElementById("exportSize").value,d={square:[1080,1080],portrait:[1080,1350],story:[1080,1920]}[s];canvas.width=d[0];canvas.height=d[1]}
function fitPhoto(c,img,x,y,w,h,z,ox,oy){const ir=img.width/img.height,tr=w/h;let dw,dh;if(ir>tr){dh=h*z;dw=dh*ir}else{dw=w*z;dh=dw/ir}c.drawImage(img,x+(w-dw)/2+ox*(w/220),y+(h-dh)/2+oy*(h/220),dw,dh)}
function wrapText(c,text,x,y,maxW,lineH,maxLines=4){const words=text.split(/\s+/);let line="",lines=[];words.forEach(word=>{const test=line?line+" "+word:word;if(c.measureText(test).width>maxW&&line){lines.push(line);line=word}else line=test});if(line)lines.push(line);lines.slice(0,maxLines).forEach((l,i)=>c.fillText(l,x,y+i*lineH))}
function drawFrame(){
  if(!ctx)return;setCanvasSize();const W=canvas.width,H=canvas.height,margin=W*.07,photoY=H*.16,photoH=H*.52;
  ctx.fillStyle="#f8faf8";ctx.fillRect(0,0,W,H);ctx.fillStyle="#075c34";ctx.fillRect(0,0,W,Math.max(24,H*.022));ctx.fillStyle="#d61f26";ctx.fillRect(0,H-Math.max(28,H*.026),W,Math.max(28,H*.026));
  rr(ctx,margin,photoY,W-2*margin,photoH,38,"#e7eee9","#075c34");ctx.save();ctx.beginPath();ctx.roundRect(margin,photoY,W-2*margin,photoH,38);ctx.clip();
  if(userPhoto)fitPhoto(ctx,userPhoto,margin,photoY,W-2*margin,photoH,parseFloat(photoZoom.value),parseFloat(photoX.value),parseFloat(photoY.value));
  else{ctx.fillStyle="#e9f0ec";ctx.fillRect(margin,photoY,W-2*margin,photoH);ctx.fillStyle="#6d7d74";ctx.font=`700 ${Math.round(W*.035)}px Arial`;ctx.textAlign="center";ctx.fillText("Upload your photograph",W/2,photoY+photoH/2)}ctx.restore();
  if(logoImage){const lw=W*.18;ctx.fillStyle="#fff";ctx.fillRect(W/2-lw/2,30,lw,lw);ctx.drawImage(logoImage,W/2-lw/2,30,lw,lw)}
  const labels={day1:["I'M JOINING","THE JCTC CYBERCRIME AWARENESS WALK","20 OCTOBER 2026 • 7:30 AM"],day2:["I WILL ATTEND","THE JCTC NATIONAL CONSULTATION ON CYBERCRIME","21 OCTOBER 2026 • 8:00 AM"],support:["I SUPPORT","#SAYNOTOCYBERCRIME","DON'T FALL VICTIM. DON'T PERPETRATE."]}[frameType.value];
  const bandY=photoY+photoH-H*.055;ctx.fillStyle="rgba(3,88,48,.94)";ctx.fillRect(margin,bandY,W-2*margin,H*.12);ctx.textAlign="center";ctx.fillStyle="#fff";ctx.font=`900 ${Math.round(W*.05)}px Arial`;ctx.fillText(labels[0],W/2,bandY+H*.04);ctx.font=`800 ${Math.round(W*.031)}px Arial`;wrapText(ctx,labels[1],W/2,bandY+H*.077,W*.78,H*.034,2);ctx.fillStyle="#ffe7a2";ctx.font=`700 ${Math.round(W*.022)}px Arial`;ctx.fillText(labels[2],W/2,bandY+H*.108);
  ctx.textAlign="left";if(participantName.value.trim()){ctx.fillStyle="#0a1110";ctx.font=`900 ${Math.round(W*.036)}px Arial`;ctx.fillText(participantName.value.trim(),margin,H*.84)}if(participantOrg.value.trim()){ctx.fillStyle="#526159";ctx.font=`600 ${Math.round(W*.023)}px Arial`;wrapText(ctx,participantOrg.value.trim(),margin,H*.875,W*.8,H*.03,2)}
  ctx.fillStyle="#075c34";ctx.font=`900 ${Math.round(W*.025)}px Arial`;ctx.fillText("JOINT CASE TEAM ON CYBERCRIMES (JCTC)",margin,H*.94);ctx.fillStyle="#d61f26";ctx.font=`800 ${Math.round(W*.023)}px Arial`;ctx.fillText("SAY NO TO CYBERCRIME",margin,H*.974);
}
async function initFrame(){if(!canvas)return;logoImage=await loadImg("assets/jctc-logo.jpg");drawFrame()}
function setupFrame(){
  photoInput.onchange=e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=ev=>{const im=new Image();im.onload=()=>{userPhoto=im;drawFrame()};im.src=ev.target.result};r.readAsDataURL(f)};
  ["frameType","participantName","participantOrg","photoZoom","photoX","photoY","exportSize"].forEach(id=>{document.getElementById(id).addEventListener("input",drawFrame);document.getElementById(id).addEventListener("change",drawFrame)});
  downloadFrame.onclick=()=>{drawFrame();const a=document.createElement("a");a.download=`JCTC-${frameType.value}-campaign-frame.png`;a.href=canvas.toDataURL("image/png");a.click();frameStatus.textContent="Your campaign frame has been generated for download.";jctcTrack("frame_download")};
  shareFrame.onclick=()=>{drawFrame();canvas.toBlob(async blob=>{const file=new File([blob],"JCTC-campaign-frame.png",{type:"image/png"});if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({title:"JCTC Cybercrime Awareness Campaign",text:CAMPAIGN_CAPTION,files:[file]});jctcTrack("frame_share")}catch(e){}}else shareText(CAMPAIGN_CAPTION)},"image/png")};
  copyCaption.onclick=async()=>{await navigator.clipboard?.writeText(CAMPAIGN_CAPTION);frameStatus.textContent="Campaign caption copied."};
}

async function downloadConductCard(c){
  const k=document.createElement("canvas");k.width=1080;k.height=1350;const x=k.getContext("2d");x.fillStyle="#06110d";x.fillRect(0,0,1080,1350);x.fillStyle="#075c34";x.fillRect(0,0,1080,26);x.fillStyle="#d61f26";x.fillRect(0,1324,1080,26);
  const im=await loadImg("assets/jctc-logo.jpg");x.fillStyle="#fff";x.fillRect(55,55,160,160);x.drawImage(im,55,55,160,160);x.fillStyle="#8fdcac";x.font="900 28px Arial";x.fillText("JCTC CYBER AWARENESS SERIES",245,110);x.fillStyle="#fff";x.font="900 62px Arial";wrapText(x,c.title.toUpperCase(),55,300,950,72,3);x.fillStyle="#d61f26";x.font="900 28px Arial";x.fillText("KNOW THE CONDUCT. KNOW THE CONSEQUENCES.",55,510);x.fillStyle="#fff";x.font="600 31px Arial";wrapText(x,c.what,55,585,940,43,5);x.fillStyle="#8fdcac";x.font="900 28px Arial";x.fillText("REAL-LIFE EXAMPLE",55,820);x.fillStyle="#fff";x.font="600 28px Arial";wrapText(x,c.example,55,870,940,40,4);x.fillStyle="#8fdcac";x.font="900 28px Arial";x.fillText("WHAT TO DO",55,1060);x.fillStyle="#fff";x.font="600 28px Arial";wrapText(x,c.action,55,1110,940,40,4);x.fillStyle="#fff";x.font="900 27px Arial";x.fillText("DON'T FALL VICTIM. DON'T PERPETRATE.",55,1275);
  const a=document.createElement("a");a.download=`JCTC-${c.title.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}.png`;a.href=k.toDataURL("image/png");a.click();jctcTrack("resource_download",{resource:c.title});
}

window.jctcAnalyticsQueue=[];
function jctcTrack(event,meta={}){window.jctcAnalyticsQueue.push({event,meta,timestamp:new Date().toISOString()})}
document.addEventListener("click",e=>{const a=e.target.closest("a");if(!a)return;if(a.classList.contains("day2-register"))jctcTrack("day2_registration_click");if(a.closest("#resources"))jctcTrack("resource_click")});
renderConducts();renderQuiz();setupEventState();setupUI();setupFrame();initFrame();
