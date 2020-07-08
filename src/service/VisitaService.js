import { db } from '../back-end/firebase'

export const saveVisita = (visita, chave) => {
    console.log(visita)
    if (chave === "") {
        return new Promise((resolve, reject) => {
            db.collection("visita")
                .add(visita)
                .then(result => resolve(result.id))
                .catch(erro => reject(erro))
        })
    } else {
        return new Promise((resolve, reject) => {
            db.collection("visita")
                .doc(chave)
                .update(visita)
                .then(() => resolve())
                .catch(erro => reject(erro))
        })
    }
}

export const deleteVisita= (visita) => {
    return new Promise((resolve, reject) => {
        db.collection("visita")
            .doc(visita.key)
            .delete()
            .then(() => resolve())
            .catch(erro => reject(erro))
    })
}

export const getVisita = () => {
    return new Promise((resolve, reject) => {
        db.collection("visita")
            .get()
            .then(snapchot => {
                let visitaLista = []
                snapchot.forEach((item) => {
                    //const { title, description } = item.data()
                    visitaLista.push({
                        ...item.data(),
                        key: item.id
                    })
                })
                resolve(visitaLista)
            })
            .catch(erro => reject(erro))
    })
}