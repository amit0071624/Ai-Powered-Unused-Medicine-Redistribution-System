import * as tf from "@tensorflow/tfjs";

export default function UploadMedicineImage({ onImageProcessed }) {
  const processImage = async (image) => {
    const model = await tf.loadLayersModel("/path-to-your-model.json");
    const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([128, 128]).expandDims();
    const result = model.predict(tensor);
    onImageProcessed(result);
  };

  return <input type="file" onChange={(e) => processImage(e.target.files[0])} />;
}
