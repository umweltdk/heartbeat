const { CronJob } = require('cron');

export class Heartbeat {
	private isCron: boolean;
	private interval!: NodeJS.Timeout;
	private intervalTime!: number;
	private cronJob: any;
	private callback: () => void;

	public constructor(intervalDefinition: number, callback?: () => void)
	public constructor(intervalDefinition: string, callback?: () => void)
	public constructor(intervalDefinition: string | number, callback?: () => void) {

		this.callback = callback ? callback : this.noop;

		if (typeof intervalDefinition === 'string') {
			this.isCron = true;
			this.cronJob = new CronJob(intervalDefinition, this.callback);
		} else {
			this.isCron = false;
			this.intervalTime = intervalDefinition;
		}
	}

	public start() {
		if (this.isCron) {
			this.cronJob.start();
		} else {
			this.interval = setInterval(this.callback, this.intervalTime);
		}
	}

	public stop() {
		if (this.isCron) {
			this.cronJob.stop();
		} else {
			clearInterval(this.interval);
		}
	}

	public setIntervalTime(intervalDefinition: string | number) {
		if (typeof intervalDefinition === 'string') {
			this.isCron = true;
			this.cronJob = new CronJob(intervalDefinition, this.callback);
		} else {
			this.isCron = false;
			this.intervalTime = intervalDefinition;
		}
	}

	private noop() {};
}
