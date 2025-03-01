import * as fs from 'fs';
import * as path from 'path';

fs.writeFileSync(path.join(__dirname, '../out', '.nojekyll'), '');