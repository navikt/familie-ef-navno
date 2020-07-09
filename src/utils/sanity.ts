const sanityClient = require('@sanity/client');

export const client = sanityClient({
    projectId: 'f837udrm',
    dataset: 'production',
    useCdn: true,
});

export const hentAvsnittQuery = '*[_type == $type][0]';

export const hentSideQuery = `*[_type == $type && side_id == $side_id][0]{
    hovedtittel, 
    side_id, 
    alertstripe,
    artikler[]->{
    artikkel_id,
    tittel_i_panel,
    "bilde": ikon.asset->url,
    "alttekst": ikon.alttekst,
    _id,
    avsnitt[]->{
	...,
  
}}}`;

export const gammelHentSideQuery = `*[_type == $type && side_id == $side_id][0]{
    hovedtittel, 
    side_id, 
    artikler[]->{
    artikkel_id,
    tittel_i_panel,
    "bilde": ikon.asset->url,
    "alttekst": ikon.alttekst,
    avsnitt[]->{
    avsnitt_innhold,
    filtrer_blir_staende,
    filtrer_1_til_8,
    filtrer_over_8,
    filtrer_under_1,
    filtrer_i_arbeid,
    filtrer_utdanning,
    filtrer_arbeidssoker,
    filtrer_egen_virksomhet,
    filtrer_sykdom,
    filtrer_tilsyn,
    filtrer_barnepass,
    knapp[]->
    }
}}`;

export const hentTall = `*[_type == 'tall' && _id==$tall_id]`

export const BlockContent = require('@sanity/block-content-to-react');