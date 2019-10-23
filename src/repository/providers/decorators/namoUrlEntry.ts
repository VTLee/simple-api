import { DBTable, DBColumn } from 'nodenamo';
import Config from '../../../config';

@DBTable({ name: Config.TABLE_NAME })
export default class NodenamoUrlEntry {

    @DBColumn({ id: true })
    id: string;

    @DBColumn({ hash: true })
    owner: string;

    @DBColumn()
    target: string;

    @DBColumn()
    enabled: boolean;

    @DBColumn()
    createdTimestamp: string;

    @DBColumn({ range: true })
    modifiedTimestamp


    constructor({
        id,
        owner,
        target,
        enabled,
        createdTimestamp,
        modifiedTimestamp
    }: {
        id?: string, owner?: string, target?: string,
        enabled?: boolean, createdTimestamp?: string, modifiedTimestamp?: string
    } = {}) {
        this.id = id;
        this.owner = owner;
        this.target = target;
        this.enabled = enabled;
        this.createdTimestamp = createdTimestamp;
        this.modifiedTimestamp = modifiedTimestamp;
    }
}
