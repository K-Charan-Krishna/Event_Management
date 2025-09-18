import nodemailer from 'nodemailer'

export const sendEmailResetPasswordLink= async(email,resetLink)=>{
    try {
        console.log(resetLink)
        let transpoter=nodemailer.createTransport({
            host:'smtp.gmail.com',
            auth:{
                user:'charankrishnaa310@gmail.com',
                pass:'hgmx dsvf gxze anlo',
            }
        })
        let mailOptions={
            from:'charankrishnaa310@gmail.com',
            to:'charan.krishna@verifacts.co.in',
            subject:'Reset Your Password',
            html:`
                <p>Reset Your Password!</p>
                <a href=${resetLink}>Click To Reset Password</a>
            `
        }
        transpoter.sendMail(mailOptions)
        return 'Email Sent'
    } catch (error) {
        throw new Error(error.message)
    }
}