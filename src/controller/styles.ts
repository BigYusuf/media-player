export const styles = `
    @font-face {
        font-family: "Gentona";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaBook.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaBold";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaBookBold.otf") format("opentype");
   }
    @font-face {
        font-family: "GentonaItalic";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaBookItalic.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaExtraBold";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaExtraBold.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaSemiBold";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaSemiBold.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaExtraBoldItalic";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaExtraBoldItalic.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaExtraLight";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaExtraLight.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaHeavy";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaHeavy.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaThin";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaThin.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaMedium";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaMedium.otf") format("opentype");
    }
    @font-face {
        font-family: "GentonaExtraLightItalic";
        src: url("https://cdn.jsdelivr.net/gh/BigYusuf/media-player@master/fonts/GentonaExtraLightItalic.otf") format("opentype");
    }
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
    .mediaSettingSidebar {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 160px;
       /* padding: 20px 0;
       box-shadow: 0 5px 1px rgba(0, 0, 0, 0.1);
       */
        background-color: #ccc;
        transition: all 0.4s ease;
        z-index:200;
    }
    .sidebarContent {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px 16px;
    }
    .hideSidebar {
        left:0;
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
    .bgImage{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        object-fit: cover;
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
    .loopOff,
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
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23000' d='M2 5h10v3l4-4l-4-4v3H0v6h2zm12 6H4V8l-4 4l4 4v-3h12V7h-2z'/%3E%3C/svg%3E");
        background-color: blue;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }
    .loopOff {
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M208 312v32h112v-32h-40V176h-32v24h-32v32h32v80z'/%3E%3Cpath fill='%23000' d='M464 210.511V264a112.127 112.127 0 0 1-112 112H78.627l44.686-44.687l-22.626-22.626L56 353.373l-4.415 4.414l-33.566 33.567l74.022 83.276l23.918-21.26L75.63 408H352c79.4 0 144-64.6 144-144v-85.489Z'/%3E%3Cpath fill='%23000' d='M48 256a112.127 112.127 0 0 1 112-112h273.373l-44.686 44.687l22.626 22.626L456 166.627l4.117-4.116l33.864-33.865l-74.022-83.276l-23.918 21.26L436.37 112H160c-79.4 0-144 64.6-144 144v85.787l32-32Z'/%3E%3C/svg%3E");
        background-color: blue;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
    }
    .settings {
        display: inline-block;
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='%23000' d='M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357 357 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a352 352 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357 357 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088l-24.512 11.968a294 294 0 0 0-34.816 20.096l-22.656 15.36l-116.224-25.088l-65.28 113.152l79.68 88.192l-1.92 27.136a293 293 0 0 0 0 40.192l1.92 27.136l-79.808 88.192l65.344 113.152l116.224-25.024l22.656 15.296a294 294 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152l24.448-11.904a288 288 0 0 0 34.752-20.096l22.592-15.296l116.288 25.024l65.28-113.152l-79.744-88.192l1.92-27.136a293 293 0 0 0 0-40.256l-1.92-27.136l79.808-88.128l-65.344-113.152l-116.288 24.96l-22.592-15.232a288 288 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384a192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256a128 128 0 0 0 0-256'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
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
    .closeBtn {
        display: inline-block;
        width: 1em;
        height: 1em;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' d='M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12'/%3E%3Cpath fill='%23000' d='M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
`;
