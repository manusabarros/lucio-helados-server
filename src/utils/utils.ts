export const diacriticSensitiveRegex = (searchValue: string = "") => {
    return new RegExp(".*" + searchValue.replace(/a/g, "[a,á,à,ä]").replace(/e/g, "[e, é]").replace(/i/g, "[i, í]").replace(/o/g, "[o, ó]").replace(/u/g, "[u, ú, ü]") + ".*", "ig");
};
