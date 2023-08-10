import qrCode from "qrcode";

export const generateQRCodeImage = (uuid: string) => {
  qrCode.toFile(".temp/" + uuid + ".png", uuid)
}