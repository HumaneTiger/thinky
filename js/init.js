import Props from './props.js'
import Ui from './ui.js'
import Desk from './desk.js'
import Persons from './persons.js'
import Places from './places.js'
import EndDay from './end-day.js'
import Assistants from './assistants.js'

let preloadList = [
  '/desk/letter-blank.png', '/desk/letter-intro.png', '/desk/letter-temp.png', '/desk/surface.jpg', 
  '/ui/button-1.png', '/ui/button-2.png', '/ui/button-3.png', '/ui/button-1-ns.png', '/ui/button-2-ns.png', '/ui/button-3-ns.png'
]

{
  let preloadImages = function() {
    let images = [];
    for (const img in preloadList) {
      images[img] = new Image();
      images[img].src = '../img' + preloadList[img];
    };
  }
  
  Props.init();
  Ui.init();
  Desk.init();
  Persons.init();
  Places.init();
  Assistants.init();
  EndDay.init();
  preloadImages();
}
