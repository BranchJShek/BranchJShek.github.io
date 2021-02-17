function createLink() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getActiveSheet()

  // starting row is 3
  var rowIndex = sheet.getCurrentCell().getRowIndex()
  var range = sheet.getRange(rowIndex, 1, 1, 12) // rowIndex, column, numRows, numCols
  var values = range.getValues();

  var keyInfo = sheet.getRange("L1:M1")
  var branchKey = keyInfo.getCell(1, 1).getValue()

  if (branchKey.startsWith("key_live_")) {
    var linkData = {
      "branch_key": branchKey,
      "type": 2,
      "data": {}
    }

    if (values[0]) {
      var campaign = values[0][2]
      var channel = values[0][3]
      var feature = values[0][4]
      var webonly = values[0][5]
      var alias = values[0][7]
      var og_title = values[0][8]

      var sectionId = values[0][9]
      var contentId = values[0][10]

      var linkName = values[0][11]
      var canonicalUrl = values[0][0]
      var fallbackUrl = values[0][1]

      if (campaign && channel && feature && linkName && canonicalUrl) {
        linkData['campaign'] = campaign;
        linkData['channel'] = channel;
        linkData['feature'] = feature;
        linkData['data']['$marketing_title'] = linkName;
        linkData['data']['$canonical_url'] = canonicalUrl;
        linkData['data']['$fallback_url'] = fallbackUrl;
      } 
      
    } else {
      ss.toast("Please make sure you've filled out all of the required columns and selected the row.", "Missing Required Fields")
      return;
    }

    var tagRange = sheet.getRange(rowIndex, 7).getValues(); // get values of tags

    if (tagRange != "") {
      var tagValues = JSON.stringify(tagRange[0]); // retrieve array, convert to string 
      const tagString = tagValues.substring(2, tagValues.length - 2) // remove brackets and quotes

      if (tagString.includes(',')) {
        const tags = tagString.split(", ") // returns as array of strings
        linkData['tags'] = tags
      } else {
        linkData['tags'] = tagString
      }
    }

    if (webonly != '') {
      linkData['data']['$web_only'] = webonly;
    }

    if (fallbackUrl != "") {
      linkData['data']['$fallback_url'] = fallbackUrl
    }
    
    if (alias != "") {
      linkData['alias'] = alias;
    }
    
    if (og_title != "") {
      linkData['data']['$og_title'] = og_title;
    }

    if (sectionId != "") {
      linkData['data']['section_id'] = sectionId;
    }

    if (contentId != "") {
      linkData['data']['content_id'] = contentId;
    }
        
  } else {
    ss.toast("Please make sure you've entered your Branch keys from your Account Settings.", "Keys")
    return;
  }

  var params = {
    'method': 'POST',
    'contentType': 'application/json',
    'payload': JSON.stringify(linkData)
  }

  var response = UrlFetchApp.fetch("https://api2.branch.io/v1/url?key=" + branchKey, params);

  // retrieve quick link
  var result = response.getContentText();

  if (result) {
    result = result.split('"')[3];
    var current = sheet.getCurrentCell().getA1Notation()
    ss.toast("Link was created", current)
  }

  return result
}


