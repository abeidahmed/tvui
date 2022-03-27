const path = require('path');
const dynamicImport = require('./esbuild/plugins/dynamicImport');

require('esbuild')
  .build({
    entryPoints: ['application.js'],
    bundle: true,
    outdir: path.join(process.cwd(), 'app/assets/builds'),
    absWorkingDir: path.join(process.cwd(), 'app/javascript'),
    watch: process.argv.includes('--watch'),
    plugins: [dynamicImport()],
  })
  .catch(() => process.exit(1))
