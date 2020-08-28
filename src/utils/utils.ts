export const lagAnkerLinkID = (artikkel: any) => {
    if (artikkel.tittel_i_liste) {
        return artikkel.tittel_i_liste.toLowerCase().replace(/ /g,"-").replace(/[æøå?]/g, '');
    } else {
        return artikkel._id;
    }
}