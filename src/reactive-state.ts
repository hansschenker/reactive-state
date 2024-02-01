type State<T> = {
  [P in keyof T]: T[P];
};

export type Observer<T> = (state: State<T>) => void;

export type StateChangeHandler<T> = (state: State<T>) => void;

class ReactiveState<T extends object> {
  private state: State<T>;
  private observers!: Set<Observer<T>>;
  private handler: StateChangeHandler<T>;
  private proxy: State<T>;

  constructor(initialState: State<T>, handler: StateChangeHandler<T>) {
    this.state = initialState;
    this.observers = new Set();
    this.handler = handler;

    this.proxy = new Proxy<T>(this.state, {
      set: (target: T, property: PropertyKey, value: any) => {
        target[property as keyof T] = value;
        this.handler(this.state);
        this.notifyObservers();
        return true;
      },
    });
  }

  getState(): T {
    return this.proxy;
  }
  addObserver(observer: Observer<T>) {
    this.observers.add(observer);
  }

  removeObserver(observer: Observer<T>) {
    this.observers.delete(observer);
  }

  private notifyObservers() {
    for (const observer of this.observers) {
      observer(this.state);
    }
  }
}
export default ReactiveState;
