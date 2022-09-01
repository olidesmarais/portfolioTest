let listeAffichage = [];

function afficherElements() {
    let sectionElements = document.getElementById("elements");
    let fondPale = false;

    sectionElements.innerHTML = "";
    //listeAffichage = listeElements;
    
    for (let contenu of listeAffichage) {
        
        //Création du divContenu
        let divContenu = document.createElement('div');
        if (fondPale)
            ajouterClasse(divContenu, ['contenu', 'text-center', 'pale']);
        else
            ajouterClasse(divContenu, ['contenu', 'text-center', 'fonce']);
        divContenu.setAttribute('id', contenu.id);

        //Création des card-header et card-body
        ajouterEnfants(divContenu, contenu.type, 2, ['card-header-', 'card-body-']);

        //Remplissage card-header
        ajouterEnfants(divContenu.childNodes[0], contenu.type, 2, ['card-title-', 'card-resume-']);
        divContenu.childNodes[0].childNodes[0].innerHTML = remplirTitre(contenu);
        divContenu.childNodes[0].childNodes[1].innerHTML = remplirResume(contenu);
        
        //Remplissaege card-body
        if (contenu.type == 'simple')
            remplirSimple(contenu, divContenu.childNodes[1]);
        else if (contenu.type == 'double')
            remplirDouble(contenu, divContenu.childNodes[1]);
        else
            remplirMulti(contenu, divContenu.childNodes[1]);

        if(contenu.hasOwnProperty('avertissement')) {
            ajouterAvertissement(contenu, divContenu.childNodes[1]);
        }

        if(contenu.hasOwnProperty('note')) {
            ajouterNote(contenu, divContenu.childNodes[1]);
        }

        sectionElements.appendChild(divContenu);
        fondPale = !fondPale;
    }
    let divCloture = document.createElement('div');
    if (fondPale)
        ajouterClasse(divCloture, ['contenu', 'text-center', 'pale']);
    else
        ajouterClasse(divCloture, ['contenu', 'text-center', 'fonce']);

    let texteCloture = document.createElement('h4');
    texteCloture.innerHTML = "D'autres projets à venir ..."
    divCloture.appendChild(texteCloture);

    sectionElements.appendChild(divCloture);
}

function remplirTitre(contenu) {
    let resultat = '';
    resultat += `
                    <h3>${contenu.titre}</h3>
                    <h4>${contenu.soustitre}</h4>
                    <h5>${contenu.categorie}</h5>
                `
    if(contenu.type == 'double')
        resultat += afficherDate(contenu);
    
    return resultat;
}

function remplirResume(contenu) {
    let resultat = '';

    //Compétences
    resultat  +=  '<ul class="bullet-point" style="margin-right:14%;">';
    resultat += '<h4>Compétences</h4>';
    for (let competence of contenu.competences) {
        if (competence)
            resultat += '<li>' + competence + '</li>';
    }
    resultat += '</ul>';

    //Technique
    if(contenu.logiciels.length > 0) {
        resultat += '<ul class="bullet-point">'
        resultat += '<h4>Logiciels</h4>';
        for (let logiciel of contenu.logiciels) {
            resultat += '<li>' + logiciel + '</li>';
        }
        resultat += '</ul>';
    }

    return resultat;
}

function remplirSimple(contenu, divBody){
    let body = '';
    
    body += '<h5 class="card-intertitre-simple">Contexte</h5><p class="card-text">' + contenu.contexte + '</p>';

    if (contenu.source[0] == 'video')
        body += afficherVideo(contenu.source);
    if (contenu.source[0] == 'url')    
        body += afficherUrl(contenu, 0, true);

    body += '<div class="card-complement-simple">';
    body += '<p class="date">' + afficherDate(contenu) + '</p>';
    body += '<h5 class="card-intertitre-simple">Démarche</h5><p class="card-text">' + contenu.demarche + '</p></div>';
    
    divBody.innerHTML = body;
}

 function remplirDouble(contenu, divBody) {
    //return null;
    let body = '';

    body += '<h5 class="card-intertitre-double">Contexte</h5><p class="card-text-double">' + contenu.contexte + '</p>';
    let tabAlt = ['avant', 'après'];
    let tabTxt = ['le code', 'le résultat'];

    for (let idx = 0 ; idx < 2 ; idx++) {
        body += '<div class="card-complement-double">';
        if (contenu.source[0] == 'texte')
            body += afficherTexte(idx, tabTxt[idx]);
        if (contenu.source[0] == 'image')
            body += afficherImage(contenu.source[idx + 1], tabAlt[idx]);
        if (contenu.source[0] == 'url')    
            body += afficherUrl(contenu, idx, false);
        body += '</div>';
    }

     body += '<h5 class="card-intertitre-double">Démarche</h5><p class="card-text-double">' + contenu.demarche + '</p>';

     divBody.innerHTML = body;
 }

 function remplirMulti(contenu, divBody) {
    body = '';

    body += `
                <div class="card-complement-multi">
                    <h5 class="card-intertitre-multi">Contexte</h5>
                    <p class="card-text">${contenu.contexte}</p>
                 </div>
            `

    body += afficherCarousselle(contenu.source);

    body += `
                <div class="card-complement-multi">
                    <h5 class="card-intertitre-multi">Démarche</h5>
                    <p class="card-text">${contenu.demarche}</p>
                 </div>

            `

    divBody.innerHTML = body;
 }

 function afficherDate (contenu) {
    let jour = String(contenu.date[0]);
    let noMois = contenu.date[1];
    let mois = '';
    let annee = String(contenu.date[2]);

    switch(noMois) {
        case 1 : mois = 'janvier'; break;
        case 2 : mois = 'février'; break;
        case 3 : mois = 'mars'; break;
        case 4 : mois = 'avril'; break;
        case 5 : mois = 'mai'; break;
        case 6 : mois = 'juin'; break;
        case 7 : mois = 'juillet'; break;
        case 8 : mois = 'août'; break;
        case 9 : mois = 'septembre'; break;
        case 10 : mois = 'octobre'; break;
        case 11 : mois = 'novembre'; break;
        case 12 : mois = 'décembre';
    }
    return jour + ' ' + mois + ' ' + annee;
}

function retirerElementsAffichage (tabId) {
    for (let id of tabId) {
        if (id >= 0) {
            let position = getPosition(id, listeAffichage);
            listeAffichage.splice(position, 1);
        }
    }
}

function ajouterAvertissement(contenu, divBody) {
    let divAvertissement = document.createElement('div');
    let nomClass = 'disclamer-' + contenu.type;
    ajouterClasse(divAvertissement, [nomClass]);

    let resultat = '';
    resultat += '<span class="disclamer-image"><i class="fa fa-exclamation-triangle" style="font-size:235%;"></i></span>'
    resultat += '<p class="disclamer-text">' + contenu.avertissement + '</p>';
    
    divAvertissement.innerHTML = resultat;
    divBody.appendChild(divAvertissement);
}

function ajouterNote(contenu, divBody) {
    let divNote = document.createElement('div');
    let nomClass = 'disclamer-' + contenu.type;
    ajouterClasse(divNote, [nomClass]);
    let resultat = '';
    resultat += '<span class="disclamer-image"><i class="fa fa-plus-circle" style="font-size:235%;"></i></span>'
    resultat += '<p class="disclamer-text">' + contenu.note + '</p>';
    
    divNote.innerHTML = resultat;
    divBody.appendChild(divNote);
}
