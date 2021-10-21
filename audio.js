var plchUrl = new Array, plchObjVariations = new Array, plchAudios = new Array,
    plchBaseFolder = "https://www.cifras.com.br/", plchDefFolder = "arquivos", plchDefSubFolder = "sound",
    plchSep = "/", plchDefaultSpeed = 10;

function plchLoadAudio(a, i, l) {
    if (void 0 !== i && void 0 === plchObjVariations[i]) {
        plchObjVariations[i] = plchInitObj(i, a, l);
        for (var e, o = i.split(","), p = o.length, c = 0, t = "", n = 0; n < p; n++) "x" != o[n].toLowerCase() && (e = p - n + "_" + o[n], plchObjVariations[i].audiosid[c] = e, "" != a && "guitar" != a || (t = plchUrl.guitar), t.length > 0 && void 0 === plchAudios[e] ? plchReadTextFile(a, t + e + atob("LnR4dA=="), i, e) : plchObjVariations[i].audiosloaded++, c++)
    } else plchObjVariations[i].play = l;
    plchCheckIfReady(a, i)
}

function plchInitObj(a, i, l) {
    return {type: i, speed: plchDefaultSpeed, audiosid: new Array, audiosloaded: 0, queue: 0, play: l}
}

function plchReadTextFile(a, i, l, e) {
    var o = new XMLHttpRequest;
    o.open("GET", i, !0), o.onreadystatechange = function () {
        if (4 === o.readyState && (200 === o.status || 0 == o.status)) {
            var i = new Audio;
            i.id = e, i.src = "data:audio/mpeg;base64," + o.responseText, i.addEventListener("loadeddata", function () {
                plchOnLoaded(a, l)
            }), plchAudios[e] = i
        }
    }, o.send(null)
}

function plchOnLoaded(a, i) {
    plchObjVariations[i].audiosloaded++, plchCheckIfReady(a, i)
}

function plchCheckIfReady(a, i) {
    try {
        plchObjVariations[i].audiosloaded >= plchObjVariations[i].audiosid.length && plchObjVariations[i].play && plchPlayAudio(a, i, plchObjVariations[i].speed)
    } catch (a) {
        console.log("failure playing")
    }
}

function plchPlayAudio(a, i, l) {
    null != plchObjVariations[i] && plchObjVariations[i].audiosloaded >= plchObjVariations[i].audiosid.length ? (plchObjVariations[i].play = !1, plchStopPlaying(), null != l && (plchObjVariations[i].speed = l), plchObjVariations[i].queue = 0, plchEnqueueDataToPlay(i)) : plchLoadAudio(a, i, !0)
}

function plchStopPlaying() {
    for (var a in plchAudios) plchAudios.hasOwnProperty(a) && (plchAudios[a].pause(), plchAudios[a].currentTime = 0)
}

function plchEnqueueDataToPlay(a) {
    if (plchObjVariations[a].queue != plchObjVariations[a].audiosid.length) {
        var i = plchObjVariations[a].audiosid[plchObjVariations[a].queue];
        plchAudios[i].play(), plchObjVariations[a].queue++, setTimeout(plchEnqueueDataToPlay, plchObjVariations[a].speed, a)
    }
}

plchUrl.guitar = plchBaseFolder + plchDefFolder + plchSep + plchDefSubFolder + plchSep + "guitar" + plchSep;