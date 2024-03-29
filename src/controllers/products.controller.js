import { findProductsById, insertProducts,updateOneProducts, paginateProducts,deleteOneProducts } from "../services/productService.js";

export const getProd = 
    async (req, res, next) => { 
        try{
            console.log(req.query)
            
            const {limit = 10, page = 1, sort = 0, category="", available=""} = req.query
    
            const filtros = {stock:{ $gt: 0 }}
            if (category) filtros.category = category
            if (available) filtros.available = available
            
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: {price: parseInt(sort)} // los valores pueden ser: asc, desc, ascending, descending, 1 y -1.
            }
    
            const productsPag= await paginateProducts(filtros, options)
    
            const linkPrev = productsPag.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.prevPage}`: null
            const linkNext = productsPag.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.nextPage}`: null
    
            const send = {
            status:"success",
            payload: productsPag.docs,
            totalPages: productsPag.totalPages,
            prevPage: productsPag.prevPage,
            nextPage: productsPag.nextPage,
            page: productsPag.page,
            hasPrevPage: productsPag.hasPrevPage,
            hasNextPage: productsPag.hasNextPage,
            prevLink: linkPrev,
            nextLink: linkNext,}

            const data = req.query.menssage;
            
            // res.render('products', { titulo: "PetsShop - Catalogo",
            // paginate: send,
            // products: send.payload,
            // menssage:data});

            res.status(200).json({ 
                titulo: "PetsShop - Catalogo",
                paginate: send,
                products: send.payload,
                menssage:data
            })
    
    
        }catch(error){
            res.status(400).send(error.message)
        }
    }

export const getProdId = async (req, res, next) => {
    const idProd = req.params.id

    try{
        const prod = await findProductsById(idProd)
        return res.status(200).json(prod)

    }catch(error){
        next(error)
    }
    }

export const addProd = async (req, res, next) => { 
    const info = req.body
    try{
        const prod = await insertProducts(info)
        return res.status(200).send(prod)

    }catch(error){
        next(error)
    }
}

export const delProd = async (req, res, next) => {
    const idProd = req.params.id

    try{
        const prod = await deleteOneProducts(idProd)
        if(prod){
            return res.status(200).send("se borro correctamente")
        }

        res.status(400).send(error.message)
        

    }catch(error){
        next(error)
    }
}


export const putProd = async (req, res, next) => { 
    const idProd = req.params.id
    const info = req.body

    try{
        const prod = await updateOneProducts(idProd,info)
        if(prod){
            return res.status(200).send("el producto se actualizo correctamente")
        }

        res.status(400).send(error.message)
        

    }catch(error){
        next(error)
    }
}