
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

function loadImg(src){
  return new Promise((resolve,reject)=>{
    const i=new Image();
    i.onload=()=>resolve(i);
    i.onerror=reject;
    i.src=src;
  });
}

const canvas=document.getElementById("frameCanvas");
const ctx=canvas?.getContext("2d");

const frameUI={
  input:document.getElementById("photoInput"),
  type:document.getElementById("frameType"),
  name:document.getElementById("participantName"),
  org:document.getElementById("participantOrg"),
  zoom:document.getElementById("photoZoom"),
  x:document.getElementById("photoX"),
  y:document.getElementById("photoY"),
  size:document.getElementById("exportSize"),
  download:document.getElementById("downloadFrame"),
  share:document.getElementById("shareFrame"),
  copy:document.getElementById("copyCaption"),
  status:document.getElementById("frameStatus"),
  reset:document.getElementById("resetPhotoPosition"),
  thumbRow:document.getElementById("uploadPreviewRow"),
  thumb:document.getElementById("uploadedThumb"),
  fileName:document.getElementById("uploadedFileName"),
  zoomValue:document.getElementById("photoZoomValue"),
  xValue:document.getElementById("photoXValue"),
  yValue:document.getElementById("photoYValue")
};

let userPhoto=null;
let userPhotoDataURL="";
let logoImage=null;

function roundedPath(c,x,y,w,h,r){
  const q=Math.min(r,w/2,h/2);
  c.beginPath();
  if(typeof c.roundRect==="function"){
    c.roundRect(x,y,w,h,q);
  }else{
    c.moveTo(x+q,y);
    c.lineTo(x+w-q,y);c.quadraticCurveTo(x+w,y,x+w,y+q);
    c.lineTo(x+w,y+h-q);c.quadraticCurveTo(x+w,y+h,x+w-q,y+h);
    c.lineTo(x+q,y+h);c.quadraticCurveTo(x,y+h,x,y+h-q);
    c.lineTo(x,y+q);c.quadraticCurveTo(x,y,x+q,y);
    c.closePath();
  }
}

function roundedRect(c,x,y,w,h,r,fill,stroke){
  roundedPath(c,x,y,w,h,r);
  if(fill){c.fillStyle=fill;c.fill()}
  if(stroke){c.strokeStyle=stroke;c.lineWidth=4;c.stroke()}
}

function setCanvasSize(){
  if(!canvas) return;
  const dims={
    square:[1080,1080],
    portrait:[1080,1350],
    story:[1080,1920]
  }[frameUI.size?.value] || [1080,1350];
  if(canvas.width!==dims[0] || canvas.height!==dims[1]){
    canvas.width=dims[0];
    canvas.height=dims[1];
  }
}

function drawImageCover(c,img,x,y,w,h,zoom=1.15,panX=0,panY=0,background=false){
  const iw=img.naturalWidth || img.width;
  const ih=img.naturalHeight || img.height;
  if(!iw || !ih) return;

  const baseScale=Math.max(w/iw,h/ih);
  const scale=baseScale*Math.max(1,zoom);
  const dw=iw*scale, dh=ih*scale;

  // Keep the image covering the complete frame while still allowing panning.
  const maxX=Math.max(0,(dw-w)/2);
  const maxY=Math.max(0,(dh-h)/2);
  const requestedX=(Number(panX)||0)/100;
  const requestedY=(Number(panY)||0)/100;
  const shiftX=maxX*requestedX;
  const shiftY=maxY*requestedY;

  const dx=x+(w-dw)/2+shiftX;
  const dy=y+(h-dh)/2+shiftY;

  if(background){
    c.save();
    c.filter="blur(18px) brightness(.82)";
    c.globalAlpha=.65;
    c.drawImage(img,dx-20,dy-20,dw+40,dh+40);
    c.restore();
  }else{
    c.drawImage(img,dx,dy,dw,dh);
  }
}

function fontPx(c,size,weight=800,family="Arial"){
  c.font=`${weight} ${Math.max(10,Math.round(size))}px ${family}`;
}

function fitSingleLine(c,text,maxWidth,startSize,minSize,weight=900){
  let size=startSize;
  while(size>minSize){
    fontPx(c,size,weight);
    if(c.measureText(text).width<=maxWidth) break;
    size-=1;
  }
  return size;
}

