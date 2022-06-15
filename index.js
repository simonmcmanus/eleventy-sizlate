const sizlate = require('sizlate')
    /** 
     * merges layout selectors with sizlate selects specified in the data object 
     * and finds additional selectors by running any mapper functions specified in the data object.
     * example params:
     * data, eg: { sizlate: { h2: 'heading' }, mappers: ['tags'], tags: ['cheese', 'bacon']}
     * layoutSelectors eg: { h1: 'main heading'}
     * mappers - function to call { tags: (data) => data.tags }
     */
const buildSelectors = (data, layoutSelectors, mappers) => {

    let mapped = {}
    if (data.mappers) {

        data.mappers.forEach((mapper) => {
            if (mappers[mapper]) {
                const newSelectors = mappers[mapper](data)
                mapped = {...mapped, ...newSelectors }
            }

        })
    }
    data.mappers = []

    return {
        ...layoutSelectors,
        ...data.sizlate,
        ...mapped
    }
}


const render = (data, layoutSelectors, mappers) => {
    const selectors = buildSelectors(data, layoutSelectors, mappers)
    return sizlate.render(data.template, selectors)
}

module.exports = { buildSelectors, render }