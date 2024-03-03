import BusTypeEnum from './src/enums/bus-type.enum';
import BusFactory from './src/factories/bus.factory';
import BusConsumer from './src/agents/consumer';
import BusProducer from './src/agents/producer';
import KafkaOptions from './src/interfaces/kafka-params.interface';
import RedisOptions from './src/interfaces/redis-params.intefrace';

let producer: BusProducer;

const init = async ({
    params,
    consumers = [],
}: {
    consumers?: BusConsumer[];
    params: KafkaOptions | RedisOptions;
}) => {
    const bus = BusFactory.initialize(params.busType);

    producer = new BusProducer(bus);

    await bus.init(params);

    consumers.forEach((consumer) => {
        consumer.setBus(bus).register();
    });
};

const getConsumer = () => {
    return new BusConsumer();
};
const getProducer = () => {
    return producer;
};

export { init, getProducer, getConsumer, BusTypeEnum };