function wrapWords(c,text,maxWidth){
  const words=String(text).trim().split(/\s+/).filter(Boolean);
  const lines=[];
  let line="";
  for(const word of words){
    const test=line?`${line} ${word}`:word;
    if(line && c.measureText(test).width>maxWidth){
      lines.push(line);
      line=word;
    }else{
      line=test;
    }
  }
  if(line) lines.push(line);
  return lines;
}

function fitWrapped(c,text,maxWidth,maxLines,startSize,minSize,weight=800){
  let size=startSize;
  let lines=[];
  while(size>=minSize){
    fontPx(c,size,weight);
    lines=wrapWords(c,text,maxWidth);
    if(lines.length<=maxLines && lines.every(line=>c.measureText(line).width<=maxWidth)){
      return {size,lines};
    }
    size-=1;
  }

  fontPx(c,minSize,weight);
  lines=wrapWords(c,text,maxWidth);

  // Last-resort fit: merge overflow into the final line and shrink further if required.
  if(lines.length>maxLines){
    const kept=lines.slice(0,maxLines-1);
    const merged=lines.slice(maxLines-1).join(" ");
    kept.push(merged);
    lines=kept;
  }

  let fallback=minSize;
  while(fallback>9 && lines.some(line=>{
    fontPx(c,fallback,weight);
    return c.measureText(line).width>maxWidth;
  })){
    fallback-=1;
  }
  fontPx(c,fallback,weight);
  return {size:fallback,lines};
}

function drawCenteredBlock(c,text,cx,top,maxWidth,maxLines,startSize,minSize,lineHeightFactor=1.12,weight=800,color="#fff"){
  const fitted=fitWrapped(c,text,maxWidth,maxLines,startSize,minSize,weight);
  const lineHeight=fitted.size*lineHeightFactor;
  c.textAlign="center";
  c.textBaseline="top";
  c.fillStyle=color;
  fontPx(c,fitted.size,weight);
  fitted.lines.forEach((line,i)=>c.fillText(line,cx,top+i*lineHeight));
  return {height:fitted.lines.length*lineHeight,size:fitted.size};
}

function drawLeftBlock(c,text,x,top,maxWidth,maxLines,startSize,minSize,lineHeightFactor=1.15,weight=800,color="#0b1110"){
  const fitted=fitWrapped(c,text,maxWidth,maxLines,startSize,minSize,weight);
  const lineHeight=fitted.size*lineHeightFactor;
  c.textAlign="left";
  c.textBaseline="top";
  c.fillStyle=color;
  fontPx(c,fitted.size,weight);
  fitted.lines.forEach((line,i)=>c.fillText(line,x,top+i*lineHeight));
  return {height:fitted.lines.length*lineHeight,size:fitted.size};
}

function updateControlReadouts(){
  if(frameUI.zoomValue) frameUI.zoomValue.textContent=`${Math.round((parseFloat(frameUI.zoom?.value||"1.15"))*100)}%`;
  if(frameUI.xValue) frameUI.xValue.textContent=frameUI.x?.value || "0";
  if(frameUI.yValue) frameUI.yValue.textContent=frameUI.y?.value || "0";
}

