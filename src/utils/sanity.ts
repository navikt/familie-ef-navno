const sanityClient = require('@sanity/client');

export const client = sanityClient({
    projectId: 'f837udrm',
    dataset: 'production',
    useCdn: true,
});

export const hentSideQuery = `*[_type == $type && side_id == $side_id][0]{ hovedtittel, side_id, artikler[]->{avsnitt[]->}}`;