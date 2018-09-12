export class SyncItem {

    public itemType: string;
    public itemId: string;
    public version: number;
    public schemaVersion: number;
    public syncTimeStamp: string;

    public constructor(itemType: string, schemaVersion: number) {
        this.itemType = itemType;
        this.itemId = SyncItem.getNewItemId();
        this.version = 1;
        this.schemaVersion = schemaVersion;
        this.syncTimeStamp = SyncItem.getNewSyncTimeStamp();

    }
    public static getNewSyncTimeStamp() {
        return Date.now().toString();
    }
    public static getNewItemId() {
        return "_syncitem_" + Date.now().toString();
    }
}
