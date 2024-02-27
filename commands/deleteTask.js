// Importing packages and functions
import inquirer from "inquirer";
import { connectDB, disconnectDB } from '../db/connectDB.js';
import Todos from '../schema/TodoSchema.js';
import ora from 'ora';
import chalk from 'chalk';

export async function getTaskCode() {
    try {
        const answers = await inquirer.prompt([
            { name: 'code', message: 'Enter the code of the todo: ', type: 'input' },
        ])

        answers.code = answers.code.trim()

        return answers
    } catch (error) {
        console.log('Something went wrong...\n', error)
    }
}

export async function deleteTask() {
    try {
        const userCode = await getTaskCode()

        await connectDB()

        const spinner = ora('Finding and Deleting the ToDo...').start()

        const response = await Todos.deleteOne({ code: userCode })

        spinner.stop()

        if (response.deletedCount === 0) {
            console.log(chalk.redBright('Could not find any Todo matching the provided code. Deletion failed!'))
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully!'))
        }

        await disconnectDB()
    } catch (error) {
        console.log('Something went wrong, Error: ', error)
        process.exit(1)
    }
}