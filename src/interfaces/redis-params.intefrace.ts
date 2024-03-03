import BusTypeEnum from '../enums/bus-type.enum';

export default interface RedisParams {
    busType: BusTypeEnum.REDIS;
    options: {
        url: string;
    };
}
