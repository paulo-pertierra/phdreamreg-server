import { Registree } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import { generateQRCodeImage } from "./qrcode.plugin";
import { uploadImage } from "./cloudinary.plugin";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async (registree: Registree) => {
  
  generateQRCodeImage(registree.uuid);

  const imageUrl = await uploadImage(__dirname + "/../../.temp/" + registree.uuid + ".png");
  console.log(imageUrl)
  await sgMail
    .send({
      to: registree.contactEmail,
      from: "paulo.pertierra@bracketdevs.net",
      subject: "Thanks for registering to Philippine Dreamin' Conference!",
      text: "This is an email test for the Express application Sendgrid API Integration.",
      html: `
      <!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
        <head>
          <title>Registration success!</title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
          #outlook a {
          padding: 0;
        }
  
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
  
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
  
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
  
        p {
          display: block;
          margin: 13px 0;
        }
      </style>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
        <![endif]-->
          <!--[if lte mso 11]>
            <style type="text/css">
              .mj-outlook-group-fix { width:100% !important; }
          </style>
        <![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
  
          .mj-column-per-50 {
            width: 50% !important;
          max-width: 50%;
        }
      }
  
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
  
        .moz-text-html .mj-column-per-50 {
          width: 50% !important;
          max-width: 50%;
        }
  
      </style>
      <style type="text/css">
        @media only screen and (max-width:479px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
  
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
  
      </style>
      <style type="text/css">
      </style>
    </head>
  
    <body style="word-spacing:normal;background-color:#E7E7E7;">
      <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Welcome to Philippine Dreamin'</div>
      <div style="background-color:#E7E7E7;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#040B4F;background-color:#040B4F;width:100%;">
          <tbody>
            <tr>
              <td>
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#040B4F" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:150px;">
                                            <img alt src="https://placehold.co/700x400" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150" height="auto">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="body-section-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div class="body-section" style="-webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); margin: 0px auto; max-width: 600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0;padding-top:0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;font-weight:bold;line-height:24px;text-align:left;color:#212b35;">Registration Success!</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Hi ${ registree.firstName },</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">We are thrilled to welcome you for our upcoming Philippines Dreamin' 2023 conference! Join the highly anticipated meetup with fellow Salesforce Trailblazers like yourself!</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">
                                        <li>Gain valuable knowledge from tenured Salesforce keynote speakers.</li>
                                        <li>Dive deep into interactive activities guided by Salesforce MVPs.</li>
                                        <li>Make valuable connections with fellow Trailblazers and expand your network with dedicated networking sessions!</li>
                                        <li>Walk away with fantastic giveaways, and surprises waitig for you there!</li>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Get ready for the spirit of learning, collaboration, and innovation. We can't wait to meet you in person!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:0 15px 0 15px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;font-weight:bold;line-height:24px;text-align:left;color:#212b35;">Registration Ticket</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Please show your registration ticket to the entrance booth.</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:300px;">
                                              <img src="${ imageUrl }" width="300px" height="300px" alt="${ registree.uuid }" />
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;padding-top:0;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <p style="border-top:solid 1px #DFE3E8;font-size:1px;margin:0px auto;width:100%;">
                                      </p>
                                      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #DFE3E8;font-size:1px;margin:0px auto;width:520px;" role="presentation" width="520px" ><tr><td style="height:0;line-height:0;"> &nbsp;
    </td></tr></table><![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:0 15px 0 15px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;font-weight:bold;line-height:24px;text-align:left;color:#212b35;">See you there!</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:285px;" ><![endif]-->
                            <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:24px;text-align:left;text-transform:uppercase;color:#212b35;">address</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:24px;text-align:left;color:#637381;"><strong>Philippine International Convention Center</strong>
                                        <br>
                                        <br> Vicente Sotto St., CCP Complex, Pasay
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:285px;" ><![endif]-->
                            <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:24px;text-align:left;text-transform:uppercase;color:#212b35;">Schedule</div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;">
                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:24px;text-align:left;color:#637381;">Monday, October 20: 8:00AM - 5:00PM <br> Tuesday, October 21: 8:00AM - 5:00PM <br> Wednesday, October 21: 8:00AM - 5:00PM</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;padding-left:15px;padding-right:15px;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:570px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                        <tbody>
                                          <tr>
                                            <td style="width:520px;">
                                              <img alt src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153579/Email/Images/AnnouncementOffset/map.jpg" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="520" height="auto">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td>
                <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                        <tbody>
                                          <tr>
                                            <td style="vertical-align:top;padding:0;">
                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:bold;line-height:24px;text-align:center;color:#445566;">View this email in your browser</div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:16px;text-align:center;color:#445566;">You are receiving this email advertisement because you registered with Philippines Dreamin' 2023 Conference.</div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                      <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:16px;text-align:center;color:#445566;">Salesforce Trailblazers Community</div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                          <div style="margin:0px auto;max-width:600px;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:20px 0;padding-top:0;text-align:center;">
                                    <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:600px;" ><![endif]-->
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                                      <!--[if mso | IE]><table border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td style="vertical-align:top;width:600px;" ><![endif]-->
                                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                          <tbody>
                                            <tr>
                                              <td style="vertical-align:top;padding-right:0;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                        <div style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:11px;font-weight:bold;line-height:16px;text-align:center;color:#445566;"><a class="footer-link" href="https://www.google.com" style="color: #888888;">Privacy</a>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;<a class="footer-link" href="https://www.google.com" style="color: #888888;">Unsubscribe</a></div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <!--[if mso | IE]></td></tr></table><![endif]-->
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]-->
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
  
    </html>
    `
    })
  .then(() => {
    console.log("sent an email to one user.")
  })
  .catch((error) => {
    console.error(error.response.body);
  })
}