// ------------------------------------------------------------------------------------------------------------------------------------------------
function addLink() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
  var ss = sheet.getActiveSheet();
  var range = ss.getActiveRange()
  
  if (range.isBlank()) {
    range.setValue(createLink())
    return range;
  } else {
    sheet.toast("A link was already created with this data. If you want to update the link with new data, use Update Link.", range.getA1Notation())
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------
function updateLink() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getActiveSheet()

  // starting row is 3
  var rowIndex = sheet.getCurrentCell().getRowIndex()
  var range = sheet.getRange(rowIndex, 1, 1, 12) // rowIndex, column, numRows, numCols
  var values = range.getValues();

  var keyInfo = sheet.getRange("L1:M1")
  var branchKey = keyInfo.getCell(1, 1).getValue()
  const branchSecret = "secret_key"

  if (branchKey.startsWith("key_live_") && branchSecret) {
    var currentCell = sheet.getCurrentCell().getRowIndex()
    var branchLinks = sheet.getRange("M3:M5000")
    var linkToUpdate = branchLinks.getCell(currentCell-2, 1)
    Logger.log(linkToUpdate.getA1Notation())
    ss.toast(linkToUpdate.getA1Notation())

    if (linkToUpdate.isBlank()) {
      ss.toast("Please select the row for the link that you want to update, or make sure that a Branch link has already been created for this row.", "Error")
      return;
    } else {
      var branchLink = linkToUpdate.getValue()
    }

    var linkData = {
      "branch_key": branchKey,
      "branch_secret": branchSecret,
      "data": {}
    }

    if (values[0]) {
      var campaign = values[0][2]
      var channel = values[0][3]
      var feature = values[0][4]
      var webonly = values[0][5]
      var og_title = values[0][8]

      var sectionId = values[0][9]
      var contentId = values[0][10]

      var linkName = values[0][11]
      var canonicalUrl = values[0][0]
      var fallbackUrl = values[0][1]

      if (campaign && channel && feature && linkName) {
        linkData['campaign'] = campaign;
        linkData['channel'] = channel;
        linkData['feature'] = feature;
        linkData['data']['$marketing_title'] = linkName;
      }

    } else {
      ss.toast("Please make sure you've filled out all of the required columns and selected the row.", "Missing Required Fields")
      return;
    }

    var tagRange = sheet.getRange(rowIndex, 7).getValues(); // get values of tags

    if (tagRange != "") {
      var tagValues = JSON.stringify(tagRange[0]); // retrieve array, convert to string 
      const tagString = tagValues.substring(2, tagValues.length - 2) // remove brackets and quotes

      if (tagString.includes(',')) {
        const tags = tagString.split(", ") // returns as array of strings
        linkData['tags'] = tags
      } else {
        linkData['tags'] = tagString
      }
    }

    if (webonly != '') {
      linkData['data']['$web_only'] = webonly;
    }
    
    if (canonicalUrl != "") {
      linkData['data']['$canonical_url'] = canonicalUrl;
    }
    
    if (fallbackUrl != "") {
      linkData['data']['$fallback_url'] = fallbackUrl
    }
    
    if (og_title != "") {
      linkData['data']['$og_title'] = og_title;
    }

    if (sectionId != "") {
      linkData['data']['section_id'] = sectionId;
    }

    if (contentId != "") {
      linkData['data']['content_id'] = contentId;
    }

  } else {
    ss.toast("Please make sure you've entered your Branch keys from your Account Settings.", "Keys")
    return;
  }

  var params = {
    'method': 'PUT',
    'contentType': 'application/json',
    'payload': JSON.stringify(linkData)
  }

  var response = UrlFetchApp.fetch("https://api2.branch.io/v1/url?url=" + branchLink, params);

  // retrieve quick link
  var result = response.getContentText();

  if (result) {
    result = result.split('"')[3];
    var current = sheet.getCurrentCell().getA1Notation()
    ss.toast("Link was updated", "Updated " + current)
  }

  return result
}


// ------------------------------------------------------------------------------------------------------------------------------------------------
function createBulk() {
  // select active spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName('section/content - bulk generator')
  
  // select range
  var rowLimit = String(sheet.getRange("L2").getValue()+2)

  // select link data
  var range = sheet.getRange("A3:J" + rowLimit)
  var rows = range.getValues()
  
  // target link column
  var linkColumn = sheet.getRange("K3:K" + rowLimit)
  
  for (var arr = 0; arr < rows.length; arr++){
    if (rows[arr][0].length == "" || rows[arr][2] == "" || rows[arr][3] == "" || rows[arr][4] == "" || rows[arr][7] == "") {
      ss.toast("Please fill out all of the required columns, or check that the range you selected includes populated rows.", "Missing required columns")
      return;
		}
	}
  Logger.log(rows)
  
  // returns 2d array of link data
  // convert nested arrays into objects
  var linkDataObj = rows.map(function(x) {
    
    // handle tags 
    var tagValues = x[6]
    if (tagValues.length > 0) {
      if (tagValues.includes(',')) {
          var tags = tagValues.split(", ");
        } else {
          var tags = tagValues;
        }
      }
    
    return {
      type: 2,
      tags: tags,
      campaign: x[2],
      channel: x[3],
      feature: x[4],
      data: {
        $canonical_url: x[0],
        $web_only: x[5],
        $marketing_title: x[9],
        $fallback_url: x[1],
        section_id: x[7],
        content_id: x[8]
      }
    }; 
  });
  
  // when complete, call Branch
  var branchKey = sheet.getRange("J1").getValue()  
  var params = {
    'method' : 'POST',
    'contentType' : 'application/json',
    'payload' : JSON.stringify(linkDataObj)
  }
  
  var response = UrlFetchApp.fetch("https://api2.branch.io/v1/url/bulk/" + branchKey, params);
  
  // retrieve Branch response
  const result = response.getContentText();
  var branchLinks = JSON.parse(result)
  
  // initialize array for each cell 
  var linksArray = []
  
  // retrieve Branch links
  for (var i=0; i < branchLinks.length; i++) {
    branchLinks[i] = JSON.stringify(branchLinks[i])
    branchLinks[i] = branchLinks[i].substr(8,34)
    
    linksArray.push([branchLinks[i]])
  }
  
  ss.toast("Links are being created", range.getA1Notation())
  Logger.log(linksArray)
  // drop into linkColumn
  linkColumn.setValues(linksArray)   
}


