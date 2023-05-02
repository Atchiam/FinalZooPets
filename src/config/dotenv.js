import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program
    .option('--mode <mode>', "Ingrese el modo de trabajo", 'DEVELOPMENT')
program.parse()

const enviroment = program.opts().mode

dotenv.config({
    path: enviroment === "DEVELOPMENT" ? './.env.development' : './.env.production'
})

