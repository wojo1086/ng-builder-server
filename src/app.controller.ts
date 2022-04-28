import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';

const {spawn} = require('child_process');
const {exec} = require('child_process');

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello() {
        const ng = spawn('npx.cmd', ['-p', '@angular/cli', 'ng', 'new', 'ng-test', '--defaults', '--skip-install', '--skip-git', '--directory=ng/ng-test']);

        ng.stdout.on('data', data => {
            console.log(`stdout: ${data}`);
        });

        ng.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });

        ng.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });

        ng.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });

        // return this.appService.getHello();
    }
}
