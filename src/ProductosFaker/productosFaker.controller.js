import { findProductosById, insertProductos, updateOneProductos, paginateProductos, deleteOneProductos } from "./productosServiceFaker.js"
import { faker } from '@faker-js/faker';

export const prodFaker = async (req, res) => {
    const products = []

    const createRandomProducts  = () => {
        return {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(100, 1000, 0),
            code: faker.random.numeric(5),
            category: faker.commerce.productMaterial(),
            stock:faker.datatype.number({ min: 0, max: 200, precision: 1 })
        };
    }
    for (let i = 0; i < 100; i++) {
        products.push(createRandomProducts());
    }

    try {
        await insertProductos(products)

        const { limit = 10, page = 1, sort = 0, category = "", available = "" } = req.query

            const filtros = { stock: { $gt: 0 } }
            if (category) filtros.category = category
            if (available) filtros.available = available

            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: { price: parseInt(sort) } // los valores pueden ser: asc, desc, ascending, descending, 1 y -1.
            }

            const productsPag = await paginateProductos(filtros, options)

            const linkPrev = productsPag.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.prevPage}` : null
            const linkNext = productsPag.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.nextPage}` : null

            const send = {
                status: "success",
                payload: productsPag.docs,
                totalPages: productsPag.totalPages,
                prevPage: productsPag.prevPage,
                nextPage: productsPag.nextPage,
                page: productsPag.page,
                hasPrevPage: productsPag.hasPrevPage,
                hasNextPage: productsPag.hasNextPage,
                prevLink: linkPrev,
                nextLink: linkNext,
            }

            const data = req.query.menssage;

            res.status(200).json({
                titulo: "PetsShop - Catalogo",
                paginate: send,
                products: send.payload,
                menssage: data
            })

    } catch (error) {
        res.status(400).send(error.message)
    }
}


export const AgregarProdFaker = async (req, res) => {
    const products = []

    try {
        const createRandomProducts  = () => {
            return {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(100, 1000, 0),
                code: faker.random.numeric(5),
                category: faker.commerce.productMaterial(),
                stock:faker.datatype.number({ min: 0, max: 200, precision: 1 })
            };
        }
        for (let i = 0; i < 50; i++) {
            products.push(createRandomProducts());
        }
        const prod = await insertProductos(products)
        return res.status(200).json(products)

    } catch (error) {
        res.status(400).send(error.message)
    }
}


export const getProductos = async (req, res) => {
        try {
            console.log(req.query)

            const { limit = 10, page = 1, sort = 0, category = "", available = "" } = req.query

            const filtros = { stock: { $gt: 0 } }
            if (category) filtros.category = category
            if (available) filtros.available = available

            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: { price: parseInt(sort) } // los valores pueden ser: asc, desc, ascending, descending, 1 y -1.
            }

            const productsPag = await paginateProductos(filtros, options)

            const linkPrev = productsPag.hasPrevPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.prevPage}` : null
            const linkNext = productsPag.hasNextPage ? `/api/products?category=${category}&limit=${limit}&sort=${sort}&avaliable=${available}&page=${productsPag.nextPage}` : null

            const send = {
                status: "success",
                payload: productsPag.docs,
                totalPages: productsPag.totalPages,
                prevPage: productsPag.prevPage,
                nextPage: productsPag.nextPage,
                page: productsPag.page,
                hasPrevPage: productsPag.hasPrevPage,
                hasNextPage: productsPag.hasNextPage,
                prevLink: linkPrev,
                nextLink: linkNext,
            }

            const data = req.query.menssage;

            res.status(200).json({
                titulo: "PetsShop - Catalogo",
                paginate: send,
                products: send.payload,
                menssage: data
            })


        } catch (error) {
            res.status(400).send(error.message)
        }
    }

export const getProductosId = async (req, res) => {
    const idProd = req.params.id

    try {
        const prod = await findProductosById(idProd)
        return res.status(200).json(prod)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const addProductos = async (req, res) => {
    const info = req.body

    try {
        const prod = await insertProductos(info)
        return res.status(200).send(prod)

    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const delProductos = async (req, res) => {
    const idProd = req.params.id

    try {
        const prod = await deleteOneProductos(idProd)
        if (prod) {
            return res.status(200).send("se borro correctamente")
        }

        res.status(400).send(error.message)


    } catch (error) {
        res.status(400).send(error.message)
    }
}


export const putProductos = async (req, res) => {
    const idProd = req.params.id
    const info = req.body

    try {
        const prod = await updateOneProductos(idProd, info)
        if (prod) {
            return res.status(200).send("el producto se actualizo correctamente")
        }

        res.status(400).send(error.message)


    } catch (error) {
        res.status(400).send(error.message)
    }
}