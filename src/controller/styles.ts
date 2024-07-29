export const styles = `
    .mediaPlayer {
        height: auto;
        width: 100%;
        }

    .mediaContainer {
        position: relative;
        display: flex;
        margin: 0 auto;
        width: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 20px;
        padding: 20px 0;
    }

    .mediaTop {
        flex: 1;
    }

    .mediaTop .title {
        color: white;
    }

    .mediaMiddle {
        flex: 3;
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    .mediaBottom {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .mediaSingle {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }

    .playControl, .otherControl {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .playControl button img {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    .mediaSeek {
        display: flex;
        gap: 10px;
        flex-direction: column;
    }
    .timer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
    }
    .progress, .duration{
        font-size: 14px
    }

    /*both range slider*/
    input[type="range"] {
        -webkit-appearance: none;
        width: 200px;
        outline: none;
        height: 2px;
        margin: 0 15px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 15px;
        width: 3px;
        background-color: rgb(84, 216, 75);
        /* border-radius: 50%;*/
        cursor: pointer;
    }

            
    .play,
    .pause,
    .next,
    .prev,
    .volumeOff,
    .volumeUp,
    .loop {
        cursor: pointer;
        display: inline-block;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .play {
        font-size: 1.5em;
        width: 1.5em;
        height: 1.5em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='m9.524 4.938l10.092 6.21a1 1 0 0 1 0 1.704l-10.092 6.21A1 1 0 0 1 8 18.21V5.79a1 1 0 0 1 1.524-.852M9.2 6.148v11.705L18.71 12z'/%3E%3C/svg%3E");
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }

    .pause {
        font-size: 1.5em;
        width: 1.5em;
        height: 1.5em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M7 5h2c.552 0 1 .418 1 .933v12.134c0 .515-.448.933-1 .933H7c-.552 0-1-.418-1-.933V5.933C6 5.418 6.448 5 7 5m.2 12.8h1.6V6.2H7.2zM15 5h2c.552 0 1 .418 1 .933v12.134c0 .515-.448.933-1 .933h-2c-.552 0-1-.418-1-.933V5.933c0-.515.448-.933 1-.933m.2 12.8h1.6V6.2h-1.6z'/%3E%3C/svg%3E");
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }

    .next {
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' d='M26.002 5a1 1 0 1 1 2 0v22a1 1 0 0 1-2 0zM3.999 6.504c0-2.002 2.236-3.192 3.897-2.073l14.003 9.432A2.5 2.5 0 0 1 21.912 18L7.909 27.56c-1.66 1.132-3.91-.056-3.91-2.065zm2.78-.414a.5.5 0 0 0-.78.414v18.992a.5.5 0 0 0 .782.412l14.003-9.559a.5.5 0 0 0-.002-.828z'/%3E%3C/svg%3E");
        background-color: blue;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }

    .prev {
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Cpath fill='%23000' d='M4.5 3.75a.75.75 0 0 0-1.5 0v20.5a.75.75 0 0 0 1.5 0zM25 5.254c0-1.816-2.041-2.884-3.533-1.848l-12.504 8.68a2.25 2.25 0 0 0-.013 3.688l12.504 8.81c1.49 1.05 3.546-.015 3.546-1.839zm-2.678-.616a.75.75 0 0 1 1.178.616v17.491a.75.75 0 0 1-1.182.613l-12.504-8.81a.75.75 0 0 1 .004-1.23z'/%3E%3C/svg%3E");
        background-color: blue;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }

    .loop {
        width: 1em;
        height: 1em;
        font-size: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M11.577 5.211a7.8 7.8 0 1 0 5.938 2.274l.849-.849a9 9 0 1 1-7.195-2.598l-1.19-1.19l.85-.848l2.474 2.475a.5.5 0 0 1 0 .707l-.495.495l-1.98 1.98l-.848-.849z'/%3E%3C/svg%3E");
        background-color: blue;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }
    
    .volumeUp {
        margin-left: 10px;
        width: 1.1em;
        height: 1.1em;
        font-size: 1.1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M12 5.414L7.914 9.5H3v5h4.914L12 18.586zM7.5 8.5l3.793-3.793A1 1 0 0 1 13 5.414v13.172a1 1 0 0 1-1.707.707L7.5 15.5H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1zm9.808 8.308A6.77 6.77 0 0 0 19.3 12c0-1.83-.724-3.54-1.992-4.808l.849-.849A7.98 7.98 0 0 1 20.5 12c0 2.21-.895 4.21-2.343 5.657zm-1.98-1.98A3.98 3.98 0 0 0 16.5 12a3.98 3.98 0 0 0-1.172-2.828l.849-.849A5.18 5.18 0 0 1 17.7 12a5.18 5.18 0 0 1-1.523 3.677z'/%3E%3C/svg%3E");
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }
    
    .volumeOff {
        margin-left: 10px;
        width: 1em;
        height: 1em;
        font-size: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='m8.849 7.151l2.444-2.444A1 1 0 0 1 13 5.414v5.889l2.864 2.863A4 4 0 0 0 16.5 12a3.98 3.98 0 0 0-1.172-2.828l.849-.849A5.18 5.18 0 0 1 17.7 12c0 1.13-.36 2.177-.973 3.03l1.143 1.143A6.77 6.77 0 0 0 19.3 12c0-1.83-.724-3.54-1.992-4.808l.849-.849A7.98 7.98 0 0 1 20.5 12a7.97 7.97 0 0 1-1.776 5.027l2.701 2.7l-.849.85L3.85 3.848L4.697 3zM12 10.303V5.414L9.556 7.86zM7.803 9.5H3v5h4.914L12 18.586v-4.889l1 1v3.889a1 1 0 0 1-1.707.707L7.5 15.5H3a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3.803z'/%3E%3C/svg%3E");
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }
    .musicImg {
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        font-size: 1.5em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M18 4.309L8 6.5v12.7c0 .937-.627 1.85-1.47 2.243c-.157.073-1.148.295-1.277.32c-1.243.25-2.198-.814-2.25-1.89s.653-1.974 1.472-2.139l1.265-.317c.447-.112.76-.514.76-.975V5.96a1 1 0 0 1 .786-.976l11.607-2.542a.5.5 0 0 1 .607.488v13.61c0 .937-.633 1.85-1.483 2.243c-.158.073-1.158.295-1.288.32c-1.253.25-2.217-.814-2.27-1.89s.66-1.974 1.485-2.139l1.292-.32c.449-.11.764-.513.764-.975z'/%3E%3C/svg%3E");
        background-color: blue;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
`;
