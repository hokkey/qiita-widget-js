export default interface CachedResponseInterface {
  id: string;
  res: any;
  timestamp?: Date;
  validateDate(expiration: number): boolean;
  getCache(): boolean;
  saveCache(): boolean;
  setTimestamp(date: Date): void;
}
