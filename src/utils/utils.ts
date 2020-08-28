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