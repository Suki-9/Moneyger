const { execSync } = require('child_process');
const { readFileSync, writeFileSync, readdirSync, statSync } = require('fs');

try {
  execSync('cd frontend && pnpm i && pnpm build');
  console.log(`Build Success: frontend`);

  execSync('cd backend && pnpm i && pnpm build');
  console.log(`Build Success: backend`);
  
  const basePath = 'backend/dist/Public';
  const getFilePath = (path) => readdirSync([basePath, path].join('/'))
    .map(v => statSync([basePath, path, v].join('/')).isFile() ? `'${[path, v].join('/')}'` : getFilePath([path, v].join('/'))).flat();

  writeFileSync(
    'backend/dist/Public/sw.js',
    readFileSync('backend/dist/Public/sw.js', 'utf-8')
      .replace('/* filePath */', [`'/'`, ...getFilePath()].join())
  );

  execSync('cd backend && pnpm start');

} catch (e) {
  console.log(e);
}
