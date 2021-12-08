/**
 * electron 打包
 */
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const ora = require('ora');
const waitOn = require('wait-on');
const electron = require('electron-connect').server.create({ stopOnClose: true });
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const options = require('./webpack.config');
const net = require('net');
const { URL } = require('url');

const opt = options(argv.env);
const TAG = '[script/build.js]';
const spinner = ora(`${TAG} Electron build...`);

const watchFunc = function () {
    const compiler = webpack(opt);
    compiler.watch({}, (err, stats) => {
        const log = chalk.green(`change -- ${stats.toString()}`);
        console.log(TAG, log);
        if(err|| stats.hasErrors()) {
            console.error(err || stats.toString());
        }else {
            // init-未启动、started-第一次启动、restarted-重新启动
            electron.electronState === 'init' ? electron.start() : electron.restart();
        }
    })
}

const resource = `http://localhost:${process.env.PORT}/index.html`; // 因为 vite 不会重定向到 index.html，所以直接写 index.html 路由。

if (argv.watch) {
    waitOn({
        resources: [resource],
        timeout: 5000,
    }, err => {
        if (err) {
            const { port, hostname } = new URL(resource);
            const serverSocket = net.connect(port || 80, hostname, () => {
                watchFunc();
            });
            serverSocket.on('error', (e) => {
                console.log(err);
                process.exit(1);
            });
        } else {
            watchFunc();
        }
    });
} else {
    spinner.start();
    webpack(opt).run((err, stats) => {
        spinner.stop();
        if (err || stats.hasErrors()) {
            console.log(`\n${TAG} ${chalk.red('构建报错')}\n`, error, '\n')
        } else {
            console.log(TAG, chalk.green('Electron build successed.'));
        }
    })
}