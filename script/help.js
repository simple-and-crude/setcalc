/// <reference path="./help-logopic.d.ts" />
function blackday() {
	var bblackday = document.getElementById("iBD").checked;
	if (bblackday) {
		fav.href = "white-favicon.ico";
		document.body.style.background = "#ffffff";
		document.body.style.color = "#000000";
		main.style.background = "#ffffff";
		main.style.color = "#000000";
		Hlogo.style.borderColor = "#000000";
		sclogo.style.color = "#000000";
		logoh.color = "#000000";
		Hlogo.style.background = "aqua";
		ccpiralogopic.src = CCPIRA_WHITE_LOGO;
		ccpiralogofont.style.background = "#000000";
		ccpiralogofont.style.color = "#ffffff";
		ccpiralogoccpira.style.color = "#09a2e6";
		repofont.style.color = "";
	} else {
		fav.href = "black-favicon.ico";
		document.body.style.background = "#333333";
		document.body.style.color = "#ffffff";
		main.style.background = "#333333";
		main.style.color = "#ffffff";
		Hlogo.style.borderColor = "#ffffff";
		sclogo.style.color = "#dddd00";
		logoh.color = "#dddd00";
		Hlogo.style.background = "#000000";
		ccpiralogopic.src = CCPIRA_BLACK_LOGO;
		ccpiralogofont.style.background = "#dddd00";
		ccpiralogofont.style.color = "#000000";
		ccpiralogoccpira.style.color = "#ffffff";
		repofont.style.color = "#ffffff";
	}
}
onload = function () {
	iBD.click();
}
