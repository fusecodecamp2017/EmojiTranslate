# Emoji Translate
## About
Using HTML, Javascript, CSS, and the Chrome APIs, you'll write a Chrome Extension that converts text in your browser into Emojis.  All you’ll need to complete this project is a laptop with the Chrome browser and your favorite code editor installed.  You'll come away from this project having gained experience using the aforementioned programming languages, a solid understanding of the anatomy of a Chrome Extension, and perhaps some new favorite Emojis.
## Requirements
* The Chrome browser
* A code editor
## Project Tasks
### Task 1: Create a popup
When the extension’s button (located in the top right corner of the browser) is clicked, the html that appears should display your name.
* [Chrome Extensions: Getting Started](https://developer.chrome.com/extensions/getstarted)
* [Browser Actions](https://developer.chrome.com/extensions/browserAction)

### Task 2: Create a content script
Create a content script that displays your name on the browser page and logs it to the console.
* Helpful Resources
  * [Content Scripts](https://developer.chrome.com/extensions/content_scripts)
* JS DOM Functions (functions that change the webpage)
  * [getElementsByTagName](https://www.w3schools.com/JSREF/met_document_getelementsbytagname.asp)
  * [createElement](https://www.w3schools.com/jsref/met_document_createelement.asp)
  * [createTextNode](https://www.w3schools.com/jsref/met_document_createtextnode.asp)
  * [appendChild](https://www.w3schools.com/jsref/met_node_appendchild.asp)

### Task 3: Create an event page
Have the event page log your name to the console.
* Helpful Resources
  * [Event Pages](https://developer.chrome.com/extensions/event_pages)
* JS Functions
  * [console.log](https://www.w3schools.com/js/js_output.asp)

### Task 4: Event/Content script communication
Change the content script to request from the event script the current date, and display it via the content script.
* Functions
  * [chrome.runtime.sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)
  * [chrome.runtime.onMessage.addListener](https://developer.chrome.com/extensions/runtime#event-onMessage)
* JS Objects
  * [Date](https://www.w3schools.com/jsref/jsref_obj_date.asp)

### Task 5: Heart Emoji
Change the content script to replace all instances of the word ‘heart’ on a webpage with the ascii character for the heart emoji.
* Helpful Hints and Resources
  * [Find all text nodes on a page](https://gist.github.com/cah-daniel-fischer/51877a2498ee9773b08ced074bc3d2c9)
  * You’ll want to iterate over all the text nodes in the document, and for each, perform the substitution
* JS Functions
  * [String.replace](https://www.w3schools.com/jsref/jsref_replace.asp)

### Task 6: Incorporate Twemoji
Change the content script to use twemoji to replace ascii Emojis with images.
* Hints and Resources
  * To use Twemoji, download this file, copy it into your project and list it as a content script
  * twemoji.parse(document.body)

### Task 7: Size Emojis
Size the emojis relative to surrounding text.

### Task 8: Fetch emojis from background script
Change the content script to request emojis from the event script; hardcode some text-to-emoji mappings in the event script.

### Task 9: Context Menu
Create a context menu that can be applied to a selection (highlighted text) and reads “Create Emoji for <selected text>”.

### Task 10: Context Menu listener
Create a listener for the context menu that displays an alert box to the user.

### Task 11: Create an Emoji-to-text mapping
Change the context menu listener to display a prompt modal.  When the OK button is clicked, the supplied 4 character string should be converted to a character, and the text-to-emoji mapping should be saved in localstorage.

### Task 12: Read Emojis from local storage.
Instead of returning hardcoded values to the content script, return the emojis saved in localstorage.

### Task 13: Display saved Emojis in a table
Change the popup to display the emoji mappings in a table.

### Task 14: Support 5-character Emojis
Support 5 character ASCII symbols, for example the ambulance Emoji (code 1F691).

### Task 15: Delete all Emojis
Add a button to the popup that deletes all the emojis.

### Task 16: Delete a single Emoji
Add a button for each Emoji mapping that deletes only that Emoji mapping.

### Task 17: Rerender the popup
Update the popup in real time as Emojis are deleted.

### Task 18: No Emojis message
If no Emojis exist, show a message instead of the Delete All button.

### Task 19: Refresh the webpage
Refresh the opened tab when Emojis are created or deleted.

### Task 20: Options Page
Create an options page that simply displays your name.

### Task 21: Decorate the options page
Change the options menu to have a title, a checkbox for refreshing the current tab when an emoji is created or deleted, and a save button at the bottom.  None of these have to be functional yet.

### Task 22: Save preferences to local storage
When the save button is clicked, save the preference to local storage.

### Task 23: Use the preference
When Emojis are created or deleted, refresh the current tab if the preference is enabled.

### Task 24: Load options page with preference
Modify the options page so that the checkbox is set correctly on page load.  By default, the preference should be enabled.

### Task 25: Save Successful message
Add a success message at the bottom of the page when the preferences are successfully saved.  Make it disappear after a few seconds.
