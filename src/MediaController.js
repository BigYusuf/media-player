export const saveToLocalStorage = (data) => {

    //generate a number/ id for each of the player
    data.forEach((item, i) => {
        //then match that id to the player
        item.playerId = i + 1;
    });

    //push the data to an array in localstorage
    localStorage.setItem('player', JSON.stringify(data));
}

export const updatePlay = (playing, id) => {

    const retrievedString = localStorage.getItem("player");
    const parsedObject = JSON.parse(retrievedString);
    let playedAudio = parsedObject.filter((x) => x.id === id)
    playedAudio[0].playing = playing
    // console.log(parsedObject)
    localStorage.setItem('player', JSON.stringify(parsedObject));
}
//we can always manipute the player based on its data

//play and pause the rest

//play and reduce volume of the rest
export const setVolume = (id) => {
    const retrievedString = localStorage.getItem("player");
    const parsedObject = JSON.parse(retrievedString);

    // mode oneplayer at time
    let playedAudio = parsedObject.filter((x) => x.id === id && x.playing === "playing")
    let othersAudio = parsedObject.filter((x) => x.id !== id)

    //setvolume to 100% and others to 50%
    playedAudio[0].volume = 1
    for (let i = 0; i < playedAudio.length; i++) {
        othersAudio[i].volume = 0.5
    }
    console.log(parsedObject)
    localStorage.setItem('player', JSON.stringify(parsedObject));

    //mode= volumeincrease
    if (id === playedAudio[0].id) {
        return 1
    } else {
        return 0
    }
}

