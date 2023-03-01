export abstract class Factory<T> {
    public abstract criar(...data: any): Promise<T> | T;
}