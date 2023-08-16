import qrCode from 'qrcode';
import { createCanvas } from 'canvas';

export const generateQRCodeImage = async (uuid: string) => {
  const canvas = createCanvas(250, 250);
  qrCode.toCanvas(canvas as unknown as string, uuid);
  return canvas.toDataURL();
};
