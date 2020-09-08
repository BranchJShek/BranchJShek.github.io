(function (b, r, a, n, c, h, _, s, d, k) {
  if (!b[n] || !b[n]._q) {
    for (; s < _.length; ) c(h, _[s++]);
    d = r.createElement(a);
    d.async = 1;
    d.src = "https://cdn.branch.io/branch-latest.min.js";
    k = r.getElementsByTagName(a)[0];
    k.parentNode.insertBefore(d, k);
    b[n] = h;
  }
})(
  window,
  document,
  "script",
  "branch",
  function (b, r) {
    b[r] = function () {
      b._q.push([r, arguments]);
    };
  },
  { _q: [], _v: 1 },
  "addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking getBrowserFingerprintId".split(
    " "
  ),
  0
);

// .init call to launch banner
branch.init(
  "key_live_boOy006UfmG8sSdAqwNcYmmftyeYrJpc",
  branch.setIdentity("test123"),
  {
    metadata: {
      jon: "shek",
      page: "index",
      $utm_content: "content",
      $utm_term: "term",
    },
  }
);

// log commerce event to see if revenue metadata shows for non-Purchase event
var commerceData = {
  transaction_id: "trans_id_123",
  currency: "USD",
  revenue: 180.2,
  shipping: 10.5,
  tax: 13.5,
  description:
    "Logging commerce event to see if revenue metadata shows for non-Purchase event",
  purchase_loc: "Palo Alto",
  store_pickup: "unavailable",
};

function revenueTrack() {
  branch.logEvent("INITIATE_PURCHASE"),
    commerceData,
    function (err) {
      console.log(err);
    };
  console.log("Event Tracked");
}

function identityCheck() {
  const testId = "abc123";
  branch.setIdentity(testId);
  document.getElementById("setIdentity").innerText = testId;
  branch.logEvent("pageview", { id: testId });
}

// Branch listener object that retrieves banner link data and prints it to console
var listener = function (event, data) {
  console.log(event + " fired at " + Math.floor(Date.now() / 1000));
  console.log(data);
};

// Listener objects are activated in the Branch instance for specific events via .addListener
branch.addListener("willShowJourney", listener);
branch.addListener("didShowJourney", listener);
branch.addListener("willNotShowJourney", listener);
branch.addListener("didClickJourneyCTA", listener);
branch.addListener("didClickJourneyClose", listener);
branch.addListener("willCloseJourney", listener);
branch.addListener("didCloseJourney", listener);
branch.addListener("didCallJourneyClose", listener);

// function to manually launch journey and change banner link data (will NOT launch if banner's dismissal period active)
function launchBranchJourney() {
  var linkData = {
    campaign: "campaign cannot be changed",
    feature: "feature cannot be changed",
    channel: "channel was changed by javascript",
    stage: "stage was changed by javascript",
    tags: ["tag was changed by javascript"],
    data: {
      custom_bool: true,
      "custom_int (todays date)": Date.now(),
      "custom_string (url)": window.location.href,
      $journeys_icon_image_url:
        "https://www.valorebooks.com/campus-life/wp-content/uploads/icon_340.png",
      $journeys_button_get_no_app: "changed!",
      $journeys_button_get_has_app: "changed!",
      $journeys_description: "Description reset by button click",
    },
  };
  branch.setBranchViewData(linkData);
  //function to launch journey with flags to disable banner animations
  branch.track(
    "pageview",
    {},
    { disable_entry_animation: true, disable_exit_animation: true }
  );
}

//function to check if a banner is displaying
function doesJourneyExistOnPage() {
  var elem = document.getElementById("branch-banner-iframe");
  if (elem) {
    return true;
  }
  return false;
}

// function for button to close journey (will NOT activate template's dismissal period)
function closeBranchJourney() {
  if (doesJourneyExistOnPage()) {
    //this is the call that closes the journey, with flags that disable the banner animations
    console.log("closeBranchJourney called");
    branch.closeJourney(function (err) {});
  } else {
    console.log("No Banner on the page");
  }
}

// function to test deepview function
function dataCallback() {
  console.log(".data() called");
  branch.data(function (err, data) {
    console.log(data);
  });
}
