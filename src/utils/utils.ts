export const formaterID = (tekst: string) => {
    return tekst.toLowerCase().replace(/ /g,"-").replace(/[æøå?]/g, '');
}

export const lagArtikkelAnkerLinkID = (artikkel: any) => {
    if (artikkel.tittel_i_liste) {
        return formaterID(artikkel.tittel_i_liste);
    } else {
        return artikkel._id;
    }
}

export const lagAvsnittAnkerLinkID = (avsnitt: any) => {
    let avsnittID = avsnitt._id;

    if (avsnitt.avsnitt_innhold && avsnitt.avsnitt_innhold[0].style === 'h3') {
        avsnittID = formaterID(avsnitt.avsnitt_innhold[0].children[0].text);
    }

    return avsnittID;
}