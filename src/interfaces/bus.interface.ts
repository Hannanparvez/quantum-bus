import BusTypeEnum from '../enums/bus-type.enum';
import KafkaOptions from './kafka-params.interface';
import RedisOptions from './redis-params.intefrace';

export default interface BusInterface {
    init(option: KafkaOptions | RedisOptions): Promise<void>;
    emit(topic: string, data: any): Promise<void>;
    listen(topic: string, callback: (data: any) => {}): Promise<void>;
}
