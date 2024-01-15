export type Thing = {
    id: number,
    name: string,
    description: string,
    quantity: number,
    unit: string,
    currency: string,
    price: number,
    discounted_price: number,
    images: [
        {
            file_name: string,
            file_extension: string,
            image: string
        }
    ]
}
  
export type CartThing = {
    id: number,
    quantity: number
}