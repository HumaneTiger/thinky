let allAudio = document.getElementById("all-audio");
let ambientIndex = 1;
let ambientTimes = [60, 110, 145, 145];
let ambientDelay = 10;

export default {

    init: function() {
        //this.playAmbientLoop();
    },

    playAmbientLoop: function() {
      this.music('ambient-1', 0, 0.2);
      window.setTimeout(() => {
        this.playAmbientLoop();
      }, 150000);
    },

    music: function(name, delay, vol) {

        window.setTimeout(function() {

            let audio = allAudio.querySelector('.music-' + name);
            let volume = vol || 0.2;

            audio.volume = volume;
            
            audio.play().catch(() => {});

        }.bind(this), delay || 0);

    },

    voice: function(name, delay, vol) {

        window.setTimeout(function() {

            let audio = allAudio.querySelector('.voice-' + name);
            let volume = vol || 0.2;

            audio.volume = volume;

            audio.play().catch(() => {});

        }, delay || 0);

    },

    sfx: function(name, delay, vol) {

        window.setTimeout(function() {

            this.sfxStop(name);
            let audio = allAudio.querySelector('.sfx-' + name);
            let volume = vol || 0.3;

            audio.volume = volume;

            audio.play().catch(() => {});

        }.bind(this), delay || 0);

    },

    sfxStop: function(name) {

      let audio = allAudio.querySelector('.sfx-' + name);
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;

    },

    stop: function(name, delay) {

        window.setTimeout(function() {

            let audio = allAudio.querySelector('.music-' + name);
            
            audio.volume = 0;
            audio.pause();
            audio.currentTime = 0;
            
        }, delay || 0);

    }

}