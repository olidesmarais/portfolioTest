function afficherVideo (tabContenu) {
    return tabContenu[2];
}

function afficherImage(src, alt) {
    return '<img src="' + src + '" alt="' + alt +'">';
}

function afficherCarousselle(sousListe) {

    let resultat = '';
    let id = sousListe[0].id.slice(0,-2);
    
    resultat += `
                <div id="${id}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
            `
    //Indicateur
    resultat += '<button type="button" data-bs-target="' + id + '" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
    
    for (let idx = 1 ; idx < sousListe.length ; idx++) {
        resultat += '<button type="button" data-bs-target="#' + id + '" data-bs-slide-to="' + idx + '" aria-label="Slide ' + idx+1 + '"></button>';
    }
    resultat += `
                </div>
                <div class="carousel-inner">
            `
    
    //Inner
    resultat += '<div class="carousel-item active">'
    resultat += afficherVideo(sousListe[0].source);
    resultat += '<p class="titre-video"><strong>' + sousListe[0].titre + '</strong></p>';
    resultat += '<p class="date">' + afficherDate(sousListe[0]) + '</p></div>';

    for (let idx = 1 ; idx < sousListe.length ; idx++) {
        resultat += '<div class="carousel-item">'
        resultat += afficherVideo(sousListe[idx].source);
        resultat += '<p class="titre-video"><strong>' + sousListe[idx].titre + '</strong></p>';
        resultat += '<p class="date">' + afficherDate(sousListe[idx]) + '</p></div>';
    }

    resultat += `
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            `
    return resultat;
 }

 function afficherTexte(noSource, description) {
    
    
    //let resultat = '';
    
    return  `
                <a onclick="afficherTextArea(this, '${description}', ${noSource + 1})" class="btn btn-primary">Afficher ${description}</a>
                <br>
                <textarea class="cache";></textarea>
            `
}

 function afficherTextArea(a, description, noSource) {
    let parent = a.parentNode;

    //Identifier le textarea
    let tabEnfants = parent.getElementsByTagName('textarea');
    let textarea = tabEnfants[0];

    //Identifier l'emplacement de l'éléments dans la liste
    let element = parent.parentNode.parentNode;
    let id = getPosition(element.id, listeElements);

    //Afficher
    if (textarea.classList.contains('cache')) {
        textarea.classList.remove('cache');
        textarea.value = lireFichierTexte(listeElements[id].source[noSource], textarea); 
        a.innerHTML = 'Masquer ' + description;
    //Cacher
    } else {
        textarea.classList.add('cache');
        a.innerHTML = 'Afficher ' + description;
    }
}

function afficherUrl(contenu, noSource, isSingle) {
    
    let source;
    if (noSource == 0)
        source = 1;
    else
        source = 3;

    let id = getPosition(contenu.id, listeElements);

    let classes = "btn btn-primary";
    if (isSingle)
        classes += " btn-url";

    return `
             <a href='${listeElements[id].source[source]}' target='_blank' class='${classes}'>
                ${listeElements[id].source[source + 1]}
             </a>
           `
}