let filtre = 'Tout';
let filtreCompetences = [];
let nbFiltreCompetences = 0;
let filtreLogiciels = [];
let nbFiltreLogiciels = 0;
let filtreCompetencesActive = false;
let filtreLogicielsActive = false;


function majListeAffichage() {
    listeAffichage = [];

    for (element of listeElements) {
        if(filtre == 'Tout') {
            listeAffichage.push(element);
        }
        else if (element.categorie == filtre) {
            listeAffichage.push(element);
        }
    }
    
    if (filtreCompetencesActive || filtreLogicielsActive)
        applicationFiltresSups();
    else
        afficherElements();
    //afficherElements();
}

function changerFiltre(element) {
    //Mettre à jour l'affichage
    let parentUl = element.parentNode;
    let tabEnfants = parentUl.getElementsByTagName('li');
    for (let idx = 0 ; idx < tabEnfants.length ; idx++) {
        let elementA = tabEnfants[idx];
        elementA.classList.remove('active');
    }
    element.classList.add('active');
    
    //Mettre à jour la liste d'affichage
    filtre = element.getElementsByTagName('a')[0].innerHTML;
    majListeAffichage();
}

function afficherOptionsFiltres() {
    
    //Déterminer les options des filtres
    let setCompetences = new Set();
    let setLogiciels = new Set();
    for (let element of listeElements) {
        determinerOptions(element.competences, setCompetences);
        determinerOptions(element.logiciels, setLogiciels);
    }

    //Affichage et comptabilisation des filtres
    let divCompetences = document.getElementById('filtreCompetences');
    let divLogiciels = document.getElementById('filtreLogiciels');

    //Compétences
    for (let option of setCompetences) {
        divCompetences.appendChild(creerEnfantCheckBox(option, 'competences'));
        //filtreCompetences.push(option);
        nbFiltreCompetences += 1;
    }

    //Logiciels
    for (let option of setLogiciels) {
        divLogiciels.appendChild(creerEnfantCheckBox(option, 'logiciels'));
        //filtreLogiciels.push(option);
        nbFiltreLogiciels += 1;
    }
}

function determinerOptions(tabOptions, set) {
    for (let option of tabOptions) {
        set.add(option);
    }
}

function creerEnfantCheckBox(option, type) {
    let div = document.createElement('div');
    //let attribut = document.createAttribute('onclick');
    //attribut.value = 'majFiltresSup(this)';
    let nomFonction = "majFiltresSup(this, '" + type + "')";
    div.setAttribute('onclick', nomFonction);

    div.innerHTML = `
                        <input type='checkbox' id='${option}' value='${option}'>
                        <label for='${option}'>${option}</label>
                    `
    return div;
}

function applicationFiltresSups() {
    
    let listeIdARetirer = [];

    //Filtre compétences ET logiciels
    if (filtreCompetencesActive && filtreLogicielsActive) {
        if (filtreLogiciels.length == nbFiltreLogiciels && filtreCompetences.length != nbFiltreCompetences) {
            for (let element of listeAffichage) {
                if (!element.logiciels){
                    listeIdARetirer.push(element.id);
                }
            }
        }
        else if (filtreLogiciels.length != nbFiltreLogiciels && filtreCompetences.length != nbFiltreCompetences) {

            let listeIdARetirerCompetences = [];
            let listeIdARetirerLogiciels = [];

            //Id à exclure pour les compétences
            for (let element of listeAffichage) {
                if (!verifOptionSelectionnee(element.competences, filtreCompetences)) {
                    listeIdARetirerCompetences.push(element.id);
                }
            }
            //Id à exclure pour les logiciels
            for (let element of listeAffichage) {
                if (!verifOptionSelectionnee(element.logiciels, filtreLogiciels)) {
                    listeIdARetirerLogiciels.push(element.id);
                }
            }
            //Intersection entre les deux
            for (let id of listeIdARetirerCompetences) {
                if (listeIdARetirerLogiciels.includes(id))
                    listeIdARetirer.push(id);
            }
        }

    //Seulement filtre compétences
    } else if (filtreCompetencesActive) {
        if(filtreCompetences.length != nbFiltreCompetences) {
            for (element of listeAffichage) {
                if (!verifOptionSelectionnee(element.competences, filtreCompetences)) {
                    listeIdARetirer.push(element.id);
                }
            }
        }

    //Seulement filtre logiciels
    } else {
        if (filtreLogiciels.length == nbFiltreLogiciels) {
            for (let element of listeAffichage) {
                if (element.logiciels.length == 0){
                    listeIdARetirer.push(element.id);
                }
            }
        } else {
            for (element of listeAffichage) {
                if (!verifOptionSelectionnee(element.logiciels, filtreLogiciels)) {
                    listeIdARetirer.push(element.id);
                }
            }
        }
    }
    
    if (listeIdARetirer.length > 0) {
        retirerElementsAffichage(listeIdARetirer);
    }
    afficherElements();    
}

function verifOptionSelectionnee(tabOptions, tabFiltres){
    //let optionPresente = false;
    for (let option of tabOptions) {
        if (tabFiltres.includes(option))
            return true;
    }
    return false;
}

function majFiltresSup(element, type) {
    let parent = element.parentNode;
    let tabInputs = parent.getElementsByTagName('input');
    let tabLabels = parent.getElementsByTagName('label');

    if (type == 'competences') {
        //tabFiltres = filtreCompetences;
        filtreCompetences = [];

        for (let idx = 0 ; idx < tabInputs.length ; idx++) {
            if (tabInputs[idx].checked)
                filtreCompetences.push(tabLabels[idx].innerHTML);
        }
    }
    else {
        filtreLogiciels = [];

        for (let idx = 0 ; idx < tabInputs.length ; idx++) {
            if (tabInputs[idx].checked)
                filtreLogiciels.push(tabLabels[idx].innerHTML);
        }
    }
        //tabFiltres = filtreLogiciels;

    //tabFiltres = [];

    /*for (let idx = 0 ; idx < tabInputs.length ; idx++) {
        if (tabInputs[idx].checked)
            tabFiltres.push(tabLabels[idx]);
    }*/
    
    //applicationFiltresSups();

    if (filtreCompetences.length > 0)
        filtreCompetencesActive = true;
    else
        filtreCompetencesActive = false;

    if (filtreLogiciels.length > 0)
        filtreLogicielsActive = true;
    else
        filtreLogicielsActive = false;

    majListeAffichage();
}

    