export type orderProps={
    user:string,
    items:[
        product:string,
        quantity:number,
        price:number,
    ],
    customerInfo:{
        firstName:string,
        lastName:string,
        email:string,
        phone:string,
        address:string,
        city:string,
        state:string,
        postalCode:string,
        country:string,
        orderNote :string,
    },
    totalAmount:string,
    status:'pending'|'paid'|'shipped'|'completed'|'cancelled',
    paymentMethod:string,
}