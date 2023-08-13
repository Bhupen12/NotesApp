import { Database, Store, type StoreDefinitionType } from "@cloudparker/easy-idb";

const dbName = 'notes-Db';
const version = 1;
let db: Database | null = null;
export let notesStore: Store | undefined;

const storeDefinitions: StoreDefinitionType[] = [
    { name: 'notes', primaryKey: '_id', autoIncrement: true },
];

export async function openDatabase() {
    db = new Database({ name: dbName, version, stores: storeDefinitions });

    const results = await db.openDatabase();
    notesStore = results.notes;
    console.log('Database opened', results);
}