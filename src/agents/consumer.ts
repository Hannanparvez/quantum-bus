import BusInterface from '../interfaces/bus.interface';

export default class BusConsumer {
    consumers: { name: string; callback: (data: any) => Promise<void> }[] = [];
    bus: BusInterface;
    setBus(bus: BusInterface) {
        this.bus = bus;
        return this;
    }

    listen(name: string, callback: (data: any) => Promise<void>) {
        this.consumers.push({ name, callback });
    }

    register() {
        this.consumers.forEach((consumer) => {
            this.bus.listen(consumer.name, consumer.callback);
        });
    }
}
