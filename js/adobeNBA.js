$(document).ready(function () {
  var previous = document.getElementById("previousParam");

  // if there was a previous Adobe param, display it
  if (localStorage.getItem("lastParam") !== null) {
    previous.value = localStorage.getItem("lastParam");
  }

  // store all adobeParams in localStorage
  if (localStorage.getItem("adobeParams") == null) {
    localStorage.setItem(
      "adobeParams",
      JSON.stringify({ adobeParams: { cid: [], iid: [], ls: [] } })
    );
  }
});

function createAdobeLink() {
  var baselink = document.getElementById("baselink").value;
  var adobeParam = document.getElementById("adobe_param").value;
  var league = document.getElementById("league").value;
  var landingPage = document.getElementById("landing_page").value;
  var initiative = document.getElementById("initiative").value;
  var placement = document.getElementById("placement").value;
  var campaign = document.getElementById("campaign").value;
  var optionals = document.getElementById("optionals").value;
  var display = document.getElementById("final_url");

	// concatenate all params
	if (optionals) {
		var adobeValue = league + ":" + landingPage + ":" + initiative + ":" + placement + ":" + campaign + ":" + optionals
	}  else {
		var adobeValue = league + ":" + landingPage + ":" + initiative + ":" + placement + ":" + campaign
	} 

  if (
    adobeParam &&
    league &&
    landingPage &&
    initiative &&
    placement &&
    campaign
  ) {
    if (
      (baselink !== null && baselink.includes("http")) ||
      baselink.includes("www")
    ) {
      if (baselink.includes("nba") && !baselink.includes("?")) {
        var finishedLink = baselink + "?" + adobeParam + "=" + adobeValue;

        // store last param to display on page/store in JSON
        localStorage.setItem("lastParam", adobeParam + "=" + adobeValue);

        display.value = finishedLink;

			} else if (baselink.includes("nba") && baselink.includes("?")) {
        var finishedLink = baselink + "&" + adobeParam + "=" + adobeValue;

        localStorage.setItem("lastParam", adobeParam + "=" + adobeValue);

				display.value = finishedLink;
				
      } else {
        display.value = "Please enter a valid NBA base link.";
      }
    } else {
      display.value =
        "Please ensure that you've entered a valid link that starts with http/https or www.";
    }
  } else {
    display.value =
      "Please check that you've selected an option for all of the above parameters.";
  }
}


function storeParams() {
  // var adobeParams = {"adobeParams": { "cid":[], "iid":[], "ls":[] }}
  var adobeJSON = JSON.parse(localStorage.getItem("adobeParams"));
  var lastParam = localStorage.getItem("lastParam");

  if (adobeJSON != null && lastParam !== null) {
		var keys = Object.keys(adobeJSON.adobeParams);

    for (var i = 0; i < keys.length; i++) {
      // set correct array to push to
      if (lastParam.startsWith(keys[i])) {
        var paramArray = adobeJSON.adobeParams[keys[i]];
      }
    }
    // check if previously used param was already stored
		// if not, add to adobeJSON
		if (!paramArray.includes(lastParam)) {
			paramArray.push(lastParam);
		}
		// save
    localStorage.setItem("adobeParams", JSON.stringify(adobeJSON));
  }
}

function downloadObjectAsJson(adobeJSON) {
	var adobeJSON = localStorage.getItem("adobeParams")
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(adobeJSON);
	var downloadAnchorNode = document.createElement("a");
	
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "adobeParams.json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function downloadObjectAsCSV(adobeJSON) {
	var adobeJSON = JSON.parse(localStorage.getItem("adobeParams"))

	const rows = [
		adobeJSON.adobeParams.cid,
		adobeJSON.adobeParams.iid,
		adobeJSON.adobeParams.ls
	];

	let csvContent = "data:text/csv;charset=utf-8,";

	rows.forEach(function(rowArray) {
		let row = rowArray.join(",");
		csvContent += row + "\r\n";
	});

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "adobeParams.csv");
	document.body.appendChild(link); 

	link.click(); 
}

