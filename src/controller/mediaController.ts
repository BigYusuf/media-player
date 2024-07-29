export const saveToLocalStorage = (data: any) => {
  //generate a number/ id for each of the player
  data.forEach((item, i) => {
    //then match that id to the player
    item.playerId = i + 1;
  });

  //push the data to an array in localstorage
  localStorage.setItem("player", JSON.stringify(data));
};

export const updatePlay = (playing: string, id: string) => {
  const retrievedString: string | any = localStorage.getItem("player");
  const parsedObject = JSON.parse(retrievedString);
  let playedAudio = parsedObject.filter((x) => x.id === id);
  playedAudio[0].playing = playing;
  // console.log(parsedObject)
  localStorage.setItem("player", JSON.stringify(parsedObject));
};
//we can always manipute the player based on its data

//play and pause the rest

//play and reduce volume of the rest
export const setVolume = (id: string) => {
  const retrievedString: string | any = localStorage.getItem("player");
  const parsedObject = JSON.parse(retrievedString);

  // mode oneplayer at time
  let playedAudio = parsedObject.filter(
    (x) => x.id === id && x.playing === "playing"
  );
  let othersAudio = parsedObject.filter((x) => x.id !== id);

  //setvolume to 100% and others to 50%
  playedAudio[0].volume = 1;
  for (let i = 0; i < playedAudio.length; i++) {
    othersAudio[i].volume = 0.5;
  }
  console.log(parsedObject);
  localStorage.setItem("player", JSON.stringify(parsedObject));

  //mode= volumeincrease
  if (id === playedAudio[0].id) {
    return 1;
  } else {
    return 0;
  }
};

export const getId = (id: string) => {
  const retrievedString: string | any = localStorage.getItem("player");
  const parsedObject = JSON.parse(retrievedString);

  // check id && playing
  let playedAudio = parsedObject.filter(
    (x) => x.id === id && x.playing === "playing"
  );
  // let othersAudio = parsedObject.filter((x) => x.id !== id)

  console.log(parsedObject);
  localStorage.setItem("player", JSON.stringify(parsedObject));
  if (playedAudio) {
    return true;
  } else {
    return false;
  }
};

export const isArray = (data: any) => {
  if (Array.isArray(data)) {
    return true;
  } else {
    false;
  }
};
