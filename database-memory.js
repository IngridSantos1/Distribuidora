import { randomUUID } from "crypto"


export class DatabaseMemory{
    #lubrificantes = new Map()

list(search){
    return Array.from(this.#lubrificantes.entries()).map((lubrificanteArray) => {
        const id = lubrificanteArray[0]

        const data = lubrificanteArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(lubrificante => {
        if (search){
            return lubrificante.nome.includes(search)
        }
        return true
    })
}

    create(lubrificante){
        const lubrificanteId = randomUUID()
        this.#lubrificantes.set(lubrificanteId, lubrificante)
    }
    
    update(id, lubrificante){
        this.#lubrificantes.set(id, lubrificante)
    }

    delete(id, lubrificante){
        this.#lubrificantes.delete(id, lubrificante)
    }
}