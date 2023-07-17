import nodemailer from 'nodemailer'

//mandar e-mail
let transporter = nodemailer.createTransport({ //Genero la forma de enviar info desde mail (o sea, desde Gmail con x cuenta)
    host: 'smtp.gmail.com', //Defino que voy a utilizar un servicio de Gmail
    port: 465,
    secure: true,
    auth: {
        user: "atchiam.fe@gmail.com", //Mail del que se envia informacion
        pass: "wkohkvdycnlkesmq",
        authMethod: 'LOGIN'
    }
})

export const sendResetMail = async (token, email) => {
    try {
        await transporter.sendMail({
            from: 'atchiam.fe@gmail.com',
            to: email,
            subject: "Zoopets",
            html:`
                <p>cliquea en el enlace para restablecer tu contraseña:</p>
                <a> href="http://localhost:3000/resetpassword?token=${token}">Restablecer contraseña</a>
                ` ,
            attachments: []
        })
    } catch (error) {
        throw error
    }
}

export const sendDeleteMails = async (emails) => {
    try {
        for (const email of emails) {
            await transporter.sendMail({
                from: 'atchiam.fe@gmail.com',
                to: email,
                subject: "Zoopets - tu cuenta fue eliminada",
                html:`
                    <p>Tu cuenta fue eliminada por inactividad, volvete a registrar para segir usando nuestra pagina</p>
                    <p>Zoopets.ink</p>
                    ` ,
                attachments: []
            })
        }
    } catch (error) {
        throw error
    }
}