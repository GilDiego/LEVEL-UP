
export function filterAPI(array, srcs, gamesRedux) {
    if (srcs.API === false) {
        return array.filter(dog => !gamesRedux.includes(dog))
    }
    else return array
}

export function filterDB(array, srcs, gamesDB) {
    if (srcs.DB === false) {
        return array.filter(dog => !gamesDB.includes(dog))
    }
    else return array
}

export function filterAlphabetically(array, options) {
    if (options.order === 'asc') {
        let asc = [...array]
        asc.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        return asc;
    }
    else if (options.order === 'desc') {
        let desc = [...array]
        desc.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
        return desc;
    }
    else return array
}

export function filterByRating(array, options) {
    if (options.rating === "Lowest-first") {
        let lf = [...array]
        lf.sort((a, b) => a.rating - b.rating);
        return lf
    }
    else if (options.rating === "Highest-first") {
        let hf = [...array]
        hf.sort((a, b) => b.rating - a.rating);
        return hf
    }
    else return array
}
