export const signupVerificationMail =  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; background-color:#E1E0E0; font-family: Arial, sans-serif;">

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#E1E0E0; padding: 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" max-width="450px" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F7F7; box-shadow: rgba(0, 0, 0, 0.45) 0px 10px 20px -10px; width: 100%; max-width: 450px; padding: 20px;">
                    <tr>
                        <td align="center">
                            <img src="https://www.pngplay.com/wp-content/uploads/7/Blogging-Free-PNG.png" alt="Blogging Logo" width="200" height="80" style="display: block;">
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="background-color: #fff; padding: 20px;">
                            <h1 style="text-align: center; font-size: 24px; color: green; margin: 0;">Thanks for Signing Up!</h1>
                            <p style="text-align: center; font-size: 16px; color: #333;">Welcome to our community!</p>
                            <p style="text-align: center; font-size: 14px; color: #333;">Please verify your email to access exclusive blog posts and premium content.</p>
                            <p style="text-align: center; font-size: 18px; font-weight: bold; color: #FFC003;">Thank You!</p>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center">
                                        <a href="{verification_link}" style="display: inline-block; padding: 12px 20px; background-color: #FFC003; color: #000; text-decoration: none; font-size: 16px; border-radius: 4px;">Verify Email Now</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>
`



export const otpSendMail = `<!DOCTYPE html>
<html>
<head>
    <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">

    <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto;">
        
        <h2 style="color: #333;">Your OTP Code</h2>
        
        <p style="color: #555; font-size: 16px;">Use the OTP below to verify your email.</p>
        
        <div style="font-size: 24px; font-weight: bold; color: #2c3e50; padding: 10px; background: #ecf0f1; display: inline-block; border-radius: 5px; margin: 20px 0;">
            {OTP}
        </div>
        
        <p style="color: #777; font-size: 14px;">If you didn’t request this, you can safely ignore this email.</p>
        
        <p style="color: green; font-size: 12px; margin-top: 20px; font-weight: 600;">Thank you!</p>
    
    </div>

</body>
</html>
`