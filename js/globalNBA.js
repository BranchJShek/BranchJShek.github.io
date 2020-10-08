// Global Link Creator

var tricodeMap = {"blazers": "POR", "bucks": "MIL", "bulls": "CHI", "cavaliers": "CLE", "celtics": "BOS", "clippers": "LAC", "grizzlies": "MEM", "hawks": "ATL",
      "heat": "MIA", "hornets": "CHA", "jazz": "UTA", "kings": "SAC", "knicks": "NYK", "lakers": "LAL", "nba": "NBA", "magic": "ORL", "mavericks": "DAL", "nets": "BKN", "nuggets": "DEN",
      "pacers": "IND", "pelicans": "NOP", "pistons": "DET", "raptors": "TOR", "rockets": "HOU", "sixers": "PHI", "spurs": "SAS", "suns": "PHX", "thunder": "OKC", "timberwolves": "MIN",
       "warriors": "GSW", "wizards": "WAS"};

       var defaultCanonical = "https://nba.com";
       var domFieldCount = 0;
       var intFieldCount = 0;

      (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode banner closeBanner creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode".split(" "), 0);

      function addField(element) {
        if (element.parentElement.id == "extra_param_panel_body_international") {
          intFieldCount++;
          var fieldCount = intFieldCount;
        } else {
          domFieldCount++;
          var fieldCount = domFieldCount;
        }

        var newField = '<span class="extra-field"><input type="text" id="' + element.parentElement.id + '_key_' + fieldCount + '" class="extra-field-input form-control" value="" placeholder="Key"/><input type="text" id="' + element.parentElement.id + '_value_'+ fieldCount + '" class="extra-field-input form-control" value="" placeholder="Value"/></span>';
        element.parentElement.innerHTML += newField;
      };

      function createLink() {
        //International Key
        branch.init('key_live_ddEpNB63kFwdMG424MWxhbmirAlMX5V0');

        var tags = document.querySelectorAll('[name=tags]')
        var extraTags = document.querySelectorAll('[name=extraTags]')
        var boxes = document.querySelectorAll('[name=box]')

        function addTags(linkData) {
          for (i = 0; i < tags.length; i++) {
            if (boxes[i].checked == true) 
            {
              linkData["tags"].push(tags[i].textContent);  
            }
          }

          for (var i = 0; i < extraTags.length; i++) {
            if (extraTags[i].value !== "" || extraTags[i].value !== undefined) {
              linkData["tags"].push(extraTags[i].value); 
            }
          }

          // remove empty tags
          linkData["tags"] = linkData["tags"].filter(el => {
            return el != null && el != '';
          });

          return linkData;

        };

        function removeEmptyFields(linkData) {
          var keys = Object.keys(linkData.data);
          var values = Object.values(linkData.data);

          // if no values entered, remove key 
          for (var k = 0; k < keys.length; k++) {
            if (values[k] == "")
            {
              delete linkData.data[keys[k]];
            }
          }

          return linkData;
        };

        var marketingTitle = document.getElementById('marketing_title').value;
        var teamName = document.getElementById('team_name_selector').value;
        var linkAlias = document.getElementById('alias').value;
        var postDate = document.getElementById('date').value;
        var fallbackInternationalWeb = document.getElementById('fallback_international_web').value;
        var fallbackInternationalIos = document.getElementById('fallback_international_ios').value;
        var fallbackInternationalAndroid = document.getElementById('fallback_international_android').value;
        var intFallback = document.getElementById('int_fallback').value;
        var domFallbackUS = document.getElementById('dom_fallback_us').value;
        var domDesktopWeb = document.getElementById('desktop_domestic_web').value;
        var domIOSWeb = document.getElementById('ios_domestic_web').value;
        var domAndroidWeb = document.getElementById('android_domestic_web').value;
        var channel = document.getElementById('channel').value;
        var deeplinkValue = document.getElementById('deeplink_value').value;
        var sectionId = document.getElementById('section_id').value;
        var contentId = document.getElementById('content_id').value;
        var webonly = document.getElementById('webonly').value;

        var ogTitle = document.getElementById('og_title').value;
        var ogDescription = document.getElementById('og_description').value;
        var ogImage = document.getElementById('og_image').value;
        var ogUrl = document.getElementById('og_url').value;
        var ogVideo = document.getElementById('og_video').value;
        var ogType = document.getElementById('og_type').value;
        var campaign = document.getElementById('campaign').value;
        var content = document.getElementById('content_selector').value;
        var media = document.getElementById('media_selector').value;
        var time = document.getElementById('time_selector').value;
        var hashtags = document.getElementById('hashtags').value;
        var player = document.getElementById('playerName').value;

        if ( (intFallback == null || intFallback == "") & tricodeMap[teamName] != "nba") {
          intFallback = "https://www.nba.com/" + teamName.toLowerCase() + "/leaguepass/pricing";
        }

        var internationalLinkData = {
          type: 2,
          tags: [],
          channel: channel,
          campaign: campaign,
          data: {
          "section_id": sectionId,
          "content_id": contentId,
          "$marketing_title": marketingTitle,
          "content": content,
          "media": media,
          "hashtags": hashtags,
          "player_name": player,
          "team_campaign": campaign
          }
        };

        addTags(internationalLinkData);
        
        for (var i = 1; i <= intFieldCount; i++) {
          var key = document.getElementById('extra_param_panel_body_international_key_' + i).value;
          var value = document.getElementById('extra_param_panel_body_international_value_' + i).value;
          if (key != null && key != "" && value != null) { // allowing for an empty value, but not an empty key
            console.log('int key: ' + key);
            console.log('int value: ' + value);
            internationalLinkData.data[key] = value;
          }
        }

        if (intFallback !== null && intFallback !== "") {
          internationalLinkData.data["$fallback_url"] = intFallback;
          internationalLinkData.data["$canonical_url"] = intFallback;
        } else if (fallbackInternationalWeb !== null && fallbackInternationalWeb !== "") {
          internationalLinkData.data["$desktop_url"] = fallbackInternationalWeb;
          internationalLinkData.data["$canonical_url"] = fallbackInternationalWeb;
        } else {
          internationalLinkData.data["$canonical_url"] = defaultCanonical;
        }

        if (fallbackInternationalIos !== null && fallbackInternationalIos !== "") {
          internationalLinkData.data["$ios_url"] = fallbackInternationalIos;
        }

        if (fallbackInternationalAndroid !== null && fallbackInternationalAndroid !== "") {
          internationalLinkData.data["$android_url"] = fallbackInternationalAndroid;
        }

        if (webonly !== "") { internationalLinkData.data["$web_only"] = true };

        removeEmptyFields(internationalLinkData);

        // Create International Link
        branch.link(internationalLinkData, function(err, internationalLink) {

          console.log(internationalLink);
          document.getElementById('intl_url').value = internationalLink;

          // Create Domestic Link
          if (err == null) {
            // Domestic Key
            branch.init('key_live_fgFkpjXwHs405M7eQv9fpbjkBEidTTkL');

            var domesticLinkData = {
                type: 2,
                tags: [],
                channel: channel,
                campaign: campaign,
                data: {
                "$fallback_url": internationalLink,
                "$fallback_url_us": domFallbackUS,
                "deeplink": deeplinkValue,
                "$marketing_title": marketingTitle,
                "post_date": postDate,
                "content": content,
                "media": media,
                "hashtags": hashtags,
                "player_name": player,
                "team_campaign": campaign
                }
            };

            addTags(domesticLinkData);

            if (teamName !== "") { domesticLinkData.data["tricode"] = tricodeMap[teamName]};
            if (linkAlias !== "") {domesticLinkData["alias"] = linkAlias};
            if (webonly !== "") { domesticLinkData.data["$web_only"] = true };

            if (ogTitle != null && ogTitle != "") { domesticLinkData.data["$og_title"] = ogTitle }
            if (ogDescription != null && ogDescription != "") { domesticLinkData.data["$og_description"] = ogDescription }
            if (ogImage != null && ogImage != "") { domesticLinkData.data["$og_image_url"] = ogImage }
            if (ogUrl != null && ogUrl != "") { domesticLinkData.data["$og_url"] = ogUrl }
            if (ogType != null && ogType != "") { domesticLinkData.data["$og_type"] = ogType }
            if (ogVideo != null && ogVideo != "") { domesticLinkData.data["$og_video"] = ogVideo }

            var j;
            for (j = 1; j <= domFieldCount; j++) {
              var key = document.getElementById('extra_param_panel_body_domestic_key_' + j).value;
              var value = document.getElementById('extra_param_panel_body_domestic_value_' + j).value;
              if (key != null && key != "" && value != null) { // allowing for an empty value, but not an empty key
                console.log('dom key: ' + key);
                console.log('dom value: ' + value);
                domesticLinkData.data[key] = value;
              }
            }

            if (domFallbackUS != null && domFallbackUS !== "") {
              domesticLinkData.data["$fallback_url_us"] = domFallbackUS;
              domesticLinkData.data["$canonical_url"] = domFallbackUS;
            } else if (domDesktopWeb !== null && domDesktopWeb !== "") {
              domesticLinkData.data["$desktop_url"] = domDesktopWeb;
              domesticLinkData.data["$canonical_url"] = domDesktopWeb;
            } else {
              domesticLinkData.data["$canonical_url"] = defaultCanonical;
            }

            if (domIOSWeb !== null && domIOSWeb !== "") {
              domesticLinkData.data["$ios_url"] = domIOSWeb;
            }

            if (domAndroidWeb !== null && domAndroidWeb !== "") {
              domesticLinkData.data["$android_url"] = domAndroidWeb;
            }

            removeEmptyFields(domesticLinkData) 

            // Create Domestic Link
            branch.link(domesticLinkData, function(err, domesticLink) {
              if (err == null) {
                document.getElementById('final_url').value = domesticLink;
              }
              else {
                console.log(err, domesticLink);
                document.getElementById('final_url').value = err;
              }
            });
          }
          else {
            console.log(err, internationalLink);
            document.getElementById('final_url').value = err;
          }
        })
    };