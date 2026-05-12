// https://www.sanity.io/docs/structure-builder-cheat-sheet
//src/sanity/structure.js
export const structure = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
