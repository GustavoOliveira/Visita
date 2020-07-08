import { firebase } from '../back-end/firebase'


export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(retorno => resolve(retorno))
            .catch(erro => reject(erro))
    })
}

export const createUserAPI = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(retorno => resolve(retorno))
        .catch(erro => reject(erro))
    })
}