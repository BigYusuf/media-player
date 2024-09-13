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
  playerEdges?: string;
  mode?: string;
  img?: string;
  volume?: number;
  theme?: string;
  imgWidth?: number;
  imgHeight?: number;
  editable?: boolean;
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
      editable
    );
  } else {
    simpleTheme(buttonColor, mediaContainer, howlPlayer, htmlId);
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
  htmlId?: any
) => {
  console.log("simple");
  mediaContainer.innerHTML = "";

  const mediaSingle = document.createElement("div");
  mediaSingle.classList.add("mediaSingle");

  //  console.log(buttonColor);
  const btn = document.createElement("div");
  btn.style.backgroundColor = buttonColor;
  btn.classList.add("play");
  btn.id = "play";
  play_btn = btn;
  //  btn.onclick = playBtn(isplayed, howlPlayer, btn, playing);
  btn.addEventListener("click", function () {
    isplayed = !isplayed;
    if (isplayed) {
      //console.log("play ");
      howlPlayer.play();
      btn.classList.remove("play");
      btn.classList.add("pause");
      //  console.log("btn id", htmlId);
      // playing = "playing";

      // console.log("btn id", howlPlayer);
      //  console.log("others1", Howler._howls);
      var sounds = Howler?._howls;

      for (var i = 0; i < sounds.length; i++) {
        if (sounds[i].playing() && sounds[i]._src !== howlPlayer._src) {
          sounds[i].pause();
        }
      }
      // if (htmlId !== "test4") {
      //   const el = document.getElementById(htmlId);
      //   //el.
      //   console.log("others", el);
      //   let play1 = el.getElementsByTagName("div")[3];
      //   console.log("play", play1);
      //   play1.classList.add("play");
      //   Howler._howls[0].pause();
      //   play1.classList.remove("pause");
      //   //play1?.isplayed === false;
      //  // play1.howlPlayer.pause();
      //   play1.addEventListener("click", howlPlayer.pause());
      //}
    } else {
      //   console.log("pause ");
      howlPlayer.pause();
      btn.classList.add("play");
      btn.classList.remove("pause");
      //   console.log("btn id, pause", htmlId);
      playing = "paused";
    }

    //play and pause others
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
  editable: boolean
) => {
  //  console.log("adv");
  mediaContainer.innerHTML = "";

  const mediaTop = document.createElement("div");
  mediaTop.classList.add("mediaTop");

  const title = document.createElement("h2");
  title.style.color = titleColor;
  title.style.fontSize = `${titleSize}px`;
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
  prev.classList.add("prev");
  prev.id = "prev";
  prev.addEventListener("click", function () {
    //prev
    //console.log("prev");
    index = index - 1;
    if (index < 0) {
      // index = playlist.length - 1;
    }
  });
  playControl.appendChild(prev);

  const play = document.createElement("div");
  play.style.backgroundColor = buttonColor;
  play.classList.add("play");
  play.id = "play";
  play_btn = play;
  play.addEventListener("click", function () {
    isplayed = !isplayed;

    if (isplayed) {
      //  console.log("play ");
      howlPlayer.play();
      play.classList.remove("play");
      play.classList.add("pause");
      playing = "playing";
      var sounds = Howler._howls;

      for (var i = 0; i < sounds.length; i++) {
        if (sounds[i].playing() && sounds[i]._src !== howlPlayer._src) {
          sounds[i].pause();
        }
      }
    } else {
      // console.log("pause ");
      howlPlayer.pause();
      play.classList.add("play");
      play.classList.remove("pause");
      playing = "paused";
    }
  });
  playControl.appendChild(play);

  const next = document.createElement("div");
  next.style.backgroundColor = buttonColor;
  next.classList.add("next");
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
  vol.classList.add("volumeUp");
  vol.id = "vol";
  vol.addEventListener("click", function () {
    //vol
    // console.log("vol");
    mute = !mute;
    if (mute) {
      howlPlayer.mute(true);
      vol.classList.remove("volumeUp");
      vol.classList.add("volumeOff");
    } else {
      howlPlayer.mute(false);
      vol.classList.add("volumeUp");
      vol.classList.remove("volumeOff");
    }
  });
  otherControl.appendChild(vol);

  const loop_ = document.createElement("div");
  loop_.style.backgroundColor = buttonColor;
  loop_.classList.add("loop");
  loop_.id = "loop";
  loop_.addEventListener("click", function () {
    //loop
    loop = !loop;
    if (loop) {
      howlPlayer.loop(true);
      loop_.classList.remove("loop");
      loop_.classList.add("loopOff");
    } else {
      howlPlayer.loop(false);
      loop_.classList.add("loop");
      loop_.classList.remove("loopOff");
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
