import IGardenBed from './IGardenBed';

export default interface IGarden {
    length: number | null,
    width: number | null,
    beds: Array<IGardenBed>
}