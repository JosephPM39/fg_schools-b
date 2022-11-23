import { Connection } from './connection-orm';
import { EntitiesADS } from './data-source';

export { Connection as DB } from './connection-orm';

export const createDb = async (EntitiesORM: EntitiesADS) => {
  const obj = new Connection(EntitiesORM);
  await obj.init();
  return obj;
};
