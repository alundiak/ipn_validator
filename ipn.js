/*
Specific JavaScript Helper function to get XML file
Info: http://www.w3schools.com/dom/dom_loadxmldoc.asp
*/
function loadXMLDoc(dname){
	if (window.XMLHttpRequest){
		xhttp=new XMLHttpRequest();
	} else {
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	xhttp.send();
	return xhttp.responseXML;
}

/*
JavaScript code to read XML content from file
*/
function readXML(fname){
	var xmlDoc;
	try{
		xmlDoc=loadXMLDoc(fname); // Change this file to any other you have. Hope structure the same: ROWS => ROW => NUMIDENT
	} catch(err) {}

	return xmlDoc;
}

/*
Main Entry Point
*/
xmlDoc = readXML("ipn.xml");
var rows = xmlDoc.getElementsByTagName("ROWS")[0].children;
var mC = document.getElementById("msgContainer");

for (var i=0; i< rows.length; i++) {

	var numIdent = rows[i].children[1].textContent;
	
	var	msg = document.createElement("SPAN");
		msg.title = "Click to see more details.";
		msg.className="msg";
		
	var isErr=false;		
    if ( isNaN(numIdent) ) {
	    msg.textContent = "NumIdent: "+numIdent+" is not valid number entity.";
		isErr=true;
	} else if(numIdent.length < 10) {
        msg.textContent = "NumIdent: "+numIdent+" is not valid. Value length is less than 10";
		isErr=true;
    } else if (numIdent.length > 10){
		msg.textContent = "NumIdent: "+numIdent+" is not valid. Value length is more than 10";
		isErr=true;
    } 
	
	if (!isErr) continue;
	
	var	mainWrapper = document.createElement("DIV");
			
	var	details = document.createElement("PRE");
		details.className="xmlCode";
		details.style.display="none";
		details.textContent = rows[i].innerHTML; 
		
	var br = document.createElement("BR");
	
	if (isErr){
		mainWrapper.appendChild(msg);
		mainWrapper.appendChild(details);
		mC.appendChild(mainWrapper);
		mC.appendChild(br);
	}
}

if (mC.childNodes.length > 0){
	var msgItems = document.getElementsByClassName("msg");
	function processEvent(e){
		var currentDisplay = e.target.nextSibling.style.display;
		e.target.nextSibling.style.display= (currentDisplay == "none") ? "block" : "none";
	}
	for(i=0 ; i < msgItems.length ; i++){
		msgItems[i].addEventListener("click", processEvent, false);
		msgItems[i].addEventListener("mouseover", function(e){e.target.style.cursor="pointer";}, false);
		msgItems[i].addEventListener("mouseout", function(e){e.target.style.cursor="auto";}, false);
	}
} else {
	var	msgOK = document.createElement("SPAN");
	msgOK.textContent = "There is no issues/mistakes in provided XML file with IPN/NumIdent info. Change XML file, an refresh page to try again."
	mC.appendChild(msgOK);
}

