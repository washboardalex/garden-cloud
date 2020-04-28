import { CREATE_GARDEN } from './garden.types';
import IActionWithPayload from '../../types/utils/IActionWithPayload';

export const createGarden = (length: number, width: number) => ({
    type: CREATE_GARDEN,
    payload: { length, width }
});
