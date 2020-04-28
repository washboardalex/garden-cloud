//general function types to use in interfaces or for typing
//functions from third party libraries

export declare type fEmptyVoid = () => void;
export declare type fEmptyReturn = () => any;
export declare type fArgVoid = (...args: any[]) => void;
export declare type fArgReturn = (...args: any[]) => any;