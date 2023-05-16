import EErrors from "../utils/enums.js"

export const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case EErrors.ROUTING_ERROR:
            res.send({ status: `error`, error: error.name, cause: error.cause, message: error.message })
            break

        case EErrors.INVALID_TYPES_ERROR:
            res.send({ status: `error`, error: error.name, cause: error.cause, message: error.message })
            break

        case EErrors.REQUIRED_ERROR:
            res.send({ status: `error`, error: error.name, cause: error.cause, message: error.message })
            break
            
        case EErrors.DATABASE_ERROR:
            res.send({ status: `error`, error: error.name, cause: error.cause, message: error.message })
            break

        default:
            res.send({ status: `error`, error: `Unhandled error`, message: error.message })
    }
}