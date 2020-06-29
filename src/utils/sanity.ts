const sanityClient = require('@sanity/client');

export const client = sanityClient({
    projectId: 'f837udrm',
    dataset: 'production',
    useCdn: true,
})