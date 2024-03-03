import BusInterface from '../interfaces/bus.interface';

export default class BusProducer {
    bus: BusInterface;
    constructor(bus: BusInterface) {
        this.bus = bus;
    }
    emit(name: string, data: any) {
        this.bus.emit(name, data);
    }
}