function drawFrame(){
  if(!ctx || !canvas) return;
  setCanvasSize();
  updateControlReadouts();

  const W=canvas.width,H=canvas.height;
  const margin=W*.065;
  const photoW=W-2*margin;
  const footerH=Math.max(28,H*.022);
  const footerY=H-footerH;

  ctx.clearRect(0,0,W,H);
  ctx.fillStyle="#f9fbfa";ctx.fillRect(0,0,W,H);
  ctx.fillStyle="#075c34";ctx.fillRect(0,0,W,Math.max(20,H*.016));
  ctx.fillStyle="#d61f26";ctx.fillRect(0,footerY,W,footerH);

  // Header identity
  const logoSize=Math.min(W*.145,H*.095);
  if(logoImage && (logoImage.naturalWidth || logoImage.width)){
    const lx=(W-logoSize)/2;
    const ly=H*.032;
    roundedRect(ctx,lx-8,ly-8,logoSize+16,logoSize+16,18,"#fff","#dce6e0");
    ctx.drawImage(logoImage,lx,ly,logoSize,logoSize);
  }

  // Photo region
  const photoTop=H*.145;
  const photoBottom=H*.675;
  const photoH=photoBottom-photoTop;

  roundedRect(ctx,margin,photoTop,photoW,photoH,34,"#e7eee9","#075c34");
  ctx.save();
  roundedPath(ctx,margin,photoTop,photoW,photoH,34);
  ctx.clip();

  if(userPhoto && (userPhoto.naturalWidth || userPhoto.width)){
    drawImageCover(ctx,userPhoto,margin,photoTop,photoW,photoH,1,0,0,true);
    drawImageCover(
      ctx,userPhoto,margin,photoTop,photoW,photoH,
      parseFloat(frameUI.zoom?.value || "1.15"),
      parseFloat(frameUI.x?.value || "0"),
      parseFloat(frameUI.y?.value || "0"),
      false
    );
  }else{
    ctx.fillStyle="#e9f0ec";ctx.fillRect(margin,photoTop,photoW,photoH);
    const phSize=fitSingleLine(ctx,"Upload your photograph to preview the campaign frame",photoW*.78,W*.03,W*.015,700);
    ctx.fillStyle="#65756c";fontPx(ctx,phSize,700);
    ctx.textAlign="center";ctx.textBaseline="middle";
    ctx.fillText("Upload your photograph to preview the campaign frame",W/2,photoTop+photoH/2);
  }
  ctx.restore();

  const labels={
    day1:["I'M JOINING","THE JCTC CYBERCRIME AWARENESS WALK","20 OCTOBER 2026 • 7:30 AM"],
    day2:["I WILL ATTEND","THE JCTC NATIONAL CONSULTATION ON CYBERCRIME","21 OCTOBER 2026 • 8:00 AM"],
    support:["I SUPPORT","#SAYNOTOCYBERCRIME","DON'T FALL VICTIM. DON'T PERPETRATE."]
  }[frameUI.type?.value || "day1"];

  // Taller banner: prevents long Day 2 copy from colliding with date/time.
  const bandH=H*.155;
  const bandY=photoBottom-bandH;
  ctx.fillStyle="rgba(3,88,48,.96)";
  ctx.fillRect(margin,bandY,photoW,bandH);

  const line1=fitSingleLine(ctx,labels[0],photoW*.86,W*.047,W*.026,900);
  ctx.textAlign="center";ctx.textBaseline="top";
  fontPx(ctx,line1,900);ctx.fillStyle="#fff";
  ctx.fillText(labels[0],W/2,bandY+bandH*.08);

  const titleTop=bandY+bandH*.34;
  const titleBlock=drawCenteredBlock(
    ctx,labels[1],W/2,titleTop,photoW*.88,2,W*.028,W*.016,1.06,850,"#fff"
  );

  const dateSize=fitSingleLine(ctx,labels[2],photoW*.82,W*.020,W*.013,800);
  fontPx(ctx,dateSize,800);ctx.fillStyle="#ffe49a";
  ctx.textAlign="center";ctx.textBaseline="bottom";
  ctx.fillText(labels[2],W/2,bandY+bandH*.93);

  // Optional participant information. Long entries wrap instead of clipping.
  const infoLeft=margin;
  const infoWidth=photoW;
  let cursorY=H*.705;
  const name=(frameUI.name?.value || "").trim();
  const org=(frameUI.org?.value || "").trim();

  if(name){
    const b=drawLeftBlock(ctx,name,infoLeft,cursorY,infoWidth,2,W*.030,W*.014,1.06,900,"#0b1110");
    cursorY+=b.height+H*.008;
  }
  if(org){
    const b=drawLeftBlock(ctx,org,infoLeft,cursorY,infoWidth,2,W*.019,W*.011,1.10,650,"#58675f");
    cursorY+=b.height+H*.008;
  }

  // Institutional identity and slogans have fixed protected zones.
  const institutionalY=H*.850;
  const jctcLine="JOINT CASE TEAM ON CYBERCRIMES (JCTC)";
  const jSize=fitSingleLine(ctx,jctcLine,infoWidth,W*.022,W*.012,900);
  fontPx(ctx,jSize,900);ctx.fillStyle="#075c34";
  ctx.textAlign="left";ctx.textBaseline="top";
  ctx.fillText(jctcLine,infoLeft,institutionalY);

  const slogan="SAY NO TO CYBERCRIME";
  const sloganY=H*.895;
  const sSize=fitSingleLine(ctx,slogan,infoWidth,W*.023,W*.013,900);
  fontPx(ctx,sSize,900);ctx.fillStyle="#d61f26";
  ctx.fillText(slogan,infoLeft,sloganY);

  const secondary="DON'T FALL VICTIM. DON'T PERPETRATE.";
  const secY=H*.930;
  const secSize=fitSingleLine(ctx,secondary,infoWidth,W*.017,W*.010,800);
  fontPx(ctx,secSize,800);ctx.fillStyle="#27372f";
  ctx.fillText(secondary,infoLeft,secY);

  // Keep the final 4.8% of the frame free of text before the red footer.
}
async function initFrame(){
  if(!canvas) return;
  try{
    logoImage=await loadImg("assets/jctc-logo.jpg");
  }catch(e){
    console.warn("JCTC logo could not be loaded into the campaign-frame canvas.",e);
  }
  drawFrame();
}

