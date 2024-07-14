import { Howl, Howler } from 'howler';
import { styles } from './styles';
import { saveToLocalStorage, setVolume, updatePlay } from './MediaController';
let player = []
//console.log("Player is hot and ready to role")
export default class MediaPlayer {
    constructor({ position = 'bottom-right',
        BackgroundColor = "black",
        ButtonColor = "white",
        ButtonShape = "rounded-square",
        Mode = "normal",
        Img = "./assets/img1.png",
        Url = "./audio/1.mp3",
        HtmlId = "player1",
        Volume = 50,
    }) {

        this.position = this.getPosition(position);
        this.open = false;
        this.BackgroundColor = BackgroundColor;
        this.ButtonColor = ButtonColor;
        this.ButtonShape = ButtonShape;
        this.Img = Img;
        this.Url = Url;
        this.Id = HtmlId;
        this.volume = Volume / 100;
        this.playing = "not playing";
        this.initialise();
        this.createStyles();
    }
    getPosition(position) {
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '30px',
            [horizontal]: '30px',
        };
    }

    initialise() {
        console.log(`Currently have ${player.length + 1} playing`)
        player.push({ volume: this.volume, playing: this.playing, butttonColor: this.ButtonColor, background: this.BackgroundColor, id: this.Id, media: this.Url })
        saveToLocalStorage(player)

        this.howlPlayer = new Howl({
            src: [this.Url],
            html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
            volume: this.volume,
            onend: function () {
                // Change pause to play.

                //   this.play.classList.remove('pause');
                //   this.play.classList.add('play');
            },
        });
        const theDiv = document.getElementById(this.Id);
        const mediaPlayer = document.createElement('div');
        mediaPlayer.style.position = 'relative';
        //  mediaPlayer.id = this.Id;
        mediaPlayer.style.backgroundColor = this.BackgroundColor;
        mediaPlayer.classList.add('mediaPlayer');

        document.body.appendChild(theDiv);
        theDiv.appendChild(mediaPlayer);

        this.mediaContainer = document.createElement('div');
        this.mediaContainer.classList.add('mediaContainer');

        this.createMediaContainerContent();

        mediaPlayer.appendChild(this.mediaContainer);

    }

    createMediaContainerContent() {
        this.mediaContainer.innerHTML = '';

        const mediaTop = document.createElement('div');
        mediaTop.classList.add('mediaTop');

        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = `Media Player`;

        mediaTop.appendChild(title);

        const mediaMiddle = document.createElement('div');
        mediaMiddle.classList.add('mediaMiddle');

        const mediaLibrary = document.createElement('div');
        mediaLibrary.classList.add('mediaLibrary');
        mediaMiddle.appendChild(mediaLibrary);
        const playerImg = document.createElement('img');
        playerImg.src = this.Img
        mediaLibrary.appendChild(playerImg);

        const mediaBottom = document.createElement('div');
        mediaBottom.classList.add('mediaBottom');

        const playControl = document.createElement('div');
        playControl.classList.add('playControl');

        this.createBtn('prev', this.prev_btn.bind(this), playControl)
        this.play = this.createBtn('play', this.play_btn.bind(this), playControl)
        this.createBtn('next', this.next_btn.bind(this), playControl)
        this.volume = this.createBtn('volumeUp', this.vol_btn.bind(this), playControl)
        this.createBtn('loop', this.loop_btn.bind(this), playControl)


        const mediaSeek = document.createElement('div');
        mediaSeek.classList.add('mediaSeek');

        const durationSlider = document.createElement('input');
        durationSlider.type = 'range';
        durationSlider.id = 'duration_slider'
        durationSlider.min = '0'
        durationSlider.max = '100'
        durationSlider.value = '0'
        this.durationSlider = durationSlider
        durationSlider.addEventListener('change', this.duration_change.bind(this))

        mediaSeek.appendChild(durationSlider);

        mediaBottom.appendChild(playControl);
        mediaBottom.appendChild(mediaSeek);
        // function load the track

        this.load_track();

        this.mediaContainer.appendChild(mediaTop);
        this.mediaContainer.appendChild(mediaMiddle);
        this.mediaContainer.appendChild(mediaBottom);

    }

    load_track() {
        this.durationSlider.value = ((this.howlPlayer.seek() / this.howlPlayer.duration()) * 100)
    };

    createBtn(newClass, func, appender, updateClass) {
        const btn = document.createElement('span');
        btn.style.backgroundColor = this.ButtonColor;
        btn.id = newClass;
        btn.addEventListener('click', func);
        btn.classList.add(newClass, updateClass)

        return appender.appendChild(btn);
    }
    prev_btn() {
        console.log("prev")
        //  this.howlPlayer.s()
    }
    play_btn() {
        console.log("playing ")

        this.open = !this.open;
        if (this.open) {
            this.howlPlayer.play()
            this.play.classList.remove('play');
            this.play.classList.add('pause');
            this.playing = "playing";
            updatePlay(this.playing, this.Id)
            this.volume = setVolume(this.Id)
            console.log(this.volume, this.Id)
        } else {
            this.howlPlayer.pause()
            this.play.classList.add('play');
            this.play.classList.remove('pause');
            this.playing = "paused"
            updatePlay(this.playing, this.Id)
        }
    }

    range_slider() {
        let position = 0;

        // update slider position
        if (!this.howlPlayer.duration()) {
            position = this.howlPlayer.seek() * (100 / this.howlPlayer.duration());
            this.durationSlider.value = position;
            console.log(position)
        }
    }
    next_btn() {
        console.log("next")
    }
    vol_btn() {
        console.log("vol")
        this.mute = !this.mute;
        if (this.mute) {
            this.howlPlayer.mute(true)
            this.volume.classList.remove('volumeUp');
            this.volume.classList.add('volumeOff');
        } else {
            this.howlPlayer.mute(false)
            this.volume.classList.add('volumeUp');
            this.volume.classList.remove('volumeOff');
        }
    }
    loop_btn() {
        console.log("loop")
        this.loop = !this.loop;
        if (this.mute) {
            this.howlPlayer.loop(true)
            this.volume.classList.remove('loop');
            this.volume.classList.add('loopOff');
        } else {
            this.howlPlayer.loop(false)
            this.volume.classList.add('loop');
            this.volume.classList.remove('loopOff');
        }
    }
    duration_change() {
        let slider_position = this.howlPlayer.duration() * (this.durationSlider.value / 100);
        this.howlPlayer.seek(slider_position)
        // console.log("duration", this.durationSlider.value, 'dur', this.howlPlayer.duration())
    }

    createStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = styles.replace(/^\s+|\n/gm, '');
        document.head.appendChild(styleTag);
    }
    formatTime(secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = (secs - minutes * 60) || 0;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }

}