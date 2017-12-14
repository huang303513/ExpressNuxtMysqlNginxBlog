import development from './development.js'
import production from './production.js'

export default function getConfig(name="production") {
    if (name=='production') {
        return production;
    } else {
        return development;
    }
}