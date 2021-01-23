import { intervalToDuration } from 'date-fns';
import { writable } from 'svelte/store';

export class Timer {
  startTime?: Date;
  endTime?: Date;
  stoppedDuration = 0;
  private interval?: number;
  formattedTime = writable('00:00:00.000');

  start(): void {
    this.startTime ??= new Date();
    if (this.endTime) this.stoppedDuration += new Date().getTime() - this.endTime.getTime();
    this.interval = setInterval(this.tick.bind(this), 10);
  }

  stop(): void {
    this.endTime = new Date();
    clearInterval(this.interval!);
    this.tick();
  }

  reset(): void {
    clearInterval(this.interval!);
    this.stoppedDuration = 0;
    this.startTime = undefined;
    this.endTime = undefined;
    this.formattedTime = writable('00:00:00.000');
  }

  duration(): Duration {
    if (!this.startTime) return intervalToDuration({ start: 0, end: 0 });

    const end = this.endTime ?? new Date();
    return intervalToDuration({
      start: this.startTime,
      end: this.stoppedDuration ? end.getTime() - this.stoppedDuration : end,
    });
  }

  tick(): void {
    if (!this.startTime) {
      throw new Error('Clock not started but attempted to tick');
    }

    const elapsed = new Date(
      new Date().getTime() - this.startTime.getTime() - this.stoppedDuration
    );

    const hour = elapsed.getUTCHours();
    const min = elapsed.getUTCMinutes();
    const sec = elapsed.getUTCSeconds();
    const ms = elapsed.getUTCMilliseconds();

    this.formattedTime.set(
      (hour > 9 ? hour : '0' + hour) +
        ':' +
        (min > 9 ? min : '0' + min) +
        ':' +
        (sec > 9 ? sec : '0' + sec) +
        '.' +
        (ms > 99 ? ms : ms > 9 ? '0' + ms : '00' + ms)
    );
  }
}
