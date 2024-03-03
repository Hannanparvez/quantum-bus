import BusTypeEnum from '../enums/bus-type.enum';

export default interface KafkaParams {
    busType: BusTypeEnum.KAFKA;
    options: {
        clientId: string;
        brokers: string[];
        groupId: string;
        retries: number;
        auth?: {
            ssl: boolean;
            sasl: {
                mechanism: string;
                username: string;
                password: string;
            };
        };
    };
}
