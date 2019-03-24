'use strict';

const {
    dialogflow,
  	RegisterUpdate,
    BasicCard,
    BrowseCarousel,
    BrowseCarouselItem,
    Button,
    Permission,
    Carousel,
    Image,
    LinkOutSuggestion,
    List,
    MediaObject,
    Suggestions,
    SimpleResponse,
    Table
} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: true});


app.intent('Without slot filling', (conv) => {
    conv.ask('Without slot filling example.!');
  	var datetime = new Date();
    conv.ask('The time is '+ datetime);
});

app.intent('With slot filling', (conv,{slot1,slot2}) => {
    var got_slot1=slot1.length > 0;
  	var got_slot2=slot2.length > 0;

  	if(!got_slot1 && !got_slot2){
    	conv.ask("Please provide slot 1 value");
    }else if(got_slot1 && !got_slot2){
    	conv.ask("Please provide slot 2 value");
    }else{
    	conv.ask(`Thanks for providing ${slot1} ${slot2}`);
    }

});

app.intent('Audio Intent',(conv)=>{
	 conv.ask('<speak> Connected to police.<audio src="https://s3-us-west-2.amazonaws.com/wss18/police-walkie-talkie-radio.ogg"></audio></speak>');
});

app.intent('Suggestion Chips Intent',(conv)=>{
  	conv.ask('Here are your suggestion.!');
	conv.ask(new Suggestions(['suggestion 1', 'suggestion 2']));
});

app.intent('Basic Card Intent',(conv)=>{

  	conv.ask('Here is your Basic Card');
	conv.ask(new BasicCard({
    text: `This is a basic card.  Text in a basic card can include "quotes" and
    most other unicode characters including emoji 📱.  Basic cards also support
    some markdown formatting like *emphasis* or _italics_, **strong** or
    __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
    things like line  \nbreaks`, // Note the two spaces before '\n' required for
                                 // a line break to be rendered in the card.
    subtitle: 'This is a subtitle',
    title: 'Title: this is a title',
    buttons: new Button({
      title: 'This is a button',
      url: 'https://assistant.google.com/',
    }),
    image: new Image({
      url: 'https://image.flaticon.com/icons/svg/326/326933.svg',
      alt: 'Image alternate text',
    }),
    display: 'CROPPED',
  }));
});


app.intent('Browse Carousel Intent',(conv)=>{
    conv.ask('Browse Carousel Intent');
	conv.ask(new BrowseCarousel({
    items: [
      new BrowseCarouselItem({
        title: 'Title of item 1',
        url: 'https://google.com',
        description: 'Description of item 1',
        image: new Image({
          url: 'https://image.flaticon.com/icons/svg/326/326933.svg',
          alt: 'Image alternate text',
        }),
        footer: 'Item 1 footer',
      }),
      new BrowseCarouselItem({
        title: 'Google Assistant',
        url: 'https://google.com',
        description: 'Google Assistant on Android and iOS',
        image: new Image({
          url: 'https://image.flaticon.com/icons/svg/326/326933.svg',
          alt: 'Image alternate text',
        }),
        footer: 'More information about the Google Assistant',
      }),
    ],
  }));
});

app.intent('Store Data Intent',(conv)=>{
  	conv.user.storage.time=new Date();
  	conv.ask('Current Time was stored.');
});

app.intent('Retrieve Data Intent',(conv)=>{
	conv.ask('Stored Value was'+conv.user.storage.time);
});

app.intent('Permission demo intent', (conv) => {
    conv.ask(new Permission({
    	context: 'Hi there, to get to know you better',
    	permissions: 'NAME'
  	}));
});

app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    conv.ask(`Ok, no worries.`);

  } else {
    conv.data.userName = conv.user.name.display;
    conv.ask(`Thanks, ${conv.data.userName}.`);

  }
});

app.intent('Default Welcome Intent', (conv) => {
    conv.ask("NAMASTE");
});



exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
