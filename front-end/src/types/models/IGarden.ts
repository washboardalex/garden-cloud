import IGardenBed from './IGardenBed';
import IGardenDimensions from './IGardenDimensions';

export default interface IGarden {
    dimensions?: IGardenDimensions,
    beds: Array<IGardenBed>
}