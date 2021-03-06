# Emoji Translate
## About
Using HTML, Javascript, CSS, and the Chrome APIs, you'll write a Chrome Extension that converts text in your browser into Emojis.  All you’ll need to complete this project is a laptop with the Chrome browser and your favorite code editor installed.  You'll come away from this project having gained experience using the aforementioned programming languages, a solid understanding of the anatomy of a Chrome Extension, and perhaps some new favorite Emojis.
## Requirements
* The Chrome browser
  * In order to develop and test an extension, Developer Mode must be turned on (More Tools > Extension > Developer mode).  I advise you to turn on Developer Mode if you're not developing and/or using the extension.  Chrome will also advise you to turn Developer Mode off with a popup in the top right corner of the browser.  
* A code editor.  Any will do, but if you're looking for suggestions:
  * [Sublime Text](https://www.sublimetext.com/) (Mac/Windows/Linux)
  * [Caret](https://chrome.google.com/webstore/detail/caret/fljalecfjciodhpcledpamjachpmelml?hl=en) (Chromebook)
  * [Zed](https://chrome.google.com/webstore/detail/zed-code-editor/pfmjnmeipppmcebplngmhfkleiinphhp?hl=en) (Chromebook)
## Project Tasks
### Task 1: Create a popup
When the extension’s button (located in the top right corner of the browser) is clicked, the html that appears should display your name.
* Resources
  * [Chrome Extensions: Getting Started](https://developer.chrome.com/extensions/getstarted)
  * [Browser Actions](https://developer.chrome.com/extensions/browserAction)

### Task 2: Create a content script
Create a content script that displays your name on the browser page and logs it to the console.  To sandbox our extension, only apply the content script to Wikipedia (“https://en.wikipedia.org/*”).
* Resources
  * [Content Scripts](https://developer.chrome.com/extensions/content_scripts)
* DOM Functions (functions that change the webpage)
  * [getElementsByTagName](https://www.w3schools.com/JSREF/met_document_getelementsbytagname.asp)
  * [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp)
  * [createTextNode](https://www.w3schools.com/jsref/met_document_createtextnode.asp)
  * [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)

### Task 3: Create an event page
Have the event page log your name to the console.
* Resources
  * [Event Pages](https://developer.chrome.com/extensions/event_pages)
* Functions
  * [console.log](https://www.w3schools.com/js/js_output.asp)

### Task 4: Event/Content script communication
Change the content script to request from the event script the current date, and display it via the content script.
* Chrome Functions
  * [chrome.runtime.sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)
  * [chrome.runtime.onMessage.addListener](https://developer.chrome.com/extensions/runtime#event-onMessage)
* Objects
  * [Date](https://www.w3schools.com/jsref/jsref_obj_date.asp)

### Task 5: Heart Emoji
Change the content script to replace all instances of the word ‘heart’ on a webpage with the ascii character for the heart emoji.
* Functions
  * [String.replace](https://www.w3schools.com/jsref/jsref_replace.asp)
* Hints
  * [Find all text nodes on a page](https://gist.github.com/cah-daniel-fischer/51877a2498ee9773b08ced074bc3d2c9)
  * You’ll want to iterate over all the text nodes in the document, and for each, perform the substitution

### Task 8: Fetch emojis from background script
Change the content script to request emojis from the event script; hardcode some text-to-emoji mappings in the event script.
* Objects
  * [Arrays](https://www.w3schools.com/js/js_arrays.asp)
  * [Objects](https://www.w3schools.com/js/js_object_definition.asp)

### Task 9: Context Menu
Create a context menu that can be applied to a selection (highlighted text) and reads “Create Emoji for <selected text>”.
* Resources
  * [Declare Permissions](https://developer.chrome.com/extensions/declare_permissions)
* Chrome Functions
  * [chrome.contextMenus.create](https://developer.chrome.com/extensions/contextMenus#method-create)
  * [chrome.runtime.onInstalled.addListener](https://developer.chrome.com/extensions/runtime#event-onInstalled) (context menu items should be configured on install)
* Hints
  * Important createProperties are id, title and contexts

### Task 10: Context Menu listener
Create a listener for the context menu that displays an alert box to the user.
* Functions
  * [window.alert](https://www.w3schools.com/jsref/met_win_alert.asp)
* Chrome Functions
  * [chrome.contextMenus.onClicked.addListener](https://developer.chrome.com/extensions/contextMenus#event-onClicked)

### Task 11: Create an Emoji-to-text mapping
Change the context menu listener to display a prompt modal.  When the OK button is clicked, the supplied **4 character** string should be converted to a character, and the text-to-emoji mapping should be saved in localstorage.
* Functions
  * [chrome.contextMenus.onClicked.addListener](https://developer.chrome.com/extensions/contextMenus#event-onClicked)
  * [prompt](https://www.w3schools.com/jsref/met_win_prompt.asp)
  * [chrome.storage.local.get](https://developer.chrome.com/extensions/storage#method-StorageArea-get)
  * [chrome.storage.local.set](https://developer.chrome.com/extensions/storage#method-StorageArea-set)
* Hints
  * An important property of the info object is selectionText
  * In order to save a new Emoji, you’ll need to “get” the Emojis currently saved, update them, and “set” them back in local storage
  * [Example usage of local storage set and get](https://gist.github.com/cah-daniel-fischer/ab2703d95bf0fb77803400694f418cd5)
  * [Function for converting an ascii string (“2b50”) into an ascii character (“⭐”)](https://gist.github.com/cah-daniel-fischer/643179e4a122aa1fb1d9fd7027b169db)

### Task 12: Read Emojis from local storage.
Instead of returning hardcoded values to the content script, return the emojis saved in localstorage.
* Chrome Functions
  * [chrome.storage.local.get](https://developer.chrome.com/extensions/storage#method-StorageArea-get)

### Task 13: Display saved Emojis in a table
Change the popup to display the emoji mappings in a table.
* Functions
  * [window.onload](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
* DOM Functions (functions that change HTML)
  * [getElementsByTagName](https://www.w3schools.com/JSREF/met_document_getelementsbytagname.asp) or [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)
  * [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp)
  * [createTextNode](https://www.w3schools.com/jsref/met_document_createtextnode.asp)
  * [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)
* Chrome functions
  * [chrome.runtime.sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)
* HTML
  * [table](https://www.w3schools.com/html/html_tables.asp)
* Hints
  * The gist of this task is you will send a message to the background script to retrieve the emoji data, then dynamically build out the table in the popup using javascript.  All of this will be written inside the window.onload function.

### Task 14: Support 5-character Emojis
Support 5 character ASCII symbols, for example the ambulance Emoji (code 1F691).  Also, if the input to the prompt is not 4 or 5 characters, display an error alert.
* Hints
  * This one’s kinda tough, so I’m just going to give you the function to convert an ASCII string to surrogate pairs 😁: [surrogatePairs](https://gist.github.com/cah-daniel-fischer/58877b25f0e803ef6ee9f3533537321b)

### Task 15: Delete all Emojis
Add a button to the popup that deletes all the emojis.
* Functions
  * [getElementsByTagName](https://www.w3schools.com/JSREF/met_document_getelementsbytagname.asp)
  * [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp)
  * [createTextNode](https://www.w3schools.com/jsref/met_document_createtextnode.asp)
  * [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)
  * [addEventListener](https://www.w3schools.com/jsref/met_element_addeventlistener.asp)
* Chrome Functions
  * [chrome.runtime.sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)
  * [chrome.storage.local.set](https://developer.chrome.com/extensions/storage#method-StorageArea-set)
* HTML
  * [button](https://www.w3schools.com/tags/tag_button.asp)

### Task 16: Delete a single Emoji
Add a button for each Emoji mapping that deletes only that Emoji mapping.
* Functions
  * [splice](https://www.w3schools.com/jsref/jsref_splice.asp)
  * [findIndex](https://www.w3schools.com/jsref/jsref_findindex.asp)
* DOM Functions
  * [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp)
  * [createTextNode](https://www.w3schools.com/jsref/met_document_createtextnode.asp)
  * [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)
  * [addEventListener](https://www.w3schools.com/jsref/met_element_addeventlistener.asp)
* Hints
  * Our message to the background script will now require more than just the request type -- it will also require which emoji we wish to delete
  * [Remove a value from a list](https://gist.github.com/cah-daniel-fischer/a61d8f332ee37d722ea64fb2b171eaed)

### Task 17: Rerender the popup
Update the popup in real time as Emojis are deleted.
* DOM Functions
  * [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)
  * [getElementsByTagName](https://www.w3schools.com/JSREF/met_document_getelementsbytagname.asp)
  * [removeChild](https://www.w3schools.com/jsref/met_node_removechild.asp)
  * [setAttribute](https://www.w3schools.com/jsref/met_element_setattribute.asp)
* Hints
  * [Here’s a function for clearing all the children of an element](https://gist.github.com/cah-daniel-fischer/e219235bf09a6edfec5f4086364fd30b)
  * Consider re-rendering the entire popup on delete rather than removing only the row that was deleted.

### Task 18: No Emojis message
If no Emojis exist, show a message instead of the Delete All button.
* DOM Functions
  * [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)
  * [getElementsByTagName](https://www.w3schools.com/JSREF/met_document_getelementsbytagname.asp)
  * [setAttribute](https://www.w3schools.com/jsref/met_element_setattribute.asp)
  * [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp)
  * [createTextNode](https://www.w3schools.com/jsref/met_document_createtextnode.asp)
  * [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)

### Task 19: Refresh the webpage
Refresh the opened tab when Emojis are created or deleted.
* Resources
  * [Declare Permissions](https://developer.chrome.com/extensions/declare_permissions)
  * [Reloading the current tab](http://stackoverflow.com/questions/32570100/how-to-reload-current-tab-from-within-a-chrome-extension-popup-html#answer-40434371)
* Chrome Functions
  * [chrome.tabs.query](https://developer.chrome.com/extensions/tabs#method-query)
  * [chrome.tabs.reload](https://developer.chrome.com/extensions/tabs#method-reload)
  
### Task 20: Options Page
Create an options page that simply displays your name.
* Resources
  * [Extension Options](https://developer.chrome.com/extensions/options)

### Task 21: Decorate the options page
Change the options menu to have a title, a checkbox for refreshing the current tab when an emoji is created or deleted, and a save button at the bottom.  None of these have to be functional yet.
* HTML
  * [headings](https://www.w3schools.com/tags/tag_hn.asp)
  * [checkbox](https://www.w3schools.com/jsref/dom_obj_checkbox.asp)
  * [button](https://www.w3schools.com/tags/tag_button.asp)

### Task 22: Save preferences to local storage
When the save button is clicked, save the preference to local storage.
* Functions
  * [window.onload](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
* DOM Functions
  * [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)
  * [addEventListener](https://www.w3schools.com/jsref/met_element_addeventlistener.asp)
* Chrome Functions
  * [chrome.runtime.sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)
  * [chrome.storage.local.set](https://developer.chrome.com/extensions/storage#method-StorageArea-set)

### Task 23: Use the preference
When Emojis are created or deleted, refresh the current tab if the preference is enabled.
* Chrome Functions
  * [chrome.storage.local.get](https://developer.chrome.com/extensions/storage#method-StorageArea-get)

### Task 24: Load options page with preference
Modify the options page so that the checkbox is set correctly on page load.  By default, the preference should be enabled.
* Chrome Functions
  * [chrome.runtime.sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)
  * [chrome.storage.local.get](https://developer.chrome.com/extensions/storage#method-StorageArea-get)
  * [chrome.storage.local.set](https://developer.chrome.com/extensions/storage#method-StorageArea-set)

### Task 25: Save Successful message
Add a success message at the bottom of the page when the preferences are successfully saved.  Make it disappear after a few seconds.
* Functions
  * [setTimeout](https://www.w3schools.com/jsref/met_win_settimeout.asp)
  * [className](https://www.w3schools.com/jsref/prop_html_classname.asp) (property)
* DOM Functions
  * [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)
* CSS
  * [visibility](https://www.w3schools.com/cssref/pr_class_visibility.asp)
