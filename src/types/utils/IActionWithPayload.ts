import { Action } from 'redux';

export default interface IActionWithPayload extends Action {
    type: string,
    payload?: any
}
