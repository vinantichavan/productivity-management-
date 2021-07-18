//blacklisturl
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    if (!Array.isArray(local.blocked)) {
      chrome.storage.local.set({ blocked: [] });
    }

    if (typeof local.enabled !== "boolean") {
      chrome.storage.local.set({ enabled: false });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) {
      chrome.tabs.remove(tabId);
    }
  });
});
//blacklisturl

//block http requests

  function blockRequest(details) {
    console.log("Blocked: ", details.url);
    return {
      cancel: true
    };
  };
function blockhttpreq(){
  chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
    urls: ["https://*/*"]
  }, ['blocking']);
};


chrome.tabs.onUpdated.addListener(function () {
  chrome.storage.local.get(["locked"], function (local) {
    const { locked } = local;
    if (localStorage.getItem("dummy")=="fuckit"){
      console.log("locking");
      blockhttpreq();
    }  
      
    else console.log("done");  
  
  });
});

console.log(localStorage.getItem("dummy"));



//block http requests

/*---------------------------------------------------------------------------------------------------------------------*/
//timer
var t,timeInMs,timer1,timeElapsed,counter;
    //my function
    var count;
    function smt(a,ctx,radius){
       count=0;
       var t=a;
       var CTX=ctx;
       var RADIUS=radius;
        var regex1=/^[0-2][0-9](?=-)/;
        var regex2=/(?<=-)[0-5][0-9](?=-)/;
        var regex3=/(?<=-)[0-5]\d$/;
        var hours=Number(t.match(regex1));
        var mins=Number(t.match(regex2));
        var seconds=Number(t.match(regex3));
        if(hours!=undefined&&mins!=undefined&&seconds!=undefined){
            timeInMs=(hours*3600+mins*60+seconds)*1000;
            timer1=setTimeout(function(){
            alert(hours+" hours"+mins+" minitues"+seconds+" seconds has passed.please take a break.");
            active=Boolean(false);

            },timeInMs);
            counter=setInterval(() => {
              count=count+1;
              clock(CTX,RADIUS,count);
              if(count>(timeInMs/1000)){
                clearInterval(counter);
                count=0;
              }
            }, 1000);


        }
        else{
            alert("Invalid user input.for example 12 minutes can be written as 00-12-00.Don't let any place empty");
        }
    }

    function cmt(ctx,radius){
        clearTimeout(timer1);
        clearInterval(counter);
        clock(ctx,radius,0);
    }
//  /*----------------------analog Clock--------------------------  */

    
    function clock(CTX,RADIUS,TIME){
    drawTimer(CTX,RADIUS);
    drawNumbers(CTX,RADIUS);
    drawTime(CTX,RADIUS,TIME);
    }

    function drawTimer(ctx,radius){
        ctx.beginPath();
        ctx.arc(0,0,radius,0,2*Math.PI);
        ctx.fillStyle="rgb(76,100,111)";
        ctx.fill();
        var radius1=radius*0.1;
        ctx.beginPath();
        ctx.arc(0,0,radius1,0,2*Math.PI);
        ctx.fillStyle="white";
        ctx.fill();
    }

    function drawNumbers(ctx,radius){
        var num;
        var ang;
        ctx.font=radius*0.15;
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for(num=1;num<13;num++){
            ang=num*Math.PI/6;
            ctx.rotate(ang);
            ctx.translate(0,-radius*0.85);
            ctx.rotate(-ang);
            ctx.fillStyle="white";
            ctx.fillText(num.toString(),0,0);
            ctx.rotate(ang);
            ctx.translate(0,radius*0.85);
            ctx.rotate(-ang);
        }


    }
    
    
    function drawTime(ctx,radius,time){
        timeElapsed=time;
        var hrs=Math.floor(timeElapsed/3600);
        var min=Math.floor((timeElapsed%3600)/60);
        var sec=timeElapsed-(hrs*3600+min*60); 
        //hour
        hrs= hrs%12;
        hrs = (hrs*Math.PI/6)+(min*Math.PI/(6*60))+(sec*Math.PI/(360*60));
        drawHand(ctx, hrs, radius*0.5, radius*0.07,"white");
        //minute
        min = (min*Math.PI/30)+(sec*Math.PI/(30*60));
        drawHand(ctx, min, radius*0.8, radius*0.05,"white");
        // second
        sec = (sec*Math.PI/30);
        drawHand(ctx, sec, radius*0.9, radius*0.02,"white");
    }
        
    function drawHand(ctx,angle,length,width,color){
        ctx.beginPath();
        ctx.lineWidth=width;
        ctx.moveTo(0,0);
        ctx.rotate(angle);
        ctx.lineTo(0,-length);
        ctx.strokeStyle=color;
        ctx.stroke();
        ctx.rotate(-angle);

    }

/***************************************************************alarm*************************************************************************** */
var alarmSound = new Audio();
alarmSound.src = "assets/calm_morning_alarm.mp3";
		var alarmTimer;

		function setAlarm(input,almOptions) {
      console.log("enter");
			var ms = input;
			if(isNaN(ms)) {
				alert('Invalid Date');
				return;
			}
     console.log(ms);
			var alarm = new Date(ms);
			var alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
			
			var differenceInMs = alarmTime.getTime() - (new Date()).getTime();
      console.log(differenceInMs);
			if(differenceInMs < 0) {
				alert('Specified time is already passed');
				return;
			}

			alarmTimer = setTimeout(() =>{initAlarm(almOptions)}, differenceInMs);
      console.log("win");
			// button.innerText = 'Cancel Alarm';
			// button.setAttribute('onclick', 'cancelAlarm(this);');
		};

		function cancelAlarm() {
			clearTimeout(alarmTimer);
      console.log("cancel alarm");
		//	button.innerText = 'Set Alarm';
		//	button.setAttribute('onclick', 'setAlarm(this);')
		};

		function initAlarm(almOptions) {
      var a=almOptions
			alarmSound.play();
			a.style.display = '';
		};

		function stopAlarm(almOptions) {
      var a=almOptions
			alarmSound.pause();
			alarmSound.currentTime = 0;
			a.style.display = 'none';
      console.log("stop alarm");
		//	cancelAlarm(document.getElementById('alarmButton'));
    cancelAlarm();
		};

		function snooze(almOptions) {
			stopAlarm(almOptions);
      console.log("snooze alarm")
			alarmTimer = setTimeout(() =>{initAlarm(almOptions)}, 300000); // 5 * 60 * 1000 = 5 Minutes
		};
