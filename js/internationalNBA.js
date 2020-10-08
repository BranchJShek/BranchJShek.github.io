// International NBA Link Creator

var tricodeMap = {"blazers": "POR", "bucks": "MIL", "bulls": "CHI", "cavaliers": "CLE", "celtics": "BOS", "clippers": "LAC", "grizzlies": "MEM", "hawks": "ATL",
      "heat": "MIA", "hornets": "CHA", "jazz": "UTA", "kings": "SAC", "knicks": "NYK", "lakers": "LAL", "magic": "ORL", "mavericks": "DAL", "nba": "NBA", "nets": "BKN", "nuggets": "DEN",
      "pacers": "IND", "pelicans": "NOP", "pistons": "DET", "raptors": "TOR", "rockets": "HOU", "sixers": "PHI", "spurs": "SAS", "suns": "PHX", "thunder": "OKC", "timberwolves": "MIN",
      "warriors": "GSW", "wizards": "WAS"};

    var domFieldCount = 0;

    function addField(element) {
      if (element.parentElement.id == "extra_param_panel_body_dom") {
        domFieldCount++;
        var fieldCount = domFieldCount;
      }

      var newField = '<span class="extra-field"><input type="text" id="' + element.parentElement.id + '_key_' + fieldCount + '" class="extra-field-input form-control" value="" placeholder="Key"/><input type="text" id="' + element.parentElement.id + '_value_'+ fieldCount + '" class="extra-field-input form-control" value="" placeholder="Value"/></span>';
      element.parentElement.innerHTML += newField;
    }

    function createLink() {
      // International Key
      branch.init('key_live_ddEpNB63kFwdMG424MWxhbmirAlMX5V0'); 

      // Basic Setup
      var marketingTitle = document.getElementById('marketing_title').value;
      var campaign = document.getElementById('campaign').value;
      var channel = document.getElementById('channel').value;
      var feature = document.getElementById('feature').value;
      var stage = document.getElementById('stage').value;
      var linkAlias = document.getElementById('alias').value;
      var webonly = document.getElementById('webonly').value;

      // Link Routing
      var canonicalURL = document.getElementById('canonicalURL').value;
      var fallback = document.getElementById('fallback').value;
      var content = document.getElementById('content_selector').value;

      // Additional Fields
      var teamName = document.getElementById('team_name_selector').value;
      var media = document.getElementById('media_selector').value;
      var time = document.getElementById('time_selector').value;
      var postDate = document.getElementById('date').value;
      var player = document.getElementById('playerName').value;

      // Social Media
      var ogTitle = document.getElementById('$og_title');
      var ogDescription = document.getElementById('$og_description');
      var ogImage = document.getElementById('$og_image');
      var ogUrl = document.getElementById('$og_url');
      var ogVideo = document.getElementById('$og_video');
      var ogType = document.getElementById('$og_type');

      var ogTagArray = [ogTitle, ogDescription, ogImage, ogUrl, ogVideo, ogType]

      var routingUrl = "";

      if (canonicalURL == "" || canonicalURL == null) {
         routingUrl = "https://watch.nba.com/packages";
      } else {
         routingUrl = canonicalURL;
      };

      var domLinkData = {
        tags: [],
        alias: linkAlias,
        "data": {
          "$marketing_title": marketingTitle,
          "$canonical_url": routingUrl,
          "$fallback_url": fallback,
          "~campaign": campaign,
          "~channel": channel,
          "~feature": feature,
          "~stage": stage,
          "team": teamName,
          "media": media,
          "time": time,
          "date": postDate,
          "player": player,
          "$web_only": webonly
        }
      };

      function removeEmptyFields() {
        var keys = Object.keys(domLinkData.data);
        var values = Object.values(domLinkData.data);

        // if no values entered, remove key 
        for (k = 0; k < keys.length; k++)
        {
          if (values[k] == "")
          {
            delete domLinkData.data[keys[k]];
          }
        }
        return domLinkData;
      };

      removeEmptyFields();

      // Tags 
      var tag1 = document.getElementById('NBATag').textContent;
      var tag2 = document.getElementById('asTag').textContent;
      var tag3 = document.getElementById('asdTag').textContent;
      var tag4 = document.getElementById('appdownloadTag').textContent;
      var tag5 = document.getElementById('bfTag').textContent;
      var tag6 = document.getElementById('domesticTag').textContent;
      var tag7 = document.getElementById('emailTag').textContent;
      var tag8 = document.getElementById('facebookTag').textContent;
      var tag9 = document.getElementById('finalsTag').textContent;
      var tag10 = document.getElementById('hfTag').textContent;
      var tag11 = document.getElementById('ilbTag').textContent;
      var tag12 = document.getElementById('instagrambioTag').textContent;
      var tag13 = document.getElementById('instagramstoriesTag').textContent;
      var tag14 = document.getElementById('internationalTag').textContent;
      var tag15 = document.getElementById('leaguepassTag').textContent;
      var tag16 = document.getElementById('marketingTag').textContent;
      var tag17 = document.getElementById('msfTag').textContent;
      var tag18 = document.getElementById('nbadraftTag').textContent;
      var tag19 = document.getElementById('onsaleTag').textContent;
      var tag20 = document.getElementById('organicsocialTag').textContent;
      var tag21 = document.getElementById('paidsocialTag').textContent;
      var tag22 = document.getElementById('playoffsTag').textContent;
      var tag23 = document.getElementById('preseasonTag').textContent;
      var tag24 = document.getElementById('rttpTag').textContent;
      var tag25 = document.getElementById('regionsTag').textContent;
      var tag26 = document.getElementById('restartTag').textContent;
      var tag27 = document.getElementById('schedulereleaseTag').textContent;
      var tag28 = document.getElementById('socialownedTag').textContent;
      var tag29 = document.getElementById('sosTag').textContent;
      var tag30 = document.getElementById('triviaTag').textContent;
      var tag31 = document.getElementById('twitterTag').textContent;

      // Checkboxes 
      var box1 = document.getElementById('box1');
      var box2 = document.getElementById('box2');
      var box3 = document.getElementById('box3');
      var box4 = document.getElementById('box4');
      var box5 = document.getElementById('box5');
      var box6 = document.getElementById('box6');
      var box7 = document.getElementById('box7');
      var box8 = document.getElementById('box8');
      var box9 = document.getElementById('box9');
      var box10 = document.getElementById('box10');
      var box11 = document.getElementById('box11');
      var box12 = document.getElementById('box12');
      var box13 = document.getElementById('box13');
      var box14 = document.getElementById('box14');
      var box15 = document.getElementById('box15');
      var box16 = document.getElementById('box16');
      var box17 = document.getElementById('box17');
      var box18 = document.getElementById('box18');
      var box19 = document.getElementById('box19');
      var box20 = document.getElementById('box20');
      var box21 = document.getElementById('box21');
      var box22 = document.getElementById('box22');
      var box23 = document.getElementById('box23');
      var box24 = document.getElementById('box24');
      var box25 = document.getElementById('box25');
      var box26 = document.getElementById('box26');
      var box27 = document.getElementById('box27');
      var box28 = document.getElementById('box28');
      var box29 = document.getElementById('box29');
      var box30 = document.getElementById('box30');
      var box31 = document.getElementById('box31');

      var tagsArray = [tag1, tag2, tag3, tag4, tag5, 
                      tag6, tag7, tag8, tag9, tag10, 
                      tag11, tag12, tag13, tag14, tag15, 
                      tag16, tag17, tag18, tag19, tag20,
                      tag21, tag22, tag23, tag24, tag25,
                      tag26, tag27, tag28, tag29, tag30,
                      tag31]

      var checkboxArray = [box1, box2, box3, box4, box5, 
                          box6, box7, box8, box9, box10, box11, 
                          box12, box13, box14, box15, box16,
                          box17, box18, box19, box20, box21,
                          box22, box23, box24, box25, box26,
                          box27, box28, box29, box30, box31]

      function addTags() {
        for (i = 0; i < tagsArray.length; i++) 
        {
          if (checkboxArray[i].checked == true) 
          {
            domLinkData["tags"].push(tagsArray[i]);  
          }
        }
        return domLinkData;
      };

      function addOGTags() {
        for (i = 0; i < ogTagArray.length; i++)
        {
          if (ogTagArray[i].value != undefined || ogTagArray[i].value != "" || ogTagArray[i].value != null)
          {
            domLinkData.data[ogTagArray[i].id] = ogTagArray[i].value;
          }
        }
        return domLinkData;
      };

      for (var i = 1; i <= domFieldCount; i++) {
        var key = document.getElementById('extra_param_panel_body_dom_key_' + i).value;
        var value = document.getElementById('extra_param_panel_body_dom_value_' + i).value;
        if (key != null && key != "" && value != null) { // allowing for an empty value, but not an empty key
          console.log('int key: ' + key);
          console.log('int value: ' + value);
          domLinkData.data[key] = value;
        }
      }
      
      addTags();
      addOGTags();

      console.log(domLinkData);

      // Create Dom Link
      branch.link(domLinkData, function(err, domLink) {
        if (err == null) {
          document.getElementById('final_url').value = domLink;
          console.log(domLink)
        }
        else {
          console.log(err, domLink);
          document.getElementById('final_url').value = err;
        }
      });

    };