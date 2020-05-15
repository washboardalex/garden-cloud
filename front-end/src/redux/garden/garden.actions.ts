import IActionWithPayload from '../../types/utils/IActionWithPayload';
import IGardenBed from '../../types/models/IGardenBed';
import { 
    CREATE_GARDEN ,
    CREATE_BED
} from './garden.types';

export const createGarden = (length: number, width: number) : IActionWithPayload => ({
    type: CREATE_GARDEN,
    payload: { length, width }
});

export const createBed = ( bed : IGardenBed ) : IActionWithPayload => ({
    type: CREATE_BED,
    payload: bed
});