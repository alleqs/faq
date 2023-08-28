
export type InfoContrib = {
   nome: string
   cnpj: string
   IE: string
   perEscrit: string
   perAp: string
}

export type FAQ = {
   P: string
   R: string
   // likes: number
   // dislikes: number
}

export type FaqMap = Record<string, FAQ[]>
