import BusInterface from '../../interfaces/bus.interface';

import { createClient, RedisClientType } from 'redis';
import RedisOptions from '../../interfaces/redis-params.intefrace';

export default class RedisBus implements BusInterface {
    publisher: RedisClientType;
    subscriber: RedisClientType;

    async init(params: RedisOptions) {
        this.publisher = createClient({
            url: params.options.url,
        });
        await this.publisher.connect();

        this.subscriber = createClient({
            url: params.options.url,
        });
        await this.subscriber.connect();
    }
    async emit(topic: string, data: any) {
        this.publisher.publish(
            topic,
            JSON.stringify({ ...data, timestamp: Date.now() })
        );
    }
    async listen(topic: string, callback: (data: any) => {}) {
        console.log(`listening to ${topic}`);
        this.subscriber.subscribe(topic, callback);
    }
}
