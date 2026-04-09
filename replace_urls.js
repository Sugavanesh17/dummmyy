import fs from 'fs';
import path from 'path';

const searchPath = 'c:/Users/T470s/Desktop/VitalSense/frontend/src/components';
const searchRegex = /http:\/\/localhost:5000/g;
const replacement = '` + (import.meta.env.VITE_API_URL || "http://localhost:5000") + `';

const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    if(content.includes('http://localhost:5000') && !content.includes('import.meta.env')) {
        // Need to change string literals to template strings
        // e.g. 'http://localhost:5000/api/auth' -> `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth`
        content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
        content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
};

const components = fs.readdirSync(searchPath);
components.forEach(file => {
    if(file.endsWith('.jsx')) {
        replaceInFile(path.join(searchPath, file));
    }
});
console.log('Done!');
