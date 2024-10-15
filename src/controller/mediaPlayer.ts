import { Howl, Howler } from "howler";
import { styles } from "./styles";
import { isArray, saveToLocalStorage } from "./mediaController";

let player: any = [];
let mute: boolean = false;
let loop: boolean = false;
let isplayed: boolean = false;
let durationSlider: any;
let playing: string = "not playing";
let play_btn: any = document.getElementById("play");
let duration: any = document.getElementById("duration");
let progress: any = document.getElementById("progress");
let settingSideBar: any = document.getElementById("mediaSettingSidebar");
let index = 0;

function MediaPlayer({
  settingsPosition = "top-right",
  settingsValues,
  playControlPosition = "",
  playControlValues,
  otherControlPosition = "",
  otherControlValues,
  mediaSeekPosition = "",
  mediaSeekValues,
  playerEdges = "flat",
  backgroundColor = "black",
  backgroundImage,
  title = "",
  titleColor = "white",
  titleSize = 20,
  buttonColor = "white",
  mode = "normal",
  img = "",
  url = "./audio/1.mp3",
  htmlId = "player1",
  volume = 50,
  theme,
  imgWidth = 80,
  imgHeight = 80,
  playerWidth,
  playerHeight,
  editable,
  fontFamily,
  playIcon,
  pauseIcon,
  volIcon,
  muteIcon,
  loopIcon,
  loopOffIcon,
  nextIcon,
  prevIcon,
}: {
  url: string;
  title?: string;
  playerWidth?: number;
  playerHeight?: number;
  titleSize?: number;
  htmlId?: string;
  settingsPosition?: string;
  settingsValues?: any;
  playControlPosition?: string;
  playControlValues?: any;
  otherControlPosition?: string;
  otherControlValues?: any;
  mediaSeekPosition?: string;
  mediaSeekValues?: any;
  backgroundColor?: string;
  backgroundImage?: string;
  buttonColor?: string;
  titleColor?: string;
  playerEdges?: any;
  mode?: string;
  img?: string;
  volume?: number;
  theme?: string;
  imgWidth?: number;
  imgHeight?: number;
  editable: boolean;
  fontFamily: string;
  playIcon?: any;
  pauseIcon?: any;
  volIcon?: any;
  muteIcon?: any;
  loopIcon?: any;
  loopOffIcon?: any;
  nextIcon?: any;
  prevIcon?: any;
}) {
  createStyles();

  var context = new AudioContext();

  console.log(`Currently have ${player.length + 1} playing`);
  player.push({
    volume: volume / 100,
    playing,
    buttonColor,
    backgroundColor,
    id: htmlId,
    media: url,
  });
  saveToLocalStorage(player);
  //check if array
  let howlPlayer = new Howl({
    src: isArray(url) ? url : [url],
    volume: volume / 100,
    onplay: function () {
      context.resume();
      // Display the duration.
      //  console.log(howlPlayer);
      duration.innerHTML = formatTime(Math.round(howlPlayer.duration()));
      // Start updating the progress of the track.
      function step() {
        // Determine our current seek position.
        var seek: any = howlPlayer.seek() || 0;
        progress.innerHTML = formatTime(Math.round(seek));
        durationSlider.value = `${(seek / howlPlayer.duration()) * 100}` || "0";
        // If the sound is still playing, continue stepping.
        if (howlPlayer.playing()) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    },
    onend: function () {
      // Change pause to play.
      play_btn.classList.add("play");
      play_btn.classList.remove("pause");
    },
    // onpause: function () {
    //   play_btn.classList.add("play");
    //   play_btn.classList.remove("pause");
    // },
    onseek: function () {
      // Start updating the progress of the track. function step() {
      function step() {
        // Determine our current seek position.
        var seek: any = howlPlayer.seek() || 0;
        progress.innerHTML = formatTime(Math.round(seek));
        durationSlider.value = `${(seek / howlPlayer.duration()) * 100}` || "0";
        // If the sound is still playing, continue stepping.
        if (howlPlayer.playing()) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    },
  });
  const mediaPlayer = document.createElement("div");

  mediaPlayer.style.position = "relative";
  mediaPlayer.style.borderRadius =
    playerEdges === "rounded"
      ? "20px"
      : playerEdges === "flat"
      ? "0px"
      : `${playerEdges}px`;

  if (backgroundImage) {
    const bgImage = document.createElement("img");
    bgImage.classList.add("bgImage");
    bgImage.src = backgroundImage;
    bgImage.style.borderRadius =
      playerEdges === "rounded"
        ? "20px"
        : playerEdges === "flat"
        ? "0px"
        : `${playerEdges}px`;

    //mediaPlayer.style.backgroundImage = backgroundImage;
    //mediaPlayer.style.backgroundRepeat = "no-repeat";
    // mediaPlayer.style.backgroundSize = "cover";

    mediaPlayer.appendChild(bgImage);
  } else {
    mediaPlayer.style.backgroundColor = backgroundColor;
  }

  if (playerHeight) {
    mediaPlayer.style.height = `${playerHeight}px`;
  }
  if (playerWidth) {
    mediaPlayer.style.width = `${playerWidth}px`;
  }
  mediaPlayer.classList.add("mediaPlayer");

  let myID: HTMLElement | any = document.getElementById(htmlId);
  myID.appendChild(mediaPlayer);

  const mediaContainer = document.createElement("div");

  mediaContainer.classList.add("mediaContainer");
  if (theme === "advance") {
    advanceTheme(
      buttonColor,
      mediaContainer,
      howlPlayer,
      img,
      title,
      titleColor,
      titleSize,
      playControlPosition,
      playControlValues,
      otherControlPosition,
      otherControlValues,
      mediaSeekPosition,
      mediaSeekValues,
      imgWidth,
      imgHeight,
      editable,
      fontFamily,
      playIcon,
      pauseIcon,
      volIcon,
      muteIcon,
      loopIcon,
      loopOffIcon,
      nextIcon,
      prevIcon
    );
  } else {
    simpleTheme(
      buttonColor,
      mediaContainer,
      howlPlayer,
      htmlId,
      playIcon,
      pauseIcon
    );
  }

  const mediaSetting = document.createElement("div");

  mediaSetting.style.backgroundColor = buttonColor;
  mediaSetting.classList.add("settings");
  mediaSetting.id = "settings";

  let setttingPosition = getPosition(settingsPosition, settingsValues);

  mediaSetting.style.position = "absolute";
  Object.keys(setttingPosition).forEach(
    (key) => (mediaSetting.style[key] = setttingPosition[key])
  );
  const mediaSideBar = document.createElement("div");

  mediaSetting.addEventListener("click", function () {
    console.log("settings");
    mediaSideBar.style.display = "block";
  });
  if (editable && theme === "advance") {
    mediaSideBar.classList.add("mediaSettingSidebar");
    mediaSideBar.id = "mediaSettingSidebar";
    mediaSideBar.style.display = "none";

    const mediaSideBarContent = document.createElement("div");
    mediaSideBarContent.classList.add("sidebarContent");
    mediaSideBarContent.id = "sidebarContent";

    const closeSidebarBtn = document.createElement("div");
    closeSidebarBtn.classList.add("closeBtn");
    closeSidebarBtn.style.color = buttonColor;
    closeSidebarBtn.id = "closeBtn";
    closeSidebarBtn.addEventListener("click", function () {
      mediaSideBar.style.display = "none";
    });

    mediaSideBarContent.appendChild(closeSidebarBtn);
    mediaSideBar.appendChild(mediaSideBarContent);
    mediaContainer.appendChild(mediaSideBar);
    mediaContainer.appendChild(mediaSetting);
  }

  mediaPlayer.appendChild(mediaContainer);
}
const simpleTheme = (
  buttonColor: string,
  mediaContainer: HTMLDivElement,
  howlPlayer: any,
  htmlId?: any,
  playIcon?: any,
  pauseIcon?: any
) => {
  console.log("simple");
  mediaContainer.innerHTML = "";

  const mediaSingle = document.createElement("div");
  mediaSingle.classList.add("mediaSingle");

  //  console.log(buttonColor);
  const btn = document.createElement("div");
  btn.style.backgroundColor = buttonColor;
  const playImg = document.createElement("img");
  const pauseImg = document.createElement("img");

  playImg.src = playIcon;
  pauseImg.src = pauseIcon;
  playImg.style.width = "40px";
  playImg.style.height = "40px";
  pauseImg.style.width = "40px";
  pauseImg.style.height = "40px";
  if (playIcon) {
    btn.appendChild(playImg);
  } else {
    btn.classList.add("play");
  }
  btn.id = "play";
  play_btn = btn;
  btn.addEventListener("click", function () {
    isplayed = !isplayed;
    if (isplayed) {
      howlPlayer.play();

      if (playIcon) {
        btn.removeChild(playImg);
      } else {
        btn.classList.remove("play");
      }
      if (pauseIcon) {
        btn.appendChild(pauseImg);
      } else {
        btn.classList.add("pause");
      }

      var sounds = Howler?._howls;

      for (var i = 0; i < sounds.length; i++) {
        if (sounds[i].playing() && sounds[i]._src !== howlPlayer._src) {
          sounds[i].pause();
        }
      }
    } else {
      howlPlayer.pause();
      if (playIcon) {
        btn.appendChild(playImg);
      } else {
        btn.classList.add("play");
      }
      if (pauseIcon) {
        btn.removeChild(pauseImg);
      } else {
        btn.classList.remove("pause");
      }

      playing = "paused";
    }
  });

  mediaSingle.appendChild(btn);
  mediaContainer.appendChild(mediaSingle);
};

const advanceTheme = (
  buttonColor: string,
  mediaContainer: HTMLDivElement,
  howlPlayer: any,
  img: any,
  titleValue: string,
  titleColor: string,
  titleSize: number,
  playControlPosition: string,
  playControlValues: string[],
  otherControlPosition: string,
  otherControlValues: string[],
  mediaSeekPosition: string,
  mediaSeekValues: string[],
  imgWidth: number,
  imgHeight: number,
  editable: boolean,
  fontFamily: string,
  playIcon?: any,
  pauseIcon?: any,
  volIcon?: any,
  muteIcon?: any,
  loopIcon?: any,
  loopOffIcon?: any,
  nextIcon?: any,
  prevIcon?: any
) => {
  mediaContainer.innerHTML = "";

  const mediaTop = document.createElement("div");
  mediaTop.classList.add("mediaTop");

  const title = document.createElement("h2");
  title.style.color = titleColor;
  title.style.fontSize = `${titleSize}px`;
  title.style.fontFamily = fontFamily;
  title.classList.add("title");
  title.textContent = titleValue;

  mediaTop.appendChild(title);

  const mediaMiddle = document.createElement("div");
  mediaMiddle.classList.add("mediaMiddle");

  const mediaLibrary = document.createElement("div");
  if (img == "hide" || img == "hidden") {
    mediaLibrary.style.display = "none";
  } else if (img == "" || !img) {
    mediaLibrary.style.borderRadius = "50%";
    mediaLibrary.style.padding = "24px";
    mediaLibrary.style.border = `1px solid ${buttonColor}`;
  }
  mediaLibrary.classList.add("mediaLibrary");
  mediaMiddle.appendChild(mediaLibrary);

  let playerImg: any;
  if (img == "" || !img) {
    playerImg = document.createElement("span");
    playerImg.classList.add("musicImg");
    playerImg.style.backgroundColor = buttonColor;

    mediaLibrary.appendChild(playerImg);
  } else {
    playerImg = document.createElement("img");
    playerImg.src = img;
    playerImg.style.width = imgWidth;
    playerImg.style.height = imgHeight;
    mediaLibrary.appendChild(playerImg);
  }
  const mediaBottom = document.createElement("div");
  mediaBottom.classList.add("mediaBottom");
  //console.log(playControlPosition);
  const playControl = document.createElement("div");
  playControl.classList.add("playControl");
  if (playControlPosition === "hidden" || playControlPosition == "hide") {
    playControl.style.display = "none";
  } else if (playControlPosition !== "") {
    let position = getPosition(playControlPosition, playControlValues);

    playControl.style.position = "absolute";
    Object.keys(position).forEach(
      (key) => (playControl.style[key] = position[key])
    );
  }

  const prev = document.createElement("div");
  prev.style.backgroundColor = buttonColor;

  const prevImg = document.createElement("img");

  prevImg.src = prevIcon;
  prevImg.style.width = "30px";
  prevImg.style.height = "30px";
  if (prevIcon) {
    prev.appendChild(prevImg);
  } else {
    prev.classList.add("prev");
  }
  prev.id = "prev";
  prev.addEventListener("click", function () {

    index = index - 1;
    if (index < 0) {
      // index = playlist.length - 1;
    }
  });
  playControl.appendChild(prev);

  const play = document.createElement("div");
  play.style.backgroundColor = buttonColor;
  play.id = "play";
  play_btn = play;

  const playImg = document.createElement("img");
  const pauseImg = document.createElement("img");

  playImg.src = playIcon;
  pauseImg.src = pauseIcon;
  playImg.style.width = "40px";
  playImg.style.height = "40px";
  pauseImg.style.width = "40px";
  pauseImg.style.height = "40px";
  if (playIcon) {
    play.appendChild(playImg);
  } else {
    play.classList.add("play");
  }
  play.addEventListener("click", function () {
    isplayed = !isplayed;

    if (isplayed) {
      howlPlayer.play();
      if (playIcon) {
        play.removeChild(playImg);
      } else {
        play.classList.remove("play");
      }
      if (pauseIcon) {
        play.appendChild(pauseImg);
      } else {
        play.classList.add("pause");
      }
      playing = "playing";
      var sounds = Howler._howls;

      for (var i = 0; i < sounds.length; i++) {
        if (sounds[i].playing() && sounds[i]._src !== howlPlayer._src) {
          sounds[i].pause();
        }
      }
    } else {
      howlPlayer.pause();
      if (playIcon) {
        play.appendChild(playImg);
      } else {
        play.classList.add("play");
      }
      if (pauseIcon) {
        play.removeChild(pauseImg);
      } else {
        play.classList.remove("pause");
      }
      playing = "paused";
    }
  });
  playControl.appendChild(play);

  const next = document.createElement("div");
  next.style.backgroundColor = buttonColor;

  const nextImg = document.createElement("img");

  nextImg.src = nextIcon;
  nextImg.style.width = "30px";
  nextImg.style.height = "30px";
  if (nextIcon) {
    next.appendChild(nextImg);
  } else {
    next.classList.add("next");
  }
  next.id = "next";
  next.addEventListener("click", function () {
    // Get the next track based on the direction of the track.
    index = index + 1;
    //   if (index >= playlist.length) {
    //   index = 0;
    // }

    //self.skipTo(index);

    // console.log("next");
  });
  playControl.appendChild(next);

  const otherControl = document.createElement("div");
  otherControl.classList.add("otherControl");
  if (otherControlPosition === "hidden" || otherControlPosition == "hide") {
    otherControl.style.display = "none";
  } else if (otherControlPosition !== "") {
    let position = getPosition(otherControlPosition, otherControlValues);

    otherControl.style.position = "absolute";
    Object.keys(position).forEach(
      (key) => (otherControl.style[key] = position[key])
    );
  }

  const vol = document.createElement("div");
  vol.style.backgroundColor = buttonColor;

  const volImg = document.createElement("img");
  const muteImg = document.createElement("img");

  volImg.src = volIcon;
  volImg.style.width = "30px";
  volImg.style.height = "30px";
  muteImg.src = muteIcon;
  muteImg.style.width = "30px";
  muteImg.style.height = "30px";
  if (volIcon) {
    vol.appendChild(volImg);
  } else {
    vol.classList.add("volumeUp");
  }
  vol.id = "vol";
  vol.addEventListener("click", function () {
    //vol
    // console.log("vol");
    mute = !mute;
    if (mute) {
      howlPlayer.mute(true);
      if (volIcon) {
        vol.removeChild(volImg);
      } else {
        vol.classList.remove("volumeUp");
      }
      if (muteIcon) {
        vol.appendChild(muteImg);
      } else {
        vol.classList.add("volumeOff");
      }
    } else {
      howlPlayer.mute(false);
      if (volIcon) {
        vol.appendChild(volImg);
      } else {
        vol.classList.add("volumeUp");
      }
      if (muteIcon) {
        vol.removeChild(muteImg);
      } else {
        vol.classList.remove("volumeOff");
      }
    }
  });
  otherControl.appendChild(vol);

  const loop_ = document.createElement("div");
  loop_.style.backgroundColor = buttonColor;
  const loopImg = document.createElement("img");
  const loopOffImg = document.createElement("img");

  loopImg.src = loopIcon;
  loopImg.style.width = "30px";
  loopImg.style.height = "30px";
  loopOffImg.src = loopOffIcon;
  loopOffImg.style.width = "30px";
  loopOffImg.style.height = "30px";
  if (loopIcon) {
    loop_.appendChild(loopImg);
  } else {
    loop_.classList.add("loop");
  }
  loop_.id = "loop";
  loop_.addEventListener("click", function () {
    //loop
    loop = !loop;
    if (loop) {
      howlPlayer.loop(true);
      if (loopIcon) {
        loop_.removeChild(loopImg);
      } else {
        loop_.classList.remove("loop");
      }
      if (loopOffIcon) {
        loop_.appendChild(loopOffImg);
      } else {
        loop_.classList.add("loopOff");
      }
    } else {
      howlPlayer.loop(false);
      if (loopIcon) {
        loop_.appendChild(loopImg);
      } else {
        loop_.classList.add("loop");
      }
      if (loopOffIcon) {
        loop_.removeChild(loopOffImg);
      } else {
        loop_.classList.remove("loopOff");
      }
    }
  });
  otherControl.appendChild(loop_);

  const mediaSeek = document.createElement("div");
  mediaSeek.classList.add("mediaSeek");
  if (mediaSeekPosition === "hidden" || mediaSeekPosition == "hide") {
    mediaSeek.style.display = "none";
  } else if (mediaSeekPosition !== "") {
    let position = getPosition(mediaSeekPosition, mediaSeekValues);

    mediaSeek.style.position = "absolute";
    Object.keys(position).forEach(
      (key) => (mediaSeek.style[key] = position[key])
    );
  }

  const timer = document.createElement("div");
  timer.classList.add("timer");
  timer.id = "timer";

  const duration_ = document.createElement("div");
  duration_.classList.add("duration");
  duration_.id = "duration";
  duration_.style.color = buttonColor;
  duration_.innerHTML = formatTime(Math.round(howlPlayer.duration()));
  duration = duration_;

  const progress_ = document.createElement("div");
  progress_.classList.add("progress");
  progress_.id = "progress";
  progress_.style.color = buttonColor;
  progress_.innerHTML = "0:00";
  progress = progress_;

  const durationSlider_ = document.createElement("input");
  durationSlider_.type = "range";
  durationSlider_.id = "duration_slider";
  durationSlider_.min = "0";
  durationSlider_.max = "100";
  durationSlider_.value = "0";
  durationSlider = durationSlider_;
  durationSlider_.addEventListener("change", function () {
    let slider_position = howlPlayer.duration() * (durationSlider.value / 100);
    howlPlayer.seek(slider_position);
  });

  timer.appendChild(progress_);
  timer.appendChild(duration_);
  mediaSeek.appendChild(timer);
  mediaSeek.appendChild(durationSlider);

  mediaBottom.appendChild(playControl);
  mediaBottom.appendChild(otherControl);
  mediaBottom.appendChild(mediaSeek);

  mediaContainer.appendChild(mediaTop);
  mediaContainer.appendChild(mediaMiddle);
  mediaContainer.appendChild(mediaBottom);
};

function formatTime(secs: any) {
  var minutes = Math.floor(secs / 60) || 0;
  var seconds = secs - minutes * 60 || 0;

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function createStyles() {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
  document.head.appendChild(styleTag);
}
function getPosition(position: string, positionValues?: string[]) {
  const [vertical, horizontal] = position?.split("-");
  return {
    [vertical]: positionValues ? positionValues[0] : "30px",
    [horizontal]: positionValues ? positionValues[1] : "30px",
  };
}
export default MediaPlayer;
