import { db } from '../back-end/firebase'

export const saveCliente = (cliente, chave) => {

    if (chave === "") {
        return new Promise((resolve, reject) => {
            db.collection("clientes")
                .add(cliente)
                .then(result => resolve(result.id))
                .catch(erro => reject(erro))
        })
    } else {
        return new Promise((resolve, reject) => {
            db.collection("clientes")
                .doc(chave)
                .update(cliente)
                .then(() => resolve())
                .catch(erro => reject(erro))
        })
    }
}

export const deleteCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        db.collection("clientes")
            .doc(cliente.key)
            .delete()
            .then(() => resolve())
            .catch(erro => reject(erro))
    })
}

export const getCliente = () => {
    return new Promise((resolve, reject) => {
        db.collection("clientes")
            .get()
            .then(snapchot => {
                let clientesLista = []
                snapchot.forEach((item) => {
                    //const { title, description } = item.data()
                    clientesLista.push({
                        ...item.data(),
                        key: item.id
                    })
                })
                resolve(clientesLista)
            })
            .catch(erro => reject(erro))
    })
}