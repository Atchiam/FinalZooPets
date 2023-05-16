export const generateUserErrorInfo = (user) => {
    return `uno o mas de los campos se encuentra incompletos
    *first-name : nesecita un valor, se recivio ${user.first_name}
    *last-name  : nesecita un valor, se recivio ${user.last_name}
    *email      : nesecita un valor, se recivio ${user.email}
    *age        : nesecita un valor, se recivio ${user.age}
    *password   : nesecita un valor, se recivio ${user.password}`
}
export const generateProductErrorInfo = (product) => {
    return `uno o mas de los campos se encuentra incompletos o no son validos.
    Propiedades de los productos:
        * title         : (required) string, recivio ${typeof product.title}
        * description   : (required) string, recivio ${typeof product.description}
        * code          : (required) string, recivio ${typeof product.code}
        * price         : (required) number, recivio ${typeof product.number}
        * stock         : (required) number, recivio ${typeof product.stock}
        * category      : (required) string, recivio ${typeof product.category}
        * thumbnails    : array, recivio ${typeof product.thumbnails}`
}

export const stockCartErrorInfo = (product) => {
    return `No hay sufiente Stock:
    * cantidad agregada ${product.cart}
    * cantidad del producto es ${product.stock}`
}