export type InitData = {
    LogoImg: string;
    UsedGuid: string;
    UserName: string;
}

export type Thing = {
    Id: number;
    Name: string;
    Description: string;
    Quantity: number;
    Unit: string;
    Сurrency: string;
    Price: number;
    DiscountedPrice: number;
    Images: {
        FileName: string;
        FileExtension: string;
        Image: string;
    }[];
}
  
export type CartThing = {
    id: number;
    quantity: number;
}

export type CartItemPayload = {
    ProductId: number;
    UserGuid: string;
}

export type CartItemChangePayload = {
    ProductId: number;
    UserGuid: string;
    value: number;
}

export type CartChangePayload = {
    id: number;
    value: number;
}