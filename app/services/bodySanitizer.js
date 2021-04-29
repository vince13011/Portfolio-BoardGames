const sanitizeHtml = require('sanitize-html');

// Le but de ce middleware est de nettoyer les données envoyées par les utilisateurs
const bodySanitizer = (request, response, next) => {

    // dans le cas d'un tableau
    const sanitizeArray = (array) => {
        return array.map(el => sanitizeProp(el));
    }


    // dans le cas d'un objet
    const sanitizeObject = (object) => {
        for (const propName in object) {
            object[propName] = sanitizeProp(object[propName]);
        }
        return object;
    }

    // en fonction du format des données, nous passons par l'une des deux fonctions ci-dessus
    const sanitizeProp = (propValue) => {
        if (Array.isArray(propValue)) {
            return sanitizeArray(propValue);
        } else if (typeof propValue === "object") {
            return sanitizeObject(propValue);
        }
        return sanitizeHtml(propValue);
    }


    if (request.body) {
        for (const propName in request.body) {
            // Grâce à la propriété de l'objet request.body, on peut lui attribuer une nouvelle valeur en lui redonnant sa propre valeur
            // mais en prenant soin de le transformer en utilisant la fonction sanitizeHtml du module sanitize-html
            request.body[propName] = sanitizeProp(request.body[propName]);
        }
    }
    next();
}

module.exports = bodySanitizer;