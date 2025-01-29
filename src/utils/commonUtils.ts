import fs from 'fs';
import path from 'path';

export class CommonUtils {

    static loadJson(filePath: string){
        try {
            const absolutePath = path.resolve(filePath);
            if (!fs.existsSync(absolutePath)) {
                throw new Error(`JSON file not found at ${absolutePath}`);
            }
            const fileContent = fs.readFileSync(absolutePath, 'utf-8');
            return JSON.parse(fileContent);
        } catch (error) {
            console.error(`Error loading JSON file: ${error.message}`);
            return null;
        }
    }

}