function readPhotoFile(file){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onerror=()=>reject(new Error("FileReader could not read this image."));
    reader.onload=()=>{
      const dataURL=String(reader.result || "");
      const im=new Image();
      im.onload=()=>resolve({image:im,dataURL});
      im.onerror=()=>reject(new Error("The browser could not decode this image."));
      im.src=dataURL;
    };
    reader.readAsDataURL(file);
  });
}

function setupFrame(){
  if(!canvas || !frameUI.input) return;

  frameUI.input.addEventListener("change",async()=>{
    const file=frameUI.input.files?.[0];
    if(!file) return;

    if(frameUI.status) frameUI.status.textContent="Loading your photograph…";

    try{
      const loaded=await readPhotoFile(file);
      userPhoto=loaded.image;
      userPhotoDataURL=loaded.dataURL;

      if(frameUI.zoom) frameUI.zoom.value="1.15";
      if(frameUI.x) frameUI.x.value="0";
      if(frameUI.y) frameUI.y.value="0";

      if(frameUI.thumb){
        frameUI.thumb.src=userPhotoDataURL;
        frameUI.thumb.alt=`Selected photograph: ${file.name}`;
      }
      if(frameUI.fileName) frameUI.fileName.textContent=file.name;
      if(frameUI.thumbRow) frameUI.thumbRow.hidden=false;

      drawFrame();
      if(frameUI.status){
        frameUI.status.textContent=`Photo loaded successfully (${userPhoto.naturalWidth} × ${userPhoto.naturalHeight}). Use the position controls to adjust it.`;
      }
    }catch(err){
      console.error(err);
      userPhoto=null;
      userPhotoDataURL="";
      if(frameUI.thumbRow) frameUI.thumbRow.hidden=true;
      drawFrame();
      if(frameUI.status){
        frameUI.status.textContent="The browser could not display this file. Please use a JPG, PNG or WEBP photograph.";
      }
    }
  });

  [frameUI.type,frameUI.name,frameUI.org,frameUI.zoom,frameUI.x,frameUI.y,frameUI.size]
    .filter(Boolean)
    .forEach(element=>{
      element.addEventListener("input",drawFrame);
      element.addEventListener("change",drawFrame);
    });

  frameUI.reset?.addEventListener("click",()=>{
    if(frameUI.zoom) frameUI.zoom.value="1.15";
    if(frameUI.x) frameUI.x.value="0";
    if(frameUI.y) frameUI.y.value="0";
    drawFrame();
    if(frameUI.status && userPhoto) frameUI.status.textContent="Photo position reset.";
  });

  frameUI.download?.addEventListener("click",()=>{
    drawFrame();
    const a=document.createElement("a");
    a.download=`JCTC-${frameUI.type?.value || "campaign"}-campaign-frame.png`;
    a.href=canvas.toDataURL("image/png");
    a.click();
    if(frameUI.status) frameUI.status.textContent="Campaign frame generated successfully.";
    jctcTrack("frame_download");
  });

  frameUI.share?.addEventListener("click",()=>{
    drawFrame();
    canvas.toBlob(async blob=>{
      if(!blob) return;
      const file=new File([blob],"JCTC-campaign-frame.png",{type:"image/png"});
      if(navigator.canShare && navigator.canShare({files:[file]})){
        try{
          await navigator.share({
            title:"JCTC Cybercrime Awareness Campaign",
            text:CAMPAIGN_CAPTION,
            files:[file]
          });
          jctcTrack("frame_share");
        }catch(e){}
      }else{
        shareText(CAMPAIGN_CAPTION);
      }
    },"image/png");
  });

  frameUI.copy?.addEventListener("click",async()=>{
    try{
      await navigator.clipboard?.writeText(CAMPAIGN_CAPTION);
      if(frameUI.status) frameUI.status.textContent="Campaign caption copied.";
    }catch(e){
      if(frameUI.status) frameUI.status.textContent="Copy was blocked by the browser.";
    }
  });
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
