
// src/core/domain/Entity.ts
export abstract class Entity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }
}

// src/core/services/IService.ts
export interface IService<TResponse, TRequest = unknown> {
  execute(request?: TRequest): Promise<TResponse> | TResponse;
}
