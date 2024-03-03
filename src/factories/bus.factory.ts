import BusTypeEnum from '../enums/bus-type.enum';
import BusInterface from '../interfaces/bus.interface';
import KafkaBus from '../event-buses/kafka';
import RedisBus from '../event-buses/redis';
export default class BusFactory {
    static initialize(busType: BusTypeEnum): BusInterface {
        if (busType === BusTypeEnum.KAFKA) {
            return new KafkaBus();
        }

        if (busType === BusTypeEnum.REDIS) {
            return new RedisBus();
        }

        throw new Error(`${busType} not implemented`);
    }
}
