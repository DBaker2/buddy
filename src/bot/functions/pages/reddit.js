function page() {

  var stats;

  this.init = function( settings ) {
    'use strict';
    var stylee = document.createElement('style');
    stylee.innerHTML = `.letter {
  -webkit-transition: 0.6s cubic-bezier(0.17, 0.67, 0.82, 1.16);
  transition: 0.6s cubic-bezier(0.17, 0.67, 0.82, 1.16);
}

.bomb {
  z-index: 100;
  position: absolute;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 24px;
  padding-top: 5px;
  background-color: #222;
  border-radius: 20px;
  text-align: center;
}
`;
document.body.appendChild(stylee);
var letters, letterNodes, count;
var MAG = 2000;
// document.addEventListener('DOMContentLoaded', function (event) {
//   console.log('DOM LOADED')
    var container = document.querySelectorAll('p');
    container.forEach(function (section) { 
    letters = section.innerText.split('');
    var str = '';
    letters.forEach(function (letter) {
        str += '<span class="letter">' + letter + '</span>';
    });
    section.innerHTML = str;
    letterNodes = document.querySelectorAll('.letter');
    setTimeout(function () {
        letterNodes.forEach(function (node) {
            var boundingRect = node.getBoundingClientRect();
            node.style.left = boundingRect.left + 'px';
            node.style.top = boundingRect.top + 'px';
        });
        setTimeout(function () {
            letterNodes.forEach(function (node) {
                node.style.position = 'absolute';
            });
        }, 1);
    }, 1);
  });
document.addEventListener('mousedown', function (evt) {
    var bombx = evt.pageX;
    var bomby = evt.pageY;
    count = 1;
    var bombEl = document.createElement('div');
    bombEl.className = 'bomb';
    bombEl.innerHTML = '3';
    bombEl.style.left = bombx - 20 + 'px';
    bombEl.style.top = bomby - 20 + 'px';
    document.body.appendChild(bombEl);
    setTimeout(function () {
        bombEl.innerHTML = 2;
        setTimeout(function () {
            bombEl.innerHTML = 1;
            setTimeout(function () {
                bombEl.style.display = 'none';
                shockwave(bombx, bomby);
            }, 1000);
        }, 1000);
    }, 1000);
});
function shockwave(bombx, bomby) {
    MAG = 2000 + Math.random() * 10000;
    letterNodes.forEach(function (letter) {
        var letterx = Number(/\d*/.exec(letter.style.left));
        var lettery = Number(/\d*/.exec(letter.style.top));
        var dx = (bombx - letterx) * (bombx - letterx);
        var dy = (bomby - lettery) * (bomby - lettery);
        var dist = Math.sqrt((bombx - letterx) * (bombx - letterx) + (bomby - lettery) * (bomby - lettery));
        var dir = [
            letterx - bombx,
            lettery - bomby
        ];
        var newx = letterx + Math.random() * 2 - 1 + MAG * dir[0] / (dist * dist);
        var newy = lettery + Math.random() * 2 - 1 + MAG * dir[1] / (dist * dist);
        if (dist <= 400 + Math.random() * 100) {
            letter.style.top = newy + 'px';
            letter.style.left = newx + 'px';
        }
    });
}

    stats = settings;

    // First time visiting this site?
    if( !stats.opened )  {
      
      speak("REDDIT ISN'T WORK");

    } else {

      // 2 reddit tabs open?
      if( stats.similar === 2 ) {
        speak("Twice the reddit, twice the fun!");

      // 3 reddit tabs open
      } else if (stats.similar === 3) {
        speak("Seriously, get back to work");

      // Back on reddit, after being on it once.
      } else {
        speak("Back at it again, I see!");
      }
    }
  }
}