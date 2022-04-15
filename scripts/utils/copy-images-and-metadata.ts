import * as fs from "fs";
import * as fse from "fs-extra";
import { PATH, HASHLIPS } from "./config";

async function copyImages(src: string, dest: string) {
    if (HASHLIPS.enabled) {
        remakeDir(dest);
        fse.copySync(src, dest, { overwrite: true });
    }
}

async function copyMetadata(src: string, dest: string) {
    if (HASHLIPS.enabled) {
        fse.copySync(src, dest, { overwrite: true });
        fs.rmSync(dest + "/_metadata.json");
    }
}

async function remakeDir(dest: string) {
    if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.mkdirSync(dest);
}

export async function copyImagesAndMetadata() {
    await copyImages(PATH.hashlipsImages, PATH.images);
    await copyMetadata(PATH.hashlipsMetadata, PATH.tokenMetadata);

    await remakeDir(PATH.contractMetadata);
    await remakeDir(PATH.tokenURIs);
}

export default copyImagesAndMetadata;
