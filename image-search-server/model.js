import { AutoProcessor, AutoTokenizer, CLIPVisionModelWithProjection, CLIPTextModelWithProjection, RawImage } from '@xenova/transformers';

const tokenizerPromise = AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch16');
const textModelPromise = CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16');
const processorPromise = AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
const visionModelPromise = CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16');

export async function visionEmbeddingGenerator(image_path){
    const processor = await processorPromise
    const visionModel = await visionModelPromise
    try { 
        // Read image and run processor
        const image = await RawImage.read(image_path);
        const image_inputs = await processor(image);
        // Compute embeddings
        const { image_embeds } = await visionModel(image_inputs);

        return image_embeds.data

    } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
    }

}

export async function textEmbeddingGenerator(text){
    const tokenizer = await tokenizerPromise;
    const textModel = await textModelPromise;

    const textInputs = tokenizer([text], { padding: true, truncation: true });
    const { text_embeds } = await textModel(textInputs);

    return text_embeds.data
}