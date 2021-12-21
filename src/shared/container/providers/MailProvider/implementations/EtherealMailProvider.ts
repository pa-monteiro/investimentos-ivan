import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import handlebars from 'handlebars';
import fs from 'fs';


@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        })
        .catch(err => console.error(err))
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
       const templateFileContent = fs.readFileSync(path).toString("utf-8");
       const templateParse = handlebars.compile(templateFileContent)
       const templateHtml = templateParse(variables)

        const info = await this.client.sendMail({
            to,
            from: "Horizont Investimentos <noreply@horizontinvestimentos.com.br>",
            subject,
            html: templateHtml
        })

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

}

export {EtherealMailProvider}