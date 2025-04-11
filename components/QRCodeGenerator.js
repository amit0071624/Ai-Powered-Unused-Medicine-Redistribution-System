import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaDownload, FaInfoCircle } from 'react-icons/fa';

const QRCodeGenerator = ({ medicineData }) => {
    const [showInfo, setShowInfo] = useState(false);

    const qrData = JSON.stringify({
        id: medicineData.id,
        name: medicineData.medicineName,
        type: medicineData.medicineType,
        expiry: medicineData.expiryDate,
        batch: medicineData.batchNumber,
        manufacturer: medicineData.manufacturer,
        donor: 'anonymous' // For privacy reasons
    });

    const handleDownload = () => {
        const svg = document.querySelector('.qr-code-wrapper svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = `medicine-qr-${medicineData.id}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };

    return (
        <div className="qr-code-container p-6 bg-white rounded-xl shadow-lg text-center transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <FaQrcode className="text-3xl text-blue-600" />
                    <h3 className="text-xl font-semibold">Medicine Tracking</h3>
                </div>
                <button
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setShowInfo(!showInfo)}
                    aria-label="Toggle information"
                >
                    <FaInfoCircle className="text-xl" />
                </button>
            </div>

            {showInfo && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg text-left">
                    <h4 className="font-medium mb-2">Medicine Details:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>Name: {medicineData.medicineName}</li>
                        <li>Type: {medicineData.medicineType}</li>
                        <li>Expiry: {medicineData.expiryDate}</li>
                        <li>Batch: {medicineData.batchNumber}</li>
                        <li>Manufacturer: {medicineData.manufacturer}</li>
                    </ul>
                </div>
            )}

            <div className="qr-code-wrapper p-6 bg-gray-50 rounded-xl inline-block mb-4">
                <QRCodeSVG
                    value={qrData}
                    size={240}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                />
            </div>

            <div className="flex flex-col gap-3">
                <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaDownload /> Download QR Code
                </button>
                <p className="text-sm text-gray-600">
                    Scan to verify authenticity and track medicine journey
                </p>
            </div>
        </div>
    );
};

export default QRCodeGenerator;