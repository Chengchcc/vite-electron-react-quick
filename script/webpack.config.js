const path = require('path');
const join = require('path').join;

module.exports = (mode= 'production')=>{
    return {
        mode,
        entry: join(__dirname, '../src/main/index.ts'),
        output: {
            path: join(__dirname, '../dist/main'),
            filename: 'build.js'
        },
        target: 'electron-main',
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': join(__dirname, 'src/main')
            }
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/,
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'ts',
                    }
                }
            ]
        }
    }
}