(function buddy() {

  var pageData = {};
  
  // Say something when you're turned on for the first time
  function init() {
    speak("Hey there David. I am he as you are he as you are me.And we are all together. See how they run like pigs from a gun see how they fly.I'm crying. How is it going? Boy you been a naughty girl, you let your knickers down I am the eggman, they are the eggmen I am the walrus, goo goo g' joob")
    bindOtherFunctions();
    listenToMessages();
  }

  // Listen for commands bubbling up!
  function listenToMessages() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

      if( request.type ) {

        // A page is loaded!
        if(request.type === "pageLoad") {
          initPage(request.url);
        }

        // Something said speak!
        if(request.type === "speak") {
          speak(request.words);
        }
      }
    });
  }

  // Do things that you can only do in the outer shell here
  function bindOtherFunctions() {

    // When a tab is open?
    chrome.tabs.onCreated.addListener(function(tabId, changeInfo, tab) {         
       console.log('new tab created');
      chrome.tabs.query({}, function(tabs) {

        // If there are more than 10 tabs!
        if( tabs.length > 10 ) {
          // Do something erratic!
        }
      })
    })
  }

  init();
})();
