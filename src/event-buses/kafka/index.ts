import { Kafka, Producer, Consumer, logLevel } from 'kafkajs';
import BusInterface from '../../interfaces/bus.interface';
import BusTypeEnum from '../../enums/bus-type.enum';
import KafkaOptions from '../../interfaces/kafka-params.interface';

export default class KafkaBus implements BusInterface {
    kafka: Kafka;
    producer: Producer;
    consumer: Consumer;

    async init({ busType, options }: KafkaOptions) {
        const kafkaOptions = {
            clientId: options.clientId,
            brokers: options.brokers,
            retry: {
                retries: options.retries,
            },
            logLevel: logLevel.ERROR,
        };
        const auth = options.auth;

        if (auth) {
            kafkaOptions['ssl'] = auth.ssl;
            kafkaOptions['sasl'] = auth.sasl;
        }
        this.kafka = new Kafka(kafkaOptions);

        this.producer = this.kafka.producer();

        try {
            await this.producer.connect();
        } catch (error) {
            console.log({ producerError: error });
        }
        this.consumer = this.kafka.consumer({
            groupId: options.groupId,
        });

        try {
            await this.consumer.connect();
        } catch (error) {
            console.log({ consumerError: error });
        }
    }
    async emit(topic: string, data: any) {
        await this.producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(data) }],
        });
    }
    async listen(topic: string, callback: (data: any) => {}) {
        console.log(`listening to ${topic}`);
        await this.consumer.subscribe({ topic: topic, fromBeginning: true });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                callback({
                    timestamp: message.timestamp.toString(),
                    ...JSON.parse(message.value.toString()),
                });
            },
        });
    }
}
